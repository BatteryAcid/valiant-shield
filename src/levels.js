//TODO: finish speed and badguy placement 

(function() {
   var Levels = function(game) {

      var background1 = "background";
      var background2 = "background2";

      var levelConfigs = {
         0: {
            badGuyLocationX: function(count) {
               return this.goodGuy.locationX() - (200 * TDG.GAME_SCALE_X); //TDG.GAME_WIDTH * .05;
            },
            badGuyLocationY: function(count) {
               return this.goodGuy.locationY() - (10 * TDG.GAME_SCALE_Y); //TDG.GAME_HEIGHT * .75;
            },
            badGuys: {
               count: 1,
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: TDG.BASE_SPEED * 3
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .3;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .8;
               },
               move: function(goodGuyInstance) {
                  //TODO: for fun you could randomize the point to which the good guys is aiming for to
                  //simulate frantic running
                  var radians = game.physics.arcade.angleToXY(goodGuyInstance, TDG.GAME_WIDTH, TDG.GAME_HEIGHT *
                     .8);
                  var degrees = radians * (180 / Math.PI);
                  //number is speed here
                  game.physics.arcade.velocityFromAngle(degrees, TDG.BASE_SPEED * .6, goodGuyInstance.body.velocity);
               },
               successX: TDG.GAME_WIDTH + (TDG.GAME_WIDTH * .1), //TODO remove these
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
            background: background1
            //,
            //introText: "Protect our hero from the growing malice! Tap to zoom then tap to fire.       to zoom out"
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
                  goodGuyInstance.x += .3 * TDG.GAME_SCALE_Y;
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
            background: background1
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
                  goodGuyInstance.x += .3 * TDG.GAME_SCALE_Y;
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
            background: background1
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
                  goodGuyInstance.x += .3 * TDG.GAME_SCALE_Y;
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
            background: background1
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
                  goodGuyInstance.x += .3 * TDG.GAME_SCALE_Y;
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
            background: background1
         },
         5: {
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
                  goodGuyInstance.x += .3 * TDG.GAME_SCALE_Y;
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
            background: background2
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