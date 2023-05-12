import { useState, useRef, useEffect } from 'react';

function Chatbox() {
  const chatLogRef = useRef(null);
  const [question, setQuestion] = useState('');
  const [isLoading, setLoading] = useState('');
  const [messageState, setMessageState] = useState({
    messages: [
      {
        text: 'Hi, you can ask me any thing about the doc.',
        isUser: false,
      },
    ],
    history: [],
  });
  const { history } = messageState;
  async function handleSubmit(event) {
    event.preventDefault();
    if (question.trim() !== '') {
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            text: question,
            isUser: true,
          }
        ]
      }));
      try {
        const ask = question.slice()
        setQuestion('');
        setLoading(true)

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 1000 * 120); // 超时时间为 5 秒

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ask,
            history,
          }),
          signal: controller.signal
        });
        const data = await response.json();

        if (data.error) {
        } else {
          setMessageState((state) => ({
            ...state,
            messages: [
              ...state.messages,
              {
                text: data.text,
                isUser: false,
              }
            ],
            history: [
              ...history,
              [question, data.text]
            ]
          }));
        }
        setLoading(false);
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      } catch (error) {
        setLoading(false);
        console.log('error', error);
      }
    }

  };

  useEffect(() => {
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  }, [messageState.messages]);


  return (
    <div className="flex flex-col h-full">
      <div className="result-window-header bg-indigo-500 text-white">
        <h2 className="result-window-title">Chatdoc</h2>
      </div>
      <div ref={chatLogRef} className="flex-grow overflow-y-auto px-4 py-2 bg-gray-100">
        {messageState && messageState.messages.map((chat, index) => (
          <div key={index} className={`my-2 ${chat.isUser ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-2 py-1 rounded-lg ${chat.isUser ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                }`}
            >
              {chat.text}
            </span>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex-shrink-0 flex p-2 bg-gray-200">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Enter your question here"
            className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Waiting...' : 'Send'}
          </button>
        </form>
      </div>
    </div >
  );
}

export default Chatbox;