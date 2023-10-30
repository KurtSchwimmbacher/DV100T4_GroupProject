// Code for library (and for now single movie)

// ==========================================================================================
// variables
let filterCount = 1;
let movies = [];
let genres = [];


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
loadTrendingMovies();


})




// ==============================================================================================================
// api dynamic load page






// ==========================================================================================


// ===============================================================================================================
// functions
function sortMovies(){
    movies.sort(function(a, b)
    {return b.vote_average - a.vote_average}
    );
}


function loadTrendingMovies(){
  // load trending movies
// $.ajax({
//   type:"GET",
//   // gets the first page of results
//   url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=JP`,
//   success: function(data){
//       temp = data;
//   }
// }).done(function(){
//   // outputs the results of the movies
//   movies = temp.results;

//   // call function to sort movies
//   sortMovies();
//   sortMovies(movies[0].vote_average)

//       // code to change image poster to changed to iterate dynamically
//       let imgUrl = "https://image.tmdb.org/t/p/original"+movies[0].backdrop_path;
//       $("#moviePoster").css("background-image","url(" + imgUrl + ")");
    
    
//       // code to add movie titles to cards
//       $("#cardTitleBrowse").html(movies[0].title);
    
//       // load movies in trending section of browse page
//       let trendingMovies = movies.slice(0,8);
//       loadTrendingMovies(trendingMovies);


let moviesToShow = [];
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

}

// load trending movies
function fillTrendingMovies(moviesToShow){
  
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

// load european movies
function fillEuroMovies(moviesToShow){
  
  // Clear all cards before loading movies
  let isAdded = false;
  let watchlistArr = [];
  $("#europeContainer").empty();

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

    $("#europeContainer").append(card);

  });


};


// load african movies
function fillAfricanMovies(moviesToShow){
  

  let isAdded = false;
  let watchlistArr = [];
  $("#africanContainer").empty();

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


    $("#africanContainer").append(card);

  });


};


// load asian movies
function fillAsianMovies(moviesToShow){
  
  let isAdded = false;
  let watchlistArr = [];
  $("#asianContainer").empty();

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


    $("#asianContainer").append(card);

  });


};


// load indian movies
function fillIndianMovies(moviesToShow){
  let isAdded = false;
  let watchlistArr = [];
  $("#indianContainer").empty();

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

        // if(localStorage.getItem("WatchList") != null){
        //   watchlistArr = JSON.parse(localStorage.getItem("WatchList"));
        //   console.log(watchlistArr)
        // }

        // for(i = 0; i < watchlistArr.length; i++){
        //   if(moviesToShow.id === watchlistArr[i]){
        //     isAdded = true;
        //   }
        //   else{
        //     isAdded = false;
        //   }
        // }

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

    $("#indianContainer").append(card);

  });


};



function loadEuroMovies(){
// api Pulls
let euroArr = [];
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
  let afriArr = [];
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
          afriArr.push(trendingMovies[i]);
        }

        fillAfricanMovies(afriArr);
  })
  
  };


  function loadAsianMovies(){
    // api Pulls
    let asiaArr = [];
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

      