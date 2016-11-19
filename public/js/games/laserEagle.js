var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'phaser', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var player;
var skyField;
var fly;
var laserTimer = 0;
var enemy1;
var playerHealth;
var score = 0;
var scoreText;
var gameOverText;
var button;
var submitText;
var swallowLaunchTimer;
var swallowSpacing = 1000;
var playerWeapon = "default";

function preload() {
    game.load.image("sky", "assets/laserEagle/sky.png")
    game.load.image("birdLaser", "assets/laserEagle/birdLaser.png")
    game.load.image("birdLaser2", "assets/laserEagle/birdLaser2.png")
    game.load.image("enemyLaser", "assets/laserEagle/enemyLaser.png")
    game.load.image("swallow", "assets/laserEagle/swallow2.png")
    game.load.image("eagleEnemy", "assets/laserEagle/eagle1.png")
    game.load.image('button', 'assets/laserEagle/submit.png');
    game.load.image('start', 'assets/laserEagle/start.png');
    game.load.image('playAgain', 'assets/guacAMole/playAgain.png');

    game.load.spritesheet("theBird", "assets/laserEagle/thePlayerBird.png", 128, 128, 9)
    game.load.spritesheet("chicken", "assets/laserEagle/bigChicken.png", 128, 128, 9)
    game.load.spritesheet("explosion", "assets/laserEagle/explosion.png", 128, 128, 25)
    game.load.spritesheet("blueExplosion", "assets/laserEagle/blueExplosion.png", 47, 47)
}

function create() {
    skyField = game.add.tileSprite(0, 0, 640, 480, 'sky')
    player = game.add.sprite(320, 420, 'theBird');
    player.anchor.setTo(0.5, 0.5);
    player.health = 100;
    fly = player.animations.add('fly');
    player.animations.play('fly', 20, true);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.maxVelocity.setTo(400, 400);
    player.body.drag.setTo(400, 400);
    player.scale.setTo(.5, .5)

    playerHealth = game.add.text(game.world.width - 140, 10, 'Health: ' + player.health, {
        font: '20px Arial',
        fill: '#fff'
    });
    playerHealth.render = function() {
        playerHealth.text = 'Health: ' + Math.max(player.health, 0);
    }


    cursors = game.input.keyboard.createCursorKeys();
    laserButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);

    // game.onBlur.add(function() {
    //     console.log("blurred!")
    //   game.input.enabled = false;
    // }, this);
    // game.onFocus.add(function() {
    //     console.log("focused!")
    //     // game.input.enabled = true;
    // }, this);


    //this adds bulletgroup to the eagle

    lasers = game.add.group();
    lasers.enableBody = true;
    lasers.physicsBodyType = Phaser.Physics.ARCADE;
    lasers.createMultiple(30, 'birdLaser');
    lasers.setAll('anchor.x', 0.5);
    lasers.setAll('anchor.y', 1);
    lasers.setAll('outOfBoundsKill', true);
    lasers.setAll('checkWorldBounds', true);

    lasers2 = game.add.group();
    lasers2.enableBody = true;
    lasers2.physicsBodyType = Phaser.Physics.ARCADE;
    lasers2.createMultiple(30, 'birdLaser2');
    lasers2.setAll('anchor.x', 0.5);
    lasers2.setAll('anchor.y', 1);
    lasers2.setAll('outOfBoundsKill', true);
    lasers2.setAll('checkWorldBounds', true);



    //
    enemyLasers = game.add.group();
    enemyLasers.enableBody = true;
    enemyLasers.physicsBodyType = Phaser.Physics.ARCADE;
    enemyLasers.createMultiple(30, 'enemyLaser');

    enemyLasers.setAll('anchor.x', 0.5);
    enemyLasers.setAll('anchor.y', 0.5);
    enemyLasers.setAll('outOfBoundsKill', true);
    enemyLasers.setAll('checkWorldBounds', true);
    enemyLasers.forEach(function(enemy) {
        enemy.body.setSize(20, 20);
    });

    //makes first enemy

    swallows = game.add.group();
    swallows.enableBody = true;
    swallows.physicsBodyType = Phaser.Physics.ARCADE;
    swallows.createMultiple(20, 'swallow');
    swallows.setAll('anchor.x', 0.5);
    swallows.setAll('anchor.y', 0.5);
    swallows.setAll('outOfBoundsKill', true);
    swallows.setAll('checkWorldBounds', true);
    swallows.forEach(function(enemy) {
        console.log("setting enemy damageAmount")
        enemy.damageAmount = 25;
        console.log(enemy.damageAmount)
    })



    eagles = game.add.group();
    eagles.enableBody = true;
    eagles.physicsBodyType = Phaser.Physics.ARCADE;
    eagles.createMultiple(10, 'eagleEnemy');
    eagles.setAll('anchor.x', 0.5);
    eagles.setAll('anchor.y', 0.5);
    eagles.forEach(function(enemy) {
        console.log("setting enemy damageAmount")
        enemy.damageAmount = 35;
        console.log(enemy.damageAmount)
    })



    startButton = game.add.button(game.world.centerX, game.world.centerY, 'start', startGame, this);
    startButton.anchor.setTo(0.5);

    //explosion pool

    explosions = game.add.group();
    explosions.enableBody = true;
    explosions.physicsBodyType = Phaser.Physics.ARCADE;
    explosions.createMultiple(30, 'explosion');
    explosions.setAll('anchor.x', 0.5);
    explosions.setAll('anchor.y', 0.5);
    explosions.forEach(function(explosion) {
        explosion.animations.add('explosion');
    });

    blueExplosions = game.add.group();
    blueExplosions.enableBody = true;
    blueExplosions.physicsBodyType = Phaser.Physics.ARCADE;
    blueExplosions.createMultiple(30, 'explosion');
    blueExplosions.setAll('anchor.x', 0.5);
    blueExplosions.setAll('anchor.y', 0.5);
    blueExplosions.forEach(function(blueExplosion) {
        blueExplosion.animations.add('explosion');
    });

    scoreText = game.add.text(10, 10, '', {
        font: '20px Arial',
        fill: '#fff'
    });
    scoreText.render = function() {
        scoreText.text = 'Score: ' + score;
    };
    scoreText.render();


    gameOverText = game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER!', {
        font: '84px Arial',
        fill: 'red'
    });
    gameOverText.anchor.setTo(0.5, 0.5);
    gameOverText.visible = false;
}

function startGame() {


    scoreData = {
        game: 'laserEagle',
        gameAvatar: "../assets/eagle_icon.png"
    }
    $.ajax({
        url: "/updateLastPlayed",
        method: 'POST',
        data: scoreData
    })
    console.log("Starting the Game")
    startButton.destroy();

    game.time.events.add(1000, launchEagle);
    game.time.events.add(1000, launchSwallow);
}



function launchSwallow() {

    var enemy_speed = 300;

    var enemy = swallows.getFirstExists(false);
    if (enemy) {
        enemy.reset(game.rnd.integerInRange(0, game.width), -20);
        enemy.body.velocity.x = game.rnd.integerInRange(-200, 200);
        enemy.body.velocity.y = enemy_speed;
        enemy.body.drag.x = 100;
    }

    enemy.update = function() {
        //enemy.angle = game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));
    }

    //  fly birdie!
    swallowLaunchTimer = game.time.events.add(game.rnd.integerInRange(swallowSpacing, swallowSpacing + 1000), launchSwallow);
}

function launchEagle() {
    var startingX = game.rnd.integerInRange(100, game.width - 500);
    var verticalSpeed = 180;
    var verticalSpacing = 70;
    var numEnemiesInWave = 5;
    var timeBetweenWaves = 6000;

    //  Launch wave

    if (game.rnd.integerInRange(0, 1)) {
        for (var i = 0; i < numEnemiesInWave; i++) {
            console.log("launching an eagle!!")
            var enemy = eagles.getFirstExists(false);
            if (enemy) {

                enemy.reset(startingX + i * 100, -verticalSpacing * i);
                enemy.body.velocity.y = verticalSpeed;

                var bulletSpeed = 400;
                var firingDelay = 2000;
                enemy.lasers = 1;
                enemy.lastShot = 0;

                //  Update function for each enemy
                enemy.update = function() {

                    enemyLaser = enemyLasers.getFirstExists(false);
                    if (enemyLaser &&
                        this.alive &&
                        this.lasers &&
                        this.y > game.width / 8 &&
                        game.time.now > firingDelay + this.lastShot) {
                        this.lastShot = game.time.now;
                        this.lasers--;
                        enemyLaser.reset(this.x, this.y + this.height / 2);
                        enemyLaser.damageAmount = this.damageAmount;
                        var angle = game.physics.arcade.moveToObject(enemyLaser, player, bulletSpeed);
                    }

                    //  Kill enemies once they go off screen
                    if (this.y > game.height + 200) {
                        this.kill();
                    }
                };
            }
        }
    } else {

        for (var i = 0; i < numEnemiesInWave; i++) {
            console.log("launching an eagle!!")
            var enemy = eagles.getFirstExists(false);
            if (enemy) {
                startingX = game.rnd.integerInRange(game.width - 100, game.width - 50);
                enemy.reset(startingX - i * 100, -verticalSpacing * i);
                enemy.body.velocity.y = verticalSpeed;

                var bulletSpeed = 400;
                var firingDelay = 2000;
                enemy.lasers = 1;
                enemy.lastShot = 0;

                //  Update function for each enemy
                enemy.update = function() {

                    enemyLaser = enemyLasers.getFirstExists(false);
                    if (enemyLaser &&
                        this.alive &&
                        this.lasers &&
                        this.y > game.width / 8 &&
                        game.time.now > firingDelay + this.lastShot) {
                        this.lastShot = game.time.now;
                        this.lasers--;
                        enemyLaser.reset(this.x, this.y + this.height / 2);
                        enemyLaser.damageAmount = this.damageAmount;
                        var angle = game.physics.arcade.moveToObject(enemyLaser, player, bulletSpeed);
                    }

                    //  Kill enemies once they go off screen
                    if (this.y > game.height + 200) {
                        this.kill();
                    }
                };
            }
        }

    }

    //  Send another wave soon
    eagleLaunchTimer = game.time.events.add(timeBetweenWaves, launchEagle);
}

function crash(player, enemy) {
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
    explosion.body.velocity.y = enemy.body.velocity.y;
    explosion.play('explosion', 30, false, true);
    enemy.kill();
    player.damage(enemy.damageAmount);
    playerHealth.render();
}

function hitTarget(enemy, laser) {
    var explosion = explosions.getFirstExists(false);
    explosion.reset(laser.body.x + laser.body.halfWidth, laser.body.y + laser.body.halfHeight);
    explosion.body.velocity.y = enemy.body.velocity.y;
    explosion.play('explosion', 30, false, true);
    swallowSpacing *= .9

    enemy.kill();
    laser.kill();
    console.log("The enemy damageAmount: ", enemy.damageAmount)
    score += enemy.damageAmount * 10;
    scoreText.render()

}

function enemyHit(player, enemyLaser) {
    enemyLaser.kill()
    var blueExplosion = blueExplosions.getFirstExists(false);
    blueExplosion.reset(enemyLaser.body.x + enemyLaser.body.halfWidth, enemyLaser.body.y + enemyLaser.body.halfHeight);
    blueExplosion.body.velocity.y = enemyLaser.body.velocity.y;
    blueExplosion.play('blueExplosion', 30, false, true);

    console.log("The enemy laser damage amount: ", enemyLaser.damageAmount)
    player.damage(enemyLaser.damageAmount);
    playerHealth.render();

}


function update() {
    skyField.tilePosition.y += 1;
    scoreText.render()

    if (player.alive) {
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown) {
            player.body.velocity.x = -300;

            //  player.body.acceleration.x = -10000;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 300;

            //player.body.acceleration.x = 10000;
        }
        if (cursors.down.isDown) {
            player.body.velocity.y = 300;

            //player.body.acceleration.y = 10000;
        } else if (cursors.up.isDown) {
            player.body.velocity.y = -300;

            //player.body.acceleration.y = -10000;
        }

        bankX = player.body.velocity.x / 900;
        bankY = player.body.velocity.y / 900;

        if (player.body.velocity.y < 0) {
            player.scale.y = .5 - Math.abs(bankY) / 2;

        } else if (player.body.velocity.y > 0) {
            player.scale.y = .75
        } else {
            player.scale.y = .5
        }

        if (laserButton.isDown && player.alive) {
            fireLaser();
        }

        player.scale.x = .5 - Math.abs(bankX) / 2;
        player.angle = bankX * 10;
    }

    game.physics.arcade.overlap(player, swallows, crash, null, this);
    game.physics.arcade.overlap(swallows, lasers, hitTarget, null, this);
      game.physics.arcade.overlap(swallows, lasers2, hitTarget, null, this);

    game.physics.arcade.overlap(player, eagles, crash, null, this);
    game.physics.arcade.overlap(eagles, lasers, hitTarget, null, this);
      game.physics.arcade.overlap(eagles, lasers2, hitTarget, null, this);

    game.physics.arcade.overlap(enemyLasers, player, enemyHit, null, this);

    if (!player.alive && gameOverText.visible === false) {

        gameOverMan();

    }

}

function gameOverMan() {
    console.log("runnning gameOVerMan")
    gameOverText.visible = true;

    button = game.add.button(game.world.centerX, game.world.centerY + 100, 'button', submitScore, this);
    button.anchor.setTo(0.5);
    button.purplePeople = true;
    console.log("the button inside game over man: ", button)

    submitText = game.add.text(game.world.centerX, game.world.centerY + 150, "Click to submit your score!");
    submitText.anchor.setTo(0.5);
}




function submitScore() {
    gameOverText.visible = false;
    submitText.setText('Your score has been submitted!')
    console.log("the button:", button)
    button.destroy();
    player.alive = true;
    startButton = game.add.button(game.world.centerX, game.world.centerY + 50, 'playAgain', restart, this);
    startButton.anchor.setTo(0.5);

    var scoreData = {
        game: "laserEagle",
        score: score,
        gameIcon: "../assets/eagle_icon.png"
    }
    console.log("Ajaxing!")
    $.ajax({
        url: "/newScore",
        method: 'POST',
        data: scoreData
    })
}

function render() {
    scoreText.setText("Score: " + score);


}

function fireLaser() {
    var fireRate = 400;

    if (score < 5000) {

        var laser = lasers.getFirstExists(false);
        if (game.time.now > laserTimer) {
            if (laser) {
                laser.reset(player.x, player.y + 8);
                laser.angle = player.angle;
                laser.body.velocity.y = -400;
                game.physics.arcade.velocityFromAngle(laser.angle - 90, 400, laser.body.velocity);
                laser.body.velocity.x += player.body.velocity.x;
                laserTimer = game.time.now + fireRate;
            }
        }
    } else {
        fireRate = 200;
        var laser = lasers2.getFirstExists(false);
        if (game.time.now > laserTimer) {
            if (laser) {
                laser.reset(player.x, player.y + 8);
                laser.angle = player.angle;
                laser.body.velocity.y = -400;
                game.physics.arcade.velocityFromAngle(laser.angle - 90, 400, laser.body.velocity);
                laser.body.velocity.x += player.body.velocity.x;
                laserTimer = game.time.now + fireRate;

            }
        }
    }
}


function restart() {
    submitText.setText('')
    startButton.destroy()
        //  Reset the enemies
    swallowSpacing = 1000;
    swallows.callAll('kill');
    eagles.callAll('kill');
    enemyLasers.callAll('kill');
    game.time.events.remove(swallowLaunchTimer);
    game.time.events.add(1000, launchSwallow);

    //  Revive the player
    player.revive();
    player.health = 100;
    playerHealth.render();
    score = 0;
    scoreText.text = 'Score: ' + score;

    //  Hide the text
    gameOverText.visible = false;

}
