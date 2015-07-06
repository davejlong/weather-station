var gulp = require("gulp"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync");

var reload = browserSync.reload;

gulp.task("serve", ["images", "stylesheets"], function () {
  browserSync({ server: "." });

  gulp.watch("src/images", ["images"]);
  gulp.watch("scss/*.scss", ["stylesheets"]);
  gulp.watch("**/*.html").on("change", reload);
  gulp.watch("js/**/*.js").on("change", reload);
});

gulp.task("images", function () {
  return gulp.src("src/images/*")
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest("images"))
    .pipe(reload({ stream: true }));
});

gulp.task("stylesheets", function () {
  return gulp.src("scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ["bower_components/foundation/scss"],
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"))
    .pipe(reload({ stream: true }));
});

gulp.task("default", ["serve"]);
