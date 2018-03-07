//TODO: add params here: to indicate success/failure of play
// http://www.html5gamedevs.com/topic/4702-states-with-parameters/
(function() {
   var MainMenu = function(game) {
      this.game = game;
   };
   MainMenu.prototype = {
      init: function(state) {
         this.gameWidth = TDG.GAME_WIDTH;
         this.gameHeight = TDG.GAME_HEIGHT;

         var textHeightY = TDG.GAME_HEIGHT * .08;
         var textScale = textHeightY / 80;
         var textSize = textScale * 100;

         this.titleText = this.game.make.text(this.game.world.centerX, TDG.GAME_HEIGHT * .1 + 20,
            "The Defender", {
               font: textSize + "px Arial",
               fill: '#ff5722',
               align: 'center'
            });

         this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
         this.titleText.anchor.set(0.5);

         function determineStateText() {
            var stateTextContent = "Choose an option";
            if (state === TDG.LEVEL_START_STATE) {
               //leave as default for now
            } else if (state === TDG.LEVEL_COMPLETE_STATE) {
               stateTextContent = "Success!";
            } else if (state === TDG.LEVEL_FAILED_STATE) {
               stateTextContent = "Failed!";
            }
            return stateTextContent;
         }

         this.stateText = this.game.make.text(this.game.world.centerX, TDG.GAME_HEIGHT * .1 + textHeightY + 30,
            determineStateText(), {
               font: .6 * textSize + "px Arial",
               fill: '#FFFFFF',
               align: 'center'
            });

         this.stateText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
         this.stateText.anchor.set(0.5);

      },
      create: function() {
         this.game.stage.disableVisibilityChange = true;
         this.game.add.sprite(0, 0, 'menu-bg');
         this.game.add.existing(this.titleText);
         this.game.add.existing(this.stateText);

         var buttonHeightY = TDG.GAME_HEIGHT * .08;
         var buttonScale = buttonHeightY / 71;

         var playButton = this.game.add.button(this.game.world.centerX, TDG.GAME_HEIGHT * .5, 'button', this.beginPlay,
            this, 2, 1,
            0);
         var levelButton = this.game.add.button(this.game.world.centerX, TDG.GAME_HEIGHT * .5 + buttonHeightY +
            10, 'button', this.showLevelMenu,
            this, 2, 1, 0);

         playButton.scale.setTo(buttonScale, buttonScale);
         playButton.anchor.setTo(0.5, 0.5);

         levelButton.scale.setTo(buttonScale, buttonScale);
         levelButton.anchor.setTo(0.5, 0.5);
      },
      beginPlay: function() {
         this.game.state.start('main', true, false, this.gameWidth, this.gameHeight);
      },
      showLevelMenu: function() {
         this.game.state.start('level-menu', true, false, this.gameWidth, this.gameHeight);
      }
   };

   TDG.MainMenu = MainMenu;

})();