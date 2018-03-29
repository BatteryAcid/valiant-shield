(function() {
   var BadGuys = function(game, levels) {
      var levelConfigs;
      var badGuyGroup = game.add.group();
      badGuyGroup.enableBody = true;
      badGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;

      this.setupBadGuysForLevel = function(levelNumber) {
         levelConfigs = levels.getLevelConfigs(levelNumber);

         for (var i = 0; i < levelConfigs.badGuys.count; i++) {
            var badGuy = badGuyGroup.create(levelConfigs.badGuyLocationX(i), levelConfigs.badGuyLocationY(i),
               levelConfigs.badGuys.image);
            //added offset scale to maintain quality of HD image
            badGuy.scale.setTo(TDG.GAME_SCALE_Y * .25);
            badGuy.animations.add(levelConfigs.badGuys.animation);
            badGuy.animations.play(levelConfigs.badGuys.animation, 30, true);
         }

         // leave the anchor as default 0 so that the body matches the image reguardless of zoom scale
      }

      this.pursueGoodGuy = function(goodGuy) {
         badGuyGroup.forEach(function(singleEnemy) {
            setBadGuyVelocity(goodGuy, singleEnemy);
            setHitBoxSizeBasedOnZoom(singleEnemy);
         }, game.physics);
      }

      this.badGuysDefeated = function() {
         return badGuyGroup.countDead() === levelConfigs.badGuys.count;
      }

      function setBadGuyVelocity(goodGuy, singleEnemy) {
         var radians = game.physics.arcade.angleBetween(singleEnemy, goodGuy.getGoodGuyInstance());
         //TODO: the number here may cause some interesting behavior, test out 
         var degrees = radians * (180 / Math.PI);
         //number is speed here
         game.physics.arcade.velocityFromAngle(degrees, levelConfigs.badGuys.speed * TDG.GAME_SCALE_Y,
            singleEnemy.body.velocity);
      }

      function setHitBoxSizeBasedOnZoom(singleEnemy) {
         setTimeout(function() {
            // These body adjustments will work as long as the sprite's scale is 1 and the
            // spritesheet frames wrap the character exactly.  This ensures the height/width
            // of the sprite's body will match the sprite's dimensions
            if (singleEnemy.body) {
               if (TDG.ZOOMED_IN === false) {
                  singleEnemy.body.width = singleEnemy.width;
                  singleEnemy.body.height = singleEnemy.height;
               } else {
                  singleEnemy.body.width = singleEnemy.width * TDG.SCALE_FOR_ZOOM;
                  singleEnemy.body.height = singleEnemy.height * TDG.SCALE_FOR_ZOOM;
               }
            }
         });
      }

      this.getBadGuyGroup = function() {
         return badGuyGroup;
      }
   };

   BadGuys.prototype = {};

   TDG.BadGuys = BadGuys;
})();