"use client";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

export default function TestPage() {
  useEffect(() => {
    console.log("Connecting...");

    socket.emit("join", "test-room");

    socket.on("playerJoined", (id) => {
      console.log("Player joined:", id);
    });
  }, []);

  return (
    <div>
      <h1>Socket.IO Test</h1>
      <p>Check console + backend logs.</p>
    </div>
  );
}
