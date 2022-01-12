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

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('removePlayer', socket.id);
    });

    socket.on('getPlayers', () => {
        io.to(socket.id).emit('getPlayers', players);
    });

    socket.on('addPlayer', (head, body, color) => {
        socket.broadcast.emit('addPlayer', socket.id, head, body, color);
        players[socket.id] = { head, body, color };
        console.log(players[socket.id]);
    });

    socket.on('player-update', (head, body) => {
        players[socket.id].head = head;
        players[socket.id].body = body;
        socket.broadcast.emit('updatePlayer', socket.id, head, body);

    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});