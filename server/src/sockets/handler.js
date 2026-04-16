import joinRoom from "./events/joinRoom.js";
import sendMessage from "./events/sendMessage.js";
import leaveRoom from "./events/leaveRoom.js";

export default function handleConnection(io, socket) {
  //console.log('User connected:', socket.id);
  //console.log('io', io)
  //console.log("socket", socket);

  socket.on("join", (data) => {
    console.log("join", data);
    console.log("socket", socket);
    joinRoom(io, socket, data);
  });

  socket.on("message", ({ roomId, text, sender }) => {
    console.log("roomId", roomId);
    console.log("text", text);
    console.log("sender", sender);
    socket.to(roomId).emit("message", {
      text,
      sender,
    });
  });

  socket.on("leave", (data) => {
    console.log("leave", data);
    leaveRoom(io, socket, data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.firstName);
  });

  socket.on("newPath", (data) => {});
}
