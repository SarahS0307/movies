const { src, dest, watch, series } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function buildStyles() {
    return src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('assets/css'))
        .pipe(browserSync.stream());
}

function browserSyncTask() {
    browserSync.init({
        open: false,
        notify: false,
        files: ['**/*.php', './assets/css/*.css', '**/*.js'],
    });

    watch('./scss/**/*.scss', buildStyles);
}

exports.default = series(buildStyles, browserSyncTask);