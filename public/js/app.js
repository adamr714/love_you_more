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
    });
} 

function userLogin(username, password) {
    console.log("logging in " + username);
    http.setCredentials(username, password);
    http.post("users/login", login, function(data) {
        // res.redirect('/myprofile');
        alert('Welcome ' + username);
    });
}

$(document).ready(function() {
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
		          cannedMessages[i].short + "</option>";
			}
	      	$("#cannedMessageDisplay").html(cannedMessagesData);
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
            console.log(registration);
            userRegistration(registration);
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


