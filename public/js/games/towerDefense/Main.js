var HackerDefense = HackerDefense || {};

HackerDefense.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser');
HackerDefense.game.state.add('Boot', HackerDefense.Boot);
HackerDefense.game.state.add('Preload', HackerDefense.Preload);
HackerDefense.game.state.add('MainMenu', HackerDefense.MainMenu);
HackerDefense.game.state.add('Game', HackerDefense.Game);
HackerDefense.game.state.start('Boot');
console.log("window innderWidth:", window.innerWidth)
console.log("window innderHeight:", window.innerHeight)
