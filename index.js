const socketio = require('socket.io')
const http = require('http');
const express = require('express')
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});
const getRandomNumberBetween = (min, max, type) => {
    let x = Math.floor(Math.random() * (max - min + 1) + min)
    let y = Math.floor(Math.random() * (max - min + 1) + min)
    return {
        type,
        location: { x, y }
    };
}
io.on('connection', (socket) => {
    socket.on("getCoordinates", () => {
        let circle = getRandomNumberBetween(1, 90, "circle")
        let square = getRandomNumberBetween(1, 90, "square")
        socket.emit("coordinates", { circle, square })
    })
});
server.listen(PORT, () => console.log(`server started at port ${PORT}`));