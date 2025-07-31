const miniExpress = require('./mini-express');
const app = miniExpress();

const PORT = 80;
app.listen(PORT, (req, res) => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});
