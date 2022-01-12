var players = {};

socket.on('addPlayer', (id, head, body, color) => {
    console.log("added Player");
    players[id] = { head, body, color };
});

socket.on('getPlayers', (p_players) => {
    console.log(p_players)
    players = p_players;
});

socket.on('removePlayer', (id) => {
    delete players[id];
});

socket.on('updatePlayer', (id, head, body) => {
    players[id] = { head, body, color: players[id].color };
});


function drawPlayers() {
    for (const [key, player] of Object.entries(players)) {
        ctx.fillStyle = player.color;

        console.log(player.color);

        if (head.x == player.head.x && head.y == player.head.y) {
            die();
        }

        ctx.fillRect(player.head.x, player.head.y, 14, 14);
        player.body.forEach(element => {
            ctx.fillRect(element.x, element.y, 14, 14);

            if (head.x == element.x && head.y == element.y) {
                die();
            }
        });
    }


}