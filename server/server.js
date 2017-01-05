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

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
 socket.broadcast.emit('newMessage',{
            from:'Admin',
            text: 'New user joined',
            createdAt : new Date().getTime()
        });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (createMessage) => {
        console.log('Create message: ', createMessage);
        io.emit('newMessage', {
            from: createMessage.from,
            text: createMessage.text,
            createdAt: new Date().getTime()
        });
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

