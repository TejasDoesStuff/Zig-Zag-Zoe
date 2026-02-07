const room = {}

function createRoom(roomCode) {
    room[roomCode] = [];
}

function addPlayer(roomCode, socketID) {
    if(!room[roomCode]) {
        createRoom(roomCode);
        room[roomCode].push(socketID);
    }
}

function removePlayer(socketID) {
    for(const code in room) {
        room[code] = room[code].filter(id => id !== socketID);
        if(room[code].length === 0) {
            delete room[code];
        }
    }
}

function getPlayers(roomCode) {
    return room[roomCode] || [];
}

export { addPlayer, removePlayer, getPlayers }