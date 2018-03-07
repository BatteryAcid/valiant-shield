(function() {
   var Levels = function(game) {

      var levelConfigs = {
         0: {
            badGuyLocationX: function(count) {
               return 20 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT / 2;
            },
            badGuys: {
               count: 1,
               scale: .5,
               image: 'guy'
               //- hitbox sizes. will have to change setHitBoxSizeBasedOnZoom
            },
            goodGuy: {
               scale: .5
            },
            background: "bg1.png",
            menuColor: "0x00CC99"
         },
         1: {
            badGuyLocationX: function(count) {
               return 20 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT / 3;
            },
            badGuys: {
               count: 2,
               scale: .5,
               image: 'guy'
               //- hitbox sizes. will have to change setHitBoxSizeBasedOnZoom
            },
            goodGuy: {
               scale: .5
            },
            background: "bg1.png",
            menuColor: "0xff5050"
         },
         2: {
            badGuyLocationX: function(count) {
               return 20 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT / 3;
            },
            badGuys: {
               count: 3,
               scale: .5,
               image: 'guy'
               //- hitbox sizes. will have to change setHitBoxSizeBasedOnZoom
            },
            goodGuy: {
               scale: .5
            },
            background: "bg1.png",
            menuColor: "0xff5050"
         },
         3: {
            badGuyLocationX: function(count) {
               return 20 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT / 3;
            },
            badGuys: {
               count: 5,
               scale: .5,
               image: 'guy'
               //- hitbox sizes. will have to change setHitBoxSizeBasedOnZoom
            },
            goodGuy: {
               scale: .5
            },
            background: "bg1.png",
            menuColor: "0xff5050"
         },
         4: {
            badGuyLocationX: function(count) {
               return 20 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT / 3;
            },
            badGuys: {
               count: 5,
               scale: .5,
               image: 'guy'
               //- hitbox sizes. will have to change setHitBoxSizeBasedOnZoom
            },
            goodGuy: {
               scale: .5
            },
            background: "bg1.png",
            menuColor: "0xff5050"
         }

      };

      this.getLevels = function() {
         return levelConfigs;
      }

      this.getLevelConfigs = function(levelNumber) {
         return levelConfigs[levelNumber];
      }
   };

   Levels.prototype = {};

   TDG.Levels = Levels;
})();