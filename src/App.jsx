import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import App from './App.jsx'


const socket = io("http://localhost:5000"); // Connect to the server

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("message"); 
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Socket.io Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
