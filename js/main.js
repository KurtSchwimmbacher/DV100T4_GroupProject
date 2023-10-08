$(document).ready(function(){
    console.log("Hello World")

    $("#btnLogin").click(function(){
        window.location.href = "../pages/login.html";
    });

    $("#btnSignUp").click(function(){
        window.location.href = "../pages/signup.html";
    });

});