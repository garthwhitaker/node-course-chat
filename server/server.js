const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {

    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (createMessage, callback) => {

        console.log('Create message: ', createMessage);

        io.emit('newMessage', generateMessage(createMessage.from, createMessage.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from: createMessage.from,
        //     text: createMessage.text,
        //     createdAt : new Date().getTime()
        // });
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

