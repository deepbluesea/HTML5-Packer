;(function(window, undefined) {

	var $div = document.querySelector(".result-external");
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("GET", "https://api.github.com/users/elias-schuett", true);

	xmlhttp.onreadystatechange = function(e) {
		if (this.status == 200 && this.readyState == 4) {
			$div.innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.send(null);

}(window));