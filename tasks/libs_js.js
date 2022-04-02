const plugins = [
    'src/libs/js/bootstrap.min.js',
    'src/libs/js/jquery-3.6.0.min.js',
    'src/libs/js/jquery-ui.min.js',
    'src/libs/js/datepicker-ru.js',
    'src/libs/js/moment.js',
    'src/libs/js/daterangepicker.js',
    'src/libs/js/swiper.js',
];
const {
    src,
    dest
} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const chalk = require('chalk');

module.exports = function libs_js(done) {
    if (plugins.length > 0)
        return src(plugins)
            .pipe(map.init())
            .pipe(uglify())
            .pipe(concat('libs.min.js'))
            .pipe(map.write('../sourcemaps'))
            .pipe(dest('build/js/'))
    else {
        return done(console.log(chalk.redBright('No added JS plugins')));
    }
}