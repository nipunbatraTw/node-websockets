"use strict";

const express = require("express");
const SocketServer = require("ws").Server;
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, "index.html");

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .get("/", () => {
    console.log("received GET request");
  })
  .post("/", () => {
    wss.clients.forEach(client => {
      client.send(new Date().toTimeString());
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({ server });

wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});
