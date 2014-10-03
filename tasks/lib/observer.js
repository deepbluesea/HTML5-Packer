;(function(window, undefined) {

	"use strict";

	var data = document.querySelector("script").innerHTML;
	var memory = JSON.parse(RawDeflate.inflate(atob(data)));

	function mapImgSrc(img) {

		if (img.target) { img = img.target; }
		if (!img.tagName || img.tagName.toUpperCase() != "IMG") { return; }

		var root = location.href.substring(0, location.href.lastIndexOf('/'));
		var regex = new RegExp(root + "/?");
		var src = img.src.replace(regex, "");

		if (memory[src]) { img.src = "data:image/png;base64," + memory[src]; }
	}

	window.addEventListener("load", function(e) {
		[].forEach.call(document.querySelectorAll("img"), mapImgSrc);
		document.body.addEventListener("DOMNodeInserted", mapImgSrc, false);
	}, false);

}(window));