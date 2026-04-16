import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);
  const { room } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ สร้าง socket แค่ครั้งเดียว
    socketRef.current = io("http://localhost:3500", {
      auth: { token },
    });

    socketRef.current.on("connect", () => {
      console.log("connected:", socketRef.current.id);
    });

    // ✅ join room
    socketRef.current.emit("join", { roomId: room });

    // ✅ รับข้อความ
    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: msg.text,
          sender: msg.sender === socketRef.current.id ? "me" : "other",
        },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [room]);

  // ✅ auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msgData = {
      roomId: room,
      text: input,
      sender: socketRef.current.id,
    };

    // ✅ ส่งไป server
    socketRef.current.emit("message", msgData);

    // ✅ เพิ่มในฝั่งตัวเอง
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "me" },
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-green-500 text-white font-semibold shadow">
        Chat Room: {room}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.sender === "me" ? "chat-end" : "chat-start"}`}
          >
            {msg.sender === "other" && (
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img src="https://i.pravatar.cc/40?img=3" alt="avatar" />
                </div>
              </div>
            )}

            <div
              className={`chat-bubble ${
                msg.sender === "me" ? "chat-bubble-primary" : ""
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
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
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
