let direction = {
    x: 0,
    y: 0
}
//declaring constatnts
const foodSound = new Audio("./music/food.mp3")
const gameOver = new Audio("./music/gameover.mp3")
const move = new Audio("./music/move.mp3")
const board = document.getElementById("board")
const scorediv = document.getElementById("score-div")
let score = 0;
let last = 0;
let speed = 4;
//snake array
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 3, y: 15 }
//main function repainting of game
function mainGame(ctime) {
    window.requestAnimationFrame(mainGame)
    if ((ctime - last) / 1000 < (1 / speed)) {
        return;
    }
    last = ctime;
    gameEngine()
}
//collide logic
function isCollide(snakearray) {
    for (let i = 1; i < snakearray.length; i++) {
        if (snakearray[i].x === snakeArr[0].x && snakearray[i].y === snakeArr[0].y) {
            return true;
        }

    }
    if (snakearray[0].x >= 18 || snakearray[0].x <= 0 || snakearray[0].y >= 18 || snakearray[0].y <= 0) {
        return true;
    }
}
//logics of the game here
function gameEngine() {

    //updating snake food
    if (isCollide(snakeArr)) {
        gameOver.play()
        direction = { x: 0, y: 0 }
        alert("game over press any key to play again")
        snakeArr = [{ x: 13, y: 15 }]
        score = 0;
    }
    //if snake is eating any food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play()
        score += 1;
        scorediv.innerHTML = "score:" + score
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //move sanke

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
        // console.log("loop")
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
    board.innerHTML = ""

    //declaring snake
    snakeArr.forEach((val, index) => {

        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = val.y;
        snakeElement.style.gridColumnStart = val.x;

        if (index === 0) {
            snakeElement.classList.add('head')
            //direction of head
            if (direction.x === 0 && direction.y === -1)
                snakeElement.style.transform = "rotate(180deg)"
            else if (direction.x === 0 && direction.y === 1)
                snakeElement.style.transform = "rotate(360deg)"
            else if (direction.x === -1 && direction.y === 0)
                snakeElement.style.transform = "rotate(90deg)"
            else if (direction.x === 1 && direction.y === 0)
                snakeElement.style.transform = "rotate(270deg)"
        } else {
            snakeElement.classList.add('body')
        }
        board.appendChild(snakeElement)
    })

    //declaring food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}
window.requestAnimationFrame(mainGame)
//listning key events
window.addEventListener('keydown', (e) => {
    move.play()
    direction = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":

            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":

            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":

            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
})

