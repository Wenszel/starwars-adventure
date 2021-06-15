const socket = io();
socket.on('connectToRoom',function(data) {
    document.body.innerHTML = '';
    document.write(data);
 });