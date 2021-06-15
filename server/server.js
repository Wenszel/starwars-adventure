const express = require('express');
const app = express();

const path = require('path');
app.use(express.static("public"));
const PORT = 3000 || env.PORT;
const server = app.listen(PORT, () => { 
    console.log("server running on port: " + PORT);
});
app.get("/", (req, res) => res.sendFile(path.join(__dirname,"/public/index.html")))
const io = require('socket.io')(server);
io.on("connection", function (socket) {
    let roomNumber = 1;
    // Gets room based on roomNumber
    let room = io.sockets.adapter.rooms.get(`room-${roomNumber}`);
    // Looks for empty room / room with only one player
    while(room?.size > 1) {
        roomNumber++;
        room = io.sockets.adapter.rooms.get(`room-${roomNumber}`);
    }
    socket.join(`room-${roomNumber}`);
    //Send this event to everyone in the room.
    io.sockets.in(`room-${roomNumber}`).emit('connectToRoom', {roomNumber: roomNumber});
});

// MongoDB
const mongoose = require('mongoose');
const CONNECTION_URI =  require('./credentials.js');
console.log(CONNECTION_URI);
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.error(err);
})