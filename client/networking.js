var players = {};

socket.on('addPlayer', (pid, phead, pbody) => {
    console.log("added Player");
    players[pid] = { phead, pbody };
});

socket.on('removePlayer', (id) => {
    delete players[id];
});

socket.on('updatePlayer', (pid, phead, pbody) => {
    players[pid] = { phead, pbody };
});