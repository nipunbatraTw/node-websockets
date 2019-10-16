"use strict";

const express = require("express");
const SocketServer = require("ws").Server;
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, "index.html");
const app = express();

let wss = {};
app
  .use((req, res) => res.sendFile(INDEX))
  .get("/", () => {
    console.log("received GET request");
  })
  .post("/", () => {
    console.log("received post");
    wss.clients.forEach(client => {
      console.log("message sent");
      console.log(typeof client);
      client.send(new Date().toTimeString());
    });
  });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

wss = new SocketServer({ server: app });

wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});
