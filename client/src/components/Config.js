export default {
    //keyboard
    rotateLeft: false,
    rotateRight: false,
    moveForward: false,
    canMove: true,
    //check if keyboard can be used
    keyboardLoaded: false,

    //check if floor is loaded to use raycaster
    floorLoaded: false,

    //check if death animation has been played
    played: true,

    cubesLoaded: false,

    //check if the alert was shown and do not show it again (render)
    gameEndAlert: true,

    //show path color
    color: true,

    //block player when path is being shown
    playerBlocked: false
}