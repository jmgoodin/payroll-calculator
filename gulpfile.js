
// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var log = require('fancy-log');
var babelify = require('babelify');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var jest = require('gulp-jest').default;

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  'react-dom',
	'material-ui',
	'react-tap-event-plugin'
];
// keep a count of the times a task refires
var scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false)
      .pipe(browserSync.stream());
});

gulp.task('deploy', function (){
	bundleApp(true);
});

gulp.task('less', function() {
  gulp.src('app/styles/payroll.less')
    .pipe(less())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch(['./app/**/*.jsx'], ['scripts', 'test']);
  gulp.watch(['./app/styles/**/*.less'], ['less']);
	gulp.watch(['./test/**/*.spec.js'], ['test'])
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts', 'less', 'browser-sync', 'test', 'watch']);

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
	scriptsCount++;
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: './app/index.jsx',
			extensions: [".js", ".jsx"],
    	debug: true
  	})

	// If it's not for production, a separate vendors.js file will be created
	// the first time gulp is run so that we don't have to rebundle things like
	// react everytime there's a change in the js file
  	if (!isProduction && scriptsCount === 1){
  		// create vendors.js for dev environment.
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', function(err){log(err);})
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./web/js/'));
  	}
  	if (!isProduction){
  		// make the dependencies external so they dont get bundled by the
		// app bundler. Dependencies are already bundled in vendor.js for
		// development environments.
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

    return appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform(babelify.configure({
        presets : ["env", "react", "stage-0"],
				plugins : ["transform-class-properties"]
    	}))
	    .bundle()
	    .on('error', function(err){log(err);})
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./web/js/'));
}

gulp.task('test', function (done) {
	return gulp.src('./test/').pipe(jest());
});
