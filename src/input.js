(function() {
   var Input = function(game, zoom, bullets, scope) {
      this.game = game;
      this.zoomedIn = false;
      this.zoom = zoom;
      this.bullets = bullets;

      this.getScope = function() {
         return scope;
      }
   };
   Input.prototype = {
      onTap: function(pointer, doubleTap) {
         if (doubleTap === true) {
            this.zoomedIn = !this.zoomedIn;
            if (this.zoomedIn === true) {
               this.zoom.zoomTo(4, pointer);
               TDG.ZOOMED_IN = true;

               this.getScope().centerOnLocation(pointer);
            } else {
               this.zoom.zoomTo(1, pointer);
               TDG.ZOOMED_IN = false;
            }
         } else {
            if (this.zoomedIn === true) {// && this.game.input.activePointer.isDown) {
               // if (this.game.input.activePointer.isDown) {
               this.bullets.fire(pointer);
            }
         }
      }
   };

   TDG.Input = Input;
})();