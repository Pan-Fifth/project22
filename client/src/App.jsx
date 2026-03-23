import "./App.css";
import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3500");

  useEffect(() => {
    socket.emit("hello", "world");
  });
  return <>socket test</>;
}

export default App;
