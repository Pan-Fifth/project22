export default function (io, socket, data) {
    const { roomId } = data;

    socket.leave(roomId);

    console.log(`${socket.id} left ${roomId}`);
}