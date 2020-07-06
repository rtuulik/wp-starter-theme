/**
 * Settings
 * Turn on/off build features
 */
const settings = {
	clean: true,
	styles: false, // sass files
	scripts: false,
	images: false,
	fonts: false,
	bustCache: false,
	//	reload: true,

	wordpress: true, // use to configure wordpress build options(found under gulpfile-wp.js)
};

/**
 * Paths to project files
 */
const filePaths = {
	input: "src/",
	output: "dist/",
	styles: {
		input: "src/dev/sass/**/*.scss",
		output: "dist/css/",
	},
	scripts: {
		input: "src/dev/js/**/*.js",
		output: "dist/js/",
	},
	images: {
		input: "src/dev/img/**/*.+(svg|png)",
		output: "dist/img/",
	},
	fonts: {
		input: "src/dev/fonts/**/*.+(woff|woff2)",
		output: "dist/fonts/",
	},
	bustCache: ["footer.php", "header.php"],

	moveWPTheme: {
		input: "src/wp/themes/_s/**/*.+(php|js|css|pot|txt|png)",
		output: "./",
		inputSass: "src/wp/themes/_s/**/*.scss",
		outputSass: "src/dev",
	},
};

// General modules
const { src, dest, watch, series, parallel } = require("gulp"); // Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const del = require("del"); // Delete files and directories using globs
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps"); // maps the CSS styles back to the original SCSS file in your browser dev tools
const replace = require("gulp-replace"); // add a string parameter to CSS/JS references for cache bust

// Styles
const sass = require("gulp-sass"); //  compiles SCSS to CSS
const postcss = require("gulp-postcss"); // runs autoprefixer and cssnano
const autoprefixer = require("autoprefixer"); // adds vendor prefixes to CSS
const cssnano = require("cssnano"); // minifies CSS

// Scripts
const concat = require("gulp-concat"); // concatenates multiple JS files into one file
const uglify = require("gulp-uglify"); // minifies JS

/**
 * Gulp Tasks
 */

// Sass task: compiles the style.scss file into style.css
const buildStyles = function (done) {
	// Make sure this feature is activated before running
	if (!settings.styles) return done();

	return src(filePaths.styles.input)
		.pipe(sourcemaps.init()) // sourcemaps needs to be added first after src()
		.pipe(sass()) // does the compiling of all the SCSS files to one CSS file
		.pipe(postcss([autoprefixer(), cssnano()])) // postcss() runs two other plugins, autoprefixer() to add vendor prefixes & cssnano() to minify the CSS file
		.pipe(concat("main.css")) // concatenate all the css files into one css file
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write(".")) // creates the sourcemaps file in the same directory.
		.pipe(dest(filePaths.styles.output)); // put the final CSS file and CSS sourcemaps file in the /dist folder
};

// JS task: concatenates and uglifies JS files to script.js
const buildScripts = function (done) {
	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	return src(filePaths.scripts.input) // load the JS files from files.jsPath
		.pipe(concat("main.js")) // concatenate all the JS files into one JS file
		.pipe(uglify()) // uglify/minify the JS file
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest(filePaths.scripts.output)); // move the final JS file into the /dist folder
};

// move images to the build folder
const moveImages = function (done) {
	// Make sure this feature is activated before running
	if (!settings.images) return done();

	return src(filePaths.images.input).pipe(dest(filePaths.images.output));
};

// move fonts to the build folder
const moveFonts = function (done) {
	if (!settings.fonts) return done();

	return src(filePaths.fonts.input).pipe(dest(filePaths.fonts.output));
};

// Bust cache
const bustCache = function (done) {
	if (!settings.bustCache) return done();

	let cbString = new Date().getTime();
	return src(filePaths.bustCache)
		.pipe(replace(/cb=\d+/g, "cb=" + cbString)) // search for strings including  “cb=” (ex. "style.css?cb=123"), and replace it with current time in milleseconds
		.pipe(dest("."));
};

// Remove pre-existing content from output folders
const cleanDist = function (done) {
	// Make sure this feature is activated before running
	if (!settings.clean) return done();

	// Clean the dist folder
	del.sync([filePaths.output]);

	// Signal completion
	return done();
};

// Take fresh copy of a theme, and pipe it to root folder
const compileTheme = function (done) {
	if (!settings.wordpress) return done();

	src(filePaths.moveWPTheme.inputSass).pipe(dest(filePaths.moveWPTheme.outputSass)); // move sass files from default theme root/sass to under src/dev/sass
	return src(filePaths.moveWPTheme.input).pipe(dest(filePaths.moveWPTheme.output)); // move "_s" theme files to root folder. This way the theme is recognizable to the WordPress install
};

/* const compileTheme = function (done) {
	if (!settings.wordpress) return done();
	return src(filePaths.moveWPTheme.inputSass).pipe(dest(filePaths.moveWPTheme.outputSass));
} */

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
const watchFiles = function (done) {
	watch(
		[filePaths.styles.input, filePaths.scripts.input, filePaths.images.input, filePaths.fonts.input], // watch the files in these directories
		series(parallel(buildStyles, buildScripts, moveImages, moveFonts), bustCache) // if any changes are made in files, run these tasks simultaneously
	);
};

// Export the default Gulp task so it can be run automatically run if you type in gulp on the command line
exports.default = series(parallel(cleanDist, buildStyles, buildScripts, moveImages, moveFonts), bustCache, watchFiles); // Runs the tasks simultaneously and then runs bustCache, then watch task
exports.compileTheme = compileTheme;
