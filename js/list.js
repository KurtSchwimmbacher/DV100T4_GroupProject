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
  
          <div class="style4">
            <div class="style2">
              <div class="col-md-4 "> 
                <img src="${imgUrl}" class="imagemovie11" alt="...">
              </div>         
            </div>
           <div class="style3">
            <button class="remove1"></button>
            <div class="col-md-8">               
              <div class="card-body">
                <h5 class="card-title2" style="margin-bottom: 20px; font-size:x-large; font-weight: 400; font-family:'Dosis', sans-serif;" id="title">${data.title}</h5>            
                <p class="card-text2" id="description2">7.9/10 IMDB</p>
                <button class="upvote1"></button>
                <button class="downvote1"></button>           
              </div>
            </div>
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

