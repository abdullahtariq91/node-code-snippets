const socketIO = require('socket.io');
const connectedUsers = {};

// socket IO connection configuration
module.exports.socketIOConnection = (app) => {
    global.SOCKETIO = socketIO.listen(app);
    global.SOCKETIO.on('connection', (socket) => {
        // While on socket on connection
        socket.on('clientInformation', (data) => {
            socket.join(data.companyId);
            connectedUsers[data.userId] = socket.id;
        });

        // While on socket on disconnection
        socket.on('disconnection', (data) => {
            delete connectedUsers[data.userId];
        });

    });
    return global.SOCKETIO;
};

// send group message to users associated with public id
module.exports.refreshList = (publicId, message) => {
    return global.SOCKETIO.sockets
        .to(publicId)
        .emit('refreshList', message);
};

// send private message
module.exports.refreshMessages = (receiverId, message) => {
    return global.SOCKETIO.sockets
        .to(connectedUsers[receiverId])
        .emit('refreshMessages', message);
};
