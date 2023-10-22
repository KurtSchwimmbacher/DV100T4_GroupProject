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


          
      },
      error: function(error){
          // handle as it comes
      }
  })
}