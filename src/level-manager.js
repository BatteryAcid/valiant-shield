(function() {
   var LevelManager = function(game) {
      this.levels = new TDG.Levels(game);
      this.levelHeight = 50;

      this.getLevelCount = function() {
         return Object.keys(this.levels.getLevels()).length;
      }
      this.getPageCount = function() {
         return 2;
      }
      this.getColumns = function() {
         return 5;
      }
      this.getRows = function() {
         return 3;
      }
      this.initStars = function() {
         var stars = [];
         // the first level has zero stars, to it's playable although not finished
         stars[0] = 0
         // the remaining levels have -1 stars, this means they are still locked
         for (var l = 1; l < this.getColumns() * this.getRows() * this.getLevelCount(); l++) {
            stars[l] = -1;
         }

         localStorage.setItem(this.getLocalStorageName(), stars.toString());
      }
      this.getStars = function() {
         var savedData = this.getSavedData();
         return savedData.split(",");
      }
      this.getLocalStorageName = function() {
         return "levelselect";
      }
      this.getSelectedLevelLocalStorageKey = function() {
         return "selectedLevel";
      }
      this.getLevelColor = function(levelNum) {
         return this.levels.getLevels()[levelNum].menuColor;
      }
      this.getSavedData = function() {
         if (localStorage.getItem(this.getLocalStorageName()) == null) {
            this.initStars();
         }
         return localStorage.getItem(this.getLocalStorageName());
      }
      this.getStarRatingForLevel = function(levelNum) {
         return parseInt(this.getStars()[levelNum]) + 1;
      }
      this.setSelectedLevel = function(selectedLevel) {
         localStorage.setItem(this.getSelectedLevelLocalStorageKey(), selectedLevel);
      }
      this.getSelectedLevel = function() {
         return localStorage.getItem(this.getSelectedLevelLocalStorageKey()) == null ? 0 :
            localStorage.getItem(this.getSelectedLevelLocalStorageKey());
      }
   };

   LevelManager.prototype = {
      setMaxLevel: function() {
         //flag current level as complete
         //TODO: will need to revisit for star rating
         var starsToUpdate = this.getStars();
         starsToUpdate[this.getSelectedLevel()] = 1;

         //update to next level, set to 0
         var nextLevel = parseInt(this.getSelectedLevel());
         if (parseInt(this.getSelectedLevel()) < this.getLevelCount() - 1) {
            nextLevel = parseInt(this.getSelectedLevel()) + 1;
            starsToUpdate[nextLevel] = 0;
         }

         localStorage.setItem(this.getLocalStorageName(), starsToUpdate.toString());
         this.setSelectedLevel(nextLevel);
      },
      levelEnded: function(goodGuyCurrentHeight) {
         if (goodGuyCurrentHeight > this.levelHeight) {
            return false;
         } else {
            return true;
         }
      }
   };

   TDG.LevelManager = LevelManager;
})();