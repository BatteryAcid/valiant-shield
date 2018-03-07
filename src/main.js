(function() {
   var Main = function() {};
   Main.prototype = {
      preload: function() {},
      create: function() {
         //TODO: set this up as part of level setup function TBD
         this.debugText = "";
         this.zoom = new TDG.Zoom(this.game);
         this.levels = new TDG.Levels(this.game);
         this.levelManager = new TDG.LevelManager();

         // add in order of desired layer
         var background = this.game.add.image(0, TDG.GAME_HEIGHT, 'background');
         background.width = TDG.GAME_WIDTH;
         background.height = TDG.GAME_HEIGHT;
         background.anchor.y = 1;

         this.badGuys = new TDG.BadGuys(this.game, this.levels);
         this.bullets = new TDG.Bullets(this.game);

         //had to create this group so that the bullets appear on top of background
         this.gameGroup = this.game.add.group();
         this.goodGuy = new TDG.GoodGuy(this.game, this.zoom);

         this.gameGroup.add(this.bullets.getBulletGroup());
         this.gameGroup.add(this.badGuys.getBadGuyGroup());

         this.badGuys.setupBadGuysForLevel(this.levelManager.getSelectedLevel());

         this.scope = new TDG.Scope(this.game);
         this.input = new TDG.Input(this.game, this.zoom, this.bullets, this.scope);
         this.game.input.onTap.add(this.input.onTap.bind(this.input));

         var buttonHeightY = TDG.GAME_HEIGHT * .08;
         var buttonScale = buttonHeightY / 90;
         var quitButton = this.game.add.button(TDG.GAME_WIDTH * .08, TDG.GAME_HEIGHT * .05, 'button', this.goMainMenu,
            this, 2, 1, 0);
         quitButton.scale.setTo(buttonScale, buttonScale);
         quitButton.anchor.setTo(0.5, 0.5);
      },
      goMainMenu: function() {
         this.game.state.start('main-menu', true, false, TDG.LEVEL_START_STATE);
      },
      badGuyHit: function(sprite1, sprite2) {
         console.log("bad guy hit");
         // remove bullet and bad guy
         sprite1.kill();
         sprite2.kill();

         if (this.badGuys.badGuysDefeated() === true) {
            this.game.state.start('main-menu', true, false, TDG.LEVEL_COMPLETE_STATE);
            this.levelComplete();
         }
      },
      goodGuyHit: function() {
         //TODO: pass level failed param  
         console.log("good guy hit");
         this.game.state.start('main-menu', true, false, TDG.LEVEL_FAILED_STATE);
         this.levelComplete();
      },
      levelComplete: function() {
         if (TDG.ZOOMED_IN === true) {
            this.zoom.zoomTo(1, null);
            TDG.ZOOMED_IN = false;
         }
         this.levelManager.setMaxLevel();
      },
      update: function() {
         if (!this.levelManager.levelEnded(this.goodGuy.currentHeight())) {
            this.goodGuy.move();
            this.badGuys.pursueGoodGuy(this.goodGuy);
         } else {
            this.game.state.start('main-menu', true, false, TDG.LEVEL_COMPLETE_STATE);
         }

         this.game.physics.arcade.overlap(
            this.badGuys.getBadGuyGroup(), this.bullets.getBulletGroup(), this.badGuyHit, null, this
         );

         this.game.physics.arcade.collide(
            this.badGuys.getBadGuyGroup(), this.goodGuy.getGoodGuyInstance(), this.goodGuyHit, null, this
         );

         //scales bullet's hitbox based on zoom 
         this.bullets.getBulletGroup().forEach(function(bullet) {
            if (TDG.ZOOMED_IN === false) {
               bullet.body.setSize(10, 10, 5, 5);
            } else {
               bullet.body.setSize(50, 50, -20, -20);
            }
         }, this.game.physics);
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