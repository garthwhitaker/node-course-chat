const moment = require('moment');
// var date = moment();
// date.add(1,'year').subtract(1,'months');

// console.log(date.format('MMM YYYY Do HH:MM:ss a' ));
// var date = new Date();
// console.log(date.getMonth());



var someTimestamp = moment().valueOf();
console.log(someTimestamp);
console.log(moment(1234).format('h:mm a'))