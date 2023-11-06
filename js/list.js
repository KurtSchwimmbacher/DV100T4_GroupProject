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
                <p class="card-text">IMDB Rating: ${data.vote_average}</p>
                <div class="btn-grp-wl">
 
                  <button class="remove1"></button>
                </div>
              </div>
            </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>`);
    
          $("#watchlistCon").append(wlCard);

          wlCard.on('click',".card-img-top",function(){
            window.location.href = `singleFilm.html?id=${data.id}`;
          })

          wlCard.on('click',".remove1",function(){
            let currentID = data.id;
            let local = JSON.parse(localStorage.getItem("WatchList"));
            if(local != null){
              let index = local.indexOf(data.id);
              if(index > -1){
                local.splice(index,1);
              }

              let toStore = JSON.stringify(local);
              localStorage.setItem("WatchList",toStore);
              $("#watchlistCon").empty();
              console.log(local)
              for(i = 0; i < local.length; i++){
                getMovies(local[i])
              }
            }
          })


        },
        error: function(error){
            // handle as it comes
        }
    });



};

