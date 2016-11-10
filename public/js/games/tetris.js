var score = 0;
var long;
var tee;
var zig;
var zag;
var rightLeg;
var leftLeg;
var square;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var blockSize = 20;
var xMid = 11;
var gameHeight = 460;
var gameWidth = 460;
var defaultSpeed = 65;
var currentSpeed = 80;
var shallPass = true;
var level = 1;
var linesCleared = 0;


var gameId;

var rightLegPos = [{
    x: xMid,
    y: 2,
    color: '#059B9F',
}, {
    x: xMid,
    y: 1,
    color: '#059B9F',
}, {
    x: xMid,
    y: 0,
    color: '#059B9F',
}, {
    x: xMid - 1,
    y: 2,
    color: '#059B9F',
}, ];

var leftLegPos = [{
    x: xMid,
    y: 2,
    color: '#ff1493',
}, {
    x: xMid,
    y: 1,
    color: '#ff1493',
}, {
    x: xMid,
    y: 0,
    color: '#ff1493',
}, {
    x: xMid + 1,
    y: 2,
    color: '#ff1493',
}, ];

var squarePos = [{
    x: xMid,
    y: 1,
    color: 'orange',
}, {
    x: xMid + 1,
    y: 1,
    color: 'orange',
}, {
    x: xMid + 1,
    y: 0,
    color: 'orange',
}, {
    x: xMid,
    y: 0,
    color: 'orange',
}, ];

var zigPos = [{
    x: xMid,
    y: 1,
    color: 'green',
}, {
    x: xMid + 1,
    y: 1,
    color: 'green',
}, {
    x: xMid + 1,
    y: 0,
    color: 'green',
}, {
    x: xMid,
    y: 2,
    color: 'green',
}, ];

var zagPos = [{
    x: xMid,
    y: 1,
    color: 'red',
}, {
    x: xMid - 1,
    y: 1,
    color: 'red',
}, {
    x: xMid - 1,
    y: 0,
    color: 'red',
}, {
    x: xMid,
    y: 2,
    color: 'red',
}, ];

var longPos = [{
    x: xMid,
    y: 1,
    color: 'blue',
}, {
    x: xMid - 1,
    y: 1,
    color: 'blue',
}, {
    x: xMid + 1,
    y: 1,
    color: 'blue',
}, {
    x: xMid + 2,
    y: 1,
    color: 'blue',
}, ];

var teePos = [{
    x: xMid,
    y: 1,
    color: 'purple',
}, {
    x: xMid - 1,
    y: 1,
    color: 'purple',
}, {
    x: xMid + 1,
    y: 1,
    color: 'purple',
}, {
    x: xMid,
    y: 0,
    color: 'purple',
}, ];

var fallenBlocks = [{

}, ];

tee = {
    name: 'tee',
    color: 'purple',
    state: "TransA",
    position: JSON.parse(JSON.stringify(teePos)),
};

long = {
    name: 'long',
    color: 'blue',
    state: "TransA",
    position: JSON.parse(JSON.stringify(longPos)),
};
zig = {
    name: "zig",
    color: 'green',
    state: "TransA",
    position: JSON.parse(JSON.stringify(zigPos)),
};
zag = {
    name: "zag",
    color: 'red',
    state: "TransA",
    position: JSON.parse(JSON.stringify(zagPos)),
};
rightLeg = {
    name: "rightLeg",
    color: '#059B9F',
    state: "TransA",
    position: JSON.parse(JSON.stringify(rightLegPos)),
};
leftLeg = {
    name: "leftLeg",
    color: '#ff1493',
    state: "TransA",
    position: JSON.parse(JSON.stringify(leftLegPos)),
};
square = {
    name: "square",
    color: 'orange',
    state: "TransA",
    position: JSON.parse(JSON.stringify(squarePos)),
};

var shapeArray = [JSON.parse(JSON.stringify(tee)), JSON.parse(JSON.stringify(long)),
    JSON.parse(JSON.stringify(zig)), JSON.parse(JSON.stringify(zag)), JSON.parse(JSON.stringify(rightLeg)),
    JSON.parse(JSON.stringify(leftLeg)), JSON.parse(JSON.stringify(square))
];

function random7int() {
    return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
}

function landScape() {
    // background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    //side walls
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, 120, 460)
    // ctx.fillRect(320, 0, 140, 460)
    var grd = ctx.createLinearGradient(0, 460, 0, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "gray");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 120, 460)
    ctx.fillRect(320, 0, 140, 460)

    //preview pane
    ctx.fillStyle = "black";
    ctx.fillRect(17 * blockSize - 1, 1 * blockSize - 1, blockSize * 6, blockSize * 5);
    ctx.fillStyle = "white";
    ctx.fillRect(17 * blockSize, 1 * blockSize, blockSize * 6 - 2, blockSize * 5 - 2);
    ctx.fillStyle = "black";
    ctx.font = "20px Georgia";
    ctx.fillText("Score: " + score, 370, 160);
    ctx.fillText("Level: " + level, 370, 180);

    //fills preview pane
    for (var i = 0; i < nextShape.position.length; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect((nextShape.position[i].x + 8) * blockSize, (nextShape.position[i].y + 2) * blockSize, blockSize, blockSize);
        ctx.fillStyle = nextShape.color;
        ctx.fillRect((nextShape.position[i].x + 8) * blockSize, (nextShape.position[i].y + 2) * blockSize, blockSize - 1, blockSize - 1);
    };


    //fills the fallen blocks
    for (var i = 0; i < fallenBlocks.length; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(fallenBlocks[i].x * blockSize, fallenBlocks[i].y * blockSize, blockSize, blockSize);
        ctx.fillStyle = fallenBlocks[i].color;
        ctx.fillRect(fallenBlocks[i].x * blockSize, fallenBlocks[i].y * blockSize, blockSize - 1, blockSize - 1);
    };
}

function fall() {
    //console.log("running fall!!")
    if (blockLocking()) {
        console.log("all stopped Up!")

        return;
    } else if (activeSquare.speed === activeSquare.go) {
        //console.log("Going!!")

        for (var i = 0; i < activeSquare.position.length; i++) {
            if (activeSquare.position[i].y >= 22) {
                //console.log("can't move down")

                return;
            }
            for (var j = 0; j < fallenBlocks.length; j++) {
                if (activeSquare.position[i].x === fallenBlocks[j].x &&
                    activeSquare.position[i].y === fallenBlocks[j].y - 1) {
                    //console.log("can't move down")

                    return;
                }
            }
        }
        for (var i = 0; i < activeSquare.position.length; i++) {
            activeSquare.position[i].y++
                activeSquare.speed = currentSpeed;
            landScape();
            //console.log("rendering from FAll")
            activeSquare.render();
        }
    } else {
        this.speed++;
        landScape();
        //console.log("rendering from FAll")
        activeSquare.render();

    }
}


function control() {


    document.onkeydown = function(event) {
        if (event.keyCode == 39 && activeSquare.active === true) {
            // moves right
            //wall check
            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x >= 15) {
                    return;
                }
                for (var j = 0; j < fallenBlocks.length; j++) {
                    if (activeSquare.position[i].x === fallenBlocks[j].x - 1 &&
                        activeSquare.position[i].y === fallenBlocks[j].y) {
                        return;
                    }
                }
            };
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].x++
            }
            //  setTimeout(update, 1)
            //  return;

        }
        if (event.keyCode == 37 && activeSquare.active === true) {
            // moves left

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x <= 6) {
                    return;
                }
                for (var j = 0; j < fallenBlocks.length; j++) {
                    if (activeSquare.position[i].x === fallenBlocks[j].x + 1 &&
                        activeSquare.position[i].y === fallenBlocks[j].y) {
                        return;
                    }
                }
            };
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].x--
            }
            // setTimeout(update, 10)
            // return;

        }
        if (event.keyCode == 40 && activeSquare.active === true) {
            // moves down


            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].y >= 22) {
                    //console.log("can't move down")
                    if (blockLocking() && shallPass === true) {
                        //console.log("Setting Collision Timer via Bottom!!")

                        setTimeout(activeSquare.collision, 200);
                        shallPass = false;
                        landScape();
                        console.log("rendering from down key")
                        activeSquare.render();

                        return;
                    } else {
                        if (shallPass === true) {
                            console.log("running update inside control based on pos: " + Date())

                        }
                    }

                    return;
                }
                for (var j = 0; j < fallenBlocks.length; j++) {
                    if (activeSquare.position[i].x === fallenBlocks[j].x &&
                        activeSquare.position[i].y === fallenBlocks[j].y - 1) {
                        // console.log("TestyPOO")
                        // console.log("Square Xpos: " + activeSquare.position[i].x)
                        // console.log("Square Ypos: " + activeSquare.position[i].y)
                        // console.log("Fallen Xpos: " + fallenBlocks[j].x)
                        // console.log("Fallen Ypos: " + (fallenBlocks[j].y - 1))
                        if (blockLocking(i, j) && shallPass === true) {
                            //console.log("Setting Collision Timer via fallen!!")
                            shallPass = false;
                            setTimeout(activeSquare.collision, 200);
                            landScape();
                            activeSquare.render();

                            return;
                        } else {
                            if (shallPass === true) {
                              //  console.log("running update inside control based on fallen: " + Date())

                            }
                        }

                        return;
                    }
                }
            }

            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].y++
            }


        }

        if (event.keyCode == 38 && activeSquare.active === true) {
            rotate();
        }

        if(activeSquare.shallPass === true){
          //console.log("rendering from bottm of control function")
          landScape();
        activeSquare.render();
      }


    }
    if (blockLocking() && shallPass === true) {
        //console.log("STOP HaMMER TIME")
        shallPass = false;
        setTimeout(activeSquare.collision, 200);
        landScape();
        activeSquare.render();
        return;
    } else {
        if (shallPass === true) {
            //console.log("running update from bottom of Control: ")
            setTimeout(update, 10)
        }
    }
    return;

}

function rotate() {
    switch (activeSquare.name) {
        case "tee":
            rotateTee();
            break;
        case "long":
            rotateLong();
            break;
        case "zig":
            rotateZig();
            break;
        case "zag":
            rotateZag();
            break;
        case "square":
            break;
        case "leftLeg":
            rotateLeftLeg();
            break;
        case "rightLeg":
            rotateRightLeg();
            break;
    }


};

function rotateTee() {
    switch (activeSquare.state) {

        case "TransA":

            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransB"


            break;

        case "TransB":
            //wall check
            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }

            // //fallenblock check
            // for (var i = 0; i < activeSquare.position.length; i++) {
            //   for(var j=0; i < fallenblocks.length; j++)
            //     if (activeSquare.position[i].x === ) {
            //         for (var i = 0; i < activeSquare.position.length; i++) {
            //             activeSquare.position[i].x = activeSquare.position[i].x + 1;
            //         }
            //         break;
            //     }
            // }

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x - 1
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransC"

            break;
        case "TransC":
            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransD"

            break;
        case "TransD":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }
            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x + 1
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"

            break;
    }

};

function rotateLeftLeg() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }

            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1

            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransB"

            console.log("Trans to B")
            break;

        case "TransB":
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1


            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 2

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransC"

            console.log("Trans to C")
            break;
        case "TransC":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x - 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransD"

            console.log("Trans to D")
            break;
        case "TransD":
            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y - 2

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"

            console.log("Trans to A")
            break;
    }

};

function rotateRightLeg() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }

            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1

            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransB"

            console.log("Trans to B")
            break;

        case "TransB":
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 2

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransC"

            console.log("Trans to C")
            break;
        case "TransC":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x - 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransD"


            break;
        case "TransD":
            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y - 2

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"


            break;
    }

};


function rotateLong() {
    switch (activeSquare.state) {

        case "TransA":

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 2

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransB"

            break;

        case "TransB":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 2;
                    }
                    break;
                }
            }
            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"

            break;

    }

};

function rotateZig() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x - 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransB"

            break;

        case "TransB":
            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransA"

            break;

    }

};

function rotateZag() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x + 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransB"

            break;

        case "TransB":
            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x - 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransA"

            break;

    }

};

//checks to see if block is about to be locked in the fallenblocks


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}


// creates the active block object!
function blockCreate(shapeType) {
    // var shapeCopy = Object.assign({}, shapeType)
    this.position = shapeType.position.slice(0);
    this.color = shapeType.color; //will change later
    this.speed = currentSpeed;
    this.go = 100;
    this.name = shapeType.name;
    this.state = shapeType.state;
    this.active = true;
    this.render = function() {

        for (var i = 0; i < this.position.length; i++) {
            ctx.fillStyle = "black";
            ctx.fillRect(this.position[i].x * blockSize, this.position[i].y * blockSize, blockSize, blockSize);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position[i].x * blockSize, this.position[i].y * blockSize, blockSize - 1, blockSize - 1);
        };
    }

    this.fall = fall;
    this.control = control;

    // checks if blocks are about to become fallenBlocks
    this.collision = function() {
        console.log("COLLISION CHECK!")
        for (var i = 0; i < this.position.length; i++) {
            for (var j = 0; j < fallenBlocks.length; j++) {
                if ((this.position[i].y === fallenBlocks[j].y - 1 &&
                        this.position[i].x === fallenBlocks[j].x) ||
                    (this.position[i].y === 22)) {
                    console.log("The block Le FAILS!")
                    this.active = false;

                    //appends blocks that are now locked to the falleBlock array
                    for (var k = 0; k < this.position.length; k++) {
                        fallenBlocks.push(JSON.parse(JSON.stringify(this.position[k])));
                    }

                    // resets the block positions
                    blockClearCheck();

                    return this;
                }
            }
        }
        shallPass = true;
        console.log("running update from end of collision")
        setTimeout(update, 10)

    }

    return this;
}

//the following lines set the inital shape and the first preview shape
var rando1 = random7int();
var activeSquare = blockCreate(shapeArray[rando1 - 1]);
var rando2 = random7int();
shapeArray = [JSON.parse(JSON.stringify(tee)), JSON.parse(JSON.stringify(long)),
    JSON.parse(JSON.stringify(zig)), JSON.parse(JSON.stringify(zag)), JSON.parse(JSON.stringify(rightLeg)),
    JSON.parse(JSON.stringify(leftLeg)), JSON.parse(JSON.stringify(square))
];
var nextShape = shapeArray[rando2 - 1]

function blockLocking() {
    //console.log("running blocklocki")
    // console.log("Square Xpos: "+activeSquare.position[i||0].x)
    // console.log("Square Ypos: "+activeSquare.position[i||0].y)
    // console.log("Fallen Xpos: "+fallenBlocks[j||0].x )
    // console.log("Fallen Ypos: "+(fallenBlocks[j||0].y - 1))

    // if (activeSquare.position[i].x === fallenBlocks[j].x &&
    //     activeSquare.position[i].y === fallenBlocks[j].y - 1)
    //testy
    for (var k = 0; k < activeSquare.position.length; k++) {
        for (var p = 0; p < fallenBlocks.length; p++) {
            if ((activeSquare.position[k].y === fallenBlocks[p].y - 1 &&
                    activeSquare.position[k].x === fallenBlocks[p].x) ||
                (activeSquare.position[k].y === 22)) {
                //console.log("true")
                return true;
            }
        }
    }
    // console.log("false")
    return false;
}

//the main game loop
function update() {
    //console.log("running update")

    landScape();
    if (activeSquare.active === true) {
        activeSquare.render();
        activeSquare.fall();
        activeSquare.control();
    } else {
        // console.log("update else")
        // shapeArray = [JSON.parse(JSON.stringify(tee)), JSON.parse(JSON.stringify(long)),
        //     JSON.parse(JSON.stringify(zig)), JSON.parse(JSON.stringify(zag)), JSON.parse(JSON.stringify(rightLeg)),
        //     JSON.parse(JSON.stringify(leftLeg)), JSON.parse(JSON.stringify(square))
        // ];
        // activeSquare = blockCreate(nextShape);
        // var rando = random7int();
        // nextShape = shapeArray[rando - 1]


    }




}

//returns a random color :)
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//paints the line to clear random colors
function colorClear(index) {

    console.log("WHAT IT DO!!")

    for (var j = 0; j < fallenBlocks.length; j++) {
        if (fallenBlocks[j].y === index) {
            ctx.fillStyle = "black";
            ctx.fillRect(fallenBlocks[j].x * blockSize, fallenBlocks[j].y * blockSize, blockSize, blockSize);
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(fallenBlocks[j].x * blockSize, fallenBlocks[j].y * blockSize, blockSize - 1, blockSize - 1);

        }
    }

}


//gets rid of the filled line from the fallenblocks
function clearBlocks(lineArray) {

    long.position = JSON.parse(JSON.stringify(longPos))
    tee.position = JSON.parse(JSON.stringify(teePos))
    zig.position = JSON.parse(JSON.stringify(zigPos))
    zag.position = JSON.parse(JSON.stringify(zagPos))
    square.position = JSON.parse(JSON.stringify(squarePos))
    leftLeg.position = JSON.parse(JSON.stringify(leftLegPos))
    rightLeg.position = JSON.parse(JSON.stringify(rightLegPos))

    shapeArray = [JSON.parse(JSON.stringify(tee)), JSON.parse(JSON.stringify(long)),
        JSON.parse(JSON.stringify(zig)), JSON.parse(JSON.stringify(zag)), JSON.parse(JSON.stringify(rightLeg)),
        JSON.parse(JSON.stringify(leftLeg)), JSON.parse(JSON.stringify(square))
    ];
    activeSquare = blockCreate(nextShape);
    var rando = random7int();
    nextShape = shapeArray[rando - 1]
    shallPass = true;

    if (lineArray != undefined) {
        for (var i = lineArray.length - 1; i >= 0; i--) {
            console.log(lineArray[i])
            fallenBlocks = fallenBlocks.filter(function(item) {
                return item.y != lineArray[i];
            })
            for (var j = 0; j < fallenBlocks.length; j++) {
                if (fallenBlocks[j].y < lineArray[i]) {
                    fallenBlocks[j].y = fallenBlocks[j].y + 1;
                }
            }
        }
    }
    if (lineArray != undefined) {
        if (lineArray.length > 0) {
            console.log("running update after clearBlocks");
            setTimeout(update, 50);
            return;
        }
    } else {
        console.log("running update from end of clearBlocks: " + Date());
        setTimeout(update, 10);
        console.log("game loop reset");
        return;
    }

}

//checks to see if the fallenblocks has made a complete line that needs to be cleared
function blockClearCheck() {
    console.log("running block Clear check")
    var filledLineArray = [];
    for (var i = 22; i >= 0; i--) {
        var count = 0;
        for (var j = 0; j < fallenBlocks.length; j++) {
            if (fallenBlocks[j].y === i) {
                count++;
            }
        }
        if (count > 9) {
            filledLineArray.push(i)
        }
    }

    for (var k = 0; k < filledLineArray.length; k++) {
        //random color flashing!!!! YAYY!!
        setTimeout(colorClear, 100, filledLineArray[k])
        setTimeout(colorClear, 200, filledLineArray[k])
        setTimeout(colorClear, 300, filledLineArray[k])
        setTimeout(colorClear, 400, filledLineArray[k])
        setTimeout(colorClear, 500, filledLineArray[k])
        setTimeout(colorClear, 600, filledLineArray[k])
        setTimeout(colorClear, 700, filledLineArray[k])
        setTimeout(colorClear, 800, filledLineArray[k])
        setTimeout(colorClear, 900, filledLineArray[k])



        //YAY YOU SCORED!!!
        score = score + 10 * filledLineArray.length;
        linesCleared++;
        if (linesCleared >= 10) {
            currentSpeed = 85;
            level = 2;
        }
        if (linesCleared >= 20) {
            currentSpeed = 90;
            level = 3;
        }

        if (linesCleared >= 30) {
            currentSpeed = 95;
            level = 4;
        }

    }



    //redo the game loop!
    if (filledLineArray.length > 0) {
        console.log("running update after filled line");
        setTimeout(clearBlocks, 1000, filledLineArray)
            //setTimeout(update, 1000);
        return;
    } else {
        setTimeout(clearBlocks, 10);

        return;
    }

};

function play() {

    update();
}

landScape();
