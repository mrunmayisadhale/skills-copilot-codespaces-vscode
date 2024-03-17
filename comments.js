// create web server
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    // read the file
    fs.readFile('comments.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(8080);
// create server to listen to comments
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8181});
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        wss.clients.forEach(function(client) {
            client.send(message);
        });
    });
});
console.log('Server running');
