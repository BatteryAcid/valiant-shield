//TODO: move level text down a little -  shows up too high on device
//TODO: need to add cooldown period after first zooming in to prevent spam zooming
//TODO: show quit while zoomed
//TODO: cartoonify the background images with photoshop?
// - set bad guys around map edge so player has time to react
// - dont send all bad guys at once, delay each guy but speed up his approach rate
// - bad guy should do dmg when next to good guy
// - good guy should try to avoid bad guys? maybe just set varying path
// - bad guys at different Y will be at different sizes
// - consider placing objects in reference to screen center point

(function() {
   var Main = function() {};
   Main.prototype = {
      preload: function() {},
      create: function() {
         this.debugText = "";
         this.levelStatus = undefined;
         this.zoom = new TDG.Zoom(this.game);
         this.levels = new TDG.Levels(this.game);
         this.levelManager = new TDG.LevelManager();

         this.started = false;

         // add in order of desired layer
         var background = this.game.add.image(0, TDG.GAME_HEIGHT, 'background');
         background.width = TDG.GAME_WIDTH;
         background.height = TDG.GAME_HEIGHT;
         background.anchor.y = 1;

         this.badGuys = new TDG.BadGuys(this.game, this.levels);
         this.bullets = new TDG.Bullets(this.game);

         //had to create this group so that the bullets appear on top of background
         this.gameGroup = this.game.add.group();
         this.gameGroup.add(this.bullets.getBulletGroup());
         this.gameGroup.add(this.badGuys.getBadGuyGroup());

         this.goodGuy = new TDG.GoodGuy(this.game, this.levels, this.levelManager.getNextLevel());
         this.badGuys.setupBadGuysForLevel(this.levelManager.getNextLevel());

         this.scope = new TDG.Scope(this.game);
         this.input = new TDG.Input(this.game, this.zoom, this.bullets, this.scope);
         this.game.input.onTap.add(this.input.onTap.bind(this.input));

         //quit button - actual size scaled down because it's actual size for pro screens is larger than necessary 
         var actualButtonHeight = 280 * .4;
         var buttonScale = (TDG.GAME_SCALE_Y * actualButtonHeight / 280);
         var quitButton = this.game.add.button(TDG.GAME_WIDTH * .07, TDG.GAME_HEIGHT * .05, 'quit-button',
            this.quitPlay, this, 2, 1, 0);
         quitButton.scale.setTo(buttonScale, buttonScale);
         quitButton.anchor.setTo(0.5, 0.5);

         //level configs set current level
         this.levelConfigs = this.levels.getLevelConfigs(this.levelManager.getNextLevel());
         this.levelManager.updateSelectedLevelToNextLevel();

         //intro text with start button
         if (this.levelConfigs.introText && this.levelConfigs.introText != '') {

            //intro backdrop
            var introBackdropScale = (TDG.GAME_HEIGHT * .8) / 1922;
            this.introBackdrop = this.game.add.image(TDG.GAME_WIDTH / 2, TDG.GAME_HEIGHT * .5,
               "intro-backdrop");
            this.introBackdrop.anchor.set(0.5);
            this.introBackdrop.scale.setTo(introBackdropScale, introBackdropScale);

            //intro text
            var textHeightY = TDG.GAME_HEIGHT * .08;
            var textScale = textHeightY / 80;
            var textSize = textScale * 80;
            this.titleText = this.game.make.text(this.game.world.centerX, TDG.GAME_HEIGHT * .4 + 20,
               this.levelConfigs.introText, {
                  font: textSize + "px Arial",
                  fill: '#FFCD3A',
                  align: 'center',
                  wordWrap: true,
                  wordWrapWidth: this.introBackdrop.width * .9
               });

            this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            this.titleText.anchor.set(0.5);
            this.game.add.existing(this.titleText);

            //good guy image
            this.goodGuyImage = this.game.add.sprite(TDG.GAME_WIDTH * .5, TDG.GAME_HEIGHT * .75, 'goodguy-walk');
            this.goodGuyImage.anchor.setTo(.5, .5);
            this.goodGuyImage.scale.setTo(1.5 * TDG.GAME_SCALE_Y);

            this.startGameButton = this.game.add.button(TDG.GAME_WIDTH * .5, this.introBackdrop.height * 1.07,
               'introstart-button',
               this.startGame,
               this, 2, 1, 0);
            this.startGameButton.scale.setTo(buttonScale, buttonScale);
            this.startGameButton.anchor.setTo(0.5, 0.5);
         } else {
            this.startGame();
         }

      },
      startGame: function() {
         if (this.startGameButton) {
            this.startGameButton.pendingDestroy = true;
         }
         if (this.titleText) {
            this.titleText.destroy();
         }
         if (this.introBackdrop) {
            this.introBackdrop.destroy();
         }
         if (this.goodGuyImage) {
            this.goodGuyImage.destroy();
         }
         this.started = true;
         this.startTime = new Date();
      },
      levelComplete: function(isLevelSuccess, levelState) {
         this.endTime = new Date();

         var starRating = -1;
         if (isLevelSuccess === true) {
            var secondsBetweenDates = this.getGamePlayDurationInSeconds();

            starRating = this.levels.getStarRating(this.levelConfigs.scoring, secondsBetweenDates, this.bullets
               .getFireCount());
         }
         this.levelManager.setMaxLevel(isLevelSuccess, starRating);

         var mainThis = this;
         setTimeout(function() {
            mainThis.resetZoom();

            //build star rating 
            var starsToShow = "";
            for (var i = 1; i <= 3; i++) {
               if (starRating >= 1 && i <= starRating) {
                  starsToShow += String.fromCharCode(9733) + " ";
               }
            }

            mainThis.game.state.start('main-menu', true, false, levelState, starsToShow);
         }, 1500);
      },
      getGamePlayDurationInSeconds: function() {
         var dif = this.startTime.getTime() - this.endTime.getTime();
         var secondsBetweenStartEndTimes = dif / 1000;
         return Math.abs(secondsBetweenStartEndTimes);
      },
      levelSuccess: function() {
         if (this.levelStatus !== "failed" || this.levelStatus !== "quit") {
            this.levelComplete(true, TDG.LEVEL_COMPLETE_STATE);
         }
      },
      levelFail: function() {
         if (this.levelStatus !== "quit") {
            this.levelComplete(false, TDG.LEVEL_FAILED_STATE);
         }
      },
      quitPlay: function() {
         this.levelStatus = "quit";
         this.resetZoom();
         this.game.state.start('main-menu', true, false, TDG.LEVEL_QUIT_STATE);
      },
      badGuyHit: function(badguy, bullet) {
         //console.log("bad guy hit");

         //TODO: create deadBadGuyGroup that renders behind alive badguys and good guys
         var badGuyKillSprite = this.game.add.sprite(badguy.x, badguy.y, "badguy-kill");
         badGuyKillSprite.anchor.setTo(0, 0);
         badGuyKillSprite.animations.add('badGuyKill');
         badGuyKillSprite.animations.play('badGuyKill', 30, false);
         badGuyKillSprite.scale.setTo(TDG.GAME_SCALE_Y * .25);
         //makes the dead bodies appear in correct layer
         this.gameGroup.add(badGuyKillSprite);

         // remove bullet and bad guy
         badguy.kill();
         bullet.kill();

         if (this.badGuys.badGuysDefeated() === true) {
            this.levelSuccess();
         }
      },
      goodGuyHit: function(goodGuyKilled, badguy) {
         //console.log("good guy hit");

         this.levelStatus = "failed";

         var goodGuyKillSprite = this.game.add.sprite(goodGuyKilled.x, goodGuyKilled.y, "goodguy-kill");
         goodGuyKillSprite.anchor.setTo(0, 0);
         goodGuyKillSprite.animations.add('goodGuyKill');
         goodGuyKillSprite.animations.play('goodGuyKill', 30, false);
         goodGuyKillSprite.scale.setTo(TDG.GAME_SCALE_Y * .25);
         //makes the dead bodies appear in correct layer
         this.gameGroup.add(goodGuyKillSprite);

         goodGuyKilled.kill();

         this.levelFail();
      },
      resetZoom: function() {
         if (TDG.ZOOMED_IN === true) {
            this.zoom.zoomTo(1, null);
            TDG.ZOOMED_IN = false;
         }
      },
      update: function() {
         if (this.started === true) {
            // check if good guy reached finish
            if (this.goodGuy.currentHeight() > this.levelConfigs.goodGuy.successY && this.goodGuy.currentWidth() <
               this.levelConfigs.goodGuy.successX) {
               this.goodGuy.move();
               this.badGuys.pursueGoodGuy(this.goodGuy);
            } else {
               this.levelSuccess();
            }

            this.game.physics.arcade.overlap(
               this.badGuys.getBadGuyGroup(), this.bullets.getBulletGroup(), this.badGuyHit, null, this
            );

            this.game.physics.arcade.collide(
               this.badGuys.getBadGuyGroup(), this.goodGuy.getGoodGuyInstance(), this.goodGuyHit, null,
               this
            );

            //scales bullet's hitbox based on zoom
            //TODO: consider moving this to a function within the bullet class
            this.bullets.getBulletGroup().forEach(function(bullet) {
               if (TDG.ZOOMED_IN === false) {
                  bullet.body.setSize(5, 5, 5, 5);
               } else {
                  bullet.body.setSize(50, 50, -15, -20);
               }
            }, this.game.physics);
         }
      },
      render: function() {
         //debug --------------------------------------------------------------
         // this.game.debug.cameraInfo(this.game.camera, 32, 32);
         // this.game.debug.text(this.game.input.activePointer.x, 32, 200);
         // this.game.debug.text(this.game.input.activePointer.worldX, 32, 220);
         // this.game.debug.body(this.goodGuy.getGoodGuyInstance());
         // this.badGuys.getBadGuyGroup().forEach(function(singleEnemy) {
         //    this.game.debug.body(singleEnemy);
         // }, this.game.physics);
         // this.bullets.getBulletGroup().forEach(function(bullet) {
         //    this.game.debug.body(bullet);
         // }, this.game.physics);
      }
   };

   TDG.Main = Main;
})();