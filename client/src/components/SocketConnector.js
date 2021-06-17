export default class SocketConnector {
    constructor() {
        this.socket = io();
        this.socket.on('won', function({nick, time}){
            alert(`Wygrał ${nick} w czasie ${msToTime(time)}`)
        })
    }
    won(time){
        let nick = sessionStorage.getItem("nick");
        this.socket.emit("win", {nick: nick, time: time});
    }
    msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;  
        return hrs + ':' + mins + ':' + secs + '.' + ms;
    }
}