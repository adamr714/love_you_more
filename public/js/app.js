$(document).ready(function() {
    $('#loginform').on('click', function() {
        console.log('Clicked'); 
        $( "#signUpForm" ).fadeToggle( "slow", "linear" );
    });
});
