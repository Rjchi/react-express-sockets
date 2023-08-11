const express = require("express");
const morgan = require("morgan");

const { Server: SocketServer } = require("socket.io");
const http = require("http");

const cors = require("cors");
const PORT = require("./config")

// Servidor de express
const app = express();
// Servidor HTTP
const server = http.createServer(app);
// Servidor de WebSockets
const io = new SocketServer(server);

// Configuracion  cors --> Cualquier servidor externo va a poder conectarse
app.use(cors());
app.use(morgan("dev"));


app.listen(PORT ?? 5000, () => console.log(`Server started on PORT ${PORT ?? 5000}`));