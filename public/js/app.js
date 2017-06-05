
//variables
function isUserAvailable(userName) {
    if (username == null || username.length() == 0) {
        return;
    }
    http.get("users/available/" + userName,function(data){
    console.log(data);
    });
};

function userRegistration(registration) {
    console.log(data);
    http.post("users/register/" + registration, function(data){
    });
} 





$(document).ready(function() {
    $('#loginform').on('click', function() {
        console.log('Clicked'); 
        $( "#signUpForm" ).fadeToggle( "slow", "linear" );
    });

    $('#selfUserName').on('blur', function() {
        var selfUser = $('#selfUserName').val();
        isUserAvailable(selfUser);
    });

    $('#otherUserName').on('blur', function() {
        var otherUser = $('#otherUserName').val();
        isUserAvailable(otherUser);
    });

    // Canned Messages
		http.get("canned_messages/", function(data){
            var cannedMessages;
            var cannedMessagesData;
			cannedMessages = data;
            // console.log(cannedMessages);
		    for (var i = 0; i < cannedMessages.length; i++) {
		        cannedMessagesData+= "<option value='" + i + "'>" +
		          cannedMessages[i].short + "</option>";
			}
	      	$("#cannedMessageDisplay").html(cannedMessagesData);
	    });

    $(document).on('submit', '#register', function(event) {
        //   return false;
        event.preventDefault();
        var registration = {
        	"self": {
		        "username": $('#selfUserName').val(),
		        "password": $('#selfPassword').val(),
		        "firstName": $('#selfFirstName').val(),
		        "lastName": $('#selfLastName').val(),
                "email": $('#selfEmail').val()
	        },
            "other": {
                "username" : $('#otherUserName').val(),
                "password" : $('#otherPassword').val(),
                "firstName" : $('#otherFirstName').val(),
                "lastName" : $('#otherLastName').val(),
                "email" : $('#otherEmail').val()
        	}
        };
            console.log(registration);
            // userRegistration(registration);
    });
});




