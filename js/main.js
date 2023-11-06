// Code for Home page + Login


// variables
// ===========================================================================================
const adminUser = "Admin";
const adminPass = "Pass";



$(document).ready(function(){
    // set the validation text to be invisible
    clearValidationText();
    loadImgToCarousel();

    const urlParams = new URLSearchParams(window.location.search);
    const userID= urlParams.get('id');
  
    console.log(userID)
    if(userID){
        let users = JSON.parse(localStorage.getItem("userProfiles"));
        console.log(users)
        let currentUser;

        $("#signUpNav").text(users.user)
    }
    else{
        // error message
    }
  

    // navigate from splash screen to login screen
    $("#btnLogin").click(function(){
        window.location.href = "../pages/login.html";
    });

    // navigate from splash screen to sign up screen
    $("#btnSignUp").click(function(){
        window.location.href = "../pages/signup.html";
    });

    $("#loginBtn").click(function(){
      let users = [];
      users.push( JSON.parse(localStorage.getItem("userProfiles")));
        console.log(users.user)
        let userIn = $("#UsernameInput").val()+"";
        let passIn = $("#PasswordInput").val() +"";
          for(i = 0; i < users.length; i++){
            console.log(users)
            validateLogin(users[i].user,users[i].pass, userIn, passIn);
            
          }
    });
   
trendingMovies();
highestGrossingMovies();
highestVotedMovies();

});

// functions
// ===========================================================================================




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
    if(username == userIn && password == passIn){
      window.location.href = `../index.html?id=${username}`;
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



// ==========================================================================================
// variables
let filterCount = 1;
let movies = [];
let genres = [];


// ==========================================================================================




function trendingMovies(){


// load trending movies
$.ajax({
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=DE|IN|NG|ZA|JP|KR`,
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
      loadTrendingMovies(trendingMovies);

})

// ==============================================================================================================
// api dynamic load page

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

    }
}, 100);


};


// ===============================================================================================================
// functions
function sortMovies(){
    movies.sort(function(a, b)
    {return b.vote_average - a.vote_average}
    );
}

// load trending movies
function loadTrendingMovies(moviesToShow){
  
    // Clear all cards before loading movies
    let isAdded = false;
    let watchlistArr = [];
    $("#trendingContainer").empty();
  
    moviesToShow.forEach(moviesToShow => {
      let imgUrl = "https://image.tmdb.org/t/p/original" + moviesToShow.backdrop_path;
        const card = $(`
        <div class="col-sm-6 col-md-4 col-lg-3 mb-5 movie-col">
        <div class="card lib-card"  id="moviePoster" style="background-image: url(${imgUrl});">
            <div class="overlay" id="overlay">
                <img class="play-logo" src="../assets/svgs/play-circle-fill.svg">
            </div>
          </div>
          <div id="cardBody" class="card-body mt-2 mb-3">
            <h2 id="cardTitleBrowse" class="card-text movie-title">${moviesToShow.title}</h2>
            <p class="add-icon"><i class="bi bi-plus-circle"></i></p>
        </div>
        </div>`);
  
        $(moviesToShow).find("#moviePoster").css("background-image","url(" + imgUrl + ")"); 
  
        // navigates to single movie page
        card.on('click','.lib-card',function(){
  
          window.location.href = `singleFilm.html?id=${moviesToShow.id}`;
        });
  
        // to add the movie from the library page to the watch list
        // when the button is clicked
        card.on('click','.add-icon',function(){
  
          // if checks if the the movie has been added, not foolproof
          if(!isAdded){
            // updates button appearance
            $(this).children().addClass("bi bi-check-circle").removeClass("bi-plus-circle");
  
            // so the movie cant be added twice
            isAdded = true;
  
            // adds movie to the array to be sent to local storage
            watchlistArr.push(moviesToShow.id);
            
            // sends movie Id to wishlist
            let moviesData = JSON.stringify(watchlistArr);
            localStorage.setItem("WatchList",moviesData);
          }
  
          // method for if already added to wishlist, not foolproof
          else{
            // change button appearance
            $(this).children().addClass("bi-plus-circle").removeClass("bi bi-check-circle");
            isAdded = false;
            
            // fetches watchlist and removes movie clicked on from array
            let watchlist = JSON.parse(localStorage.getItem("WatchList"));
            for(i = 0; i<watchlist.length;i++){
              if(moviesToShow.id === watchlist[i]){
                console.log(watchlist[i] +" to be removed")
                watchlist = delete watchlist[i];
              }
            }
  
            // send updated list to local storage
            let moviesData = JSON.stringify(watchlist);
            localStorage.setItem("WatchList",moviesData);
  
          }
          
        });
  
      $("#trendingContainer").append(card);
  
    });

   
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// Hidden gem movies functionality
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

function highestGrossingMovies(){
  
// load trending movies
$.ajax({
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=revenue.desc&with_origin_country=JP|DE|IN|NG|ZA|KR`,
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
      $("#moviePoster2").css("background-image","url(" + imgUrl + ")");
    
    
      // code to add movie titles to cards
      $("#cardTitleBrowse").html(movies[0].title);
    
      // load movies in trending section of browse page
      let moneyMovies = movies.slice(0,4);
      loadHighestGrossingMovies(moneyMovies);

})

// ==============================================================================================================
// api dynamic load page

// movie click navigate to single movie page
let movieName = "Default Name";

$("#highestGrossingContainer").on('click','#overlay',function(){

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

    }
}, 100);


};


// ===============================================================================================================
// functions
function sortMovies(){
    movies.sort(function(a, b)
    {return b.vote_average - a.vote_average}
    );
}

// load trending movies
function loadHighestGrossingMovies(moviesToShow){
  
    // Clear all cards before loading movies
    let isAdded = false;
    let watchlistArr = [];
    $("#highestGrossingContainer").empty();
  
    moviesToShow.forEach(moviesToShow => {
      let imgUrl = "https://image.tmdb.org/t/p/original" + moviesToShow.backdrop_path;
        const card = $(`
        <div class="col-sm-6 col-md-4 col-lg-3 mb-5 movie-col">
        <div class="card lib-card"  id="moviePoster" style="background-image: url(${imgUrl});">
            <div class="overlay" id="overlay">
                <img class="play-logo" src="../assets/svgs/play-circle-fill.svg">
            </div>
          </div>
          <div id="cardBody" class="card-body mt-2 mb-3">
            <h2 id="cardTitleBrowse" class="card-text movie-title">${moviesToShow.title}</h2>
            <p class="add-icon"><i class="bi bi-plus-circle"></i></p>
        </div>
        </div>`);
  
        $(moviesToShow).find("#moviePoster2").css("background-image","url(" + imgUrl + ")"); 
  
        // navigates to single movie page
        card.on('click','.lib-card',function(){
  
          window.location.href = `singleFilm.html?id=${moviesToShow.id}`;
        });
  
        // to add the movie from the library page to the watch list
        // when the button is clicked
        card.on('click','.add-icon',function(){
  
          // if checks if the the movie has been added, not foolproof
          if(!isAdded){
            // updates button appearance
            $(this).children().addClass("bi bi-check-circle").removeClass("bi-plus-circle");
  
            // so the movie cant be added twice
            isAdded = true;
  
            // adds movie to the array to be sent to local storage
            watchlistArr.push(moviesToShow.id);
            
            // sends movie Id to wishlist
            let moviesData = JSON.stringify(watchlistArr);
            localStorage.setItem("WatchList",moviesData);
          }
  
          // method for if already added to wishlist, not foolproof
          else{
            // change button appearance
            $(this).children().addClass("bi-plus-circle").removeClass("bi bi-check-circle");
            isAdded = false;
            
            // fetches watchlist and removes movie clicked on from array
            let watchlist = JSON.parse(localStorage.getItem("WatchList"));
            for(i = 0; i<watchlist.length;i++){
              if(moviesToShow.id === watchlist[i]){
                console.log(watchlist[i] +" to be removed")
                watchlist = delete watchlist[i];
              }
            }
  
            // send updated list to local storage
            let moviesData = JSON.stringify(watchlist);
            localStorage.setItem("WatchList",moviesData);
  
          }
          
        });
  
      $("#highestGrossingContainer").append(card);
  
    });

};


// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// highest Rated movies functionality
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

function highestVotedMovies(){
  
  // load trending movies
  $.ajax({
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=vote_count.desc&with_origin_country=DE|IN|NG|ZA`,
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
        $("#moviePoster2").css("background-image","url(" + imgUrl + ")");
      
      
        // code to add movie titles to cards
        $("#cardTitleBrowse").html(movies[0].title);
      
        // load movies in trending section of browse page
        let votesMovies = movies.slice(0,4);
        loadHighestVotedMovies(votesMovies);
  
  })
  
  // ==============================================================================================================
  // api dynamic load page
  
  // movie click navigate to single movie page
  let movieName = "Default Name";
  
  $("#highestVitedContainer").on('click','#overlay',function(){
  
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
  
      }
  }, 100);
  
  
  };
  
  // Sort Movie
  function sortMovies(){
      movies.sort(function(a, b)
      {return b.vote_average - a.vote_average}
      );
  }
  
  // load trending movies
  function loadHighestVotedMovies(moviesToShow){
    
      // Clear all cards before loading movies
      let isAdded = false;
      let watchlistArr = [];
      $("#highestVotedContainer").empty();
    
      moviesToShow.forEach(moviesToShow => {
        let imgUrl = "https://image.tmdb.org/t/p/original" + moviesToShow.backdrop_path;
          const card = $(`
          <div class="col-sm-6 col-md-4 col-lg-3 mb-5 movie-col">
          <div class="card lib-card"  id="moviePoster" style="background-image: url(${imgUrl});">
              <div class="overlay" id="overlay">
                  <img class="play-logo" src="../assets/svgs/play-circle-fill.svg">
              </div>
            </div>
            <div id="cardBody" class="card-body mt-2 mb-3">
              <h2 id="cardTitleBrowse" class="card-text movie-title">${moviesToShow.title}</h2>
              <p class="add-icon"><i class="bi bi-plus-circle"></i></p>
          </div>
          </div>`);
    
          $(moviesToShow).find("#moviePoster2").css("background-image","url(" + imgUrl + ")"); 
    
          // navigates to single movie page
          card.on('click','.lib-card',function(){
    
            window.location.href = `singleFilm.html?id=${moviesToShow.id}`;
          });
    
          // to add the movie from the library page to the watch list
          // when the button is clicked
          card.on('click','.add-icon',function(){
    
            // if checks if the the movie has been added, not foolproof
            if(!isAdded){
              // updates button appearance
              $(this).children().addClass("bi bi-check-circle").removeClass("bi-plus-circle");
    
              // so the movie cant be added twice
              isAdded = true;
    
              // adds movie to the array to be sent to local storage
              watchlistArr.push(moviesToShow.id);
              
              // sends movie Id to wishlist
              let moviesData = JSON.stringify(watchlistArr);
              localStorage.setItem("WatchList",moviesData);
            }
    
            // method for if already added to wishlist, not foolproof
            else{
              // change button appearance
              $(this).children().addClass("bi-plus-circle").removeClass("bi bi-check-circle");
              isAdded = false;
              
              // fetches watchlist and removes movie clicked on from array
              let watchlist = JSON.parse(localStorage.getItem("WatchList"));
              for(i = 0; i<watchlist.length;i++){
                if(moviesToShow.id === watchlist[i]){
                  console.log(watchlist[i] +" to be removed")
                  watchlist = delete watchlist[i];
                }
              }
    
              // send updated list to local storage
              let moviesData = JSON.stringify(watchlist);
              localStorage.setItem("WatchList",moviesData);
    
            }
            
          });
    
        $("#highestVotedContainer").append(card);
    
      });
  
  };
  
  function loadImgToCarousel(){
    let pic1 = $("#carouselImg3");
    let pic2 = $("#carouselImg4");
    let pic3 = $("#carouselImg5");

    $.ajax({
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=DE|IN|NG|ZA|JP|KR`,
      success: function(data){
          temp = data;
      }
    }).done(function(){
      // outputs the results of the movies
      movies = temp.results;
    
        // sort by average vote, high to low
        movies = movies.sort((a,b) =>{
          return b.vote_average - a.vote_average;    
        });

        movies = movies.splice(0,6);

        let imgUrl = "https://image.tmdb.org/t/p/original"+movies[0].backdrop_path;
        console.log(imgUrl)
        pic1.prop("src", imgUrl);
        imgUrl = "https://image.tmdb.org/t/p/original"+movies[1].backdrop_path;
        console.log(imgUrl)
        pic2.prop("src", imgUrl);
        imgUrl = "https://image.tmdb.org/t/p/original"+movies[2].backdrop_path;
        console.log(imgUrl)
        pic3.prop("src", imgUrl);

        $("#title1").text(movies[0].title)
        $("#title2").text(movies[1].title)
        $("#title3").text(movies[2].title)
    
        let id1 = movies[0].id;
        let id2 = movies[1].id;
        let id3 = movies[2].id;
       
        $.ajax({
          type:"GET",
          // gets the first page of results
          url:`https://api.themoviedb.org/3/movie/${id1}?api_key=34e9f99aa672c944811b83fab5b6c232`,
          success: function(data){
              temp = data;
              console.log(temp.vote_average)
              
              $("#Director1").text("Producded by " + temp.production_companies[0].name)
              $("#rating1").text("And was rated: " + Math.round(temp.vote_average * 100) / 100 + "/10")
          }
        }); 

        $.ajax({
          type:"GET",
          // gets the first page of results
          url:`https://api.themoviedb.org/3/movie/${id2}?api_key=34e9f99aa672c944811b83fab5b6c232`,
          success: function(data){
              temp = data;
              console.log(temp.vote_average)
              
              $("#Director2").text("Producded by " + temp.production_companies[0].name)
              $("#rating2").text("And was rated: " + Math.round(temp.vote_average * 100) / 100 + "/10")
          }
        }); 

        $.ajax({
          type:"GET",
          // gets the first page of results
          url:`https://api.themoviedb.org/3/movie/${id3}?api_key=34e9f99aa672c944811b83fab5b6c232`,
          success: function(data){
              temp = data;
              console.log(temp.vote_average)
              
              $("#Director3").text("Producded by " + temp.production_companies[0].name)
              $("#rating3").text("And was rated: " +Math.round(temp.vote_average * 100) / 100 + "/10")
          }
        }); 
      
    })
  }