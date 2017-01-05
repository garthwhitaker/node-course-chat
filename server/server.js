const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

const app = express();
app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//     res.sendFile('index.html');
// });

app.listen(3000, () => {
    console.log('Server started on port 3000.');
})

