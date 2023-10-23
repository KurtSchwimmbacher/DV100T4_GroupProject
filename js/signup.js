

// variables


$(document).ready(function(){

// -----------------------------------------------------------------
// sign up form code
// -----------------------------------------------------------------
// validation functions


let password = $("#passwordInput");
let confirm_password = $("#confirmPasswordInput");


password.change(function (){
  if(password.val() != confirm_password.val()) {
    console.log("password changed")
      confirm_password[0].setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password[0].setCustomValidity('');
    }
});
confirm_password.keyup(function (){
  console.log("password changing")
  if(password.val() != confirm_password.val()) {
      confirm_password[0].setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password[0].setCustomValidity('');
      
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

      let password = $("#passwordInput").val();
      let username = $("#UsernameInputSU").val();
      let email = $("#EmailInputSU").val();

      let profile = {
        user: username,
        email : email,
        pass: password
      }

      let isIn = false;
      console.log(profile)
      let users = JSON.parse(localStorage.getItem("userProfiles"));
      if(users.length === 0){
        let toStore = JSON.stringify(profile)
        localStorage.setItem("userProfiles",toStore);
      }
      else{
        for(i = 0; i < users.length; i++){
          if(users[i].user === profile.user){
            isIn = true;
          }
        }
      }
      window.location.href = '../index.html';
  }
  $(this).addClass('was-validated');


});


});


