;(function(window, undefined) {

	"use strict";

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "lvl/01.lvl", true);

	xmlhttp.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			document.querySelector("#level_data").innerHTML = this.responseText;
		}
	};

	xmlhttp.send(null);

}(window));