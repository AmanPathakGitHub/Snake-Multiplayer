const PORT = process.env.PORT | 8080;

// check changes

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
    res.sendFile(rootPath + "/client/home.html");
});

io.on('connection', async(socket) => {
    console.log('a user connected');

    socket.on('disconnect', async() => {
        delete players[socket.id];
        io.emit('removePlayer', socket.id);
    });

    socket.on('getPlayers', async() => {
        io.to(socket.id).emit('getPlayers', players);
    });

    socket.on('addPlayer', async(head, body, color) => {
        socket.broadcast.emit('addPlayer', socket.id, head, body, color);
        players[socket.id] = { head, body, color };
        console.log(players[socket.id]);
    });

    socket.on('updatePlayer', async(head, body) => {
        players[socket.id].head = head;
        players[socket.id].body = body;
        io.emit('getPlayers', players)
    })

    socket.on('GotApple', async() => {
        
    });


});


setInterval(async() => {
    io.emit('updatePlayer')

}, 80);

server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});