//TODO: finish speed and badguy placement 

(function() {
   var Levels = function(game) {

      var background1 = "background";
      var background2 = "background2";

      function moveGoodGuy(goodGuyInstance, speed) {
         //TODO: for fun you could randomize the point to which the good guys is aiming for to
         //simulate frantic running
         var radians = game.physics.arcade.angleToXY(goodGuyInstance, TDG.GAME_WIDTH, TDG.GAME_HEIGHT *
            .8);
         var degrees = radians * (180 / Math.PI);
         game.physics.arcade.velocityFromAngle(degrees, speed, goodGuyInstance.body.velocity);
      }

      var levelConfigs = {
         0: {
            badGuyLocationX: function(count) {
               return this.goodGuy.locationX() - (this.badGuys.locations[count].x * TDG.GAME_SCALE_X);
            },
            badGuyLocationY: function(count) {
               return this.goodGuy.locationY() - (this.badGuys.locations[count].y * TDG.GAME_SCALE_Y);
            },
            badGuys: {
               count: 1,
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: TDG.BASE_SPEED * 3,
               locations: [
                  {
                     x: 200,
                     y: 10
                  }
               ]
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
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               }
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
               return this.goodGuy.locationX() - (this.badGuys.locations[count].x * TDG.GAME_SCALE_X);
            },
            badGuyLocationY: function(count) {
               return this.goodGuy.locationY() - (this.badGuys.locations[count].y * TDG.GAME_SCALE_Y);
            },
            badGuys: {
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80,
               locations: [
                  {
                     x: 200,
                     y: -100
                  },
                  {
                     x: 200,
                     y: 100
                  }
               ]
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .4;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .8;
               },
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               }
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
               return this.goodGuy.locationX() - (this.badGuys.locations[count].x * TDG.GAME_SCALE_X);
            },
            badGuyLocationY: function(count) {
               return this.goodGuy.locationY() - (this.badGuys.locations[count].y * TDG.GAME_SCALE_Y);
            },
            badGuys: {
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80,
               locations: [
                  {
                     x: 200,
                     y: -100
                  },
                  {
                     x: 200,
                     y: 100
                  },
                  {
                     x: -200,
                     y: 200
                  }
               ]
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .5;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .8;
               },
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               }
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
               return this.goodGuy.locationX() - (this.badGuys.locations[count].x * TDG.GAME_SCALE_X);
            },
            badGuyLocationY: function(count) {
               return this.goodGuy.locationY() - (this.badGuys.locations[count].y * TDG.GAME_SCALE_Y);
            },
            badGuys: {
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80,
               locations: [
                  {
                     x: 250,
                     y: -100
                  },
                  {
                     x: 250,
                     y: 100
                  },
                  {
                     x: -250,
                     y: 250
                  },
                  {
                     x: -250,
                     y: -250
                  }
               ]
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .6;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .8;
               },
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               }
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
               return this.goodGuy.locationX() - (this.badGuys.locations[count].x * TDG.GAME_SCALE_X);
            },
            badGuyLocationY: function(count) {
               return this.goodGuy.locationY() - (this.badGuys.locations[count].y * TDG.GAME_SCALE_Y);
            },
            badGuys: {
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80,
               locations: [
                  {
                     x: 250,
                     y: -200
                  },
                  {
                     x: 250,
                     y: 200
                  },
                  {
                     x: -250,
                     y: 250
                  },
                  {
                     x: -250,
                     y: -300
                  },
                  {
                     x: -250,
                     y: 0
                  }
               ]
            },
            goodGuy: {
               scale: 1,
               locationX: function() {
                  return TDG.GAME_WIDTH * .7;
               },
               locationY: function() {
                  return TDG.GAME_HEIGHT * .8;
               },
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               }
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
               return this.goodGuy.locationX() - (this.badGuys.locations[count].x * TDG.GAME_SCALE_X);
            },
            badGuyLocationY: function(count) {
               return this.goodGuy.locationY() - (this.badGuys.locations[count].y * TDG.GAME_SCALE_Y);
            },
            badGuys: {
               scale: 1,
               image: 'badguy-walk',
               animation: 'badGuyWalk',
               speed: 80,
               locations: [
                  {
                     x: 200,
                     y: -100
                  },
                  {
                     x: 200,
                     y: 100
                  },
                  {
                     x: -200,
                     y: 200
                  },
                  {
                     x: -200,
                     y: 200
                  },
                  {
                     x: -200,
                     y: 200
                  },
                  {
                     x: -200,
                     y: 200
                  }
               ]
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
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               }
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