// needs to get single movie code
// variables
// =========================================================================



// =========================================================================

$(document).ready(function(){
    // loadPills(movieInfo.genre);

    // needs to get contained in loading all data from library page
    // set all the other movie info
    // set movie description
    $("#singleMovieDesc").text(movieInfo.overview);
    // set the movie image
    $("#miniPoster").prop('src',"https://image.tmdb.org/t/p/original"+movieInfo.backdrop_path)
    // change the large movie poster
    let imgUrl = "https://image.tmdb.org/t/p/original"+movieInfo.backdrop_path;
     $("#trailerImg").css("background-image","url(" + imgUrl + ")");

});




// =========================================================================

// =========================================================================
// functions
// code to load pills into single films page
function loadPills(genresArr){
  $("#pillContainer").empty();

  for(let i = 0; i < genresArr.length; i++){
    const currentGenre = genresArr[i];

    // test to convert genre id to genre name
    for(let j = 0; j < genreList.length; j++){
      if(genreList[j].id === currentGenre){
        currentGenre = genreList[j].name;
        console.log("genre names: "+currentGenre)
      };
    };


    // add genres to to pill container
    $("#pillContainer").append($("#pillTemplate").html());
    let current = $("#pillContainer").children().eq(i);

    $(current).find("#pillTxt").text(currentGenre);

  }
};