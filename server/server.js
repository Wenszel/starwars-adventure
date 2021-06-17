const express = require('express');
const app = express();
const path = require('path');
app.use(express.static("public"));
app.use(express.static("public/dist"));
const PORT = 3000 || env.PORT;
const server = app.listen(PORT, () => { 
    console.log("server running on port: " + PORT);
});
const io = require('socket.io')(server);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"))
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname,"public/dist/index.html"))
});

let allClients = [];
io.sockets.on("connection", function (socket) {
    allClients.push({socket: socket});
    socket.on("newUser", function (data) {
        socket.playerName = data;
        let roomNumber = 1;
        // Gets room based on roomNumber
        let room = io.sockets.adapter.rooms.get(`room-${roomNumber}`);
        // Looks for empty room / room with only one player
        while(room?.size > 1) {
            roomNumber++;
            room = io.sockets.adapter.rooms.get(`room-${roomNumber}`);
        }
        socket.join(`room-${roomNumber}`);
        room = io.sockets.adapter.rooms.get(`room-${roomNumber}`);
        if(room){
            if(room.playersName){
                room.playersName = [...room.playersName, socket.playerName]
                room.start = true;
            }else{
                room.playersName = [socket.playerName];
                room.start = false;
            }
        }
        allClients[allClients.findIndex(i => i.socket === socket)].roomNumber = roomNumber;
        //Send this event to everyone in the room.
        io.sockets.in(`room-${roomNumber}`).emit('connectToRoom', {roomNumber: roomNumber, nick1: room.playersName[0], nick2: room.playersName[1], start: room.start});
    });
    socket.on("forceRedirect", function(){
        let client = allClients.find( i => i.socket === socket);
        io.sockets.in(`room-${client.roomNumber}`).emit('redirect', `/game`);
    });
    socket.on("disconnect", function(){
        let client = allClients.find( i => i.socket === socket);
        let room = io.sockets.adapter.rooms.get(`room-${client.roomNumber}`);
        room?.playersName.splice(room.playersName.indexOf(socket.playerName), 1);
        io.sockets.in(`room-${client.roomNumber}`).emit('connectToRoom', {roomNumber: client.roomNumber, nick1: room?.playersName[0], nick2: room?.playersName[1]});
    });
    socket.on("win", function({nick, time}){
        saveScore(nick, time);
        const index = allClients.findIndex(i => i.socket.id === socket.id);
        io.to(allClients[index].socket.id).emit('won', {nick: nick,time: time});
        if(index%2 === 0){
            io.to(allClients[index+1].socket.id).emit('won', {nick: nick,time: time});
        }else{
            io.to(allClients[index-1].socket.id).emit('won', {nick: nick,time :time});
        }
    });
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
const ranking = require('./schemas/ranking')
function saveScore(nick, time) {
    new ranking({
        nick: nick,
        time: time
    }).save()
}
app.get("/ranking", (req, res) => {
    ranking.find({}, (err, docs) => {
        res.send(docs);
    })
});
const config = require('./schemas/config');
app.get("/config", (req, res) => {
    config.findById('60cb4d1754f68217acbc5d1d').then(data => {
        res.send({size: data.size});
    });
});
const paths = require('./schemas/path');
app.get("/paths", (req, res) => {
    paths.find({}, (err, docs) => {
        res.send(docs);
    })
})