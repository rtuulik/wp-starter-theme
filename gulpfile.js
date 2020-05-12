// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");

// Importing all the Gulp-related packages we want to use
// CSS packages:
const sourcemaps = require("gulp-sourcemaps"); // maps the CSS styles back to the original SCSS file in your browser dev tools
const sass = require("gulp-sass"); //  compiles SCSS to CSS
const postcss = require("gulp-postcss"); // runs autoprefixer and cssnano
const autoprefixer = require("autoprefixer"); // adds vendor prefixes to CSS
const cssnano = require("cssnano"); // minifies CSS
// JS packages:
const concat = require("gulp-concat"); // concatenates multiple JS files into one file
const uglify = require("gulp-uglify"); // minifies JS
// Other packages:
const replace = require("gulp-replace"); // add a string parameter to CSS/JS references for cache bust

// Currently unused packages
const del = require("del"); // Delete files and directories using globs
// Built-in support for sourcemaps was added - the gulp-sourcemaps plugin is no longer necessary!	???

// File paths
const files = {
	scssPath: "src/scss/**/*.scss",
	jsPath: "src/js/**/*.js",
	imagePath: "src/img/**/*.+(svg|png)",
	fontsPath: "src/fonts/**/*.+(woff|woff2)",
	cacheBustPath: ["footer.php", "header.php"], // Doesn´t work currently. Only works on header.php, and it works even when you remove it from the path completely :/
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
	return src(files.scssPath)
		.pipe(sourcemaps.init()) // sourcemaps needs to be added first after src()
		.pipe(sass()) // does the compiling of all the SCSS files to one CSS file
		.pipe(postcss([autoprefixer(), cssnano()])) // postcss() runs two other plugins, autoprefixer() to add vendor prefixes & cssnano() to minify the CSS file
		.pipe(concat("main.css")) // concatenate all the css files into one css file
		.pipe(sourcemaps.write(".")) // creates the sourcemaps file in the same directory.
		.pipe(dest("dist/css")); // put the final CSS file and CSS sourcemaps file in the /dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
	return src([files.jsPath]) // load the JS files from files.jsPath
		.pipe(concat("main.js")) // concatenate all the JS files into one JS file
		.pipe(uglify()) // uglify/minify the JS file
		.pipe(dest("dist/js")); // move the final JS file into the /dist folder
}

function imageTask() {
	return src(files.imagePath).pipe(
		dest("dist/img") // move images to the build folder
	);
}

function fontsTask() {
	return src(files.fontsPath).pipe(
		dest("dist/fonts") // move fonts to the build folder
	);
}
// Cachebust
function cacheBustTask() {
	let cbString = new Date().getTime();
	return src(files.cacheBustPath)
		.pipe(replace(/cb=\d+/g, "cb=" + cbString))
		.pipe(dest("."));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
	watch(
		[files.scssPath, files.jsPath, files.imagePath, files.fontsPath], // watch the files in our scssPath and jsPath directories
		series(parallel(scssTask, jsTask, imageTask, fontsTask), cacheBustTask) // if any changes are made in files, run these tasks simultaneously
	);
}

// Export the default Gulp task so it can be run automatically run if you type in gulp on the command line
exports.default = series(parallel(scssTask, jsTask, imageTask, fontsTask), cacheBustTask, watchTask); // Runs the tasks simultaneously and then runs cacheBust, then watch task
