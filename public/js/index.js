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


socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}:`);
    a.attr('href', message.url);

    li.append(a);

    $('#messages').append(li);
});


var messageTextbox = $('input[name="message"]');

$('#message-form').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'Garth',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationButton.removeAttr('disabled').text('Send location');
        })
    },
        function () {
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location.');
        });

});

