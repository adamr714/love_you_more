var http = {
	get: function(url,callback) {
		$.ajax({
		  dataType: "json",
		  url: url,
		  data: null,
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
		$.ajax({
		  dataType: "json",
		  url: url,
		  data: $.toJSON(data),
		  contentType:'application/json',
		  method: 'POST',
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



