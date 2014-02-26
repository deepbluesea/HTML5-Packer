/*
 * HTML5-Packer
 * https://github.com/elias94xx/HTML5-Packer
 *
 * Copyright (c) 2014 Elias Schütt
 * Licensed under the CC BY-NC-SA 4.0 license.
 */

module.exports = function(grunt) {
	
	"use strict";

	var zlib = require("zlib");
	var cheerio = require("cheerio");
	var CleanCSS = require('clean-css');
	var html_minify = require('html-minifier');

	var pkg = grunt.file.readJSON("package.json");
	var jsp = require("uglify-js").parser;
	var pro = require("uglify-js").uglify;

	var rawinflate = grunt.file.read(__dirname + "/lib/rawinflate.js");
	var XMLHttpRequest = grunt.file.read(__dirname + "/lib/XMLHttpRequest.js");
	var observer = grunt.file.read(__dirname + "/lib/observer.js");

	function isExternal(url) {
		var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
		if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
		if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
		return false;
	}

	function minify(src) {
		var ast = jsp.parse(src);
		ast = pro.ast_mangle(ast);
		ast = pro.ast_squeeze(ast);
		return pro.gen_code(ast);
	}

	grunt.registerMultiTask("HTML5_Packer", "Pack your HTML5-Apps into a single HTML file.", function() {
		
		var done = this.async();
		var json = {}, dir, count = 0;
		var cwd = this.data.cwd + "/" || "";
		var dest = this.data.dest || pkg.name + ".packed.html";
		var $ = cheerio.load(grunt.file.read(cwd + "index.html"));

		var pattern = [cwd, cwd + "/**","!node_modules/**"];
		var files = grunt.file.expand(pattern).filter(function(path) { return !grunt.file.isDir(path); });

		files.forEach(function(path) {
			var data = grunt.file.read(path, { encoding: "base64" });
			json[path.substr(cwd.length)] = data;
		});

		$("link[rel=stylesheet]").each(function() {
			var src = $(this).attr("href");
			if (isExternal(src)) { return true; }

			var file = grunt.file.read(cwd + src);
			$(this).remove();

			$("head").append("<style>" + new CleanCSS().minify(file) + "<style>");
		});

		$("script").each(function() {
			var src = $(this).attr("src");
			if (!src || isExternal(src)) { return true; }

			var file = grunt.file.read(cwd + src);
			$(this).removeAttr("src");
			$(this).html(minify(file));
		});


		$("head").prepend("<script>" + minify(observer) + "</script>");
		$("head").prepend("<script>" + minify(XMLHttpRequest) + "</script>");
		$("head").prepend("<script>" + minify(rawinflate) + "</script>");

		zlib.deflateRaw(JSON.stringify(json), function(err, bfr) {
			$("head").prepend("<script type='x-source/encrypted'>" + bfr.toString("base64") + "</script>");
			grunt.file.write(dest, html_minify.minify($.html("html"), { collapseWhitespace: true }));
		});
	});
};