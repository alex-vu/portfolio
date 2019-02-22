/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define Tasks
    gulp.src - Points to file to use
    gulp.dest - Points to folder output
    gulp.watch - Watch files and folders for changes

*/
const local = "localhost/tv7d";

const gulp = require("gulp");
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const minifyCSS = require("gulp-minify-css");
const minifyJS = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const pump = require("pump");
const browserSync = require("browser-sync").create();

const inputSass = "src/sass/*.scss";
const outputSass = "assets/css";
const inputJS = "src/js/*.js";
const outputJS = "assets/js";

let sassOptions = {
  errLogToConsole: true,
  outputStyle: "expanded"
};

// Compile sass files to css and minimize file
gulp.task("sass", function() {
  gulp
    .src(inputSass)
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(rename("main.min.css"))
    .pipe(minifyCSS())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest(outputSass));
});

// Minify JS
gulp.task("scripts", function(cb) {
  pump(
    [gulp.src(inputJS), concat("main.min.js"), minifyJS(), gulp.dest(outputJS)],
    cb
  );
});

// Browsersync
gulp.task("browsersync", function() {
  browserSync.init({
    proxy: local
  });
});

// Watch files for changes
gulp.task("watch", function() {
  // scripts
  gulp.watch("src/js/*.js", ["scripts"]);
  // sass
  gulp.watch("src/sass/*.scss", ["sass"]);
  gulp.watch("src/sass/abstracts/*.scss", ["sass"]);
  gulp.watch("src/sass/base/*.scss", ["sass"]);
  gulp.watch("src/sass/components/*.scss", ["sass"]);
  gulp.watch("src/sass/layouts/*.scss", ["sass"]);
  gulp.watch("src/sass/pages/*.scss", ["sass"]);
  gulp.watch("src/sass/vendors/bootstrap/*.scss", ["sass"]);
  gulp.watch("src/sass/vendors/bootstrap/mixins/*.scss", ["sass"]);
  gulp.watch("src/sass/vendors/bootstrap/utilities/*.scss", ["sass"]);
  gulp.watch("src/sass/vendors/fontawesome/*.scss", ["sass"]);
});
