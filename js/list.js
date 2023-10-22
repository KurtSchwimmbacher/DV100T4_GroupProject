// ======================================================
// variables


// ================================================================================
$(document).ready(function(){


    let watchlist = JSON.parse(localStorage.getItem("WatchList"));
    $("#watchlistCon").empty();
    for(i = 0; i <watchlist.length;i++){
        getMovies(watchlist[i]);
    }


     // on click goes in document.ready
    //onclick event for sort button
    $("input[name = 'sortRadio']").click(function(){
        const appliedSort = $(this).attr('value');
        console.log("Applied Sort: "+appliedSort);
        displayStreams();
    });
});






// ======================================================
// functions
// for watch list

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



function getMovies(movieID){

    const apiURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=34e9f99aa672c944811b83fab5b6c232`;

    $.ajax({
        url: apiURL,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            console.log(data)
            
            let imgUrl = "https://image.tmdb.org/t/p/original" + data.backdrop_path;

            const wlCard = $(`
            <div id="soapiesBox" class="col-xl-3 col-lg-4 col-md-6 col-xs-12 watchlist-card">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4 "> 
                  <img src="${imgUrl}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">               
                  <div class="card-body">
                    <h5 class="card-title" style="margin-bottom: 20px; font-size:x-large; font-weight: 400; font-family:'Dosis', sans-serif;" id="title">${data.title}</h5>
                    <p class="card-text" id="description">${data.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`); 
           
          $("#watchlistCon").append(wlCard);
        },
        error: function(error){
            // handle as it comes
        }
    });



};


function showMovies(movies){
    
   console.log(movies);

    // $("#watchlistCon").empty();

    movies.forEach(movies => {

      let imgUrl = "https://image.tmdb.org/t/p/original" + movies.backdrop_path;

        const wlCard = $(`
        <div id="soapiesBox" class="col-xl-3 col-lg-4 col-md-6 col-xs-12 watchlist-card">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4 "> 
              <img src="${imgUrl}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">               
              <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 20px; font-size:x-large; font-weight: 400; font-family:'Dosis', sans-serif;" id="title">${movies.title}</h5>
                <p class="card-text" id="description">${movies.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`);
  
  
        $("#watchlistCon").append(wlCard);
  
    });

};