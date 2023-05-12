import Chatbox from './components/Chatbox';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow app">
        <Chatbox />
      </div>
    </div>
  );
}