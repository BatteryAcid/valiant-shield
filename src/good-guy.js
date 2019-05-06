(function() {
   var GoodGuy = function(game, levels, deadGroup) {

      var goodGuyGroup = game.add.group();
      goodGuyGroup.enableBody = true;
      goodGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;

      this.setupGoodGuysForLevel = function(levelNumber) {
         this.levelConfigs = levels.getLevelConfigs(levelNumber);

         for (var i = 0; i < this.levelConfigs.goodGuys.length; i++) {
            //TODO: support directional pathing animations for good guy
            var goodGuyFrameName = this.levelConfigs.goodGuys[i].animation.path;
            var goodGuyAnimationName = this.levelConfigs.goodGuys[i].animation.name;

            var goodGuy = goodGuyGroup.create(this.levelConfigs.goodGuys[i].x,
               this.levelConfigs.goodGuys[i].y,
               "scene");

            //added offset scale to maintain quality of HD image
            goodGuy.scale.setTo(TDG.GAME_SCALE_Y * .25);
            goodGuy.animations.add(goodGuyAnimationName,
               Phaser.Animation.generateFrameNames(goodGuyFrameName, 1, 8, '.png', 2), 10, true, false
            );
            goodGuy.animations.play(goodGuyAnimationName, 24, true);

            // on kill 
            goodGuy.events.onKilled.add(onGoodGuyKilled);

            // set health
            goodGuy.health = this.levelConfigs.goodGuys[i].health;
            goodGuy.body.bounce.set(.2);
            goodGuy.body.syncBounds = true;
         }

         // leave the anchor as default 0 so that the body matches the image reguardless of zoom scale
      }

      function onGoodGuyKilled(deadGoodGuy) {
         var goodGuyKillSprite = game.add.sprite(deadGoodGuy.x, deadGoodGuy.y, "scene");
         goodGuyKillSprite.anchor.setTo(0, -0.25);
         goodGuyKillSprite.animations.add('goodguykill',
            Phaser.Animation.generateFrameNames('goodguy/kill/good-guy-kill_', 1, 5, '.png', 2),
            10, true, false);
         goodGuyKillSprite.animations.play('goodguykill', 30, false);
         goodGuyKillSprite.scale.setTo(TDG.GAME_SCALE_Y * .25);
         //makes the dead bodies appear in correct layer
         deadGroup.add(goodGuyKillSprite);
      }

      this.move = function() {
         var localLevelConfigsRef = this.levelConfigs;
         for (var i = 0; i < this.levelConfigs.goodGuys.length; i++) {
            localLevelConfigsRef.goodGuys[i].move(goodGuyGroup.getAll()[i]);
         }
      }

      this.getGoodGuyGroup = function() {
         return goodGuyGroup;
      }
   };

   GoodGuy.prototype = {};

   TDG.GoodGuy = GoodGuy;
})();