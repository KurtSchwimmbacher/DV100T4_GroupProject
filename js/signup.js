

// variables
let userID = 0;

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

    let profile;
    let toStore = [];

      let isIn = false;
      let users = JSON.parse(localStorage.getItem("userProfiles"));
      if(users === null){
        userID++;
        profile = {
          id : userID,
          user: username,
          email : email,
          pass: password
        }
  
        toStore[userID] = JSON.stringify(profile)
        localStorage.setItem("userProfiles",toStore[userID]);
      }
      else{
        for(i = 0; i < users.length; i++){
          if(users[i].user === profile.user){
            isIn = true;
            console.log("already have an account")
          }
        }
      }
      if(!isIn && users != null){
        userID++;
         profile = {
          id : userID,
          user: username,
          email : email,
          pass: password
        }

        toStore[userID] = JSON.stringify(profile)
        localStorage.setItem("userProfiles",toStore[userID]);
      }

      window.location.href = `../index.html?id=${profile.id}`;
  }
  $(this).addClass('was-validated');


});


});


