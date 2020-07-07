const gulp = require("gulp");
const requireDir = require("require-dir");
requireDir("./gulp-tasks");

// Main gulpfile (gulpfile.js)
//const settings = require("./gulp-tasks/settings.js");
const themeTasks = require("./gulp-tasks/WPtheme.js");

exports.default = themeTasks.default;
exports.watchFiles = themeTasks.watchFiles;
exports.compileTheme = themeTasks.compileTheme;
exports.addFunctions = themeTasks.addFunctions;
