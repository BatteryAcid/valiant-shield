(function() {
   var GoodGuy = function(game) {
      var goodGuyInstance = game.add.sprite(TDG.GAME_WIDTH / 2, TDG.GAME_HEIGHT - 50, 'goodguy');
      game.physics.enable(goodGuyInstance, Phaser.Physics.ARCADE);
      goodGuyInstance.anchor.setTo(0, 0.1); //makes sure the bad guys always go to goodGuys center
      goodGuyInstance.scale.setTo(.5);

      this.currentHeight = function() {
         return goodGuyInstance.y;
      }

      this.getGoodGuyInstance = function() {
         return goodGuyInstance;
      }

      this.move = function() {
         goodGuyInstance.y -= TDG.GOOD_GUY_SPEED;
         if (TDG.ZOOMED_IN === false) {
            goodGuyInstance.body.setSize(75, 100, 0, -10);
         } else {
            goodGuyInstance.body.setSize(400, 450, -50, -100);
         }
      }
   };

   GoodGuy.prototype = {};

   TDG.GoodGuy = GoodGuy;
})();