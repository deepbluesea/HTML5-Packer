;(function(window, undefined) {

	"use strict";

	var data = document.querySelector("script").innerHTML;
	var memory = JSON.parse(RawDeflate.inflate(atob(data)));
	var _XMLHttpRequest = XMLHttpRequest;
	var XMLHttpRequest = function(){};

	XMLHttpRequest.prototype = {

		open: function(method, path, async) {

			this._method = method.toLowerCase();
			this._path = path;
			this._async = async;

			if (this._method == "post") {
				this._xmlHttp = new _XMLHttpRequest();
				this._xmlHttp.open.call(this._xmlHttp, method, path, async);
			}
		},

		abort: function() {
			if (this._xmlHttp instanceof _XMLHttpRequest) {
				this._xmlHttp.abort.call(this._xmlHttp);
			}
		},

		setRequestHeader: function(header, value) {
			if (this._xmlHttp instanceof _XMLHttpRequest) {
				this._xmlHttp.setRequestHeader.call(this._xmlHttp, header, value);
			}
		},

		getAllResponseHeaders: function() {
			if (this._xmlHttp instanceof _XMLHttpRequest) {
				this._xmlHttp.getAllResponseHeaders.call(this._xmlHttp);
			}
		},

		getResponseHeader: function(header) {
			if (this._xmlHttp instanceof _XMLHttpRequest) {
				this._xmlHttp.getResponseHeader.call(this._xmlHttp, header);
			}
		},

		overrideMimeType: function(mimetype) {
			if (this._xmlHttp instanceof _XMLHttpRequest) {
				this._xmlHttp.overrideMimeType.call(this._xmlHttp, mimetype);
			}
		},

		send: function(params) {

			if (this._method == "post") {
				this._xmlHttp.onreadystatechange = this.onreadystatechange;
				this._xmlHttp.send.call(this._xmlHttp, params);
			}

			var data = atob(memory[this._path]);

			if (!data) {
				this.readyState = 2;
				this.status = 404;
			} else {
				this.status = 200;
				this.readyState = 4;
				this.responseText = data;
			}

			this.onreadystatechange();
		}
	};

	window.XMLHttpRequest = XMLHttpRequest;

}(window));