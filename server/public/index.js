window.onload = function () {
    fetch('/ranking')
        .then(response => response.json())
        .then(data => {
            const rankingOl = document.querySelector("#ranking > ol");
            data.sort(function (a, b) {
                if (a.time < b.time)
                    return -1
                if (a.time > b.time)
                    return 1
                return 0
            })
            data.forEach((item, index) => {
                if (index < 25) {
                    const li = document.createElement("li");
                    li.innerHTML = item.player + " | " + msToTime(item.time);
                    rankingOl.appendChild(li);
                }
            });
        });
    let nick;
    while (!nick) {
        nick = prompt("Podaj nick");
    }
    if (nick) {
        sessionStorage.setItem("nick", nick);
        const socket = io();
        socket.on('connect', function () {
            socket.emit("newUser", nick);
        })
        socket.on('redirect', function (destination) {
            window.location.href = destination;
        });
        socket.on('connectToRoom', function (data) {
            if (data.nick1) {
                document.getElementById("player1-nick").innerHTML = data.nick1;
            } else {
                document.getElementById("player1-nick").innerHTML = 'waiting...';
            }
            if (data.nick2) {
                document.getElementById("player2-nick").innerHTML = data.nick2;
            } else {
                document.getElementById("player2-nick").innerHTML = 'waiting...';
            }
            if (data.nick1 === nick) {
                sessionStorage.setItem("character", "vader");
            }
            if (data.nick2 === nick) {
                sessionStorage.setItem("character", "r2d2");
            }
            document.getElementById("room-id").innerHTML = `You are now at room no. ${data.roomNumber}`;
            if (data.start) {
                const vs = document.querySelector(".vs");
                vs.innerHTML = "";
                const a = document.createElement("a");
                a.innerHTML = "Start"
                a.onclick = () => {
                    socket.emit("forceRedirect");
                }
                vs.appendChild(a);
            } else {
                const vs = document.querySelector(".vs");
                vs.innerHTML = "vs";
            }
        });
    }
}
function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
}