const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('Message creation', () => {

    it('should generate correct message correctly', () => {
        var from = 'Oliver';
        var text = 'Hi all people';
        var message = generateMessage(from,text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');

    });
});
describe('Location creation', () => {

    it('should generate correct location correctly', () => {
        var from = 'Oliver';
        var latitude = -33;
        var longitude = 18;
        var url = `https://www.google.co.za/maps/?q=${latitude},${longitude}`;

        var locationMessage = generateLocationMessage(from,latitude,longitude);
        expect(locationMessage).toInclude({from, url});
        expect(locationMessage.createdAt).toBeA('number');
        expect(locationMessage.url).toBe(url);
    });
});