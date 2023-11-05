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
        // displayStreams();
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
            <div class="col-xl-4 col-lg-4 col-md-6 col-xs-12 card-WL-container" >
            <div class="card" >
              <img src="${imgUrl}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-text">${data.title}</h5>
                <div class="btn-grp-wl">
                  <button class="upvote1"></button>
                  <button class="downvote1"></button>  
                  <button class="remove1"></button>
                </div>
              </div>
            </div>
          </div>`); 
           
          $("#watchlistCon").append(wlCard);

          wlCard.on('click',".card-img-top",function(){
            window.location.href = `singleFilm.html?id=${data.id}`;
          })

        },
        error: function(error){
            // handle as it comes
        }
    });



};


