import { useEffect, useRef, useState } from 'react';
// import './App.css';
import './index.css';  // Ensure this line is in your main file


function App() {
  const [receivedMsg, setReceivedMsg] = useState<String[]>([]);
  // const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  const sendMessage = () => {
    
      if(!socket){
        return;
      }
      // Ideally, you would send the message via WebSocket here
      // alert(message);
      // @ts-ignore
      const message = inputRef.current.value;
      // @ts-ignore
      socket.send(message); 
      // setMessage(''); // Clear the input after sending
    
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
      setReceivedMsg((prevMsg) => [...prevMsg, ev.data]);
    };

    // Cleanup WebSocket connection when the component unmounts
    
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-xl font-bold mb-4 text-center text-gray-800">WebSocket Chat</div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Send a Message:</h2>

        <input
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
          placeholder="Type your message..."
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>

      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
          {receivedMsg.length === 0 ? 'No Messages' : 'Received Messages'}
        </h3>

        <ul className="space-y-2">
          {receivedMsg.map((msg, index) => (
            <li
              key={index}
              className="bg-gray-200 p-2 rounded-md text-gray-700 shadow-sm"
            >
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
