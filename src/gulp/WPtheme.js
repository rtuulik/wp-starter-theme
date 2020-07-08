/**
 * Settings
 * Turn on/off build features
 */
const settings = {
	clean: true,
	styles: true, // sass files
	scripts: true,
	images: false,
	fonts: false,
	bustCache: false,
	reload: undefined,
};

const WPsettings = {
	wordpress: true, // use to configure wordpress build options(found under gulpfile-wp.js)
	woocommerse: false, // incude/not all wooCommerce files to theme build or not

	functions: {
		disableEmbeds: true,
		disableEmoji: true,
		redirectAttachmentPages: true,
		removeComments: false,
	},
};

/* const settingsWPStyles = {
	styleloginpage = false,		// need to replace default color values (if no loga, then uses WP default logo img)
} */

/**
 * Paths to project files
 */
const filePaths = {
	input: "src/",
	output: "dist/",
	styles: {
		input: "dev/sass/**/*.scss",
		output: "dist/css/",
	},
	scripts: {
		input: "dev/js/**/*.js",
		output: "dist/js/",
	},
	images: {
		input: "dev/img/**/*.+(svg|png)",
		output: "dist/img/",
	},
	fonts: {
		input: "dev/fonts/**/*.+(woff|woff2)",
		output: "dist/fonts/",
	},
	bustCache: ["footer.php", "header.php"],

	underscoresTheme: {
		input: "src/wp/themes/_s/**/*.+(php|css|pot|txt|png)",
		output: "./",

		moveSassinput: "src/wp/themes/_s/sass/**/*.scss",
		moveSassOutput: "dev/sass/underscores",
		sassFiles: "dev/underscores/**/*.scss",
		allSassFiles: "./dev/**/*.scss",
		moveJSinput: "src/wp/themes/_s/js/**/*.js",
		moveJSOutput: "js/", // "src/dev/js/",
	},
};

// General modules
const { src, dest, watch, series, parallel } = require("gulp"); // Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const del = require("del"); // Delete files and directories using globs
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps"); // maps the CSS styles back to the original SCSS file in your browser dev tools
const replace = require("gulp-replace"); // add a string parameter to CSS/JS references for cache bust
const fs = require("fs"); // used to create files and their contents
const footer = require("gulp-footer"); // using to add some content to my created shame.js and sass files @import
//const dir = requireDir("./path/to/dir"); // using to split gulpfile to separate files

// Styles
const sass = require("gulp-sass"); //  compiles SCSS to CSS
const postcss = require("gulp-postcss"); // runs autoprefixer and cssnano
const autoprefixer = require("autoprefixer"); // adds vendor prefixes to CSS
const cssnano = require("cssnano"); // minifies CSS

// Scripts
const concat = require("gulp-concat"); // concatenates multiple JS files into one file
const terser = require("gulp-terser"); // minifies JS. gulp-uglify doesn´t support ES6 syntax

/**
 * Gulp Tasks
 */

// Sass task: compiles the sass files into one main style.min.css
const buildStyles = function (done) {
	if (!settings.styles) return done(); // Make sure this feature is activated before running

	return src(filePaths.underscoresTheme.allSassFiles) // filePaths.underscoresTheme.moveSassOutput
		.pipe(sourcemaps.init()) // sourcemaps needs to be added first after src()
		.pipe(sass()) // does the compiling of all the SCSS files to one CSS file
		.pipe(postcss([autoprefixer(), cssnano()])) // postcss() runs two other plugins, autoprefixer() to add vendor prefixes & cssnano() to minify the CSS file
		.pipe(concat("main.css")) // concatenate all the css files into one css file
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write(".")) // creates the sourcemaps file in the same directory.
		.pipe(dest(filePaths.styles.output)); // put the final CSS file and CSS sourcemaps file in the /dist folder
};

// JS task: concatenates and minifies JS files to script.js
const buildScripts = function (done) {
	if (!settings.scripts) return done(); // Make sure this feature is activated before running

	return src(filePaths.scripts.input) // load the JS files from files.jsPath
		.pipe(concat("main.js")) // concatenate all the JS files into one JS file
		.pipe(terser()) // minify the JS file. gulp-uglify doesn´t support ES6 syntax
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest(filePaths.scripts.output)); // move the final JS file into the /dist folder
};

// move images to the build folder
const moveImages = function (done) {
	if (!settings.images) return done(); // Make sure this feature is activated before running
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
	if (!settings.clean) return done(); // Make sure this feature is activated before running
	del.sync([filePaths.output]); // Clean the dist folder
	return done(); // Signal completion
};

// Take fresh copy of a theme, and pipe it to root folder
const compileTheme = function (done) {
	if (!WPsettings.wordpress) return done();

	// move _s sass files from theme root to src/dev/sass
	src(filePaths.underscoresTheme.moveSassinput).pipe(dest(filePaths.underscoresTheme.moveSassOutput));

	// move _s js files from root to under src/dev/js
	src(filePaths.underscoresTheme.moveJSinput).pipe(dest(filePaths.underscoresTheme.moveJSOutput));

	// create sass & js folders in dev folder, and create basic structure for users sass & JS files
	fs.existsSync("dev/") || fs.mkdirSync("dev/"); // create folders first, otherwise the whole process fails
	fs.existsSync("dev/js/") || fs.mkdirSync("dev/js/");
	fs.existsSync("dev/sass/") || fs.mkdirSync("dev/sass/");
	fs.existsSync("dev/sass/user") || fs.mkdirSync("dev/sass/user");
	fs.existsSync("dev/fonts/") || fs.mkdirSync("dev/fonts/");
	fs.existsSync("dev/img/") || fs.mkdirSync("dev/img/");

	fs.writeFileSync("dev/js/shame.js", "// place to put all the temporary things you promise to fix \n"); // create shame.js
	fs.writeFileSync("dev/sass/user/_navigation.scss", "");
	/* 	fs.writeFileSync("src/dev/sass/user/_typography.scss", "");
	fs.writeFileSync("src/dev/sass/user/_colors.scss", ""); */
	fs.writeFileSync("dev/sass/user/_shame.scss", "");
	fs.writeFileSync("dev/sass/user/style.scss", '@import "_navigation.scss"; \n@import "_shame.scss"; \n');

	// move "_s" theme files to root folder. This way the theme is recognizable to the WordPress install
	src(filePaths.underscoresTheme.input).pipe(dest(filePaths.underscoresTheme.output));

	const disableEmbeds = function () {
		if (!WPsettings.functions.disableEmbeds) return done();
		src("functions.php").pipe(footer("\nrequire get_template_directory() . '/inc/disable-embeds.php';")).pipe(dest("."));
		return src("src/wp/functions/disable-embeds/disable-embeds.php").pipe(dest("inc/"));
	};

	const disableEmoji = function () {
		if (!WPsettings.functions.disableEmoji) return done();
		src("functions.php").pipe(footer("\nrequire get_template_directory() . '/inc/disable-emoji.php';")).pipe(dest("."));
		return src("src/wp/functions/disable-emoji/disable-emoji.php").pipe(dest("inc/"));
	};

	const redirectAttachmentPages = function () {
		if (!WPsettings.functions.redirectAttachmentPages) return done();
		src("functions.php").pipe(footer("\nrequire get_template_directory() . '/inc/redirect-attachment-pages-to-parent.php';")).pipe(dest("."));
		return src("src/wp/functions/redirect-attachment-pages/redirect-attachment-pages-to-parent.php").pipe(dest("inc/"));
	};

	const removeComments = function () {
		if (!WPsettings.functions.removeComments) return done();
		src("functions.php").pipe(footer("\nrequire get_template_directory() . '/inc/remove-comments.php';")).pipe(dest("."));
		return src("src/wp/functions/remove-comments/remove-comments.php").pipe(dest("inc/"));
	};

	const deququeScripts = function () {
		src("functions.php").pipe(footer("\nrequire get_template_directory() . '/inc/dequeue-theme-scripts.php';")).pipe(dest("."));
		return src("src/wp/functions/dequeue-theme-scripts.php").pipe(dest("inc/"));
	};

	disableEmbeds();
	disableEmoji();
	redirectAttachmentPages();
	removeComments();
	deququeScripts();

	return done();
};

// WooCOmmerce settings
const wooBuild = function (done) {
	if (!WPsettings.woocommerse) return done();

	console.log("WOOOOOOOOOOO");

	// del all woo css files to
	return done();
};

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
const watchFiles = function (done) {
	watch(
		[filePaths.styles.input, filePaths.underscoresTheme.moveSassOutput, filePaths.scripts.input, filePaths.images.input, filePaths.fonts.input], // watch the files in these directories
		series(parallel(buildStyles, buildScripts, moveImages, moveFonts), bustCache) // if any changes are made in files, run these tasks simultaneously
	);
};

// exports[taskName] = taskFunction;
// Export the default Gulp task so it can be run automatically run if you type in gulp on the command line
exports.default = series(parallel(cleanDist, buildStyles, buildScripts, moveImages, moveFonts), bustCache, watchFiles); // Runs the tasks simultaneously and then runs bustCache, then watch task
exports.compileTheme = series(compileTheme);

// NB! can´t call
//exports.addFunctions = series(disableEmbeds, disableEmoji, redirectAttachmentPages, removeComments, deququeScripts); // move all needed files to functions.php

/* 
*
* playing around with renaming things inside the files
exports.buildStyles = buildStyles;
//exports.theme = series('theme', 'coffee')
exports.coffee = coffee;

const coffee = function (done) {
	/* 	let cbString = new Date().getTime();
	src("./functions.php")
		.pipe(replace(/cb=\d+/g, "cb=" + cbString)) // search for strings including  “cb=” (ex. "style.css?cb=123"), and replace it with current time in milleseconds
		.pipe(dest(".")); */

/*	src(["functions.php"]).pipe(replace("/js/navigation.js", "uustext")).pipe(dest("."));

	return done();
};

 */
