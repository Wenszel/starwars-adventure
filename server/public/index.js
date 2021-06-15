const socket = io();
socket.on('connectToRoom',function(data) {
    if(data.nick1){
        document.getElementById("player1-nick").innerHTML = data.nick1;
    }else{
        document.getElementById("player1-nick").innerHTML = 'waiting...';
    }
    if(data.nick2){
        document.getElementById("player2-nick").innerHTML = data.nick1;
    }else{
        document.getElementById("player2-nick").innerHTML = 'waiting...';
    }
    document.getElementById("room-id").innerHTML = `You are at room no. ${data.roomNumber}`;
 });