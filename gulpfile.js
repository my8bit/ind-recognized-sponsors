const gulp        = require('gulp');
const gutil       = require('gulp-util');
const source      = require('vinyl-source-stream');
const babelify    = require('babelify');
const watchify    = require('watchify'); watchify.args.debug = true;
const exorcist    = require('exorcist');
const browserify  = require('browserify');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const jscs        = require('gulp-jscs');
const bundler     = watchify(browserify('./client/src/js/app.js', watchify.args));
const cleanCSS    = require('gulp-clean-css');

bundler.transform(babelify.configure({
  sourceMapRelative: 'src/js'
}));

bundler.on('update', bundle);

function bundle() {
  gutil.log('Compiling JS...');
  return bundler.bundle()
    .on('error', err => {
      gutil.log(err.message);
      browserSync.notify('Browserify Error!');
      this.emit('end');
    })
    .pipe(exorcist('./client/dist/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/dist/js'))
    .pipe(browserSync.stream({once: true}));
}

gulp.task('bundle', () => { return bundle(); });

gulp.task('build-css', ['sass'], function() {
  return gulp.src('./client/dist/css/*.css')
    .pipe(gulp.dest('./client/dist/css'));
});

gulp.task('build-html', function() {
  return gulp.src('./client/src/index.html')
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('build-data', function() {
  return gulp.src(['./client/data/recognized-sponsors-data.json'])
    .pipe(gulp.dest('./client/dist/data'));
});

gulp.task('build', [
  'build-js',
  'build-css',
  'build-html',
  'build-data',
], () => { });

gulp.task('build-js', () => {
  return browserify('./client/src/js/app.js')
    .transform(babelify.configure({
      sourceMapRelative: 'src/js'
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/dist/js'));
});

gulp.task('jscs', () => {
  return gulp.src('./client/src/js/**/*.js')
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task('sass', () => {
  return gulp.src('./client/src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch-sass', () => {
  return gulp.watch(['./client/src/sass/**/*.scss',
    './client/index.html'], ['sass']);
});

gulp.task('watch-jscs', () => {
  return gulp.watch(('./client/src/js/**/*.js'), ['jscs']);
});

gulp.task('default', ['bundle','sass', 'watch-sass', 'watch-jscs'], () => {
  browserSync.init({
    server: './client'
  });
});
