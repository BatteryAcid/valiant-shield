(function() {
   var Bullets = function(game) {
      this.game = game;
      var fireRate = 100; // probably safe to not let them spam too many per second
      var nextFire = 0;

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

      this.fire = function(pointer) {
         if (this.game.time.now > this.getNextFire() && this.getBulletGroup().countDead() > 0) {
            this.setNextFire(this.game.time.now + this.getFireRate());
            var bullet = this.getBulletGroup().getFirstDead();
            bullet.reset(TDG.GAME_WIDTH / 2, TDG.GAME_HEIGHT - 20);
            bullet.scale.setTo(2, 2);
            //TODO: hitbox will most likely change based on final bullet design
            bullet.body.setSize(50, 50, -20, -20);
            bullet.lifespan = 3000; //kills bullet after duration instead of using bound checks
            // this.game.physics.arcade.moveToXY(bullet, this.game.input.activePointer.worldX / TDG.SCALE_FOR_ZOOM,
            //    this.game.input
            //    .activePointer.worldY / TDG.SCALE_FOR_ZOOM, TDG.BULLET_SPEED);
            //Bullets move towards center of scope
            this.game.physics.arcade.moveToXY(bullet, TDG.SCOPE.x / TDG.SCALE_FOR_ZOOM,
               TDG.SCOPE.y / TDG.SCALE_FOR_ZOOM, TDG.BULLET_SPEED);

            //shake effect for fun
            this.game.camera.shake(.02, 100);
         }
      }
   };

   Bullets.prototype = {};

   TDG.Bullets = Bullets;
})();