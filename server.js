// require() = 모듈을 불러오는 기능
// require -> node.js에서 제공하는 기본 함수형 API
// 브라우저에서는 node.js환경이 아니라서 require()가 존재하지 않는다. 
//    import로 대체(import는 두 환경에서 모두 사용가능)
const http = require('http');
// http 모듈 불러오기

const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('요청:', req.url);

    fs.readFile('./index.html', 'utf8', (err, data) => {
        if (req.url === '/') {
            // 해당 경로만 처리
            if (err) {
                // 에러 처리
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('파일 읽을 수 없음');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            // Content-Type : 데이터 설정을 이렇게 하겠다.
            // text/html : html 데이터
            // 인코딩은 utf-8 => 한글까지 지원하는 인코딩
            res.end(data);
            // 데이터 전송 (세팅 설정 후 마지막에 부착)
        } else {
            // 다른 경로는 404 에러 처리
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('페이지를 찾을 수 없습니다');
        }
    });
});

const PORT = 3000;
server.listen(PORT, (req, res) => {
    // listen(port, listenEvent) = 서버on
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`)
});

server.on('request', (req, res) => {
    console.log('===== Request Event =====')
    console.log('method:', req.method)
    console.log('cliend ip:', req.socket.remoteAddress)
    console.log('time', new Date().toLocaleString())
});

server.on('connection', () => {
    console.log('Connection Event');
});
