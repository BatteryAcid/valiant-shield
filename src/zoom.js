(function() {
   var Zoom = function(game) {
      this.game = game;
      this.startPosX, this.startPosY;
   };
   Zoom.prototype = {};
   Zoom.prototype.zoomTo = function(scale, pointer) {
      this.startPosX = this.game.camera.position.x;
      this.startPosY = this.game.camera.position.y;

      if (TDG.ZOOMED_IN === false) {
         this.game.camera.scale.x = TDG.SCALE_FOR_ZOOM;
         this.game.camera.scale.y = TDG.SCALE_FOR_ZOOM;

         var u = ((1 - this.game.camera.scale.x) * pointer.x) + this.startPosX;
         var v = ((1 - this.game.camera.scale.y) * pointer.y) + this.startPosY;
         var x1 = this.game.camera.x + u;
         var y1 = this.game.camera.y + v;

         this.game.camera.setPosition(-x1, -y1);
      } else {
         this.game.camera.scale.x = 1;
         this.game.camera.scale.y = 1;
         this.game.camera.setPosition(0, 0);
      }

      TDG.ZOOMED_IN = !TDG.ZOOMED_IN
   };

   TDG.Zoom = Zoom;
})();