import { Chroma } from "langchain/vectorstores/chroma";
import fs from 'fs'
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChromaClient } from 'chromadb'
import { OPENAI_KEY, COLLECTION_NAME, CHROMA_URL } from '@/config/constant'

export async function embedFile() {

  const client = new ChromaClient(CHROMA_URL);
  client.deleteCollection(COLLECTION_NAME)

  try {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });
    const filePath = 'public/static/example.txt';
    const text = fs.readFileSync(filePath, 'utf-8');

    const docs = await textSplitter.createDocuments([text]);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OPENAI_KEY
    });
    let chroma = new Chroma(embeddings, { collectionName: COLLECTION_NAME, url: CHROMA_URL })
    await chroma.index?.reset()
    await Chroma.fromDocuments(docs, embeddings, {
      collectionName: COLLECTION_NAME, url: CHROMA_URL
    });
  } catch (error) {
    console.log('error', error);
  }
};

(async () => {
  await embedFile();
  console.log('ingestion complete');
})();