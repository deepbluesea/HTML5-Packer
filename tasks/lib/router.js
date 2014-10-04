;(function(window, undefined) {

	"use strict";

	var data = document.querySelector("script").innerHTML;
	var memory = JSON.parse(RawDeflate.inflate(atob(data)));
	var _XMLHttpRequest = window.XMLHttpRequest;
	var XMLHttpRequest = function(){};

	function isExternalURL(url) {
		var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
		if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
		if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
		return false;
	}

	XMLHttpRequest.prototype = {

		open: function(method, path, async) {

			this._method = method.toLowerCase();
			this._path = path;
			this._async = async;

			if (this._method == "post" || isExternalURL(path)) {
				this._external = true;
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

			if (this._external) {

				var _this = this;

				this._xmlHttp.onreadystatechange = function(e) {
					_this.response = _this._xmlHttp.response;
					_this.responseText = _this._xmlHttp.responseText;
					_this.responseXML = _this._xmlHttp.responseXML;
					_this.status = _this._xmlHttp.status;
					_this.readyState = _this._xmlHttp.readyState;
					_this.statusText = _this._xmlHttp.statusText;
					_this.onreadystatechange(e);
				};

				this._xmlHttp.send.apply(this._xmlHttp, params);

				return;
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