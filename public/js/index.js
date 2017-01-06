var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    
    var template = $('#message-template').html();
    var formattedTime = moment(message.createAt).format('h:mm a');

    var html = Mustache.render(template, {
        text: message.text,
        createdAt: formattedTime,
        from: message.from
    });

    $('#messages').append(html);

});


socket.on('newLocationMessage', function (message) {

    var template = $('#location-message-template').html();
    var formattedTime = moment(message.createAt).format('h:mm a');

    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    $('#messages').append(html);

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

