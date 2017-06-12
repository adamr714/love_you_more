var http = {
	_token: null,
	setCredentials: function(username, password) {
		this._token = btoa(username + ":" + password);
	},
	get: function(url,callback) {
		var self = this;
		$.ajax({
		  dataType: "json",
		  url: url,
		  data: null,
		  beforeSend: function (xhr) {
			if (self._token != null) {
				xhr.setRequestHeader("Authorization", "Basic " + self._token);
			}
		  },
		  success: function(data, textStatus, jqXHR) {
		  	if (textStatus==='success') {
		  		callback(data);
		  	} else {
		  		console.log(textStatus);
		  	}
		  },
		  error: function(jqXHR, textStatus, errorThrown ) {
		  	console.log(textStatus + ': ' + errorThrown);
		  }
		});    	
	},
	post: function(url, data, callback) {
		var self = this;
		$.ajax({
		  dataType: "json",
		  url: url,
		  data: $.toJSON(data),
		  contentType:'application/json',
		  method: 'POST',
		  beforeSend: function (xhr) {
			if (self._token != null) {
				xhr.setRequestHeader("Authorization", "Basic " + self._token);
  		  		// xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
			}
		  },
		  success: function(data, textStatus, jqXHR) {
		  	if (textStatus==='success') {
		  		callback(data);
		  	} else {
		  		console.log(textStatus);
		  	}
		  },
		  error: function(jqXHR, textStatus, errorThrown ) {
		  	console.log(textStatus + ': ' + errorThrown);
		  }
		});    	
	}
}



