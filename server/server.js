const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {

    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.emit('newMessage', {
        from: 'Garth',
        text: 'I am NodeJS',
        createdAt: new Date().toDateString()
    });

    socket.on('createMessage', (createMessage) => {
        console.log('Create message: ', createMessage);
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

