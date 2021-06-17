let Paths = {
    path1: [],
    path2: [],
    path3: [],
    returnPath(number) {
        if (number === 0)
            return this.path1
        else if (number === 1)
            return this.path2
        else
            return this.path3
    },
}

export default Paths