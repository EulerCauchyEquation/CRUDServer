const http = require('http');
const fs = require('fs');

function miniExpress() {

    const routes = {
        GET: {},
        POST: {},
    };

    const app = {
        /** GET 요청 */
        get(path, handler) {
            routes.GET[path] = handler;
        },

        /** POST 요청 */
        post(path, handler) {
            routes.POST[path] = handler;
            // GET = {/:handler1,}
        },

        listen(port, listenHandelr) {
            const server = http.createServer((req, res) => {
                console.log('요청입니다:', req.url);

                res.sendFile = (filePath) => {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end('파일을 읽을 수 없음');
                            return;
                        }
                        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(data);
                    })
                }

                // GET = {
                //     "/" : handler1,
                // }
                const handler = routes[req.method][req.url];

                if (handler) {
                    // todo: 얘는 희한하게 값이 있으면 true인건가?
                    handler(req, res);
                    console.log('handler확인:', handler.toString());
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('페이지를 읽을 수 없음');
                }
            });

            server.listen(port, listenHandelr);

            server.on('request', (req, res) => {
                console.log('request 받음');
                console.log('method:', req.method);
                console.log('client ip:', req.socket.remoteAddress);
            });
        }
    }

    return app;
}

module.exports = miniExpress;