var game = new Phaser.Game(640,  480, Phaser.CANVAS, 'phaser', {
    preload: preload,
    create: create,
    update: update,
    render: render
});



var avocadosMade = 0;
var score = 0;
var scoreText;
var gameOverText;
var submitText;
var button;
var startButton;
var startText;
var guacCounter;
var guacamoleBowl;

function preload() {

    game.load.image('avocadoLarge', 'assets/guacAMole/avocado120.png');
    game.load.image('guacSmall', 'assets/guacAMole/guacamole_small.png');
    game.load.image('desert', 'assets/guacAMole/desert.jpg');
    game.load.image('button', 'assets/guacAMole/submit.png');
    game.load.spritesheet('greenSmash', 'assets/guacAMole/greenSmash4.png', 100, 100, 11);

}


function create() {
    console.log("Creating the game!")

    //game.scale.setGameSize(640 , 480);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.scale.pageAlignHorizontally = true;
    game.stage.scale.pageAlignVeritcally = true;
    //game.stage.scale.refresh();
    pic = game.add.sprite(game.world.centerX, game.world.centerY, 'desert');
    pic.anchor.set(0.5);
    pic.scale.setTo(0.8,0.8);
    scoreText = game.add.text(game.world.centerX + 140, game.world.centerY+176 ,
        "Score: " + score, {
            font: "40px Arial",
            fill: "#ffff00",
            align: "center"
        });

    welcomeText = game.add.text(0, 0, "Guac-A-Mole!", {
        font: "40px Arial",
        fill: "#ffff00",
        align: "center",
        // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "center",
        boundsAlignV: "top",
    });

    //welcomeText.setTextBounds(16, 0, 768, 568);

    startText = game.add.text(game.world.centerX, game.world.centerY - 50, "Click to smash some Avocados!");
    startText.anchor.setTo(0.5);
    startButton = game.add.button(game.world.centerX, game.world.centerY, 'button', startGame, this);
    startButton.anchor.setTo(0.5);

    guacamoleBowl = game.add.group();
    guacamoleBowl.enableBody = true;
    guacamoleBowl.physicsBodyType = Phaser.Physics.ARCADE;
    guacamoleBowl.createMultiple(30, 'guacSmall');
    guacamoleBowl.setAll('anchor.x', 0.5);
    guacamoleBowl.setAll('anchor.y', 1);
    guacamoleBowl.setAll('outOfBoundsKill', true);
    guacamoleBowl.setAll('checkWorldBounds', true);
}

function startGame() {
  console.log("Starting the Game")
    startButton.destroy();
    startText.setText("");
    createAvocado();
}

function avocado() {
    var mainThis = this;
    mainThis.MIN_AVOCADO_GROWTH = 1000;
    mainThis.MAX_AVOCADO_GROWTH = 3000;
    console.log("Game width:", game.width)
    mainThis.avocadoImage = game.add.sprite(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(120, game.height-120), 'avocadoLarge');
    mainThis.alive = true;
    mainThis.avocadoImage.scale.setTo(0.5, 0.5);
    mainThis.avocadoImage.anchor.set(0.5);



    //  Listen for input events on mainThis sprite
    mainThis.avocadoImage.inputEnabled = true;

    mainThis.avocadoImage.input.pixelPerfectClick = true;

    //  Enable the hand cursor
    mainThis.avocadoImage.input.useHandCursor = true;

    //r is the sprite body
    mainThis.avocadoImage.events.onInputDown.add(function(r) {
        if (r.input.pointerOver()) {
            score++;

            mainThis.alive = false;
            var splooge = game.add.sprite(r.x - 60, r.y - 60, 'greenSmash');
            var sploogeBOOM = splooge.animations.add('sploogeBOOM');


            splooge.animations.play('sploogeBOOM', 24, false, true);
            r.kill();
            if (avocadosMade < 50) {

                game.time.events.add(1000, createAvocado);
            } else {
                gameOver();
            }

        }
    });

    mainThis.killMe = function() {
        if (avocadosMade < 50) {

            if (mainThis.alive === true) {
                mainThis.avocadoImage.kill();
                console.log("Making a cado!")
                game.time.events.add(1000, createAvocado);
            }
        } else if (mainThis.alive === true) {
            mainThis.avocadoImage.kill();
            gameOver();
        }
    }
    if (avocadosMade > 9) {
        mainThis.MIN_AVOCADO_GROWTH = 800;
        mainThis.MAX_AVOCADO_GROWTH = 1200;
    }

    if (avocadosMade > 19) {
        mainThis.MIN_AVOCADO_GROWTH = 700;
        mainThis.MAX_AVOCADO_GROWTH = 1100;
    }

    if (avocadosMade > 29) {
        mainThis.MIN_AVOCADO_GROWTH = 600;
        mainThis.MAX_AVOCADO_GROWTH = 1000;
    }

    if (avocadosMade > 39) {
        mainThis.MIN_AVOCADO_GROWTH = 500;
        mainThis.MAX_AVOCADO_GROWTH = 900;
    }

    if (avocadosMade > 44) {
        mainThis.MIN_AVOCADO_GROWTH = 400;
        mainThis.MAX_AVOCADO_GROWTH = 800;
    }

    game.time.events.add(game.rnd.integerInRange(this.MIN_AVOCADO_GROWTH, this.MAX_AVOCADO_GROWTH), mainThis.killMe);

}

function createAvocado() {
    avocadosMade++;
    console.log("Avocados Made: ", avocadosMade)
    var avocadoToSmash = new avocado();
}


function update() {
  console.log("updating the game")
}

function render() {
    scoreText.setText("Score: " + score);


    //this screws up the accuracy...for some weird reason?
    // game.canvas.style.cursor = "url('http://cur.cursors-4u.net/games/images4/gam341.gif'), default"
    //resizeGame()

}

function gameOver() {
    gameOverText = game.add.text(game.world.centerX, game.world.centerY - 100,
        "Game Over\n" + "Your Score :" + score, {
            font: "40px Arial",
            fill: "#8d0505",
            align: "center",
            boundsAlignH: "center",
            boundsAlignV: "top",
        });
    gameOverText.anchor.setTo(0.5);

    button = game.add.button(game.world.centerX, game.world.centerY, 'button', submitScore, this);
    button.anchor.setTo(0.5);

    submitText = game.add.text(game.world.centerX, game.world.centerY + 50, "Click to submit your score!");
    submitText.anchor.setTo(0.5);
}

function reset() {

}

function submitScore() {
    console.log("clearing gameovertext")
    gameOverText.setText("");
    submittedText = game.add.text(game.world.centerX, game.world.centerY - 50, "Your score has been submitted!");
    submittedText.anchor.setTo(0.5);
    submitText.setText('')
    button.destroy();
    // $.ajax({
    //   url:
    //   method:'POST',
    //   data:
    // })
}

var resizeGame = function() {

    var height = window.innerHeight;
    var width = window.innerWidth;

    game.width = width;
    game.height = height;

}
