// needs to get single movie code
// variables
// =========================================================================

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