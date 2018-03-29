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
      //false on the 6th param enables background color on canvas
      var game = new Phaser.Game(gameWidth, gameHeight,
         Phaser.CANVAS, 'gameContainer', null, false, false);
      game.state.add('Boot', TDG.Boot);
      game.state.start('Boot');
   })();
};

//TODO: populate with config file
TDG.LEVEL_START_STATE = 0;
TDG.LEVEL_COMPLETE_STATE = 1;
TDG.LEVEL_FAILED_STATE = 2;
TDG.LEVEL_QUIT_STATE = 3;

TDG.GAME_WIDTH;
TDG.GAME_HEIGHT;
TDG.ZOOMED_IN = false;
TDG.SCALE_FOR_ZOOM = 4;
TDG.BULLET_SCALE = .2;
TDG.BULLET_SPEED = 1700;
