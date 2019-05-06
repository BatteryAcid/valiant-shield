//bgStartConfigs: each array of configs corresponds to a bad guy starting config.  
// - there should be one starting config array per bad guy in the wave.  
// - each wave can use the same starting config or can be edited using the waveCustomizations
// that's called each wave.

(function() {
   var Levels = function(game) {

      var background1 = "background";
      var background2 = "background2";

      function moveGoodGuy(goodGuyInstance, speed) {
         var radians = game.physics.arcade.angleToXY(goodGuyInstance, TDG.GAME_WIDTH, TDG.GAME_HEIGHT *
            .8);
         var degrees = radians * (180 / Math.PI);
         game.physics.arcade.velocityFromAngle(degrees, speed, goodGuyInstance.body.velocity);
      }

      this.badGuyStartLocationX = function(goodGuyX, badGuyOffsetX) {
         return goodGuyX - (badGuyOffsetX * TDG.GAME_SCALE_X);
      }

      this.badGuyStartLocationY = function(goodGuyY, badGuyOffsetY) {
         return goodGuyY - (badGuyOffsetY * TDG.GAME_SCALE_Y);
      }

      this.getBadGuyWaves = function(waves) {
         var badGuyWaves = [];
         for (var i = 0; i < waves.totalWaves; i++) {
            var wave = [];
            for (var j = 0; j < waves.bgStartConfigs.length; j++) {
               wave.push(buildBadGuy(waves.waveCustomizations, waves.bgStartConfigs[j], i, j));
            }
            badGuyWaves.push(wave);
         }
         return badGuyWaves;
      };

      function buildBadGuy(waveCustomizations, bgConfig, wave, bgIndex) {
         var bgConfigCopy = JSON.parse(JSON.stringify(bgConfig));

         var bgCustomizations = waveCustomizations(bgConfigCopy, wave, bgIndex);

         return {
            xGoodGuyOffset: bgCustomizations[0],
            yGoodGuyOffset: bgCustomizations[1],
            health: bgCustomizations[2],
            speed: bgCustomizations[3],
            goodGuyChaseIndex: bgCustomizations[4]
         }
      }

      var levelConfigs = {
         0: {
            bgwaves: {
               totalWaves: 1,
               startTimes: [0],
               bgStartConfigs: [
                  [200, 10, 1, 80, 0]
               ],
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .3,
               y: TDG.GAME_HEIGHT * .8,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               },
               animation: {
                  name: "goodGuyWalk",
                  path: "goodguy/walkright/good-guy-walk_"
               }
            }],
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
            background: background1,
            introTextName: "intro-text"
         },
         1: {
            bgwaves: {
               totalWaves: 1,
               startTimes: [0],
               bgStartConfigs: [
                  [200, -100, 1, 80, 0],
                  [200, 120, 1, 80, 1]
               ],
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  return bgConfig;
               }
            },
            goodGuys: [{
                  health: 1,
                  x: TDG.GAME_WIDTH * .4,
                  y: TDG.GAME_HEIGHT * .8,
                  move: function(goodGuyInstance) {
                     moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
                  },
                  animation: {
                     name: "goodGuyWalk",
                     path: "goodguy/walkright/good-guy-walk_"
                  }
               },
               {
                  health: 1,
                  x: TDG.GAME_WIDTH * .42,
                  y: TDG.GAME_HEIGHT * .75,
                  move: function(goodGuyInstance) {
                     moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
                  },
                  animation: {
                     name: "goodGuyWalk",
                     path: "goodguy/walkright/good-guy-walk_"
                  }
               }
            ],
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
            bgwaves: {
               totalWaves: 1,
               startTimes: [0],
               bgStartConfigs: [
                  [200, -100, 1, 80, 0],
                  [200, 100, 1, 80, 0],
                  [-200, 200, 1, 80, 0]
               ],
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .5,
               y: TDG.GAME_HEIGHT * .8,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               },
               animation: {
                  name: "goodGuyWalk",
                  path: "goodguy/walkright/good-guy-walk_"
               }
            }],
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
            bgwaves: {
               totalWaves: 1,
               startTimes: [0],
               bgStartConfigs: [
                  [250, -100, 1, 80, 0],
                  [250, 100, 1, 80, 0],
                  [-250, 250, 1, 80, 0],
                  [-250, -250, 1, 80, 0]
               ],
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .6,
               y: TDG.GAME_HEIGHT * .7,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               },
               animation: {
                  name: "goodGuyWalk",
                  path: "goodguy/walkright/good-guy-walk_"
               }
            }],
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
            bgwaves: {
               totalWaves: 1,
               startTimes: [0],
               bgStartConfigs: [
                  [250, -250, 1, 80, 0],
                  [250, 200, 1, 80, 0],
                  [-250, 250, 1, 80, 0],
                  [-250, -300, 1, 80, 0],
                  [-250, 0, 1, 80, 0]
               ],
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .7,
               y: TDG.GAME_HEIGHT * .7,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .6);
               },
               animation: {
                  name: "goodGuyWalk",
                  path: "goodguy/walkright/good-guy-walk_"
               }
            }],
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
            bgwaves: {
               totalWaves: 1,
               // seconds into game play to start wave. If a wave start time is not provided, defaults to 3.
               startTimes: [0],
               // bad guy spawn points, for each wave
               bgStartConfigs: [
                  [600, 10, 1, 82, 0],
                  [650, -200, 1, 82, 0],
                  [650, 200, 1, 82, 0],
                  [-650, 250, 1, 82, 0],
                  [-650, -300, 1, 82, 0],
                  [-650, 0, 1, 82, 0]
               ],
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .5,
               y: TDG.GAME_HEIGHT * .65,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, 0);
               },
               animation: {
                  name: "goodGuyStatic",
                  path: "goodguy/static/good-guy-static_"
               }
            }],
            scoring: {
               two: {
                  maxShotsFired: 8,
                  maxDuration: 8
               },
               three: {
                  maxShotsFired: 6,
                  maxDuration: 7
               }
            },
            background: background1
         },
         6: {
            bgwaves: {
               totalWaves: 3,
               // seconds into game play to start wave. If a wave start time is not provided, defaults to 3.
               startTimes: [0, 3, 6, 8, 9, 12],
               // bad guy spawn points, for each wave
               bgStartConfigs: [
                  [250, -100, 1, 50, 0],
                  [250, 250, 1, 50, 0],
                  [-250, 200, 1, 50, 0]
               ],
               getWaveStartTimes: function() {
                  var startTimesCollected = [];
                  for (var i = 0; i < this.totalWaves; i++) {
                     var waveStartTime = this.startTimes[i];
                     if (waveStartTime == undefined) {
                        if (startTimesCollected[i - 1] != undefined) {
                           // defaults to last time plus 3
                           waveStartTime = startTimesCollected[i - 1] + 3;
                        } else {
                           waveStartTime = 3;
                        }
                     }
                     startTimesCollected.push(waveStartTime);
                  }
                  return startTimesCollected;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  if (waveCount === 1) {
                     if (badGuyNumber === 0) {
                        bgConfig[0] = -150;
                        bgConfig[1] = -150;
                     } else if (badGuyNumber === 1) {
                        bgConfig[0] = -30;
                        bgConfig[1] = -150;
                     } else {
                        bgConfig[0] = 130;
                        bgConfig[1] = -150;
                     }
                  } else if (waveCount === 2) {
                     if (badGuyNumber === 0) {
                        bgConfig[0] = 100;
                        bgConfig[1] = 100;
                     } else if (badGuyNumber === 1) {
                        bgConfig[0] = 30;
                        bgConfig[1] = -150;
                     } else {
                        bgConfig[0] = 150;
                        bgConfig[1] = -150;
                     }
                  }
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .5,
               y: TDG.GAME_HEIGHT * .7,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, 0);
               },
               animation: {
                  name: "goodGuyStatic",
                  path: "goodguy/static/good-guy-static_"
               }
            }],
            scoring: {
               two: {
                  maxShotsFired: 12,
                  maxDuration: 12
               },
               three: {
                  maxShotsFired: 9,
                  maxDuration: 9
               }
            },
            background: background1
         },
         7: {
            bgwaves: {
               totalWaves: 5,
               startTimes: [0, 1, 3, 4, 5],
               bgStartConfigs: [
                  [580, 300, 1, 200, 0]
               ],
               velocityCorrectionRate: 1,
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  if (waveCount === 1) {
                     bgConfig[0] = -1100;
                     bgConfig[1] = 180;
                  } else if (waveCount === 2) {
                     bgConfig[0] = 900;
                     bgConfig[1] = -100;
                  }
                  if (waveCount === 3) {
                     bgConfig[0] = -1100;
                     bgConfig[1] = 180;
                  }
                  if (waveCount === 4) {
                     bgConfig[0] = -1100;
                     bgConfig[1] = -400;
                  }
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .5,
               y: TDG.GAME_HEIGHT * .7,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .3);
               },
               animation: {
                  name: "goodGuyWalk",
                  path: "goodguy/walkright/good-guy-walk_"
               }
            }],
            scoring: {
               two: {
                  maxShotsFired: 7,
                  maxDuration: 11
               },
               three: {
                  maxShotsFired: 5,
                  maxDuration: 9
               }
            },
            background: background1
         },
         8: {
            bgwaves: {
               totalWaves: 3,
               startTimes: [0, 1, 3],
               bgStartConfigs: [
                  [580, 300, 1, 200, 0],
                  [-580, -300, 1, 100, 0],
                  [-580, 300, 1, 100, 1]
               ],
               velocityCorrectionRate: 1,
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  if (waveCount === 1) {
                     bgConfig[0] = -1100;
                     bgConfig[1] = 180;
                  } else if (waveCount === 2) {
                     bgConfig[0] = 900;
                     bgConfig[1] = -100;
                  } else if (waveCount === 3) {
                     bgConfig[0] = -1100;
                     bgConfig[1] = 180;
                  }
                  return bgConfig;
               }
            },
            goodGuys: [{
                  health: 1,
                  x: TDG.GAME_WIDTH * .3,
                  y: TDG.GAME_HEIGHT * .7,
                  move: function(goodGuyInstance) {
                     moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .3);
                  },
                  animation: {
                     name: "goodGuyWalk",
                     path: "goodguy/walkright/good-guy-walk_"
                  }
               },
               {
                  health: 1,
                  x: TDG.GAME_WIDTH * .8,
                  y: TDG.GAME_HEIGHT * .7,
                  move: function(goodGuyInstance) {
                     moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED * .3);
                  },
                  animation: {
                     name: "goodGuyWalk",
                     path: "goodguy/walkright/good-guy-walk_"
                  }
               }
            ],
            scoring: {
               two: {
                  maxShotsFired: 15,
                  maxDuration: 18
               },
               three: {
                  maxShotsFired: 9,
                  maxDuration: 12
               }
            },
            background: background1
         },
         9: {
            bgwaves: {
               totalWaves: 6,
               startTimes: [0, 1, 3, 5, 6, 15],
               bgStartConfigs: [
                  [570, 300, 1, 100, 0],
                  [590, 300, 1, 100, 0],
                  [610, 300, 1, 100, 0],
                  [630, 300, 1, 100, 0],
               ],
               velocityCorrectionRate: 1,
               getWaveStartTimes: function() {
                  return this.startTimes;
               },
               waveCustomizations: function(bgConfig, waveCount, badGuyNumber) {
                  if (waveCount === 1) {
                     bgConfig[0] = -bgConfig[0] - 100;
                     bgConfig[1] = -bgConfig[1] - 100;
                  } else if (waveCount === 2) {
                     bgConfig[0] = -2000;
                     bgConfig[1] = 0;
                     bgConfig[3] = 150;
                  } else if (waveCount === 3) {
                     bgConfig[0] = -2000;
                     bgConfig[1] = 0;
                     bgConfig[3] = 130;
                  } else if (waveCount === 4) {
                     bgConfig[0] = bgConfig[0] - 500;
                     bgConfig[1] = bgConfig[0];
                     bgConfig[3] = 150;
                  } else if (waveCount === 5) {
                     bgConfig[0] = bgConfig[0] - 500;
                     bgConfig[1] = bgConfig[0];
                     bgConfig[3] = 150;
                  }
                  return bgConfig;
               }
            },
            goodGuys: [{
               health: 1,
               x: TDG.GAME_WIDTH * .3,
               y: TDG.GAME_HEIGHT * .7,
               move: function(goodGuyInstance) {
                  moveGoodGuy(goodGuyInstance, TDG.BASE_SPEED);
               },
               animation: {
                  name: "goodGuyWalk",
                  path: "goodguy/walkright/good-guy-walk_"
               }
            }],
            scoring: {
               two: {
                  maxShotsFired: 30,
                  maxDuration: 21
               },
               three: {
                  maxShotsFired: 25,
                  maxDuration: 16
               }
            },
            background: background1
         },
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