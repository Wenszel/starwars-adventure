window.onload = function() {
    let nick;
    while(!nick){
        nick = prompt("Podaj nick");
    }
    if(nick){
        const socket = io();
        socket.on('connect', function(){
            socket.emit("newUser", nick);
        })
        socket.on('connectToRoom',function(data) {
            if(data.nick1){
                document.getElementById("player1-nick").innerHTML = data.nick1;
            }else{
                document.getElementById("player1-nick").innerHTML = 'waiting...';
            }
            if(data.nick2){
                document.getElementById("player2-nick").innerHTML = data.nick2;
            }else{
                document.getElementById("player2-nick").innerHTML = 'waiting...';
            }
            document.getElementById("room-id").innerHTML = `You are now at room no. ${data.roomNumber}`;
            if(data.start) {
                const vs = document.querySelector(".vs");
                vs.innerHTML = "";
                const a = document.createElement("a");
                a.innerHTML = "Start"
                a.href = `/game?room=${data.roomNumber}`
                vs.appendChild(a);
            }else{
                const vs = document.querySelector(".vs");
                vs.innerHTML = "vs";
            }
        });
    }
}