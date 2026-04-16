export default function (io, socket, data) {
    const { roomId } = data;

    socket.join(roomId);

    console.log(`${socket.id} joined ${roomId}`);
}