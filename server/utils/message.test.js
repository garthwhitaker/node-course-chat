const expect = require('expect');
const {generateMessage} = require('./message');

describe('Message creation', () => {

    it('should generate correct message correctly', () => {
        var from = 'Oliver';
        var text = 'Hi all people';
        var message = generateMessage(from,text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');

    });
});