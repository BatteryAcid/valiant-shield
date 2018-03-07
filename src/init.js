//setup global namespace
var TDG = function(game) {
   orientated: false
};
window.onload = function() {
   (function() {
      // create required divs for game
      var gameContainerDiv = document.createElement('div');
      gameContainerDiv.id = 'gameContainer';
      var orientationDiv = document.createElement('div');
      orientationDiv.id = 'orientation';
      document.getElementsByTagName('body')[0].appendChild(gameContainerDiv);
      document.getElementsByTagName('body')[0].appendChild(orientationDiv);

      //get correct game height and width
      var gameWidth = this.gameWidth = window.innerHeight * window.devicePixelRatio;
      var gameHeight = this.gameHeight = window.innerWidth * window.devicePixelRatio;
      if (window.innerWidth * window.devicePixelRatio > window.innerHeight * window.devicePixelRatio) {
         gameWidth = window.innerWidth * window.devicePixelRatio;
         gameHeight = window.innerHeight * window.devicePixelRatio;
      }

      //create game
      var game = new Phaser.Game(gameWidth, gameHeight,
         Phaser.CANVAS, 'gameContainer', null, true, false);
      game.state.add('Boot', TDG.Boot);
      game.state.start('Boot');
   })();
};

//TODO: populate with config file
TDG.LEVEL_START_STATE = 0;
TDG.LEVEL_COMPLETE_STATE = 1;
TDG.LEVEL_FAILED_STATE = 2;

TDG.GAME_WIDTH;
TDG.GAME_HEIGHT;
TDG.ZOOMED_IN = false;
TDG.SCALE_FOR_ZOOM = 4;
TDG.CHASE_SPEED = 50;
TDG.BAD_GUY_COUNT = 5;
TDG.GOOD_GUY_SPEED = .5;
TDG.BULLET_SPEED = 1700;
