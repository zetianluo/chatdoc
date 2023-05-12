if (!process.env.COLLECTION_NAME) {
  throw new Error('Missing collection name in .env file');
}

if (!process.env.OPENAI_KEY) {
  throw new Error('Missing openai key in .env file');
}

if (!process.env.CHROMA_URL) {
  throw new Error('Missing chroma url in .env file');
}

const COLLECTION_NAME = process.env.COLLECTION_NAME ?? '';

const OPENAI_KEY = process.env.OPENAI_KEY ?? '';

const CHROMA_URL = process.env.CHROMA_URL ?? '';

export { COLLECTION_NAME, OPENAI_KEY, CHROMA_URL }