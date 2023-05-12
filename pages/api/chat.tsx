import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import { OpenAI } from 'langchain/llms/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { OPENAI_KEY, COLLECTION_NAME, CHROMA_URL } from '@/config/constant'


const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
    
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
    If you are not sure about the answer, inform which parts of the answer you are not quite sure about. DO not try to make up an incorrect answer.
    If you are not sure about the data, please warn the user that the data may be incorrect and do not make up a random number.
    If the question is not related to the context, express apologies and ask to update the document that may related to the question.

    {context}

    Question: {question}
    Helpful answer in markdown:`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { ask, history } = req.body;


  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!ask) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = ask.trim().replaceAll('\n', ' ');

  try {

    /* create vectorstore*/
    const vectorStore = await Chroma.fromExistingCollection(
      new OpenAIEmbeddings({ openAIApiKey: OPENAI_KEY }),
      {
        collectionName: COLLECTION_NAME,
        url: CHROMA_URL
      },
    );


    const model = new OpenAI({
      temperature: 0,
      modelName: 'gpt-3.5-turbo',
      openAIApiKey: OPENAI_KEY
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_PROMPT,
        questionGeneratorTemplate: CONDENSE_PROMPT,
        returnSourceDocuments: true,
      },
    );


    //Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    res.status(200).json(response);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
