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
var roastedChickenLaunchTimer;
var swallowSpacing = 1000;
var playerWeapon = "default";
var giantChicken;
var giantChickenLaunchTimer;
var giantChickenSpacing = 40000;

function preload() {
    game.load.image("sky", "assets/laserEagle/sky.png")
    game.load.image("birdLaser", "assets/laserEagle/birdLaser.png")
    game.load.image("birdLaser2", "assets/laserEagle/birdLaser2.png")
    game.load.image("enemyLaser", "assets/laserEagle/enemyLaser.png")
    game.load.image("egg", "assets/laserEagle/egg.png")
    game.load.image("swallow", "assets/laserEagle/swallow2.png")
    game.load.image("eagleEnemy", "assets/laserEagle/eagle1.png")
    game.load.image('button', 'assets/laserEagle/submit.png');
    game.load.image('start', 'assets/laserEagle/start.png');
    game.load.image('roastedChicken', 'assets/laserEagle/roastedChicken.png');
    game.load.image('playAgain', 'assets/guacAMole/playAgain.png');
    game.load.spritesheet("theBird", "assets/laserEagle/thePlayerBird.png", 128, 128, 9)
    game.load.spritesheet("giantChicken", "assets/laserEagle/bigChicken.png", 100, 121, 3)
    game.load.spritesheet("explosion", "assets/laserEagle/explosion.png", 128, 128, 25)
    game.load.spritesheet("smallExplosion", "assets/laserEagle/explosionSmall.png", 32, 32, 25)
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

    eggs = game.add.group();
    eggs.enableBody = true;
    eggs.physicsBodyType = Phaser.Physics.ARCADE;
    eggs.createMultiple(30, 'egg');
    eggs.setAll('anchor.x', 0.5);
    eggs.setAll('anchor.y', 0.5);
    eggs.setAll('outOfBoundsKill', true);
    eggs.setAll('checkWorldBounds', true);
    eggs.forEach(function(enemy) {
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
        enemy.damageAmount = 15;
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
        enemy.damageAmount = 20;
        console.log(enemy.damageAmount)
    })

    roastedChickens = game.add.group();
    roastedChickens.enableBody = true;
    roastedChickens.physicsBodyType = Phaser.Physics.ARCADE;
    roastedChickens.createMultiple(10, 'roastedChicken');
    roastedChickens.setAll('anchor.x', 0.5);
    roastedChickens.setAll('anchor.y', 0.5);
    roastedChickens.setAll('outOfBoundsKill', true);
    roastedChickens.setAll('checkWorldBounds', true);

    roastedChickens.forEach(function(enemy) {
        console.log("setting enemy damageAmount")
        enemy.healthUP = 30;
        console.log(enemy.damageAmount)
    })

    giantChicken = game.add.sprite(0, 0, 'giantChicken');

    giantChicken.exists = false;
    giantChicken.alive = false;
    giantChicken.anchor.setTo(0.5, 0.5);
    giantChicken.damageAmount = 50;
    game.physics.enable(giantChicken, Phaser.Physics.ARCADE);



    startButton = game.add.button(game.world.centerX, game.world.centerY, 'start', startGame, this);
    startButton.anchor.setTo(0.5);

    //explosion pool

    explosions = game.add.group();
    explosions.enableBody = true;
    explosions.physicsBodyType = Phaser.Physics.ARCADE;
    explosions.createMultiple(50, 'explosion');
    explosions.setAll('anchor.x', 0.5);
    explosions.setAll('anchor.y', 0.5);
    explosions.forEach(function(explosion) {
        explosion.animations.add('explosion');
    });

    smallExplosions = game.add.group();
    smallExplosions.enableBody = true;
    smallExplosions.physicsBodyType = Phaser.Physics.ARCADE;
    smallExplosions.createMultiple(50, 'smallExplosion');
    smallExplosions.setAll('anchor.x', 0.5);
    smallExplosions.setAll('anchor.y', 0.5);
    smallExplosions.forEach(function(smallExplosion) {
        smallExplosion.animations.add('smallExplosion');
    });

    blueExplosions = game.add.group();
    blueExplosions.enableBody = true;
    blueExplosions.physicsBodyType = Phaser.Physics.ARCADE;
    blueExplosions.createMultiple(50, 'explosion');
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
    eagleLaunchTimer = game.time.events.add(1000, launchEagle);
    // game.time.events.add(1000, launchEagle);
    swallowLaunchTimer=game.time.events.add(1000, launchSwallow);
    game.time.events.add(1000, launchRoastedChicken);
    giantChickenLaunchTimer=game.time.events.add(40000, launchGiantChicken);
}

function launchGiantChicken() {
    console.log("launching giant chicken")
    game.time.events.remove(swallowLaunchTimer);
    game.time.events.remove(eagleLaunchTimer);

    giantChicken.exists = true;
    giantChicken.alive = true;
    giantChicken.enableBody = true;

    giantChicken.reset(game.width / 2, -giantChicken.height);
    giantChicken.body.velocity.y = 100;
    giantChicken.body.velocity.x = 200;
    giantChicken.health = 500;
    giantChicken.damageAmount = 1;
    var flap = giantChicken.animations.add('flap')
    giantChicken.animations.play('flap', 12, true)

    var bulletSpeed = 400;
    var firingDelay = 120;
    giantChicken.lasers = 1000;
    giantChicken.lastShot = 0;


    giantChicken.update = function() {
            console.log("The this of giantChicken", this)

            if(player.body.y < giantChicken.body.y){
              var bulletSpeed = 500;
              var firingDelay = 10;
            }
            else{

                  var bulletSpeed = 400;
                  var firingDelay = 120;
            }


            if (giantChicken.body.y > giantChicken.height - 75) {
                giantChicken.body.velocity.y = 0
            }
            if (giantChicken.body.x > game.width - 50) {
                giantChicken.body.velocity.x = -150
            }
            if (giantChicken.body.x < 50) {
                giantChicken.body.velocity.x = 150
            }


            egg = eggs.getFirstExists(false);

            if (egg &&
                this.alive &&
                this.lasers &&
                // this.y > game.width / 8 &&
                game.time.now > firingDelay + this.lastShot) {
                this.lastShot = game.time.now;
                this.lasers--;
                egg.reset(this.x, this.y + this.height / 2);
                egg.damageAmount = this.damageAmount;
                var angle = game.physics.arcade.moveToObject(egg, player, bulletSpeed);
            }

        }
        // swallowSpacing = 10000;
        // eagleSpacing = 12000;

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

function launchRoastedChicken() {

    var enemy_speed = 100;

    var enemy = roastedChickens.getFirstExists(false);
    if (enemy) {
        enemy.reset(game.rnd.integerInRange(0, game.width), -20);
        //enemy.body.velocity.x = game.rnd.integerInRange(-200, 200);
        enemy.body.velocity.y = enemy_speed;

    }
    console.log("the roastedchickens group in launchRoastedChicken: ", roastedChickens)
    console.log("The Enemy object in launchRoastedChicken: ", enemy)
    enemy.update = function() {
        //enemy.angle = game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));
    }

    //  fly birdie!
    roastedChickenLaunchTimer = game.time.events.add(game.rnd.integerInRange(4000, 7000), launchRoastedChicken);
}

function launchEagle() {
    var startingX = game.rnd.integerInRange(100, game.width - 500);
    var verticalSpeed = 180;
    var verticalSpacing = 70;
    var numEnemiesInWave = 5;
    var eagleSpacing = 6000;

    //  Launch wave

    if (game.rnd.integerInRange(0, 1)) {
        for (var i = 0; i < numEnemiesInWave; i++) {
            console.log("launching an eagle!!")
            var enemy = eagles.getFirstExists(false);
            if (enemy) {

                enemy.reset(startingX + i * 100, -verticalSpacing * i);
                enemy.body.velocity.y = verticalSpeed;
                if (score <= 10000) {
                    var bulletSpeed = 400;
                    var firingDelay = 2000;
                }

                if (score > 10000) {
                    var bulletSpeed = 400;
                    var firingDelay = 1500;
                }

                if (score > 20000) {
                    var bulletSpeed = 400;
                    var firingDelay = 1000;
                }

                if (score > 20000) {
                    var bulletSpeed = 400;
                    var firingDelay = 650;
                }
                enemy.lasers = 10;
                enemy.lastShot = 0;

                //  Update function for each enemy
                enemy.update = function() {

                    enemyLaser = enemyLasers.getFirstExists(false);
                    if (enemyLaser &&
                        this.alive &&
                        this.lasers &&
                        // this.y > game.width / 8 &&
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

                    // if(score>1000){
                    //
                    //   enemyLaser = enemyLasers.getFirstExists(false);
                    //   if (enemyLaser &&
                    //       this.alive &&
                    //       this.lasers &&
                    //       // this.y > game.width / 8 &&
                    //       game.time.now > firingDelay + this.lastShot) {
                    //       this.lastShot = game.time.now;
                    //       this.lasers--;
                    //       enemyLaser.reset(this.x, this.y + this.height / 2);
                    //       enemyLaser.damageAmount = this.damageAmount;
                    //       var angle = game.physics.arcade.moveToObject(enemyLaser, player, 100);
                    //   }
                    //
                    //   //  Kill enemies once they go off screen
                    //   if (this.y > game.height + 200) {
                    //       this.kill();
                    //   }
                    //
                    // }
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
    eagleLaunchTimer = game.time.events.add(eagleSpacing, launchEagle);
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

function hitChicken(chicken, laser) {

    var explosion = explosions.getFirstExists(false);
    explosion.reset(laser.body.x + laser.body.halfWidth, laser.body.y + laser.body.halfHeight);
    explosion.body.velocity.y = chicken.body.velocity.y;
    explosion.play('explosion', 30, false, true);
    giantChicken.health -= 20;
    laser.kill()
    if (giantChicken.health <= 0) {
        giantChicken.kill()
        var explosion = explosions.getFirstExists(false);
        explosion.reset(laser.body.x + laser.body.halfWidth + game.rnd.integerInRange(-25, 25), laser.body.y + laser.body.halfHeight + game.rnd.integerInRange(-25, 25));
        // explosion.body.velocity.y = chicken.body.velocity.y;
        explosion.play('explosion', 30, false, true);

        var explosion = explosions.getFirstExists(false);
        explosion.reset(laser.body.x + laser.body.halfWidth - 50 + game.rnd.integerInRange(-25, 25), laser.body.y + laser.body.halfHeight - 50 + game.rnd.integerInRange(-25, 25));
        // explosion.body.velocity.y = chicken.body.velocity.y;
        explosion.play('explosion', 30, false, true);

        var explosion = explosions.getFirstExists(false);
        explosion.reset(laser.body.x + laser.body.halfWidth + 50 + game.rnd.integerInRange(-25, 25), laser.body.y + laser.body.halfHeight - 50 + game.rnd.integerInRange(-25, 25));
        // explosion.body.velocity.y = chicken.body.velocity.y;
        explosion.play('explosion', 30, false, true);

        var explosion = explosions.getFirstExists(false);
        explosion.reset(laser.body.x + laser.body.halfWidth + game.rnd.integerInRange(-25, 25), laser.body.y + laser.body.halfHeight - 50 + game.rnd.integerInRange(-25, 25));
        // explosion.body.velocity.y = chicken.body.velocity.y;
        explosion.play('explosion', 30, false, true)


        //game.time.events.add(200, explosionFunction(laser, chicken))
        //game.time.events.add(400, explosionFunction(laser, chicken))
        game.time.events.add(200, explosionFunction, this, [laser, chicken])
        game.time.events.add(200, explosionFunction, this, [laser, chicken])
        game.time.events.add(200, explosionFunction, this, [laser, chicken])
        game.time.events.add(400, explosionFunction, this, [laser, chicken])
        game.time.events.add(400, explosionFunction, this, [laser, chicken])
        game.time.events.add(400, explosionFunction, this, [laser, chicken])
        game.time.events.add(600, explosionFunction, this, [laser, chicken])
        game.time.events.add(600, explosionFunction, this, [laser, chicken])
        game.time.events.add(800, explosionFunction, this, [laser, chicken])
        game.time.events.add(800, explosionFunction, this, [laser, chicken])
        game.time.events.add(1000, explosionFunction, this, [laser, chicken])
        game.time.events.add(1000, explosionFunction, this, [laser, chicken])

        game.time.events.add(3500, launchEagle);
        game.time.events.add(3500, launchSwallow);
        game.time.events.add(43000, launchGiantChicken);
        for (var i = 0; i < 5; i++) {
            var enemy = roastedChickens.getFirstExists(false);
            if (enemy) {
                enemy.reset(laser.body.x + laser.body.halfWidth + 50 + game.rnd.integerInRange(-110, 110), laser.body.y + laser.body.halfHeight - 50 + game.rnd.integerInRange(-110, 110));
                //enemy.body.velocity.x = game.rnd.integerInRange(-200, 200);

            }
        }

    }
}

function explosionFunction(bodies, chicken) {

    var explosion = explosions.getFirstExists(false);
    explosion.reset(bodies[1].body.x + bodies[1].body.halfWidth + game.rnd.integerInRange(-50, 50), bodies[1].body.y + bodies[1].body.halfHeight + game.rnd.integerInRange(-50, 50));
    explosion.play('explosion', 30, false, true)
}

function enemyHit(player, enemyLaser) {
    enemyLaser.kill()
    var explosion = smallExplosions.getFirstExists(false);
    explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
    explosion.body.velocity.y = player.body.velocity.y;
    explosion.play('smallExplosion', 30, false, true);

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

    game.physics.arcade.overlap(giantChicken, lasers, hitChicken, null, this);
    game.physics.arcade.overlap(giantChicken, lasers2, hitChicken, null, this);

    game.physics.arcade.overlap(enemyLasers, player, enemyHit, null, this);
    game.physics.arcade.overlap(eggs, player, enemyHit, null, this);
    game.physics.arcade.overlap(roastedChickens, player, healthUp, null, this);

    if (!player.alive && gameOverText.visible === false) {

        gameOverMan();

    }

}

function healthUp(player, roastedChickens) {
    player.health += 10;
    roastedChickens.kill();
    playerHealth.render();

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
    eggs.callAll('kill');
    giantChicken.kill();
    game.time.events.remove(swallowLaunchTimer);
    game.time.events.remove(eagleLaunchTimer);
    game.time.events.remove(giantChickenLaunchTimer);
    game.time.events.add(1000, launchSwallow);
      game.time.events.add(1000, launchEagle;
    game.time.events.add(1000, launchRoastedChicken);
    game.time.events.add(40000, launchGiantChicken);
    //  Revive the player
    player.revive();
    player.health = 100;
    playerHealth.render();
    score = 0;
    scoreText.text = 'Score: ' + score;

    //  Hide the text
    gameOverText.visible = false;

}
