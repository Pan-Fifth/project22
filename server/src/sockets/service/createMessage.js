// chat.service.js
function createMessage(userId, text) {
    return {
        userId,
        text,
        createdAt: new Date()
    };
}

export default createMessage;