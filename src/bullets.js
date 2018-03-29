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
      //not needed b/c we set lifespan.  Allows bullets to start off screen
      // bulletGroup.setAll('checkWorldBounds', true);
      // bulletGroup.setAll('outOfBoundsKill', true);
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

      //TODO: for fire on zoom in, maybe we can detect that last first and negate it?
      this.fire = function(pointer) {
         if (this.game.time.now > this.getNextFire() && this.getBulletGroup().countDead() > 0) {
            this.setNextFire(this.game.time.now + this.getFireRate());
            var bullet = this.getBulletGroup().getFirstDead();
            bullet.reset(-10, -10);
            //TODO: may need to set scale here instead of using bullet scale, or use an actual w/h
            bullet.scale.setTo(TDG.BULLET_SCALE);
            bullet.lifespan = 100; //kills bullet after duration instead of using bound checks

            // scopes x/y scaled for zoom with minor offsets to center
            bullet.x = TDG.SCOPE.x / TDG.SCALE_FOR_ZOOM + 2;
            bullet.y = TDG.SCOPE.y / TDG.SCALE_FOR_ZOOM - 3;

            //shake effect for fun
            this.game.camera.shake(.02, 100);

            this.incrementFireCount();
         }
      }
   };

   Bullets.prototype = {};

   TDG.Bullets = Bullets;
})();