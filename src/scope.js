(function() {
   var Scope = function(game, zoom, bullets) {
      this.game = game;
      this.zoom = zoom;
      this.bullets = bullets;
      Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'scope');
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.anchor.setTo(.5);
      this.visible = false;
      game.add.existing(this);

      this.inputEnabled = true;
      this.input.enableDrag(false);
      this.events.onDragStop.add(this.onDragStop, this);

      this.scale.setTo(TDG.GAME_SCALE_Y * 1.5);

      this.zoomWidth = TDG.GAME_WIDTH / 4;
      this.zoomHeight = TDG.GAME_HEIGHT / 4;

      this.game.load.image("bullet", "images/purple_ball.png");

      TDG.SCOPE = {
         x: this.world.x,
         y: this.world.y
      };

      // centers the scope on the point of click when zooming in
      this.centerOnLocation = function(pointer) {
         this.x = pointer.x;
         this.y = pointer.y;

         this.zoomOutButton = game.add.sprite((this.game.camera.x / 4) + (this.zoomWidth - TDG.GAME_SCALE_Y * 50), (this.game.camera
            .y / 4) + (this.zoomHeight * .5 - TDG.GAME_SCALE_Y * 50), 'zoom-out-icon');
         this.zoomOutButton.anchor.set(0.5);
         this.zoomOutButton.inputEnabled = true;
         this.zoomOutButton.scale.setTo(TDG.GAME_SCALE_Y * .08);
         this.zoomOutButton.events.onInputDown.add(this.zoomOutClicked, this);
      }
   };
   Scope.prototype = Object.create(Phaser.Sprite.prototype);
   Scope.prototype.update = function() {
      if (TDG.ZOOMED_IN === true) {
         this.visible = true;
      } else {
         this.visible = false;
         if (this.zoomOutButton) {
            this.zoomOutButton.destroy();
         }
      }

      TDG.SCOPE = {
         x: this.world.x,
         y: this.world.y
      };
   };
   Scope.prototype.zoomOutClicked = function(pointer) {
      if (TDG.ZOOMED_IN === true) {
         this.zoomOut(pointer);
      }
   };
   Scope.prototype.zoomOut = function(pointer) {
      this.zoom.zoomTo(1, pointer);
      TDG.ZOOMED_IN = false;
   };
   Scope.prototype.fire = function(pointer) {
      this.bullets.fire(pointer);
   };
   Scope.prototype.onDragStop = function(pointer) {
      if (!isDrag(this.game)) {
         this.fire(pointer);
      }
   };

   function isDrag(game) {
      var distanceFromLastUp = Math.abs(Phaser.Math.distance(game.input.activePointer.positionDown.x, game
         .input.activePointer.positionDown.y, game.input.activePointer.x, game.input.activePointer.y
      ));

      //Note: adjust to allow for more tolerance of tap-move to trigger fire
      if (distanceFromLastUp < 50) {
         return false;
      } else {
         return true;
      }
   }

   TDG.Scope = Scope;
})();