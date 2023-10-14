// variables
// ===========================================================================================
const adminUser = "Admin";
const adminPass = "Pass";
let filterCount = 1;
let movies = [];


$(document).ready(function(){
    console.log("Hello World")
    

    // set the validation text to be invisible
    clearValidationText();

    // hide filters
    $(".filter-opt-con").hide(); 

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
   

    // show and hide filters
    $("#filtersIcon").on('click',function(){ 
        filterCount++;
        $(".filter-opt-con").toggle();
        if(filterCount%2 === 0){
            $("#filtersIcon").prop('src', "../assets/svgs/funnel-fill.svg");
        }
        else{
            $("#filtersIcon").prop('src', "../assets/svgs/funnel.svg");
        }
        
    });


// api Pulls
// country codes used to control regional results, combine with method to filter results by a specific place
let jap ="JP";

$.ajax({
    type:"GET",
    url:"https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country="+jap,
    success: function(data){
        temp = data;
    }
}).done(function(){
    // outputs the results of the movies
    movies = temp.results;
    // reverse order of array because order.asc on api doesnt return ratings properly
    movies = movies.reverse();
    console.log(movies)

    // code to change image poster to changed to iterate dynamically
    let imgUrl = "https://image.tmdb.org/t/p/original"+movies[0].backdrop_path;
    $("#moviePoster").css("background-image","url(" + imgUrl + ")");


    // code to add movie titles to cards
    $("#cardTitle").html(movies[0].title);


});


// movie click navigate to single movie page
$("#overlay").on('click',function(){
    // calls function to update singleMovie pages to reflect clicked on movies details

    // navigates to single movie page
    window.location.href = "../pages/singleFilm.html";
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
