import createMessage from '../service/createMessage.js'

export default function (io, socket, data) {
    const { roomId, text } = data;

    const message = createMessage(socket.userId, text);

    // ส่งเฉพาะในห้อง
    io.to(roomId).emit('message', message);
}