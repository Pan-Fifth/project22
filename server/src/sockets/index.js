import { Server } from "socket.io";
import handleConnection from "./handler.js";
import jwt from "jsonwebtoken";
import createError from "http-errors";

export default function inintSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(createError(400, "no token"));
      }
      const user = jwt.verify(token, "SECRET");

      // 🔥 ผูก user ไว้กับ socket
      socket.user = user;

      next();
    } catch (error) {
      next(createError(400, "invalid token"));
    }
  });

  io.on("connection", (socket) => {
    handleConnection(io, socket);
  });
}
