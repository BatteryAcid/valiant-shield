(function() {
   var Levels = function(game) {

      var levelConfigs = {
         0: {
            badGuyLocationX: function(count) {
               return TDG.GAME_WIDTH * .05;
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT * .75;
            },
            badGuys: {
               count: 1,
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 40
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .1;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .75;
               },
               move: function(goodGuyInstance) {
                  goodGuyInstance.x += .3;
               },
               successX: TDG.GAME_WIDTH - (TDG.GAME_WIDTH * .1),
               successY: TDG.GAME_HEIGHT * .1
            },
            scoring: {
               two: {
                  maxShotsFired: 1,
                  maxDuration: 2.5
               },
               three: {
                  maxShotsFired: 1,
                  maxDuration: 1.5
               }
            },
            background: "bg1.png",
            menuColor: "0x00CC99",
            introText: "Protect our hero from the growing malice! Double tap to zoom, tap once to fire."
         },
         1: {
            badGuyLocationX: function(count) {
               return TDG.GAME_WIDTH * .1 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT * (game.rnd.integerInRange(500, 600) / 1000);
            },
            badGuys: {
               count: 2,
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .3;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .75;
               },
               move: function(goodGuyInstance) {
                  goodGuyInstance.x += .3;
               },
               successX: TDG.GAME_WIDTH - (TDG.GAME_WIDTH * .01),
               successY: TDG.GAME_HEIGHT * .1
            },
            scoring: {
               two: {
                  maxShotsFired: 2,
                  maxDuration: 3
               },
               three: {
                  maxShotsFired: 2,
                  maxDuration: 2.5
               }
            },
            background: "bg1.png",
            menuColor: "0xff5050"
         },
         2: {
            badGuyLocationX: function(count) {
               return TDG.GAME_WIDTH * .4 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT * (game.rnd.integerInRange(500, 700) / 1000);
            },
            badGuys: {
               count: 3,
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .5;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .75;
               },
               move: function(goodGuyInstance) {
                  goodGuyInstance.x += .3
               },
               successX: TDG.GAME_WIDTH - (TDG.GAME_WIDTH * .01),
               successY: TDG.GAME_HEIGHT * .1
            },
            scoring: {
               two: {
                  maxShotsFired: 5,
                  maxDuration: 5
               },
               three: {
                  maxShotsFired: 3,
                  maxDuration: 3.3
               }
            },
            background: "bg1.png",
            menuColor: "0xff5050"
         },
         3: {
            badGuyLocationX: function(count) {
               return TDG.GAME_WIDTH * .5 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT * (game.rnd.integerInRange(500, 700) / 1000);
            },
            badGuys: {
               count: 4,
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .7;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .75;
               },
               move: function(goodGuyInstance) {
                  goodGuyInstance.x += .3
               },
               successX: TDG.GAME_WIDTH - (TDG.GAME_WIDTH * .01),
               successY: TDG.GAME_HEIGHT * .1
            },
            scoring: {
               two: {
                  maxShotsFired: 6,
                  maxDuration: 6.5
               },
               three: {
                  maxShotsFired: 4,
                  maxDuration: 5
               }
            },
            background: "bg1.png",
            menuColor: "0xff5050"
         },
         4: {
            badGuyLocationX: function(count) {
               return TDG.GAME_WIDTH * .5 + (count * game.rnd.integerInRange(100, 200));
            },
            badGuyLocationY: function(count) {
               return TDG.GAME_HEIGHT * (game.rnd.integerInRange(500, 700) / 1000);
            },
            badGuys: {
               count: 5,
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .8;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .7;
               },
               move: function(goodGuyInstance) {
                  goodGuyInstance.x += .3;
               },
               successX: TDG.GAME_WIDTH - (TDG.GAME_WIDTH * .01),
               successY: TDG.GAME_HEIGHT * .1
            },
            scoring: {
               two: {
                  maxShotsFired: 7,
                  maxDuration: 8
               },
               three: {
                  maxShotsFired: 5,
                  maxDuration: 6
               }
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

      this.getStarRating = function(levelScoring, gameDuration, shotsFired) {
         //console.log(gameDuration);
         //console.log(shotsFired);
         if (shotsFired <= levelScoring.three.maxShotsFired && gameDuration <= levelScoring.three.maxDuration) {
            //console.log("3");
            return 3;
         } else if (shotsFired <= levelScoring.two.maxShotsFired && gameDuration <= levelScoring.two.maxDuration) {
            //console.log("2");
            return 2;
         }
         //console.log("1");
         return 1;
      }
   };

   Levels.prototype = {};

   TDG.Levels = Levels;
})();