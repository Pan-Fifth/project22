import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, text: "สวัสดี 👋", sender: "other" },
    { id: 2, text: "ว่าไง!", sender: "me" },
    { id: 3, text: "ทำอะไรอยู่?", sender: "other" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:3500");
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("message", (msg) => {
      console.log("other", msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", "hello");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-green-500 text-white font-semibold shadow">
        Chat
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.sender === "me" ? "chat-end" : "chat-start"}`}
          >
            {/* avatar optional */}
            {msg.sender === "other" && (
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img src="https://i.pravatar.cc/40?img=3" alt="avatar" />
                </div>
              </div>
            )}
            <div
              className={`chat-bubble ${msg.sender === "me" ? "chat-bubble-primary" : ""
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="พิมพ์ข้อความ..."
          className="input input-bordered flex-1 rounded-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={() => { }}
        />
        <button
          onClick={sendMessage}
          className="btn btn-primary rounded-full px-4"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}
export default ChatBox;
