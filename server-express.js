const express = require('express');
const app = express();

app.listen(80, function () {
    console.log('서버 실행중...');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/main', function (req, res) {
    res.sendFile(__dirname + '/main.html')
});