var gulp = require('gulp');
var gulp_concat = require('gulp-concat');
var gulp_rename = require('gulp-rename');
var gulp_uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var del = require('del');

var destDir = './dist/'; //or any folder inside your public asset folder
var tempDir = './temp/'; //any place where you want to store the concatenated, but unuglified/beautified files
//To concat and Uglify All JS files in a particular folder
gulp.task('uglify', function() {
   //call all init first as it must be ran before other src
   return gulp.src(['./lib/*.js', './src/init.js', './src/*.js']) //Use wildcards to select all files in a particular folder or be specific
      .pipe(gulp_concat('concat.js')) //this will concat all the files into concat.js
      .pipe(gulp.dest(tempDir)) //this will save concat.js in a temp directory defined above
      .pipe(gulp_rename('the-defender.min.js')) //this will rename concat.js to uglify.js
      .pipe(gulp_uglify()) //this will uglify/minify uglify.js
      .pipe(gulp.dest(destDir)); //this will save uglify.js into destination Directory defined above
});

//moves all image assets to dist folder, removes all assets first.  Can move more things here if needed.
gulp.task('move_assets', ['clean:assets'], function() {
   // the base option sets the relative root for the set of files,
   // preserving the folder structure
   gulp.src(['./images/*'], {
         base: './'
      })
      .pipe(gulp.dest('dist/'));
});

gulp.task('clean:assets', function() {
   return del([
      'dist/images/**/*'
   ]);
});

//To Concat and Uglify all CSS files in a particular folder
gulp.task('uglify-css', function () {
  gulp.src('./css/*.css') //Use wildcards to select all files in a particular folder or be specific
  .pipe(gulp_concat('concat.css')) //this will concat all the source files into concat.css
        .pipe(gulp.dest(tempDir)) //this will save concat.css into a temp Directory
        .pipe(gulp_rename('styles.min.css')) //this will rename concat.css into uglify.css, but will not replace it yet.
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    })) //uglify uglify.css file
    .pipe(gulp.dest(destDir + '/css/')); //save uglify.css
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['uglify', 'uglify-css', 'move_assets']);
