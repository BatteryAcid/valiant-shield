(function() {
   var Boot = function(game) {
      this.zoomed = false;
      this.debugText = "";
      var gameWidth;
      var gameHeight;

      if (window.innerWidth * window.devicePixelRatio > window.innerHeight * window.devicePixelRatio) {
         gameWidth = window.innerWidth * window.devicePixelRatio;
         gameHeight = window.innerHeight * window.devicePixelRatio;
      } else {
         gameWidth = window.innerHeight * window.devicePixelRatio;
         gameHeight = window.innerWidth * window.devicePixelRatio;
      }

      TDG.GAME_WIDTH = gameWidth;
      TDG.GAME_HEIGHT = gameHeight;

      // ipad pro resolution as base
      var BASE_WIDTH = 2732;
      var BASE_HEIGHT = 2048;

      TDG.GAME_SCALE_Y = (TDG.GAME_HEIGHT/BASE_HEIGHT);
   };
   Boot.prototype = {
      init: function() {
         this.input.maxPointers = 1;

         this.scale.pageAlignHorizontally = true;
         this.scale.pageAlignVertically = true;

         if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
         }
      },
      preload: function() {
         this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
         this.game.load.image('guy', 'images/guy.png');
         this.game.load.spritesheet('goodguy-walk', 'images/good-guy-walk.png', 160, 239);
         this.game.load.spritesheet('goodguy-kill', 'images/good-guy-kill.png', 165, 197);
         this.game.load.spritesheet('badguy-walk', 'images/bad-guy-walk.png', 160, 239);
         this.game.load.spritesheet('badguy-kill', 'images/bad-guy-kill.png', 165, 226);
         this.game.load.image('background', 'images/bg1.jpg');
         this.game.load.image('bullet', 'images/purple_ball.png');
         this.game.load.image('scope', 'images/scope.png');
         this.game.load.image('menu-bg', 'images/bg1.jpg');
         this.game.load.image('title-backdrop', 'images/title-backdrop.png');
         this.game.load.image('intro-backdrop', 'images/intro-backdrop.png');
         this.game.load.spritesheet('button', 'images/button.png', 193, 71);
         this.game.load.spritesheet('start-button', 'images/start.png', 791, 280);
         this.game.load.spritesheet('introstart-button', 'images/introstart.png', 791, 280);
         this.game.load.spritesheet('quit-button', 'images/quit.png', 791, 280);
         this.game.load.spritesheet('back-button', 'images/back.png', 799, 280);
         this.game.load.spritesheet('levels-button', 'images/levels.png', 791, 280);
         this.game.load.spritesheet('playagain-button', 'images/playagain.png', 791, 280);
      },
      create: function() {
         this.game.state.add('main', TDG.Main);
         this.game.state.add('main-menu', TDG.MainMenu);
         this.game.state.add("level-menu", TDG.LevelMenu);

         this.game.state.start('main-menu', true, false);
      },
      update: function() {},
      gameResized: function(width, height) {
         //  This could be handy if you need to do any extra processing if the game resizes.
         //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
         //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
      },
      enterIncorrectOrientation: function() {
         TDG.orientated = false;
         document.getElementById('orientation').style.display = 'block';
      },
      leaveIncorrectOrientation: function() {
         TDG.orientated = true;
         document.getElementById('orientation').style.display = 'none';
      },
      render: function() {
         // game.debug.text("Click to toggle! Sorting enabled: " + sorted, 2, 36, "#ffffff");
         // this.game.debug.text((this.game.time.fps || '--') + TDG.GAME_WIDTH + ", " + TDG.GAME_HEIGHT, 2, 14,
         // "#a7aebe");

         //debug points
         // var point = new Phaser.Rectangle( game.world.centerX, game.world.centerY, 25, 25 ) ;
         // game.debug.geom( point, 'rgba(255,0,0,1)' ) ;

         // var point = new Phaser.Rectangle( 200.5, 400.5, 25, 25 ) ;
         // game.debug.geom( point, 'rgb(56, 230, 154)' ) ;

         // var point = new Phaser.Rectangle( 0, 0, 25, 25 ) ;
         // this.game.debug.geom( point, 'rgb(71, 111, 241)' ) ;

         // var point = new Phaser.Rectangle( 0, this.gameHeight-25, 25, 25 ) ;
         // this.game.debug.geom( point, 'rgb(71, 111, 241)' ) ;
      }
   };

   TDG.Boot = Boot;
})();