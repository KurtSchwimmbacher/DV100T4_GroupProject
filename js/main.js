// variables
// ===========================================================================================
const adminUser = "Admin";
const adminPass = "Pass";


// to be replaced by API data - Kurt
// for watchlist
const arrPlaylist = [
    {
        name:"The green knight",
        show:"tvShows"
    },

    {
        name:"Pearl",
        show:"tvMovies"
    },

    {
        name:"When you finish saving the world",
        show:"tvMovies"
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

    // code to change image poster to changed to iterate dynamically
    let imgUrl = "https://image.tmdb.org/t/p/original"+movies[0].backdrop_path;
    $("#moviePoster").css("background-image","url(" + imgUrl + ")");


  // code to add movie titles to cards
  $("#cardTitleBrowse").html(movies[0].title);

  // load movies in trending section of browse page
  let trendingMovies = movies.slice(0,4);
  loadMovies(trendingMovies);
  console.log(movies)


});



// movie click navigate to single movie page
let movieName = "Default Name";

$("#trendingContainer").on('click','#overlay',function(){

  // stores name of movie clicked on to be sent to local storage
  movieName = $(this).find("#cardTitleBrowse").text();

  // sends movie name to local storage so that it can be pulled on single movies page
  localStorage.setItem("clickedMovie", JSON.stringify(movieName));

  // navigates to single movie page
  window.location.href = "../pages/singleFilm.html";

});

// function to listen to clicked on movie and update info
setInterval(function () {
    // gets movie clicked on browse page's name from local storage
    let singleMovieName = JSON.parse(localStorage.getItem("clickedMovie"));

    // container for object from movie array to compare names and then update page
    let movieInfo;
    let genreArr = [];

    // listens for changes to movie clicked on in local storage to update single movies page
    if ($("#singleFilmTitle").text() !== singleMovieName) {
        // updates name on single movies page
        $("#singleFilmTitle").text(singleMovieName);

        // loops through movies array to compare names and store movie object
        for(i = 0; i <movies.length; i++){
            if(movies[i].title === singleMovieName){
              movieInfo = movies[i];
            }
        }

        // loadPills(movieInfo.genre);

        // set all the other movie info
        // set movie description
        $("#singleMovieDesc").text(movieInfo.overview);
        // set the movie image
        $("#miniPoster").prop('src',"https://image.tmdb.org/t/p/original"+movieInfo.backdrop_path)
        // change the large movie poster
        let imgUrl = "https://image.tmdb.org/t/p/original"+movieInfo.backdrop_path;
        $("#trailerImg").css("background-image","url(" + imgUrl + ")");

    }
}, 100);

// for watch list

    // array of movies sent to watch List
    loadShows(arrPlaylist);

    // on click goes in document.ready
    //onclick event for sort button
    $("input[name = 'sortRadio']").click(function(){
        const appliedSort = $(this).attr('value');
        console.log("Applied Sort: "+appliedSort);
        displayStreams();
    });



});

// functions
// ===========================================================================================

// for watch list
function loadShows(){
    console.log(arrPlaylist);

    for (let index = 0; index < arrPlaylist.length; index++) {
        const programs = arrPlaylist[index];
        
        console.log(programs)

        $("#soapiesBox").children().eq(index).find("#title").text(programs.name)
        $("#soapiesBox").children().eq(index).find("#description").text(programs.show)
    }
};


function displayStreams(displayStreams){
    
    let streams = [];

    streams = arrPlaylist.sort(show => show.name === appliedSort)
}




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
function loadMovies(moviesToShow){
  
    // Clear all cards before loading movies
    $("#trendingContainer").empty();

    for(let i = 0; i < moviesToShow.length; i++){
        const currentMovie = moviesToShow[i];

        // ===============================================================
        // load movies on trip page

        // select the trending container and add movie array to it
        $("#trendingContainer").append($("#moviePosterTemplate").html());

        // Create a variable that contains the most recently added card
        let current = $("#trendingContainer").children().eq(i);
        
        // Set the content for the current movie card from the movie array
        $(current).find("#cardTitleBrowse").text(currentMovie.title);
        // set img url 
        let imgUrl ="https://image.tmdb.org/t/p/original" + currentMovie.backdrop_path;
        $(current).find("#moviePoster").css("background-image","url(" + imgUrl + ")");       
    }

};


// code to load pills into single films page
// function loadPills(genresArr){
//   $("#pillContainer").empty();

//   for(let i = 0; i < genresArr.length; i++){
//     const currentGenre = genresArr[i];

//     // test to convert genre id to genre name
//     for(let j = 0; j < genreList.length; j++){
//       if(genreList[j].id === currentGenre){
//         currentGenre = genreList[j].name;
//         console.log("genre names: "+currentGenre)
//       };
//     };


//     // add genres to to pill container
//     $("#pillContainer").append($("#pillTemplate").html());
//     let current = $("#pillContainer").children().eq(i);

//     $(current).find("#pillTxt").text(currentGenre);

//   }
// };
