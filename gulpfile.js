const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const del = require('del');
const uglify = require('gulp-uglify');
const testEnvJson = require('./test-env.json');

const babelOptions = {
  presets: ['env'],
  plugins: ["transform-object-rest-spread", "transform-es2015-parameters"]
};

gulp.task('cleanDev', () => del('./dist'));

gulp.task('compile', ['cleanDev'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(babel(babelOptions))
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', ['compile'], function () {
  return nodemon({
    script: 'dist/app.js', // run ES5 code
    watch: 'src', // watch ES2015 code
    tasks: ['compile'], // compile synchronously onChange
    env: testEnvJson
  });
});