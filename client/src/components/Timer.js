import Config from "./Config"

export default class Timer {
    constructor() {
        this.stopwatch = document.getElementById('timer')
        this.minutes = 0
        this.seconds = 0
    }
    start() {
        this.interval = setInterval(() => {
            this.seconds++
            if (this.seconds < 10)
                this.seconds = '0' + this.seconds

            if (this.seconds === 60) {
                this.minutes++
                this.seconds = '0' + 0
            }
            if (this.minutes < 10)
                this.stopwatch.innerText = `0${this.minutes}:${this.seconds}`
            else
                this.stopwatch.innerText = `${this.minutes}:${this.seconds}`
        }, 1000)
    }
    stop() {
        clearInterval(this.interval)
        if (this.minutes < 10)
            this.stopwatch.innerText = `0${this.minutes}:${this.seconds}`
        else
            this.stopwatch.innerText = `${this.minutes}:${this.seconds}`
    }
    getTime() {
        clearInterval(this.interval)
        let ms = this.minutes * 60000 + this.seconds * 1000

        if (!Config.timeTaken) {
            //time has stopped, send it to db
            Config.timeTaken = true
        }
    }
}