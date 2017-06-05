
var cannedMessages
var cannedMessagesData


function isUserAvailable(userName) {
    if (username == null || username.length() == 0) {
        return;
    }
    http.get("users/available/" + userName,function(data){
    console.log(data);
    });
};

// Canned Messages
		http.get("/canned_messages",function(data){
			cannedMessages = data;
		   for (var i = 0; i < cannedMessages.length; i++) {
		        cannedMessagesData+= "<option value='" + i + "'>" +
		          cannedMessages[i].name + "</option>";
			}
	      	$("#cannedMessageDisplay").html(cannedMessagesData);
	    });






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

});