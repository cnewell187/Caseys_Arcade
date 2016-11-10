// the placement of the snake in the grid
var bodyShape = [{
        x: 0,
        y: 1
    }, {
        x: 1,
        y: 1
    }, {
        x: 2,
        y: 1
    }, {
        x: 3,
        y: 1
    },

]
var gameId;
var snake_seg = 15; //sets snake box size for each segment
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
console.log(ctx)
var direction = 'right'; //sets initial direction to right
var max_food_pos = 435; //sets maximum position of food
var min_food_pos = 15; //sets minimum position of food
var img1 = document.getElementById("hamster"); //sets the food element to picture of a hamster
var score = 0;
//creates a random number between 15 and 435 that is a multiple of 15
function randomize15() {
    return Math.round(Math.floor(Math.random() * (max_food_pos - min_food_pos + 1) + min_food_pos) / snake_seg) * snake_seg;
};

//the array location of food
var noms = {
    x: randomize15(),
    y: randomize15()
}

//checks to see if the snake has eaten the food, then adds to snake if yes rand randomizes the next food position
function snake_eat(foodObject) {
    if (foodObject.x == bodyShape[bodyShape.length - 1].x * snake_seg &&
        foodObject.y == bodyShape[bodyShape.length - 1].y * snake_seg) {
        noms.x = randomize15();
        noms.y = randomize15();
        score += 1;
        switch (direction) {
            case "right":
                tail = Object.assign({}, bodyShape[bodyShape.length - 1]);
                tail.x = tail.x + 1;
                tail.y = tail.y;
                bodyShape.push(tail); //adds to the head of the snake
                break;
            case "left":
                tail = Object.assign({}, bodyShape[bodyShape.length - 1]);
                tail.x = tail.x - 1;
                tail.y = tail.y;
                bodyShape.push(tail);
                break;
            case "up":
                tail = Object.assign({}, bodyShape[bodyShape.length - 1]);
                tail.x = tail.x;
                tail.y = tail.y - 1;
                bodyShape.push(tail);
                break;
            case "down":
                tail = Object.assign({}, bodyShape[bodyShape.length - 1]);
                tail.x = tail.x;
                tail.y = tail.y + 1;
                bodyShape.push(tail);
                break;
            default:
                break;
        };
    };
};

//creates the background and places food
function landScape(foodObject) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 450, 450);
    ctx.drawImage(img1, foodObject.x, foodObject.y, snake_seg, snake_seg)
    ctx.fillStyle = "white";
    ctx.font = "20px Georgia";
    ctx.fillText("Score: "+ score, 370, 430);

};


function reset() {
    clearInterval(gameId);
    bodyShape = [{
            x: 0,
            y: 1
        }, {
            x: 1,
            y: 1
        }, {
            x: 2,
            y: 1
        }, {
            x: 3,
            y: 1
        },

    ];
    direction = 'right';
    score = 0;

}


//moves the snake based on direction
function snakeMove(snakeArray) {
    switch (direction) {
        case "right":
            tail = bodyShape.shift();
            tail.x = bodyShape[bodyShape.length - 1].x + 1;
            tail.y = bodyShape[bodyShape.length - 1].y;
            bodyShape.push(tail);
            break;
        case "left":
            tail = bodyShape.shift();
            tail.x = bodyShape[bodyShape.length - 1].x - 1;
            tail.y = bodyShape[bodyShape.length - 1].y;
            bodyShape.push(tail);
            break;
        case "down":
            tail = bodyShape.shift();
            tail.x = bodyShape[bodyShape.length - 1].x;
            tail.y = bodyShape[bodyShape.length - 1].y + 1;
            bodyShape.push(tail);
            break;
        case "up":
            tail = bodyShape.shift();
            tail.x = bodyShape[bodyShape.length - 1].x;
            tail.y = bodyShape[bodyShape.length - 1].y - 1;
            bodyShape.push(tail);
            break;
    }

    for (var i = 0; i < snakeArray.length; i++) {
        ctx.fillStyle = "blue";
        ctx.fillRect(snakeArray[i].x * snake_seg, snakeArray[i].y * snake_seg, snake_seg + 1, snake_seg + 1);
    };

    for (var i = 0; i < snakeArray.length; i++) {
        ctx.fillStyle = "#7FFF00";
        ctx.fillRect(snakeArray[i].x * snake_seg, snakeArray[i].y * snake_seg, snake_seg - 1, snake_seg - 1);
    };

}

//checks collision with snake body or the wall
function bodyWallCheck(snakeArray) {
    for (var i = 0; i < snakeArray.length - 1; i++) {
        if ((snakeArray[snakeArray.length - 1].x === bodyShape[i].x && snakeArray[snakeArray.length - 1].y === bodyShape[i].y) ||
            snakeArray[snakeArray.length - 1].x > 30 || snakeArray[snakeArray.length - 1].x < 0 ||
            snakeArray[snakeArray.length - 1].y > 30 || snakeArray[snakeArray.length - 1].y < 0) {
            alert("NOOOO!!!");
            reset();
            return false;
            // play = setInterval(function() {
            //     snakePlay(bodyShape, noms);
            // }, 100);
            // play();
        }
    }
}

function snakePlay(snakeArray, foodObject) {
    landScape(foodObject); //creates the background and places food
    snake_eat(foodObject); //checks to see if the snake has eaten the food, then adds to snake if yes
    snakeMove(snakeArray); //moves the snake based on direction
    bodyWallCheck(snakeArray); //checks for collision with self or wall

};





//sets the snake direction based on arrow keypress
document.onkeydown = function(event) {
    if (event.keyCode == 39 && direction != "left") {
        // do a function
        direction = 'right';
        console.log("you pressed right")
    }

    if (event.keyCode == 40 && direction != "up") {
        direction = "down";
        console.log("you pressed down")
    }

    if (event.keyCode == 37 && direction != "right") {
        direction = "left";
        console.log("you pressed left")
    }

    if (event.keyCode == 38 && direction != "down") {
        direction = "up";
        console.log("you pressed down")
    }
}

//runs snakePlay
function play() {
    reset();
    gameId = setInterval(snakePlay, 100, bodyShape, noms);
}

function landScape2(){
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 450, 450);
  //ctx.drawImage(img1, foodObject.x, foodObject.y, snake_seg, snake_seg)
  ctx.fillStyle = "#7FFF00";
  ctx.font = "20px Georgia";
  ctx.fillText("SNAKE!!!", 190, 200);
}

landScape2()
