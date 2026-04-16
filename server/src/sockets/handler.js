import joinRoom from "./events/joinRoom.js";
import sendMessage from "./events/sendMessage.js"
import leaveRoom from './events/leaveRoom.js'

export default function handleConnection(io, socket) {
    console.log('User connected:', socket.id);
    console.log('io', io)
    console.log('socket', socket)

    socket.on('join', (data) => {
        console.log('join', data)
        joinRoom(io, socket, data);
    });

    socket.on('message', (data) => {
        console.log('message', data)
        sendMessage(io, socket, data);
    });

    socket.on('leave', (data) => {
        console.log('leave', data)
        leaveRoom(io, socket, data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
}