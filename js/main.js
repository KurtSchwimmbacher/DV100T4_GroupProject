// variables
// ===========================================================================================
const adminUser = "Admin";
const adminPass = "Pass";


$(document).ready(function(){
    console.log("Hello World")

    // set the validation text to be invisible
    clearValidationText();

    // set the movie name to not be visible
    hideMovieName();

    // navigate from splash screen to login screen
    $("#btnLogin").click(function(){
        window.location.href = "../pages/login.html";
    });

    // navigate from splash screen to sign up screen
    $("#btnSignUp").click(function(){
        window.location.href = "../pages/signup.html";
    });

    $("#loginBtn").click(function(){
        let userIn = $("#UsernameInput").val()+"";
        let passIn = $("#PasswordInput").val() +"";
        validateLogin(adminUser,adminPass, userIn, passIn);
    });

});

// functions
// ===========================================================================================
// function to clear validation text
function clearValidationText(){
    
    // Hide all the labels on the sign up form for validation
    $("#UsernameLabel").hide();
    $("#EmailLabel").hide();
    $("#PasswordLabel").hide();
    $("#PasswordConLabel").hide();
}

// validates user login
function validateLogin(username, password, userIn, passIn){
    clearValidationText();
    if(username === userIn && password === passIn){
        return "enter";
    }
    else if (username != userIn && password === passIn){
        $("#UsernameLabel").text("Incorrect Username");
        $("#UsernameLabel").show();
    }
    else if (username === userIn && password != passIn){
        $("#PasswordLabel").text("Incorrect Password");
        $("#PasswordLabel").show();
    }
    else if (username != userIn && password != passIn){
        $("#PasswordLabel").text("Incorrect Password");
        $("#PasswordLabel").show();
        $("#UsernameLabel").text("Incorrect Username");
        $("#UsernameLabel").show();
    }
};


function hideMovieName(){
    $(".lib-body").hide();
}