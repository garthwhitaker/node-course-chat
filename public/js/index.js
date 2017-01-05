var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message: ', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();
    console.log($('input[name="message"]').val());

    socket.emit('createMessage', {
        from: 'Garth',
        text: $('input[name="message"]').val()
    }, function () {

    });
});

