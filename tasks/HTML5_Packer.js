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
	var CleanCSS = require('clean-css');
	var cleancss = new CleanCSS();

	var pkg = grunt.file.readJSON("package.json");
	var jsp = require("uglify-js").parser;
	var pro = require("uglify-js").uglify;

	var src_rawinflate = grunt.file.read(__dirname + "/lib/rawinflate.js");
	var src_router = grunt.file.read(__dirname + "/lib/router.js");

	var rStyle = /<link[^\>]+href=[\"\']([^\"\']+)[\"\'][^\>]*\/?\>/g;
	var rScript = /<script[^\>]+src\=[\"\']([^\"\']+)[\"\'][^\>]*\><\/script>/g;

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
		var html = grunt.file.read(cwd + "index.html");

		var pattern = [cwd, cwd + "/**","!node_modules/**"];
		var files = grunt.file.expand(pattern).filter(function(path) { return !grunt.file.isDir(path); });

		// Gather files
		files.forEach(function(path) {
			var data = grunt.file.read(path, { encoding: "base64" });
			json[path.substr(cwd.length)] = data;
		});

		grunt.log.writeln("\n- gathered " + files.length + " files");

		// Remove html comments
		html = html.replace(/<!--.*-->/g, "");

		// Inline link tags
		html = html.replace(rStyle, function(full, src) {
			if (full.indexOf("stylesheet") == -1) { return full; }
			grunt.log.writeln("- inlined " +  src);
			return "<style>" + cleancss.minify(grunt.file.read(cwd + src)) + "</style>";
		});

		// Inline script tags
		html = html.replace(rScript, function(full, src) {
			grunt.log.writeln("- inlined " + src);
			return "<script>" + grunt.file.read(cwd + src) + "</script>";
		});

		// Insert libs
		html = html.replace("</head>", "<script>" + minify(src_rawinflate) + "</script></head>");
		html = html.replace("</head>", "<script>" + minify(src_router) + "</script></head>");

		zlib.deflateRaw(JSON.stringify(json), function(err, bfr) {
			html = html.replace("<head>", "<head><script type='x-source/encrypted'>" + bfr.toString("base64") + "</script>");
			grunt.file.write(dest, html);
		});
	});
};