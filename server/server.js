const express = require('express');
const socket = require("socket.io");
const path = require('path');
const app = express();
app.use(express.static("public"));
const PORT = 3000 || env.PORT;
const server = app.listen(PORT, () => { 
    console.log("server running on port: " + PORT);
});
app.get("/", (req, res) => res.sendFile(path.join(__dirname,"/public/index.html")))
const io = socket(server);
io.on("connection", function (socket) {
    console.log("Made socket connection");
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