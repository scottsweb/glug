/**
 * Settings
 *
 * Setup your project paths and requirements here
 */
var settings = {

	// path to JS - no tasks yet, workflow in progress
	// scriptspath: 'app/**/*.js',

	// path to main scss file
	scss: 'src/scss/style.scss',

	// path to output css file
	css: 'assets/css/style.css',

	// path to watch for changed scss files
	scsswatch: 'src/scss/**/*.scss',

	// path to output css folder
	csspath: 'assets/css/',

	// path to images
	imagespath: 'assets/images/',

	// path to html
	htmlpath: './',
	// partials: ['app/**/*.html', '!app/index.html'],

	// enable the static file server and browsersync
	// check for unused styles in static html? - seems buggy, requires html
	staticserver: true,
	checkunusedcss: false,

	// enable the proxied local server for browsersync
	// static above server must be disabled
	proxyserver: false,
	proxylocation: 'mysite.dev'

};

/**
 * Load node modules
 */
var autoprefixer = require('gulp-autoprefixer'),
	browserify = require( 'browserify' ),
	browsersync = require('browser-sync'),
	checkcss = require( 'gulp-check-unused-css' ),
	csscomb = require('gulp-csscomb'),
	filter = require('gulp-filter'),
	gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	minifycss = require('gulp-minify-css'),
	notify = require("gulp-notify"),
	parker = require('gulp-parker'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	reactify = require( 'reactify' ),
	sourcemaps = require('gulp-sourcemaps'),
	sync = require('gulp-config-sync'),
	watch = require('gulp-watch');

/**
 * Generic error handler used by plumber
 *
 * Display an OS notification and sound with error message
 */
var onError = function(err) {
	notify.onError({
		title:	"Gulp",
		message: "Error: <%= error.message %>\nLine: <%= error.lineNumber %>",
		sound:	"Sosumi"
	})(err);

	this.emit('end');
};

/**
 * Default Task
 *
 * Watch for changes and run tasks
 */
gulp.task('default', function() {

	// browsersync and local server
	// options: http://www.browsersync.io/docs/options/
	if (settings.staticserver) {
		browsersync({
			server: settings.htmlpath
		});

		// check to see if the CSS is being used
		if (settings.checkunusedcss) {
			gulp.watch(settings.css, ['checkcss']);
		}
	}

	if (settings.proxyserver) {
		browsersync({
			proxy: settings.proxylocation
		});
	}

	// watch for SCSS changes
	gulp.watch(settings.scsswatch, ['styles']);

	// watch for image changes
	gulp.watch(settings.imagespath, ['images']);

});

/**
 * Stylesheet Task
 *
 * SCSS -> CSS
 * Autoprefix
 * CSSComb
 * Sourcemaps
 * Minify
 * Report
 */
gulp.task('styles', function() {

	return gulp.src(settings.scss)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({
			style: 'expanded',
			errLogToConsole: false
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
		.pipe(csscomb())
		.pipe(sourcemaps.write('./'))
		.pipe(minifycss())
		.pipe(gulp.dest(settings.csspath))
		.pipe(filter('**/*.css'))
		.pipe(browsersync.reload({stream: true}))
		.pipe(parker())
		.pipe(notify({ message: 'Styles task complete' }));
});

/**
 * Images Task
 *
 * Run independantly when you want to optimise image assets
 */
gulp.task('images', function() {

	return gulp.src(settings.imagespath + '**/*.{gif,jpg,png}')
		.pipe(plumber({errorHandler: onError}))
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			//svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
		}))
		.pipe(gulp.dest(settings.imagespath))
		.pipe(browsersync.reload({stream: true}))
		.pipe(notify({ message: 'Images task complete' }));
});

/**
 * CheckCSS Task
 *
 * Are all our styles being used correctly?
 */
gulp.task('checkcss', function() {

	return gulp.src([ settings.css, settings.staticlocation + '*.html' ])
		.pipe(plumber({errorHandler: onError}))
		.pipe(checkcss());
});

/**
 * Sync Task
 *
 * Sync repository details to other manifest/config files
 */
gulp.task('sync', function() {
	gulp.src(['bower.json'])
		.pipe(sync())
		.pipe(gulp.dest('.'));
});


// Ideas:
// - add bower config - folders for bower to grab assets.?. not very flexible
// - lint scss files - https://github.com/brigade/scss-lint
// - inline fonts & SVG images - https://npmjs.org/package/gulp-sassvg/
// - performance testing - https://www.npmjs.com/package/gulp-bench/
