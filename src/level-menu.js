(function() {
   var LevelMenu = function(game) {
      this.game = game;
      this.levelManager = new TDG.LevelManager(game);
      var WORKING_WIDTH = TDG.GAME_WIDTH * .9;
      var WORKING_HEIGHT = TDG.GAME_HEIGHT * .9;

      this.getWorkingWidth = function() {
         return WORKING_WIDTH;
      }
      this.getWorkingHeight = function() {
         return WORKING_HEIGHT;
      }
   };

   LevelMenu.prototype = {
      preload: function() {
         this.game.load.spritesheet("levelthumb", "images/levelthumb.png", 180, 180);
         this.game.load.image("transp", "images/transp.png");
         this.game.load.image("level-select-header", "images/level-select-header.png");
      },
      create: function() {
         // columns of thumbnails in each page
         var columns = this.levelManager.getColumns();
         // rows of thumbnails in each page
         var rows = this.levelManager.getRows();
         // thumbnail width, in pixels
         var actualThumbWidth = 64;
         // space needed for title
         var titleSpace = TDG.GAME_HEIGHT * .01;
         var stars = [];
         // local storage name
         var localStorageName = "levelselect";
         // level we are currently playing
         var level;

         var scaleRatio = (this.getWorkingWidth() / (actualThumbWidth * columns)) * .25;
         var thumbWidth = (scaleRatio) * actualThumbWidth;
         var thumbHeight = (scaleRatio) * actualThumbWidth;
         var spacingX = (this.getWorkingWidth() - (columns * thumbWidth)) / (columns - 1) * .6;
         var spacingY = ((this.getWorkingHeight() - titleSpace) - (rows * thumbHeight)) / (rows - 1) * .6;

         this.game.stage.backgroundColor = "#647883";
         var levelSelectHeader = this.game.add.image(TDG.GAME_WIDTH / 2, 50 * scaleRatio,
            "level-select-header");
         levelSelectHeader.anchor.set(0.5);
         levelSelectHeader.scale.setTo(1 * scaleRatio, 1 * scaleRatio);

         this.pageText = this.game.add.text(this.getWorkingWidth() * .99, TDG.GAME_HEIGHT * .9,
            "1 / " +
            this.levelManager.getPageCount(), {
               font: (scaleRatio * 50) + "px Arial",
               fill: "#ffffff"
            });
         this.pageText.anchor.set(0.5);

         this.scrollingMap = this.game.add.tileSprite(0, 0, this.levelManager.getPageCount() * this.getWorkingWidth(),
            this.getWorkingHeight(),
            "transp");
         this.scrollingMap.inputEnabled = true;
         this.scrollingMap.input.enableDrag(false);
         this.scrollingMap.input.allowVerticalDrag = false;
         this.scrollingMap.input.boundsRect = new Phaser.Rectangle(this.getWorkingWidth() - this.scrollingMap.width,
            this.getWorkingHeight() -
            this.scrollingMap.height, this.scrollingMap.width * 2 - this.getWorkingWidth(), this.scrollingMap
            .height *
            2 - this.getWorkingHeight());
         this.currentPage = 0;

         var rowLength = (thumbWidth * columns) + (spacingX * (columns - 1));
         var leftMargin = (this.getWorkingWidth() - rowLength) / 2;
         var colHeight = (thumbHeight * rows) + (spacingY * (rows - 1));
         var topMargin = ((this.getWorkingHeight() - colHeight) / 2) + titleSpace;

         for (var k = 0; k < this.levelManager.getPageCount(); k++) {
            for (var i = 0; i < columns; i++) {
               for (var j = 0; j < rows; j++) {

                  var thumb = this.game.add.image(k * this.getWorkingWidth() + leftMargin + i * (thumbWidth +
                        spacingX),
                     topMargin + j * (thumbHeight + spacingY), "levelthumb");

                  thumb.levelNumber = k * (rows * columns) + j * columns + i;

                  // assigning each thumbnail a frame according to its stars value
                  thumb.frame = this.levelManager.getStarRatingForLevel(thumb.levelNumber);

                  //restrict numbers to unlocked levels
                  if (thumb.frame > 0) {
                     var levelText = this.game.add.text(5, 0, thumb.levelNumber, {
                        font: (thumb.height * .45) + "px Comic Sans MS",
                        fill: "#fff200",
                        stroke: "black",
                        strokeThickness: 10
                     });

                     var leftOverWidth = thumbWidth - levelText.width;

                     if (thumb.levelNumber < 10) {
                        levelText.x = thumb.height * .65 / 2;
                     } else {
                        levelText.x = thumb.height * .40 / 2;
                     }
                     thumb.addChild(levelText);
                  }

                  thumb.scale.setTo(1 * scaleRatio, 1 * scaleRatio);

                  this.scrollingMap.addChild(thumb);
               }
            }
         }

         this.scrollingMap.events.onDragStart.add(function(sprite, pointer) {
            this.scrollingMap.startPointerPosition = new Phaser.Point(pointer.x, pointer.y);
            this.scrollingMap.startPosition = this.scrollingMap.x;
         }, this);

         this.scrollingMap.events.onDragStop.add(function(event, pointer) {
            if (this.scrollingMap.startPosition == this.scrollingMap.x && this.scrollingMap.startPointerPosition
               .x == pointer.x && this.scrollingMap.startPointerPosition.y == pointer.y) {
               for (i = 0; i < this.scrollingMap.children.length; i++) {
                  var bounds = this.scrollingMap.children[i].getBounds();
                  // before we start a level, let's check the level is not locked that means it's not on frame zero  
                  if (bounds.contains(pointer.x, pointer.y) && this.scrollingMap.children[i].frame > 0) {
                     level = this.scrollingMap.children[i].levelNumber;
                     this.levelManager.setSelectedLevel(level);
                     this.levelManager.setNextLevel(level);
                     this.game.state.start("main");
                     break;
                  }
               }
            } else {
               if (this.scrollingMap.startPosition - this.scrollingMap.x > this.getWorkingWidth() / 8) {
                  this.changePage(1);
               } else {
                  if (this.scrollingMap.startPosition - this.scrollingMap.x < -this.getWorkingWidth() /
                     8) {
                     this.changePage(-1);
                  } else {
                     this.changePage(0);
                  }
               }
            }
         }, this);

         // return to main menu button 
         var buttonHeightY = TDG.GAME_HEIGHT * .02;
         var buttonScale = buttonHeightY / 71;
         var mainMenuButton = this.game.add.button(TDG.GAME_WIDTH * .12, TDG.GAME_HEIGHT * .08, 'back-button',
            this
            .goMainMenu, this, 2, 1, 0);
         mainMenuButton.scale.setTo(buttonScale, buttonScale);
         mainMenuButton.anchor.setTo(0.5, 0.5);
      },
      goMainMenu: function() {
         this.game.state.start('main-menu', true, false);
      },
      changePage: function(page) {
         this.currentPage += page;
         this.pageText.text = (this.currentPage + 1).toString() + " / " +
            this.levelManager.getPageCount();
         var tween = this.game.add.tween(this.scrollingMap).to({
            x: this.currentPage * -this.getWorkingWidth()
         }, 300, Phaser.Easing.Cubic.Out, true);
      },
      render: function() {}
   };

   TDG.LevelMenu = LevelMenu;
})();