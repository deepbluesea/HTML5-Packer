;(function(window, undefined) {

	var $div = document.querySelector(".result-internal");
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("GET", "txt/lorem-ipsum.txt", true);

	xmlhttp.onreadystatechange = function(e) {
		if (this.status == 200 && this.readyState == 4) {
			$div.innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.send(null);

}(window));