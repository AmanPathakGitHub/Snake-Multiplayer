const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const rootPath = __dirname.substring(0, __dirname.length - 7)

let players = {};

app.use(express.static(`${rootPath}/client`));

app.get('/', (req, res) => {
    res.sendFile(rootPath + "/client/ree.html");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('getPlayers', () => {
        io.to(socket.id).emit('getPlayers', players);
    });

    socket.on('addPlayer', (head, body) => {
        socket.broadcast.emit('addPlayer', socket.id, head, body);
        players[socket.id] = { head, body };
    });

    socket.on('player-update', (head, body) => {
        socket.broadcast.emit('getPlayerData', socket.id, head, body);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});