const expect = require('expect');
const {Users} = require('./users');

var users;

beforeEach(() => {

    users = new Users();

    users.users = [
        {
            id: '1',
            name: 'Garth',
            room: "ManU Fans"
        },
        {
            id: '2',
            name: 'Hyron',
            room: "Liverpool Fans"
        },
        {
            id: '3',
            name: 'Chanel',
            room: "ManU Fans"
        }
    ]
});
describe('Users', () => {

    it('should add user', () => {
        var users = new Users();
        var result = users.addUser(1, 'Garth', 'Coffe');

        expect(users.users).toEqual([result]);

    });

    it('should get user name list in room ManU Fans', () => {

        var userList = users.getUserList('ManU Fans');

        expect(userList).toEqual(['Garth', 'Chanel']);

    });

    it('should remove user', () => {

        var user = users.removeUser('1');

        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
       var user = users.removeUser('999');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });

    it('should get user', () => {

        var user = users.getUser('1')
        expect(user).toEqual(users.users[0]);

    });

    it('should not get user', () => {
        var user = users.getUser('123123')
        expect(user).toNotExist();
    });

});