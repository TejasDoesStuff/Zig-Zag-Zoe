import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { addPlayer, removePlayer, getPlayers } from "./room.js";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`running on ${PORT}`)
});

io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
    });

    socket.on("join", (roomCode) => {
        addPlayer(roomCode, socket.id)
        socket.join(roomCode);
        console.log(`${socket.id} joined room ${roomCode}`)
        io.to(roomCode).emit("playerJoined", socket.id);
    });
    
    socket.on("makeMove", (data) => {
        // data = { room, cell, player }
        io.to(data.room).emit("moveMade", data);
    });
});

