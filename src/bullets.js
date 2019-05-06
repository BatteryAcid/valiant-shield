(function() {
   var Bullets = function(game) {
      this.game = game;
      var fireRate = 100; // probably safe to not let them spam too many per second
      var nextFire = 0;
      var fireCount = 0;

      var bulletGroup = this.game.add.group();
      bulletGroup.enableBody = true;
      bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
      bulletGroup.createMultiple(50, 'bullet');
      bulletGroup.setAll('anchor.x', 0.5);
      bulletGroup.setAll('anchor.y', 0.5);

      this.getBulletGroup = function() {
         return bulletGroup;
      }

      this.getFireRate = function() {
         return fireRate;
      }

      this.getNextFire = function() {
         return nextFire;
      }

      this.setNextFire = function(nextFireToSet) {
         nextFire = nextFireToSet;
      }

      this.incrementFireCount = function() {
         fireCount++;
      }

      this.getFireCount = function() {
         return fireCount;
      }

      this.fire = function(pointer) {
         if (this.game.time.now > this.getNextFire() && this.getBulletGroup().countDead() > 0) {
            gunshot = this.game.add.audio('gunshot');
            this.setNextFire(this.game.time.now + this.getFireRate());
            var bullet = this.getBulletGroup().getFirstDead();
            bullet.reset(-10, -10);
            //TODO: may need to set scale here instead of using bullet scale, or use an actual w/h
            bullet.scale.setTo(TDG.BULLET_SCALE);
            bullet.lifespan = 100; //kills bullet after duration instead of using bound checks

            // scopes x/y scaled for zoom with minor offsets to center
            bullet.x = TDG.SCOPE.x / TDG.SCALE_FOR_ZOOM + 2;
            bullet.y = TDG.SCOPE.y / TDG.SCALE_FOR_ZOOM - 3;

            bullet.body.syncBounds = true;

            //shake effect for fun
            this.game.camera.shake(.02, 100);

            this.incrementFireCount();
            gunshot.play('',0,.25);
         }
      }
   };

   Bullets.prototype = {};

   TDG.Bullets = Bullets;
})();