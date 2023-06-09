# ChatDoc Proejct
The ChatDoc is an intelligent conversational agent designed to interact with users and provide relevant information or assistance. Powered by technologies such as OpenAI open source, [Langchain and vectorDB (Chroma)](https://blog.langchain.dev/langchain-chroma/), the ChatDoc harnesses the power of advanced natural language processing and machine learning algorithms.  It is capable of answering questions, providing recommendations, guiding users through processes, and engaging in meaningful conversations. With its ability to comprehend and generate human-like responses, the ChatDoc aims to enhance user experience, streamline customer support, and deliver efficient and personalized services.

![Example screenshot](./images/mobile_frontend.png)

---
## Requirements

For development, you will only need Node.js, NPM and a node global packages, installed in your environement.

### Node and NPM Installation

<details><summary><b>Show instructions</b></summary>

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Linux

  You can install nodejs and npm easily with apt install, just execute the following commands..
      ```sh
      $ sudo apt install nodejs
      $ sudo apt install npm
      ```

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If your installation was successful, you should be able to run the following command:
- Node.js
    ```
    $ node --version
    v18.16.0
    ```
- NPM
   ```
   $ npm --version
   9.5.1
   ```

If you need to update `npm`, just run the following commands.

    ```
    $ npm update -g next
    ```

</details>

Please ensure that your Node version is at least 18 or newer. Above are the exact versions I'm using to run the App.

---

### Running locally in development mode

1. Clone the repo or download the ZIP:

    ```
    git clone https://github.com/zetianluo/chatdoc.git
    ```

2. Install packages
    
    ```
    npm install
    ```

    After installation, you should now see a `node_modules` folder.

    If you encounter version errors later, please use the following command to update the packages:

    ```
    npm install -S langchain@latest
    npm install -S chromadb@latest
    ```

3. Set up your `.env` file

    Your `.env` file should look like this:

    ```
    OPENAI_API_KEY=YOUR_API_KEY
    COLLECTION_NAME=chatdoc_collection
    CHROMA_URL=http://h4.noway.top:13579
    ```

    - Visit [OpenAI](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) to get your own API keys and put it into your `.env` file.
    - Select a name for the collection in Chroma where you wish to store your embeddings. This collection will be utilized for future queries and retrieval purposes.
    - Two ways to set up the `CHROMA_URL`:
        1. Run the following command to pull the Chroma images from Dockerhub and host it at your local port 8000:

        ```
        docker run -p 8000:8000 ghcr.io/chroma-core/chroma:0.3.21
        ```

        It may take a few minutes to pull the full image.

        Then you can use the following `CHROMA_URL`
        ```
        CHROMA_URL=http://localhost:8000
        ```

        Or:

        2. Use the following Chromadb server public address:

        ```
        CHROMA_URL=http://h4.noway.top:13579
        ```

4. In `api/chat.tsx` chain change the prompt in `QA_PROMPT` for your own usecase. 

5. Edit or replace the text file `...\public\static\example.txt` to import your own text file to the Chroma.

## Getting Started

- Run the following command to add embedings and content to your Chroma:

```
npm run embed
```

- Run the app using the following command:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.