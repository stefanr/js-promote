/*
 * Gulpfile
 */
require("babel/register");
process.env.BABEL_ENV = "gulp";

var gulp = require("gulp");

var babelOptions;
try {
  babelOptions = JSON.parse(require("fs").readFileSync(".babelrc", "utf8"));
} catch (err) {
  babelOptions = {};
  console.error("Error parsing .babelrc", err);
}

gulp.task("default", ["transpile"]);

gulp.task("transpile", ["build-cjs", "build-amd", "build-es6"]);

gulp.task("build-cjs", function () {
  var babel = require("gulp-babel");
  var options = Object.assign({}, babelOptions, {
    modules: "common",
  });
  return (gulp.src(["src/**/*.js"])
    .pipe(babel(options))
    .pipe(gulp.dest("dist/cjs"))
  );
});

gulp.task("build-amd", function () {
  var babel = require("gulp-babel");
  var options = Object.assign({}, babelOptions, {
    modules: "amd",
  });
  return (gulp.src(["src/**/*.js"])
    .pipe(babel(options))
    .pipe(gulp.dest("dist/amd"))
  );
});

gulp.task("build-es6", function () {
  var babel = require("gulp-babel");
  var options = Object.assign({}, babelOptions, {
    blacklist: [
      "es6",
    ],
  });
  return (gulp.src(["src/**/*.js"])
    .pipe(babel(options))
    .pipe(gulp.dest("dist/es6"))
  );
});

gulp.task("watch", function () {
  gulp.watch(["src/**/*.js"], ["transpile"]);
});
