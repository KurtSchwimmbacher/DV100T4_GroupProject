// Code for library (and for now single movie)

// ==========================================================================================
// variables
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
// ==========================================================================================




$(document).ready(function(){
// ==============================================================================================================
// filters code
      // hide filters panel
      $(".filter-opt-con").hide(); 

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

// ==============================================================================================================
// filters code end



loadEuroMovies();
loadAfricanMovies();
loadAsianMovies();
loadIndianMovies();

// load trending movies
$.ajax({
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=JP`,
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
      let trendingMovies = movies.slice(0,8);
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


});
// ==========================================================================================


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
    $("#trendingContainer").empty();

    for(let i = 0; i < moviesToShow.length; i++){
        const currentMovie = moviesToShow[i];

        // ===============================================================
        // load movies

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

// load european movies
function fillEuroMovies(moviesToShow){
  
  // Clear all cards before loading movies
  $("#europeContainer").empty();

  for(let i = 0; i < moviesToShow.length; i++){
      const currentMovie = moviesToShow[i];

      // ===============================================================
      // load movies

      // select the trending container and add movie array to it
      $("#europeContainer").append($("#moviePosterTemplate").html());

      // Create a variable that contains the most recently added card
      let current = $("#europeContainer").children().eq(i);
      
      // Set the content for the current movie card from the movie array
      $(current).find("#cardTitleBrowse").text(currentMovie.title);
      // set img url 
      let imgUrl ="https://image.tmdb.org/t/p/original" + currentMovie.backdrop_path;
      $(current).find("#moviePoster").css("background-image","url(" + imgUrl + ")");       
  }

};


// load african movies
function fillAfricanMovies(moviesToShow){
  
  // Clear all cards before loading movies
  $("#africanContainer").empty();

  for(let i = 0; i < moviesToShow.length; i++){
      const currentMovie = moviesToShow[i];

      // ===============================================================
      // load movies

      // select the trending container and add movie array to it
      $("#africanContainer").append($("#moviePosterTemplate").html());

      // Create a variable that contains the most recently added card
      let current = $("#africanContainer").children().eq(i);
      
      // Set the content for the current movie card from the movie array
      $(current).find("#cardTitleBrowse").text(currentMovie.title);
      // set img url 
      let imgUrl ="https://image.tmdb.org/t/p/original" + currentMovie.backdrop_path;
      $(current).find("#moviePoster").css("background-image","url(" + imgUrl + ")");       
  }

};


// load asian movies
function fillAsianMovies(moviesToShow){
  
  // Clear all cards before loading movies
  $("#asianContainer").empty();

  for(let i = 0; i < moviesToShow.length; i++){
      const currentMovie = moviesToShow[i];

      // ===============================================================
      // load movies

      // select the trending container and add movie array to it
      $("#asianContainer").append($("#moviePosterTemplate").html());

      // Create a variable that contains the most recently added card
      let current = $("#asianContainer").children().eq(i);
      
      // Set the content for the current movie card from the movie array
      $(current).find("#cardTitleBrowse").text(currentMovie.title);
      // set img url 
      let imgUrl ="https://image.tmdb.org/t/p/original" + currentMovie.backdrop_path;
      $(current).find("#moviePoster").css("background-image","url(" + imgUrl + ")");       
  }

};


// load indian movies
function fillIndianMovies(moviesToShow){

  $("#indianContainer").empty();

  moviesToShow.forEach(moviesToShow => {
    let imgUrl = "https://image.tmdb.org/t/p/original" + moviesToShow.backdrop_path;
      const card = $(`
      <div class="col-sm-6 col-md-4 col-lg-3 mb-5 movie-col">
      <div class="card lib-card"  id="moviePoster" style="background-image: url(${imgUrl});">
          <div class="overlay" id="overlay">
              <img class="play-logo" src="../assets/svgs/play-circle-fill.svg">
              <div id="cardBody" class="card-body lib-body">
                  <h2 id="cardTitleBrowse" class="card-text movie-title">${moviesToShow.title}</h2>
              </div>
          </div>
        </div>
      </div>`);

      $(moviesToShow).find("#moviePoster").css("background-image","url(" + imgUrl + ")"); 

    card.click(function(){
      window.location.href = `singleFilm.html?id=${moviesToShow.id}`;
    });

    $("#indianContainer").append(card);

  });


};



function loadEuroMovies(){
// api Pulls
let euroArr;
let area = "FR";
$.ajax({
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
  success: function(data){
      temp = data;
  }
}).done(function(){
  // outputs the results of the movies
  movies.length = 0;
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
      euroArr = trendingMovies;
      console.log(euroArr)
      
})

area = "DE";
$.ajax({
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
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
      sortMovies(movies);
      let trendingMovies = movies.slice(0,4);
      for(i = 0; i < 4; i++){
        euroArr.push(trendingMovies[i])
      }

      fillEuroMovies(euroArr);
})

};

function loadAfricanMovies(){
  // api Pulls
  let afriArr;
  let area = "NG";
  $.ajax({
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
    success: function(data){
        temp = data;
    }
  }).done(function(){
    // outputs the results of the movies
    movies.length = 0;
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
        afriArr = trendingMovies;
        
  })
  
  area = "ZA";
  $.ajax({
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
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
        sortMovies(movies);
        let trendingMovies = movies.slice(0,4);
        for(i = 0; i < 4; i++){
          afriArr.push(trendingMovies[i])
        }

        fillAfricanMovies(afriArr);
  })
  
  };


  function loadAsianMovies(){
    // api Pulls
    let asiaArr;
    let area = "KR";
    $.ajax({
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
      success: function(data){
          temp = data;
      }
    }).done(function(){
      // outputs the results of the movies
      movies.length = 0;
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
          asiaArr = trendingMovies;
          
    })
    
    area = "JP";
    $.ajax({
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
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
          sortMovies(movies);
          let trendingMovies = movies.slice(0,4);
          for(i = 0; i < 4; i++){
            asiaArr.push(trendingMovies[i])
          }

          fillAsianMovies(asiaArr);
    })
    
    };

    function loadIndianMovies(){
      // api Pulls
       
      area = "IN";
      $.ajax({
        type:"GET",
        // gets the first page of results
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
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
            sortMovies(movies);
            let indianMovies = movies.slice(0,8);
            fillIndianMovies(indianMovies);
      })
      
      };