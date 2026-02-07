"use client";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { Source_Serif_4 } from "next/font/google";

export default function TestPage() {
    const [roomCode, setRoomCode] = useState("");

const joinRoom = () => {
    if(roomCode.trim() !== "") {
        socket.emit("join", roomCode);
    } else {
        alert("enter a room code");
    }
}

const createRoom = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for(let i = 0; i < 4; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    socket.emit("join", code);
}

return (
    <div className="w-screen, h-screen flex flex-col justify-center m-16 gap-4">
        <h1 className="text-5xl font-bold">Zig-Zag-Zoe</h1>
        <input className="w-1/8 h-auto dark:border-white border rounded-2xl p-2" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder={"enter code"}/>
        <div className="w-1/8 h-1/12 dark:border-white border-4 rounded-2xl flex justify-center items-center cursor-pointer" onClick={joinRoom}>
            <p className="text-2xl font-bold">Join Room</p>
        </div>
        <div className="w-1/8 h-1/12 dark:border-white border-4 rounded-2xl flex justify-center items-center cursor-pointer" onClick={createRoom}>
            <p className="text-2xl font-bold">Create Room</p>
        </div>
    </div>
);
}
