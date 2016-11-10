var HackerDefense = HackerDefense || {};

//loading the game assets
HackerDefense.Preload = function() {};

HackerDefense.Preload.prototype = {
    preload: function() {



        WebFontConfig = {

            //  'active' means all requested fonts have finished loading
            //  We set a 1 second delay before calling 'createText'.
            //  For some reason if we don't the browser cannot render the text the first time it's created.
            active: function() {
                game.time.events.add(Phaser.Timer.SECOND, createText, this);
            },

            //  The Google Fonts we want to load (specify as many as you like in the array)
            google: {
                families: ['Revalia']
            }

        };

        //This stuff is if I want to add a loading bar and a logo!!!!!
        // this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        // this.splash.anchor.setTo(0.5);
        //
        // this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        // this.preloadBar.anchor.setTo(0.5);
        //
        // this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.image('greenCode', 'assets/towerDefense/images/greenCode.png');

        this.load.tilemap('level2', 'assets/towerDefense/images/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/towerDefense/images/scifi_platformTiles_32x32.png');
        this.load.image('enemy1', 'assets/towerDefense/images/enemy_1.png');
        this.load.image('fireGuy', 'assets/towerDefense/images/fireGuy.png');
        this.load.image('skullGuy', 'assets/towerDefense/images/beeHive.png');
        this.load.image('towerBox', 'assets/towerDefense/images/spaceBackground.png');
        this.load.image('bullet', 'assets/towerDefense/images/bullet.png');
        this.load.image('enemy2', 'assets/towerDefense/images/enemy_2.png');
        this.load.image('enemy3', 'assets/towerDefense/images/enemy_3.png');
        this.load.image('enemy4', 'assets/towerDefense/images/enemy_4.png');
        this.load.image('finalBoss', 'assets/towerDefense/images/finalBoss.png');
        this.load.image('button', 'assets/towerDefense/images/startButton.png');
        this.load.image('flame', 'assets/towerDefense/images/flame.png');
        this.load.image('skullBullet', 'assets/towerDefense/images/cuteBee.png');
        this.load.image('laserGuy', 'assets/towerDefense/images/laserTurret.png');
        this.load.image('greenLaser', 'assets/towerDefense/images/greenLaser.png');
        this.load.spritesheet('kaboom', 'assets/towerDefense/images/explosion.png', 64, 64, 23);
        this.load.image('archerGuy', 'assets/towerDefense/images/archerTower.png');
        this.load.image('arrow', 'assets/towerDefense/images/arrow.png');
        this.load.audio('beeSound', 'assets/towerDefense/sounds/beeSound.mp3')
        this.load.audio('blaster', 'assets/towerDefense/sounds/blaster.mp3')
        this.load.audio('gameOver', 'assets/towerDefense/sounds/gameOver.wav')
        this.load.audio('fireBallSound', 'assets/towerDefense/sounds/fireBall2.mp3')
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');

        // this.load.audio('explosion', 'assets/audio/explosion.ogg');
    },
    create: function() {
        this.state.start('MainMenu');
    }
};
