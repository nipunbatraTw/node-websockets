"use strict";

const express = require("express");
const SocketServer = require("ws").Server;
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, "index.html");

let wss;

const server = express()
  .get("/", (req, res) => {
    console.log("received GET request");
    res.sendFile(INDEX);
  })
  .post("/", (req, res) => {
    console.log("received POST request");
    wss.clients.forEach(client => {
      console.log("SEND TO DEVICE");
      client.send(new Date().toTimeString());
    });
    res.sendFile(INDEX);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

wss = new SocketServer({ server });

wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});
