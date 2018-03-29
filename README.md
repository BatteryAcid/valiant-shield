## Create dist for use in ionic app ##

- install gulp requirements.
> npm install --save-dev gulp gulp-concat gulp-rename gulp-uglify gulp-uglifycss del
- then run gulp that will setup everything.
> gulp

Note: you can also run the individual gulp commands for specific needs like `gulp uglify` to just process the source files, `gulp uglify-css` for the css, etc. See the gulpfile.js for all tasks.


## To use in Ionic app ##
- run the above `gulp` command to build the dist folder
- add the styles file to the head in Ionic's www/index.html:

```
#!html

<link rel="stylesheet" href="css/styles.min.css" />
```

- replace the index.html's body with the following:

```
#!html
<body>
    <script src="the-defender.min.js"></script>
</body>
```

- copy everything inside the `dist` folder to the root of the `www` ionic project folder. 
