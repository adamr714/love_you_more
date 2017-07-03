/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}



function isUserAvailable(userNameElement) {
    var userName = $(userNameElement).val();
    if (userName == null || userName.length == 0) {
        return;
    }
    http.get("users/available/" + userName,function(data){
    console.log(data);
        if (data == true) {
            $(userNameElement).parent().children('.check').fadeIn( "slow", "linear" );
        //  alert('Username is available');   
        } else {
           $(userNameElement).parent().children('.circle').fadeIn( "slow", "linear" );
        }
    });
};

function userRegistration(registration) {
    console.log(registration);
    http.post("users/register/", registration, function(data){
        onTabSelect('#logInTab');
    });
} 

function userMessage(message) {
    console.log('You sent: ' + message);
    if (message != "")  {
       http.post('messages/send', {"message":message}, function(data){});
        $('#messageForm').replaceWith('Your message has been sent!');
    } else {
        console.log('cant send an empty message');
    }
}

function loggedIn() {
    $('#signUpForm,#mainText,#myTopnav').hide();
    $('#myTopnavLogout,#myProfile').show();
};

var messageResults = function(element) {
    var messageParameter = $('#template').html()
        .replace
    element.html(messageParameter);
}



function displayMessages() {
    http.get("messages/statistics/", function(data){
        $('#MessageSentCount').html(data.sent);
        console.log(typeof data.sent);
        $('#MessageRecievedCount').html(data.received);
    });
    http.get('messages/recieved/', function(data){
        for (var i=0; i < data.length; i++) {
            var currentMessage = data[i];
            console.log(currentMessage);
            var infoElement = $('#recievedMesssagesTemplate');
            var info = infoElement.html()
                .replace('{{message}}', currentMessage.message)
                .replace('{{sender}}', currentMessage.sender)
                .replace('{{date}}', moment(currentMessage.date).fromNow())
            $('#messagePlaceHolder').append(info);
        }
    });
}

function loggedOut() {
    $('#myTopnavLogout,#myProfile').hide();
    $('#signUpForm,#mainText,#myTopnav').show();
};


function userLogin(username, password) {
    console.log("logging in " + username);
    http.setCredentials(username, password);
    http.post("users/login", login, function(data) {
        loggedIn();
        $('#Welcome').html('Welcome Back ' + username + "!");
        console.log('Welcome Back ' + username.toUpperCase());
        displayMessages();
    });
}

$(document).ready(function() {
        
    $('#template').load('templates/template.html');	

    $('#loginform').on('click', function() {
        console.log('Clicked'); 
        $( "#signUpForm" ).fadeToggle( "slow", "linear" );
    });

    // Sets Value
    $('#selfUserName,#otherUserName').on('blur', function(event) {
        isUserAvailable(this);
    });

    //When Form Element Changes
    $('#selfUserName,#otherUserName').on('change', function(event) {
         $(this).parent().children('.check').hide();
         $(this).parent().children('.circle').hide();
    });

    // Canned Messages
		http.get("canned_messages/", function(data){
            var cannedMessages;
            var cannedMessagesData;
			cannedMessages = data;
            // console.log(cannedMessages);
		    for (var i = 0; i < cannedMessages.length; i++) {
		        cannedMessagesData+= "<option value='" + i + "'>" +
		          cannedMessages[i].message + "</option>";

                // $('#messageArea').on('change', function() {
                //     var option = $(this).find('option:selected').text();
                // });

                // $('#messageArea').html(cannedMessagesData);
			}


	      	$("#cannedMessageDisplay").html(cannedMessagesData);
            // $('#messageArea').html(cannedMessagesData);
	    });

    //Login 
    $(document).on('submit', '#register', function(event) {
        //   return false;
        event.preventDefault();
        var registration = {
        	"self": {
		        "username": $('#selfUserName').val(),
		        "password": $('#password').val(),
		        "firstName": $('#selfFirstName').val(),
		        "lastName": $('#selfLastName').val(),
                "email": $('#selfEmail').val()
	        },
            "other": {
                "username" : $('#otherUserName').val(),
                "password" : $('#password').val(),
                "firstName" : $('#otherFirstName').val(),
                "lastName" : $('#otherLastName').val(),
                "email" : $('#otherEmail').val()
        	}
        };
            // console.log(registration);
            userRegistration(registration);
    });

    $('#messageForm').on('submit', function(event) {
        event.preventDefault();
        var message = $('#messageArea').val();
        userMessage(message);
    });

    $('#login').on('submit', function(event) {
        event.preventDefault();
        userLogin($('#usernameLogIn').val(), $('#passwordLogIn').val());
    });        


});


//menu
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

