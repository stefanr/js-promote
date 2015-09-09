/*
 * Gulpfile
 */
import gulp from "gulp";

gulp.task("build-cjs", () => {
  let babel = require("gulp-babel");
  return (gulp.src(["src/**/*.js"])
    .pipe(babel({
      modules: "common",
    }))
    .pipe(gulp.dest("dist/cjs"))
  );
});

gulp.task("build-amd", () => {
  let babel = require("gulp-babel");
  return (gulp.src(["src/**/*.js"])
    .pipe(babel({
      modules: "amd",
    }))
    .pipe(gulp.dest("dist/amd"))
  );
});

gulp.task("build-es6", () => {
  let babel = require("gulp-babel");
  return (gulp.src(["src/**/*.js"])
    .pipe(babel({
      blacklist: ["es6"],
    }))
    .pipe(gulp.dest("dist/es6"))
  );
});

gulp.task("build", [
  "build-cjs", "build-amd", "build-es6"
]);

gulp.task("watch", () => {
  gulp.watch(["src/**/*.js"], ["build"]);
});
