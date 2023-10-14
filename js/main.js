// variables
// ===========================================================================================
const adminUser = "Admin";
const adminPass = "Pass";
let filterCount = 1;
let movies = [];
let genres = [];

const genreList =[
    {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
];



$(document).ready(function(){
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
    // gets the first page of results
    url:"https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country="+jap,
    success: function(data){
        temp = data;
    }
}).done(function(){
    // outputs the results of the movies
    movies = temp.results;

    // call function to sort movies
    sortMovies();
    sortMovies(movies[0].vote_average)
    console.log(movies)

    // code to change image poster to changed to iterate dynamically
    let imgUrl = "https://image.tmdb.org/t/p/original"+movies[0].backdrop_path;
    $("#moviePoster").css("background-image","url(" + imgUrl + ")");


    // code to add movie titles to cards
    $("#cardTitleBrowse").html(movies[0].title);

  let trendingMovies = movies.splice(0,4);
  loadTrendingMovies(trendingMovies);


});



// movie click navigate to single movie page
let movieName = "Default Name";
$("#overlay").on('click',function(){
  console.log("click works")
  // stores name of movie clicked on to be sent to local storage
  movieName = $(this).find("#cardTitleBrowse").text();

  // sends movie name to local storage so that it can be pulled on single movies page
  localStorage.setItem("clickedMovie", JSON.stringify(movieName));

  // navigates to single movie page
  window.location.href = "../pages/singleFilm.html";
});

// // function to listen to clicked on movie and update info
// setInterval(function () {
//     // gets movie clicked on browse page's name from local storage
//     let singleMovieName = JSON.parse(localStorage.getItem("clickedMovie"));

//     // container for object from movie array to compare names and then update page
//     let movieInfo;

//     // listens for changes to movie clicked on in local storage to update single movies page
//     if ($("#singleFilmTitle").text() !== singleMovieName) {
//         // updates name on single movies page
//         $("#singleFilmTitle").text(singleMovieName);

//         // loops through movies array to compare names and store movie object
//         for(i = 0; i <movies.length; i++){
//             if(movies[i].title === singleMovieName){
//                 movieInfo = movies[i];
//             }
//         }

//         // set all the other movie info
//         // set movie description
//         $("#singleMovieDesc").text(movieInfo.overview);
//         // set the movie image
//         $("#miniPoster").prop('src',"https://image.tmdb.org/t/p/original"+movieInfo.backdrop_path)
//         // change the large movie poster
//         let imgUrl = "https://image.tmdb.org/t/p/original"+movieInfo.backdrop_path;
//         $("#trailerImg").css("background-image","url(" + imgUrl + ")");

//     }
// }, 100);


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

function sortMovies(){
    movies.sort(function(a, b)
    {return b.vote_average - a.vote_average}
    );
}

// load trending movies
function loadTrendingMovies(moviesToShow){
  
    // Clear all cards before loading movies
    $("#trendingContainer").empty();

    for(let i = 0; i < moviesToShow.length; i++){
        const currentTrip = moviesToShow[i];

        // ===============================================================
        // load movies on trip page

        // select the trip container and add trip array to it
        $("#trendingContainer").append($("#moviePosterTemplate").html());

        // Create a variable that contains the most recently added card
        let current = $("#trendingContainer").children().eq(i);
        
        // Set the content for the current trip card from the trip array
        $(current).find("#cardTitleBrowse").text(currentTrip.title);
        // set img url 
        let imgUrl ="https://image.tmdb.org/t/p/original" + currentTrip.backdrop_path;
        $(current).find("#moviePoster").css("background-image","url(" + imgUrl + ")");       
    }

};