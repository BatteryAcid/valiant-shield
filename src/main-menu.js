(function() {
   var MainMenu = function(game) {
      this.game = game;
   };
   MainMenu.prototype = {
      init: function(state, starRating) {
         this.gameWidth = TDG.GAME_WIDTH;
         this.gameHeight = TDG.GAME_HEIGHT;

         var textHeightY = TDG.GAME_HEIGHT * .08;
         var textScale = textHeightY / 80;
         var textSize = textScale * 100;

         this.levelManager = new TDG.LevelManager();

         function determineStateText() {
            var stateTextContent = "Choose an option";
            if (state === TDG.LEVEL_START_STATE || state === TDG.LEVEL_QUIT_STATE) {
               //leave as default for now
            } else if (state === TDG.LEVEL_COMPLETE_STATE) {
               stateTextContent = "Success!";
            } else if (state === TDG.LEVEL_FAILED_STATE) {
               stateTextContent = "Failed!";
            }
            return stateTextContent;
         }

         this.stateText = this.game.make.text(this.game.world.centerX, TDG.GAME_HEIGHT * .245,
            determineStateText(), {
               font: .6 * textSize + "px Arial",
               fill: '#000',
               align: 'center'
            });

         this.stateText.setShadow(5, 5, 'rgba(255,255,255,0.5)', 10);
         this.stateText.anchor.set(0.5);

         this.starsText = this.game.make.text(this.game.world.centerX, TDG.GAME_HEIGHT * .34,
            starRating, {
               font: .6 * textSize + "px Arial",
               fill: '#FFFFFF',
               align: 'center'
            });

         this.starsText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
         this.starsText.anchor.set(0.5);

         this.getState = function() {
            return state;
         }
      },
      create: function() {
         this.game.stage.disableVisibilityChange = true;
         var background = this.game.add.image(0, TDG.GAME_HEIGHT, 'menu-bg');
         background.width = TDG.GAME_WIDTH;
         background.height = TDG.GAME_HEIGHT;
         background.anchor.y = 1;

         //title backdrop
         var titleBackdropScale = (TDG.GAME_HEIGHT * .30) / 663;
         var titleBackdrop = this.game.add.image(TDG.GAME_WIDTH / 2, TDG.GAME_HEIGHT * .15,
            "title-backdrop");
         titleBackdrop.anchor.set(0.5);
         titleBackdrop.scale.setTo(1 * titleBackdropScale, 1 * titleBackdropScale);

         this.game.add.existing(this.stateText);
         this.game.add.existing(this.starsText);

         //must match actual button height
         var actualButtonHeight = 280;
         var buttonScale = (actualButtonHeight * TDG.GAME_SCALE_Y) / actualButtonHeight;

         var playButton = this.game.add.button(this.game.world.centerX, TDG.GAME_HEIGHT * .5, 'start-button',
            this.beginPlay,
            this, 2, 1,
            0);

         var levelButton = this.game.add.button(this.game.world.centerX, TDG.GAME_HEIGHT * .5 +
            actualButtonHeight * buttonScale + 10,
            'levels-button', this.showLevelMenu,
            this, 2, 1, 0);

         playButton.scale.setTo(buttonScale, buttonScale);
         playButton.anchor.setTo(0.5, 0.5);

         levelButton.scale.setTo(buttonScale, buttonScale);
         levelButton.anchor.setTo(0.5, 0.5);

         if (this.getState() !== undefined && this.getState() !== TDG.LEVEL_START_STATE) {
            var playAgain = this.game.add.button(this.game.world.centerX, TDG.GAME_HEIGHT * .5 +
               ((actualButtonHeight * buttonScale) * 2) + 20,
               'playagain-button',
               this.playAgain,
               this, 2, 1,
               0);
            playAgain.scale.setTo(buttonScale, buttonScale);
            playAgain.anchor.setTo(0.5, 0.5);
         }
      },
      beginPlay: function() {
         this.game.state.start('main', true, false);
      },
      showLevelMenu: function() {
         this.game.state.start('level-menu', true, false);
      },
      playAgain: function() {
         var nextLevel = this.levelManager.getNextLevel();
         if (this.getState() === TDG.LEVEL_COMPLETE_STATE && parseInt(this.levelManager.getSelectedLevel()) !==
            this.levelManager.getLevelCount() - 1) {
            // don't change if max level
            nextLevel -= 1;
         }
         this.levelManager.setNextLevel(nextLevel);
         this.game.state.start('main', true, false);
      }
   };

   TDG.MainMenu = MainMenu;

})();