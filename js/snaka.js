let snake_direction = { x: 0, y: 0 }
let snakeArr = [{ x: 11, y: 10 }];
let food = { x: 7, y: 11 }
let preview_time = 0;
let speed = 5;
let foodIcon=["pizza-slice","ice-cream","hotdog","hamburger","cheese","apple-alt","carrot"];//food icon array
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
localStorage.foodIconInd=0;
// Game's Main Function
function snakeLoopFrame(ctime) {
    window.requestAnimationFrame(snakeLoopFrame);

    if ((ctime - preview_time) / 1000 < 1 / speed) {
        return;
    }

    preview_time = ctime;
    // console.log(ctime);

    startGame();

}
function startGame() {
    let snakeBody = document.querySelector(".body");
    snakeBody.innerHTML = '';
    musicSound.play(); //background music

    // get grid's row and coulmn length to observe boundary because we will change grid rows and columns on different screen sizes
    const cssObj = window.getComputedStyle(snakeBody, null);
    let rows = cssObj.getPropertyValue("grid-template-rows");
    let columns = cssObj.getPropertyValue("grid-template-columns");
    // console.log(rows.split(" ").length);// grid rows length
    // console.log(columns.split(" ").length);// grid columns lengths

    // if snake collapse the boundary then Game Over
    if (snakeArr[0].x > columns.split(" ").length - 1 || snakeArr[0].y > rows.split(" ").length - 1 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0) {
        musicSound.pause();
        gameOverSound.play();
        alert("Game Over2");
        snake_direction = { x: 0, y: 0 }
        food = { x: 7, y: 11 }
        snakeArr = [{ x: 11, y: 10 }];
    }

    // if snake collapse self then game over
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            musicSound.pause();
            gameOverSound.play();
            alert("Game Over1");
            snake_direction = { x: 0, y: 0 }
            food = { x: 7, y: 11 }
            snakeArr = [{ x: 11, y: 10 }];
        }
    }



    //move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // pass the previous coordinate to next coordinate [NOTE:- {x,y}-> we are considering as coordinates in snakeArr]
        snakeArr[i + 1] = { ...snakeArr[i] } // Here `...` is part of Object Destructuring, used for passing the values on same index
        //EXAMPLE:- {x,y}={10,20}
        // Result: x=10,y=20
    }
    snakeArr[0].x += snake_direction.x;
    snakeArr[0].y += snake_direction.y;


    //display snake 
    snakeArr.forEach(function (snakee, ind) {


        // if (snakeArr[0].x == snakee.x && snakeArr[0].y == snakee.y) {
        if (ind==0) {

            snakeElement = document.createElement("img");
            snakeElement.setAttribute("src", "img/snake_mouth.png");
            snakeElement.classList.add("head");
            snakeElement.classList.add(`${localStorage.snakeMouthDirection}`);


        } else {

            if(snakeArr.length>=3){
                    if((snakeArr.length-1)==ind){
                        snakeElement = document.createElement("div");
                        snakeElement.insertAdjacentHTML('afterbegin', '*.');
                        snakeElement.classList.add("snakeBack","snakeTail2");
                    }else if((snakeArr.length-2)==ind){
                        snakeElement = document.createElement("div");
                        snakeElement.insertAdjacentHTML('afterbegin', '*.');
                        snakeElement.classList.add("snakeBack","snakeTail1");
                    }else{
                        snakeElement = document.createElement("div");
                        snakeElement.insertAdjacentHTML('afterbegin', '*.');
                        snakeElement.classList.add("snakeBack");
                    }
            }else{
                snakeElement = document.createElement("div");
                snakeElement.insertAdjacentHTML('afterbegin', '*.');
                snakeElement.classList.add("snakeBack");
            }
           
        }
        snakeElement.style.gridRowStart = snakee.y;
        snakeElement.style.gridColumnStart = snakee.x;
        snakeBody.appendChild(snakeElement);
    })


    //display food

    snakeElement = document.createElement("i");
    snakeElement.classList.add("fas",`fa-${foodIcon[localStorage.foodIconInd]}`);
    snakeElement.style.color="white";
    snakeElement.style.gridRowStart = food.y;
    snakeElement.style.gridColumnStart = food.x;
    snakeBody.appendChild(snakeElement);


    // when snake eaten food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + snake_direction.x, y: snakeArr[0].y + snake_direction.y });

        //genearte food's new position

        var clm = columns.split(" ").length - 2;
        var rw = rows.split(" ").length - 2;
        food.x = Math.round(Math.random() * clm + 1);
        food.y = Math.round(Math.random() * rw + 1);
        foodSound.play();

        localStorage.foodIconInd=Math.round(Math.random()*(foodIcon.length-1));
        console.log("Food Coordinates: " + food.x + ',' + food.y);
        console.log("X rand No.: " + parseInt(columns.split(" ").length));
        console.log("Y rand No.: " + parseInt(rows.split(" ").length));
    }
}

// Snake Looping Frame
window.requestAnimationFrame(snakeLoopFrame);

window.addEventListener("keydown", function (e) {
    // get key code on keypress
    console.log(e.code);
    moveSound.play();

    let snakeMouth = document.querySelector(".head");
    console.log(snakeMouth);
    //check key code to Increment or Decrement the snake Direction
    switch (e.code) {
        case "ArrowUp":
            localStorage.snakeMouthDirection = 'ArrowUp';
            snake_direction.y = -1;
            snake_direction.x = 0;
            break;
        case "ArrowDown":
            localStorage.snakeMouthDirection = 'ArrowDown';
            snake_direction.y = 1;
            snake_direction.x = 0;
            break;
        case "ArrowLeft":
            localStorage.snakeMouthDirection = 'ArrowLeft';
            snake_direction.y = 0;
            snake_direction.x = -1;
            break;
        case "ArrowRight":
            localStorage.snakeMouthDirection = 'ArrowRight';
            snake_direction.y = 0;
            snake_direction.x = 1;
            break;
        default:
            break;
    }

})