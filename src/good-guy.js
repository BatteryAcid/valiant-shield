(function() {
   var GoodGuy = function(game, levels, levelNumber) {
      this.levelConfigs = levels.getLevelConfigs(levelNumber);

      var goodGuyInstance = game.add.sprite(this.levelConfigs.goodGuy.locationX(), this.levelConfigs.goodGuy.locationY(), 'goodguy-walk');
      game.physics.enable(goodGuyInstance, Phaser.Physics.ARCADE);
      //added offset scale to maintain quality of HD image
      goodGuyInstance.scale.setTo(TDG.GAME_SCALE_Y * .25);
      goodGuyInstance.animations.add('goodGuyWalk');
      //slow down framerate on him b/c his speed is slower
      goodGuyInstance.animations.play('goodGuyWalk', 20, true);

      this.currentHeight = function() {
         return goodGuyInstance.y;
      }

      this.currentWidth = function() {
         return goodGuyInstance.x;
      }

      this.getGoodGuyInstance = function() {
         return goodGuyInstance;
      }

      this.move = function() {
         this.levelConfigs.goodGuy.move(goodGuyInstance);

         if (TDG.ZOOMED_IN === false) {
            goodGuyInstance.body.width = goodGuyInstance.width;
            goodGuyInstance.body.height = goodGuyInstance.height;
         } else {
            goodGuyInstance.body.width = goodGuyInstance.width * TDG.SCALE_FOR_ZOOM;
            goodGuyInstance.body.height = goodGuyInstance.height * TDG.SCALE_FOR_ZOOM;
         }
      }
   };

   GoodGuy.prototype = {};

   TDG.GoodGuy = GoodGuy;
})();