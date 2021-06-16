export default class Timer {
    constructor() {
        this.stopwatch = document.getElementById('timer')
        this.minutes = 0
        this.seconds = 0
        this.start()
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
    reset() {
        clearInterval(this.interval)
        this.minutes = 0
        this.seconds = 0
        this.stopwatch.innerText = `${this.minutes}:${this.seconds}`
    }
}