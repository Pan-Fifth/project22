import { Server } from "socket.io";
import handleConnection from "./handler.js";

export default function inintSocket(server) {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.on('connection', (socket) => {
        handleConnection(io, socket)
    })
}