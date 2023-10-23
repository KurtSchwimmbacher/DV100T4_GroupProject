

// variables
let password = $("#passwordInput");
let confirm_password = $("#confirmPasswordInput");


$(document).ready(function(){

// -----------------------------------------------------------------
// sign up form code
// -----------------------------------------------------------------

// validation functions
password.change(function (){
    if(password.val() != confirm_password.val()) {
        console.log(password.val())
        confirm_password.setCustomValidity("Passwords Don't Match");
      } else {
        confirm_password.setCustomValidity('');
      }
});
confirm_password.keyup(function (){
    console.log(password.val())
    if(password.val() != confirm_password.val()) {
        console.log(password.val())
        confirm_password[0].setCustomValidity("Passwords Don't Match");
      } else {
        confirm_password[0].setCustomValidity('');
        console.log(password.val())
        
      }
});

// -----------------------------------------------------------------
// on sign up submit prevent default submission
$("#signUpForm").submit(function(event){



    event.preventDefault();


    if(this.checkValidity() === false){
        event.stopPropagation();
    }else{
        // add submission code, like saving to localstorage
        window.location.href = 'pages/browse.html';
    }
    $(this).addClass('was-validated');

});


});



