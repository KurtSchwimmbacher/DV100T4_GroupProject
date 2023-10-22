// needs to get single movie code
// variables
// =========================================================================


// =========================================================================

$(document).ready(function(){
  
  const urlParams = new URLSearchParams(window.location.search);
  const movieID = urlParams.get('id');

  if(movieID){
      getMovieDetails(movieID);
  }
  else{
      // error message
  }


  //add to watch list button 
  $("#singleFilmAddToList").on('click',function(){
    let inList = 0;
    
    // check if movie is in watchlist
    let localMovies = JSON.parse(localStorage.getItem("WatchList"));
    for(i = 0; i < localMovies.length; i++){
      if(movieID === localMovies[i]+''){
        inList++;
      }
    }

    // if id isnt in list, then add it
    if(inList === 0){
      localMovies.push(parseInt(movieID));
      console.log(localMovies)
      let toStore = JSON.stringify(localMovies);
      localStorage.setItem("WatchList",toStore);
    }
    else{
      console.log(localMovies + " has already been addded")
    }

  });

});




// =========================================================================

// =========================================================================
// functions
// code to load pills into single films page

function getMovieDetails(movieID){
  const apiURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=34e9f99aa672c944811b83fab5b6c232`;

  $.ajax({
      url: apiURL,
      method: 'GET',
      dataType: 'json',
      success: function(data){
          console.log(data)
          const movie = data;

          let imgUrl = "https://image.tmdb.org/t/p/original"+movie.backdrop_path;
          $("#trailerImg").css("background-image","url(" + imgUrl + ")");
          $("#miniPoster").attr('src', imgUrl);
          $("#singleFilmTitle").text(movie.title);
          $("#singleMovieDesc").text(movie.overview);

          for(i = 0; i< movie.genres.length; i++){
            let pill =$( `<span class="badge text-bg-dark" id="pill3">${movie.genres[i].name}</span>`);
            $("#pillContainer").append(pill);
          }

          let rating = movie.vote_average.toFixed(1);
          pill = $(`<span class="badge text-bg-dark" id="pill3">${rating}/10</span>`);
          $("#pillContainer").append(pill);


          for(i = 0; i< movie.spoken_languages.length; i++){
            pill = $(`<span class="badge text-bg-dark" id="pill3">${movie.spoken_languages[i].english_name}</span>`);
            $("#pillContainer").append(pill);
          }

          for(i = 0; i< movie.production_companies.length; i++){
            let pill =$( `<span class="badge text-bg-dark" id="pill3">${movie.production_companies[i].name}</span>`);
            $("#pillContainer").append(pill);
          }
          
      },
      error: function(error){
          // handle as it comes
      }
  })
}