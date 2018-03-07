(function() {
   var Scope = function(game) {
      this.game = game;
      Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'scope');
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.anchor.setTo(.5);
      this.visible = false;
      game.add.existing(this);

      this.inputEnabled = true;
      this.input.enableDrag(false);

      // centers the scope on the point of double click when zooming in
      this.centerOnLocation = function(pointer) {
         this.x = pointer.x;
         this.y = pointer.y;
      }
   };
   Scope.prototype = Object.create(Phaser.Sprite.prototype);
   Scope.prototype.update = function() {

      if (TDG.ZOOMED_IN === true) {
         this.visible = true;
      } else {
         this.visible = false;
      }

      TDG.SCOPE = {
         x: this.world.x,
         y: this.world.y
      };
   };

   TDG.Scope = Scope;
})();