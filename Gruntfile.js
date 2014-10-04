/*
 * HTML5-Packer
 * https://github.com/elias94xx/HTML5-Packer
 *
 * Copyright (c) 2014 Elias Schütt
 * Licensed under the CC BY-NC-SA 4.0 license.
 */

"use strict";

module.exports = function(grunt) {

	grunt.initConfig({
		HTML5_Packer: {
			demo: {
				cwd: "demo/",
				index: "index.html",
				dest: "index.packed.html"
			}
		}
	});

	grunt.loadTasks("tasks");
	grunt.registerTask("default", ["HTML5_Packer"]);
};