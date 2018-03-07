//TODO: set bad guys around map edge so player has time to react
//- dont send all bad guys at once, delay each guy but speed up his approach rate
//- bad guy should do dmg when next to good guy
//- good guy should try to avoid bad guys? maybe just set varying path
//- bad guys at different Y will be at different sizes
//- consider placing objects in reference to screen center point

//TODO left off here
//- figure out how to make main.js build everything, level, good/bad guys, bullets, etc based on level configs
(function() {
   var BadGuys = function(game, levels) {
      var levelConfigs;
      var badGuyGroup = game.add.group();
      badGuyGroup.enableBody = true;
      badGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;

      this.setupBadGuysForLevel = function(levelNumber) {
         //TODO
         levelConfigs = levels.getLevelConfigs(levelNumber);
         //TODO: consider using config files for bad guy placement instead of random
         for (var i = 0; i < levelConfigs.badGuys.count; i++) {
            var badGuy = badGuyGroup.create(levelConfigs.badGuyLocationX(i), levelConfigs.badGuyLocationY(i),
               levelConfigs.badGuys.image);
            badGuy.scale.setTo(levelConfigs.badGuys.scale);
         }

         badGuyGroup.setAll('anchor.x', 0.5);
         badGuyGroup.setAll('anchor.y', 0.5);
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
         game.physics.arcade.velocityFromAngle(degrees, TDG.CHASE_SPEED, singleEnemy.body.velocity);
      }

      function setHitBoxSizeBasedOnZoom(singleEnemy) {
         if (TDG.ZOOMED_IN === false) {
            singleEnemy.body.setSize(50, 80, 13, 0);
         } else {
            singleEnemy.body.setSize(150, 250, -40, -90);
         }
      }

      this.getBadGuyGroup = function() {
         return badGuyGroup;
      }
   };

   BadGuys.prototype = {};

   TDG.BadGuys = BadGuys;
})();