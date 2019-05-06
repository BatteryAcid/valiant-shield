(function() {
   var BadGuys = function(game, levels, deadGroup) {
      var badGuyGroup = game.add.group();
      badGuyGroup.enableBody = true;
      badGuyGroup.physicsBodyType = Phaser.Physics.ARCADE;
      var currentWave = 0;
      var totalBadGuys;
      var badGuyWaveConfigs;
      var velocityCorrectionRate = 3;

      function waves(bgwaves, goodGuys) {
         totalBadGuys = bgwaves.totalWaves * bgwaves.bgStartConfigs.length;
         badGuyWaveConfigs = levels.getBadGuyWaves(bgwaves);
         var waveStartTimes = bgwaves.getWaveStartTimes();
         if (bgwaves.velocityCorrectionRate) {
            velocityCorrectionRate = bgwaves.velocityCorrectionRate;
         }

         for (var i = 0; i < badGuyWaveConfigs.length; i++) {
            scheduleBadGuyWave(badGuyWaveConfigs[i], waveStartTimes[i], goodGuys);
         }
         pursueGoodGuys();
      }

      function pursueGoodGuys() {
         function executePursueGoodGuys() {
            for (var i = 0; i < badGuyGroup.getAll().length; i++) {
               //prevents the velocity and walk animation from happening before the start animation is complete
               if (badGuyGroup.getAll()[i].startAnimationComplete === true) {
                  setBadGuyVelocity(badGuyGroup.getAll()[i], badGuyGroup.getAll()[i].speed);
                  playWalkAnimation(badGuyGroup.getAll()[i], badGuyGroup.getAll()[i].body.velocity.x);
               }
            }
         }
         
         // TODO: Look into making this repeat until game ends.
         game.time.events.repeat(Phaser.Timer.SECOND * velocityCorrectionRate, 20, executePursueGoodGuys, this);
      }

      function scheduleBadGuyWave(badGuyWave, waveStartTimeSeconds, goodGuys) {
         game.time.events.add(Phaser.Timer.SECOND * waveStartTimeSeconds, function() {
            for (var i = 0; i < badGuyWave.length; i++) {
               // each one is a bad guy object
               setupBadGuy(badGuyWave[i], goodGuys);
            }
         }, this);
      }

      function setupBadGuy(badGuyConfig, goodGuys) {
         var badGuyStartX = levels.badGuyStartLocationX(goodGuys[badGuyConfig.goodGuyChaseIndex].x,
            badGuyConfig.xGoodGuyOffset);

         var badGuyStartY = levels.badGuyStartLocationY(goodGuys[badGuyConfig.goodGuyChaseIndex].y,
            badGuyConfig.yGoodGuyOffset);

         var badGuy = badGuyGroup.create(badGuyStartX, badGuyStartY, "scene");

         badGuy.scale.setTo(TDG.GAME_SCALE_Y * .25);

         // on kill 
         badGuy.events.onKilled.add(onBadGuyKilled);

         // set health
         badGuy.health = badGuyConfig.health;

         // set good guy to pursue
         badGuy.goodGuyToPursue = goodGuys[badGuyConfig.goodGuyChaseIndex];

         // speed
         badGuy.speed = badGuyConfig.speed * TDG.GB_SPEED_OFFSET;
         badGuy.velocityCorrectionRate =

         // init body to zero to prevent spawn-killing of good guy
         badGuy.body.setSize(0, 0);

         addAnimations(badGuy);

         var startAnimation = addStartAnimation(badGuy, badGuyConfig.xGoodGuyOffset);
         startAnimation.onComplete.add(function() {
            // after ground emerge, set initial velocity, kickoff walk
            setBadGuyVelocity(badGuy, badGuy.speed);
            playWalkAnimation(badGuy, badGuy.body.velocity.x);
            badGuy.startAnimationComplete = true;
            // this magical setting always sets the body to match the dimensions of the body width/height
            // good for maintaining body size between zooms.
            badGuy.body.syncBounds = true;
         });
         playStartAnimation(badGuy, startAnimation.name);
      }

      this.setupBadGuysForLevel = function(levelNumber, goodGuys) {
         this.levelConfigs = levels.getLevelConfigs(levelNumber);
         waves(this.levelConfigs.bgwaves, goodGuys);
      }

      function onBadGuyKilled(deadBadGuy) {
         var badGuyKillSprite = game.add.sprite(deadBadGuy.x, deadBadGuy.y, "scene");
         badGuyKillSprite.anchor.setTo(0.0, -0.5);
         badGuyKillSprite.animations.add('badguykill',
            Phaser.Animation.generateFrameNames('badguy/kill/bad-guy-kill_', 1, 5, '.png', 2),
            10, true, false);
         badGuyKillSprite.animations.play('badguykill', 30, false);
         badGuyKillSprite.scale.setTo(TDG.GAME_SCALE_Y * .25);
         //makes the dead bodies appear in correct layer
         deadGroup.add(badGuyKillSprite);
      }

      function playStartAnimation(badGuy, name) {
         badGuy.animations.play(name, 10, false);
      }

      function playWalkAnimation(badGuy, direction) {
         if (direction < 0) {
            badGuy.animations.play('badguyleft', 30, true);
         } else {
            badGuy.animations.play('badguyright', 30, true);
         }
      }

      function setBadGuyVelocity(singleEnemy, badGuyChaseSpeed) {
         game.physics.arcade.moveToObject(singleEnemy, singleEnemy.goodGuyToPursue, badGuyChaseSpeed);
      }

      function addAnimations(badGuy) {
         badGuy.animations.add('badguyright',
            Phaser.Animation.generateFrameNames('badguy/walkright/', 1, 8, '.png', 2), 10, true,
            false
         );
         badGuy.animations.add('badguyleft',
            Phaser.Animation.generateFrameNames('badguy/walkleft/', 1, 8, '.png', 2), 10, true,
            false
         );
      }

      function addStartAnimation(badGuy, direction) {
         if (direction < 0) {
            return badGuy.animations.add('badguyemergeleft',
               Phaser.Animation.generateFrameNames("badguy/emergeleft/badguy-emerge_", 1, 8, '.png', 2), 10,
               true,
               false
            );
         } else {
            return badGuy.animations.add('badguyemergeright',
               Phaser.Animation.generateFrameNames("badguy/emergeright/badguy-emerge_", 1, 8, '.png', 2), 10,
               true,
               false
            );
         }
      }

      this.badGuysDefeated = function() {
         return badGuyGroup.countDead() === totalBadGuys;
      }

      this.getBadGuyGroup = function() {
         return badGuyGroup;
      }
   };

   BadGuys.prototype = {};

   TDG.BadGuys = BadGuys;
})();