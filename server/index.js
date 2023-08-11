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
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000', // --> Con esto * decimos que cualquiera se puede conectar, tambien podemos ser especificos
    }
});

// Configuracion  cors --> Cualquier servidor externo va a poder conectarse
app.use(cors());
app.use(morgan("dev"));

// Asi escuchamos un evento de conexion y hacemos algo
io.on('connection', (socket) => {
    console.log(`ID del cliente conectado: ${socket.id}`);

    // Aqui escuchamos el evento message del front end
    socket.on('message', (data) => {
        // Reenviamos el mensaje a el o los clientes
        socket.broadcast.emit('message', data);
    })
})
// Debemos arrancar el servidor HTTP no app
server.listen(PORT ?? 5000, () => console.log(`Server started on PORT ${PORT ?? 5000}`));