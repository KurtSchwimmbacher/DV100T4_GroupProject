// Code for library

// ==========================================================================================
// variables
let filterCount = 1;
let movies = [];
let genres = [];
let yearSort = "";
let ratingSort = "";

// ==========================================================================================

$(document).ready(function(){
// ==============================================================================================================
// filters code
      // hide filters panel
      $(".filter-opt-con").hide(); 
      $(".filter-inp-con").hide();

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

// filter
// show and hide filters
$("#settingsIcon").on('click',function(){ 

  $(".filter-inp-con").toggle();

});

$("#yearRange").on('input',function(){
  let year = $("#yearRange").val();
  $("#showYear").text("Year of Release: "+year)
});
$("#ratingRange").on('input',function(){
  let rating = $("#ratingRange").val();
  $("#showRating").text("IMDB Rating: "+rating)
});

$("#submitFilter").on('click',function(){
   yearSort = $("#yearRange").val();
  ratingSort = $("#ratingRange").val();

  loadEuroMovies();
  loadAfricanMovies();
  loadAsianMovies();
  loadIndianMovies();
  loadTrendingMovies();
  getFilters();

  console.log(yearSort)
  console.log(ratingSort)

})
$("#removeFilter").on('click',function(){
  ratingSort = "";
  yearSort = "";
  console.log(yearSort)
  loadEuroMovies();
  loadAfricanMovies();
  loadAsianMovies();
  loadIndianMovies();
  loadTrendingMovies();
  getFilters();
})


loadEuroMovies();
loadAfricanMovies();
loadAsianMovies();
loadIndianMovies();
loadTrendingMovies();
getFilters();

})

// ==========================================================================================


// ===============================================================================================================
// functions


function loadTrendingMovies(genre){


let moviesToShow = [];
let euroArr = [];
let asiaArr = [];
let afriArr = [];


if(!genre){
  let area = "FR";
$.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;
    
    euroArr = temp;

  },
    error: function(error){
      // handle as it comes
  }
})

area = "DE";
$.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;

      for(i = 0; i < temp.length; i++){
        euroArr.push(temp[i]);
      }

  }, error: function(error){

  }
})

  area = "NG";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&sort_by=popularity.desc&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
      
      // // load movies in trending section of browse page
      afriArr = temp;
  
    },
      error: function(error){
        // handle as it comes
    }
  })
  
  area = "ZA";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
  
        for(i = 0; i < temp.length; i++){
          afriArr.push(temp[i]);
        }    
  
    }, error: function(error){
  
    }
  })

   area = "KR";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
      
      // // load movies in trending section of browse page
      asiaArr = temp;
  
    },
      error: function(error){
        // handle as it comes
    }
  })


  
  area = "JP";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
  
        for(i = 0; i < temp.length; i++){
          asiaArr.push(temp[i]);
        }
         
  
    }, error: function(error){
  
    }
  })


  area = "IN";
      $.ajax({
        dataType: 'json',
        type:"GET",
        // gets the first page of results
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
        success: function(data){
            let temp = data.results;
      
            moviesToShow = temp;
      
            for(i = 0; i <asiaArr.length; i++){
              moviesToShow.push(asiaArr[i]);
            }
            for(i = 0; i <euroArr.length; i++){
              moviesToShow.push(euroArr[i]);
            }
            for(i = 0; i <afriArr.length; i++){
              moviesToShow.push(afriArr[i]);
            }

            // sort by average vote, high to low
            moviesToShow = moviesToShow.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });
            
            if(yearSort != ""){
              moviesToShow= moviesToShow.filter(movie =>movie.release_date.split("-")[0] === yearSort);
              console.log(moviesToShow)
            }
            if(ratingSort != ""){
              moviesToShow= moviesToShow.filter(movie =>movie.vote_average >= ratingSort);
              console.log(moviesToShow)
            }
            
            
            console.log(moviesToShow)
            
            moviesToShow = moviesToShow.slice(0,8);
            fillTrendingMovies(moviesToShow);
            
      
        }, error: function(error){
      
        }
      })
}
else if(genre){
  console.log("Load trending with genre")
  let area = "FR";
$.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;
    
    euroArr = temp;

  },
    error: function(error){
      // handle as it comes
  }
})

area = "DE";
$.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;

      for(i = 0; i < temp.length; i++){
        euroArr.push(temp[i]);
      }

  }, error: function(error){

  }
})

  area = "NG";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
      
      // // load movies in trending section of browse page
      afriArr = temp;
  
    },
      error: function(error){
        // handle as it comes
    }
  })
  
  area = "ZA";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
  
        for(i = 0; i < temp.length; i++){
          afriArr.push(temp[i]);
        }    
  
    }, error: function(error){
  
    }
  })

   area = "KR";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
      
      // // load movies in trending section of browse page
      asiaArr = temp;
  
    },
      error: function(error){
        // handle as it comes
    }
  })


  
  area = "JP";
  $.ajax({
    dataType: 'json',
    type:"GET",
    // gets the first page of results
    url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
    success: function(data){
        let temp = data.results;
  
        for(i = 0; i < temp.length; i++){
          asiaArr.push(temp[i]);
        }
         
  
    }, error: function(error){
  
    }
  })


  area = "IN";
      $.ajax({
        dataType: 'json',
        type:"GET",
        // gets the first page of results
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
        success: function(data){
            let temp = data.results;
      
            moviesToShow = temp;
      
            for(i = 0; i <asiaArr.length; i++){
              moviesToShow.push(asiaArr[i]);
            }
            for(i = 0; i <euroArr.length; i++){
              moviesToShow.push(euroArr[i]);
            }
            for(i = 0; i <afriArr.length; i++){
              moviesToShow.push(afriArr[i]);
            }

            // sort by average vote, high to low
            moviesToShow = moviesToShow.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });
            if(yearSort != ""){
              moviesToShow= moviesToShow.filter(movie =>movie.release_date.split("-")[0] === yearSort);
              console.log(moviesToShow)
            }
            if(ratingSort != ""){
              moviesToShow= moviesToShow.filter(movie =>movie.vote_average >= ratingSort);
              console.log(moviesToShow)
            }
            
            moviesToShow = moviesToShow.slice(0,8);
            console.log("movies to show: ")
            console.log(moviesToShow)
            fillTrendingMovies(moviesToShow);
            
      
        }, error: function(error){
      
        }
      })
}

};

// load trending movies
function fillTrendingMovies(moviesToShow){
    // Clear all cards before loading movies
    let isAdded = 0;
    let canAdd = true;
    let watchlist = JSON.parse(localStorage.getItem("WatchList"));
    $("#trendingContainer").empty();
  
    moviesToShow.forEach(moviesToShow => {

      let iconState = "bi bi-plus-circle";
    
      // checks if movie is in watchlist and updates icon accordingly
      if(watchlist){
        for(i = 0; i < watchlist.length; i++){
          if(moviesToShow.id === watchlist[i]){
            isAdded++;
            canAdd= false;
            console.log(moviesToShow.title + " is already in the watchlist")
          }
        }

        if(isAdded > 0){
          iconState = "bi bi-check-circle";
          canAdd = true;
        }

      }


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
            <p class="add-icon"><i class="${iconState}"></i></p>
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
          let watchlist = JSON.parse(localStorage.getItem("WatchList"));
          if(watchlist != null){

            // if its not in the list, add it
            if(canAdd){
              watchlist.push(parseInt(moviesToShow.id));
              console.log(watchlist +" not in list")
              let toStore = JSON.stringify(watchlist);
              localStorage.setItem("WatchList",toStore);
              $(this).children().removeClass("bi-plus-circle").addClass("bi bi-check-circle");
              canAdd = false;
            }
                       
          }
          else if(!watchlist){
            watchlist.push(parseInt(moviesToShow.id));
            console.log(watchlist)
            let toStore = JSON.stringify(watchlist);
            localStorage.setItem("WatchList",toStore);
            canAdd = false;
          }
          
        });
  
      $("#trendingContainer").append(card);
      isAdded = 0;
    });

};

// load european movies
function fillEuroMovies(moviesToShow){
   // Clear all cards before loading movies
   let isAdded = 0;
   let canAdd = true;
   let watchlist = JSON.parse(localStorage.getItem("WatchList"));
   $("#europeContainer").empty();
 
   moviesToShow.forEach(moviesToShow => {

     let iconState = "bi bi-plus-circle";
   
     // checks if movie is in watchlist and updates icon accordingly
     if(watchlist){
       for(i = 0; i < watchlist.length; i++){
         if(moviesToShow.id === watchlist[i]){
           isAdded++;
           canAdd= false;
           console.log(moviesToShow.title + " is already in the watchlist")
         }
       }

       if(isAdded > 0){
         iconState = "bi bi-check-circle";
         canAdd = true;
       }

     }


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
           <p class="add-icon"><i class="${iconState}"></i></p>
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
         let watchlist = JSON.parse(localStorage.getItem("WatchList"));
         if(watchlist != null){

           // if its not in the list, add it
           if(canAdd){
            console.log(watchlist)
             watchlist.push(parseInt(moviesToShow.id));
             console.log(watchlist)
             let toStore = JSON.stringify(watchlist);
             localStorage.setItem("WatchList",toStore);
             $(this).children().removeClass("bi-plus-circle").addClass("bi bi-check-circle");
             canAdd = false;
           }
                      
         }
         else if(!watchlist){
           watchlist.push(parseInt(moviesToShow.id));
           let toStore = JSON.stringify(watchlist);
           localStorage.setItem("WatchList",toStore);
           canAdd = false;
         }
         
       });
 
     $("#europeContainer").append(card);
     isAdded = 0;
   });

};

// load african movies
function fillAfricanMovies(moviesToShow){
  // Clear all cards before loading movies
  let isAdded = 0;
  let canAdd = true;
  let watchlist = JSON.parse(localStorage.getItem("WatchList"));
  $("#africanContainer").empty();

  moviesToShow.forEach(moviesToShow => {

    let iconState = "bi bi-plus-circle";
  
    // checks if movie is in watchlist and updates icon accordingly
    if(watchlist){
      for(i = 0; i < watchlist.length; i++){
        if(moviesToShow.id === watchlist[i]){
          isAdded++;
          canAdd= false;
          console.log(moviesToShow.title + " is already in the watchlist")
        }
      }

      if(isAdded > 0){
        iconState = "bi bi-check-circle";
        canAdd = true;
      }

    }


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
          <p class="add-icon"><i class="${iconState}"></i></p>
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
        let watchlist = JSON.parse(localStorage.getItem("WatchList"));
        if(watchlist){

          // if its not in the list, add it
          if(canAdd){
            watchlist.push(parseInt(moviesToShow.id));
            let toStore = JSON.stringify(watchlist);
            localStorage.setItem("WatchList",toStore);
            $(this).children().removeClass("bi-plus-circle").addClass("bi bi-check-circle");
            canAdd = false;
          }
                     
        }
        else if(!watchlist){
          watchlist.push(parseInt(moviesToShow.id));
          let toStore = JSON.stringify(watchlist);
          localStorage.setItem("WatchList",toStore);
          canAdd = false;
        }
        
      });

    $("#africanContainer").append(card);
    isAdded = 0;
  });


};

// load asian movies
function fillAsianMovies(moviesToShow){
   // Clear all cards before loading movies
   let isAdded = 0;
   let canAdd = true;
   let watchlist = JSON.parse(localStorage.getItem("WatchList"));
   $("#asianContainer").empty();
 
   moviesToShow.forEach(moviesToShow => {

     let iconState = "bi bi-plus-circle";
   
     // checks if movie is in watchlist and updates icon accordingly
     if(watchlist){
       for(i = 0; i < watchlist.length; i++){
         if(moviesToShow.id === watchlist[i]){
           isAdded++;
           canAdd= false;
           console.log(moviesToShow.title + " is already in the watchlist")
         }
       }

       if(isAdded > 0){
         iconState = "bi bi-check-circle";
         canAdd = true;
       }

     }


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
           <p class="add-icon"><i class="${iconState}"></i></p>
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
         let watchlist = JSON.parse(localStorage.getItem("WatchList"));
         if(watchlist != null){

           // if its not in the list, add it
           if(canAdd){
             watchlist.push(parseInt(moviesToShow.id));
             console.log(watchlist)
             let toStore = JSON.stringify(watchlist);
             localStorage.setItem("WatchList",toStore);
             $(this).children().removeClass("bi-plus-circle").addClass("bi bi-check-circle");
             canAdd = false;
           }
                      
         }
         else if(!watchlist){
           watchlist.push(parseInt(moviesToShow.id));
           let toStore = JSON.stringify(watchlist);
           localStorage.setItem("WatchList",toStore);
           canAdd = false;
         }
         
       });
 
     $("#asianContainer").append(card);
     isAdded = 0;
   });


};

// load indian movies
function fillIndianMovies(moviesToShow){
  // Clear all cards before loading movies
  let isAdded = 0;
  let canAdd = true;
  let watchlist = JSON.parse(localStorage.getItem("WatchList"));
  $("#indianContainer").empty();

  moviesToShow.forEach(moviesToShow => {

    let iconState = "bi bi-plus-circle";
  
    // checks if movie is in watchlist and updates icon accordingly
    if(watchlist != null){
      for(i = 0; i < watchlist.length; i++){
        if(moviesToShow.id === watchlist[i]){
          isAdded++;
          canAdd= false;
          console.log(moviesToShow.title + " is already in the watchlist")
        }
      }

      if(isAdded > 0){
        iconState = "bi bi-check-circle";
        canAdd = true;
      }

    }


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
          <p class="add-icon"><i class="${iconState}"></i></p>
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
        watchlist = JSON.parse(localStorage.getItem("WatchList"));
        console.log(watchlist)
        if(watchlist != null){
          console.log(canAdd + "canAdd")
          // if its not in the list, add it
          if(canAdd){
            watchlist.push(parseInt(moviesToShow.id));
            let toStore = JSON.stringify(watchlist);
            localStorage.setItem("WatchList",toStore);
            $(this).children().removeClass("bi-plus-circle").addClass("bi bi-check-circle");
            canAdd = false;
          }
                     
        }
        else if(watchlist === null){
          watchlist.push(parseInt(moviesToShow.id));
          let toStore = JSON.stringify(watchlist);
          localStorage.setItem("WatchList",toStore);
          canAdd = false;
        }
        
      });

    $("#indianContainer").append(card);
    isAdded = 0;
  });

};



function loadEuroMovies(genre){
// api Pulls
let euroArr = [];
  if(!genre){
    let area = "FR";
$.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;
    
    euroArr = temp;

  },
    error: function(error){
      // handle as it comes
  }
})

area = "DE";
$.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;

      for(i = 0; i < temp.length; i++){
        euroArr.push(temp[i]);
      }

      // sort by average vote, high to low
      euroArr = euroArr.sort((a,b) =>{
        return b.vote_average - a.vote_average;    
      });

      if(yearSort != ""){
        euroArr= euroArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
      }
      if(ratingSort != ""){
        euroArr= euroArr.filter(movie =>movie.vote_average >= ratingSort);
      }

      euroArr = euroArr.slice(0,8);

     fillEuroMovies(euroArr);


  }, error: function(error){

  }
})
  }
  else if(genre){
  let area = "FR";
  $.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;
    
    euroArr = temp;

  },
    error: function(error){
      // handle as it comes
  }
})

area = "DE";
$.ajax({
  dataType: 'json',
  type:"GET",
  // gets the first page of results
  url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
  success: function(data){
      let temp = data.results;

      for(i = 0; i < temp.length; i++){
        euroArr.push(temp[i]);
      }

      // sort by average vote, high to low
      euroArr = euroArr.sort((a,b) =>{
        return b.vote_average - a.vote_average;    
      });

      if(yearSort != ""){
        euroArr= euroArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
      }
      if(ratingSort != ""){
        euroArr= euroArr.filter(movie =>movie.vote_average >= ratingSort);
      }

      euroArr = euroArr.slice(0,8);

     fillEuroMovies(euroArr);


  }, error: function(error){

  }
  })
  }
};

function loadAfricanMovies(genre){
  // api Pulls
  let afriArr = [];
  if(!genre){
    let area = "NG";
    $.ajax({
      dataType: 'json',
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
      success: function(data){
          let temp = data.results;
        
        // // load movies in trending section of browse page
        afriArr = temp;
    
      },
        error: function(error){
          // handle as it comes
      }
    })
    
    area = "ZA";
    $.ajax({
      dataType: 'json',
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
      success: function(data){
          let temp = data.results;
    
          for(i = 0; i < temp.length; i++){
            afriArr.push(temp[i]);
          }
    
          // sort by average vote, high to low
          afriArr = afriArr.sort((a,b) =>{
            return b.vote_average - a.vote_average;    
          });
    
          if(yearSort != ""){
            afriArr=afriArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
          }
          if(ratingSort != ""){
            afriArr= afriArr.filter(movie =>movie.vote_average >= ratingSort);
          }

          afriArr = afriArr.slice(0,8);
    
         fillAfricanMovies(afriArr);
    
    
      }, error: function(error){
    
      }
    })
  }
  else if(genre){
    let area = "NG";
    $.ajax({
      dataType: 'json',
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
      success: function(data){
          let temp = data.results;
        
        // // load movies in trending section of browse page
        afriArr = temp;
    
      },
        error: function(error){
          // handle as it comes
      }
    })
    
    area = "ZA";
    $.ajax({
      dataType: 'json',
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
      success: function(data){
          let temp = data.results;
    
          for(i = 0; i < temp.length; i++){
            afriArr.push(temp[i]);
          }
    
          // sort by average vote, high to low
          afriArr = afriArr.sort((a,b) =>{
            return b.vote_average - a.vote_average;    
          });


          if(yearSort != ""){
            afriArr= afriArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
          }
          if(ratingSort != ""){
            afriArr= afriArr.filter(movie =>movie.vote_average >= ratingSort);
          }
    
          afriArr = afriArr.slice(0,8);
    
         fillAfricanMovies(afriArr);
    
    
      }, error: function(error){
    
      }
    })
  }
};

function loadAsianMovies(genre){
    // api Pulls
    let asiaArr = [];
    if(!genre){
      let area = "KR";
      $.ajax({
        dataType: 'json',
        type:"GET",
        // gets the first page of results
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
        success: function(data){
            let temp = data.results;
          
          // // load movies in trending section of browse page
          asiaArr = temp;
      
        },
          error: function(error){
            // handle as it comes
        }
      })
  
  
      
      area = "JP";
      $.ajax({
        dataType: 'json',
        type:"GET",
        // gets the first page of results
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
        success: function(data){
            let temp = data.results;
      
            for(i = 0; i < temp.length; i++){
              asiaArr.push(temp[i]);
            }
            
            // sort by average vote, high to low
            asiaArr = asiaArr.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });
      

            if(yearSort != ""){
              asiaArr= asiaArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
            }
            if(ratingSort != ""){
              asiaArr= asiaArr.filter(movie =>movie.vote_average >= ratingSort);
            }
  
            asiaArr = asiaArr.slice(0,8);
      
           fillAsianMovies(asiaArr);
      
      
        }, error: function(error){
      
        }
      })
    }
    else if(genre){
      let area = "KR";
      $.ajax({
        dataType: 'json',
        type:"GET",
        // gets the first page of results
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
        success: function(data){
            let temp = data.results;
          
          // // load movies in trending section of browse page
          asiaArr = temp;
      
        },
          error: function(error){
            // handle as it comes
        }
      })
  
  
      
      area = "JP";
      $.ajax({
        dataType: 'json',
        type:"GET",
        // gets the first page of results
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
        success: function(data){
            let temp = data.results;
      
            for(i = 0; i < temp.length; i++){
              asiaArr.push(temp[i]);
            }
            
            // sort by average vote, high to low
            asiaArr = asiaArr.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });
      

            if(yearSort != ""){
              asiaArr= asiaArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
            }
            if(ratingSort != ""){
              asiaArr=asiaArr.filter(movie =>movie.vote_average >= ratingSort);
            }
  
            asiaArr = asiaArr.slice(0,8);
      
           fillAsianMovies(asiaArr);
      
      
        }, error: function(error){
      
        }
      })
    }
};

function loadIndianMovies(genre){
  // api Pulls
  if(!genre){
    area = "IN";
    $.ajax({
      dataType: 'json',
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
      success: function(data){
          let temp = data.results;
    
          // sort by average vote, high to low
          temp = temp.sort((a,b) =>{
            return b.vote_average - a.vote_average;    
          });


          if(yearSort != ""){
            temp=  temp.filter(movie =>movie.release_date.split("-")[0] === yearSort);
          }
          if(ratingSort != ""){
            temp= temp.filter(movie =>movie.vote_average >= ratingSort);
          }
    
          temp = temp.slice(0,8);
    
         fillIndianMovies(temp);
    
    
      }, error: function(error){
    
      }
    })
  }
  else if(genre){
    area = "IN";
    $.ajax({
      dataType: 'json',
      type:"GET",
      // gets the first page of results
      url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_origin_country=${area}`,
      success: function(data){
          let temp = data.results;
    
          // sort by average vote, high to low
          temp = temp.sort((a,b) =>{
            return b.vote_average - a.vote_average;    
          });


          if(yearSort != ""){
            temp=  temp.filter(movie =>movie.release_date.split("-")[0] === yearSort);
          }
          if(ratingSort != ""){
            temp=  temp.filter(movie =>movie.vote_average >= ratingSort);
          }
    
          temp = temp.slice(0,8);
    
         fillIndianMovies(temp);
    
    
      }, error: function(error){
    
      }
    })
  }  
      
};

function getFilters(){
        let genreFilter = [];
        let regionFilter = "";


          // regions
          let regions = ["Africa","Europe","Asia","India","All"];
          $("#regionCon").empty();
          regions.forEach(regions =>{

            const regionTitle = $(`
              <p class="region-link" id="regionLink ${regions}">${regions}</p>
            `);

            $("#regionCon").append(regionTitle);

            regionTitle.on('click',function(){
              $("#regionCon").children().removeClass("active")
              $(this).addClass("active")
              regionFilter = regions;
              filterSortMovies(genreFilter,regionFilter);
            });

          });

        // genres filters 
          $.ajax({
          dataType: 'json',
          type:"GET",
          // gets the first page of results
          url:` https://api.themoviedb.org/3/genre/movie/list?api_key=34e9f99aa672c944811b83fab5b6c232&`,
          success: function(data){
            $("#genreCon").empty();
            let temp = data.genres;

            storeGenreObj(temp);
            
            // add All Genres to genre buttons
            let allGenre = {id:0,name:"All"};
            temp.unshift(allGenre);

            temp.forEach(temp =>{
                
            const genreTitle = $(`
              <p class="genre-link" id = "genreLink">${temp.name}</p>
              `);
            $("#genreCon").append(genreTitle);

            genreTitle.on('click',function(){
              $("#genreCon").children().removeClass("active")
              $(this).addClass("active")
              genreFilter = temp.name;

              let genreTitle = `Showing ${genreFilter}`;
              if(genreFilter === "All"){
                genreTitle = `Showing ${genreFilter} Genres`;
              }
              $("#filterByTitle").text(genreTitle)

              filterSortMovies(genreFilter,regionFilter);
            });
          });
        
          }, error: function(error){
        
          }
        })

}



function filterSortMovies(genre,region){
  console.log(genre)
  if(genre === "All" || genre.length === 0){
    switch(region) {
      // europe case
      // ===============================================================================================
      case "Europe":
        let euroArr = [];
        let areaEu = "FR";
        $.ajax({
          dataType: 'json',
          type:"GET",
          url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${areaEu}`,
          success: function(data){
            let temp = data.results;
              euroArr = temp;   
          },error: function(error){
            // handle as it comes
          }
        })
    
        areaEu = "DE";
        $.ajax({
          dataType: 'json',
          type:"GET",
          url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${areaEu}`,
          success: function(data){
            let temp = data.results;
  
            for(i = 0; i < temp.length; i++){
              euroArr.push(temp[i]);
            }
      
            // sort by average vote, high to low
            euroArr = euroArr.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });


            if(yearSort != ""){
              euroArr= euroArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
            }
            if(ratingSort != ""){
              euroArr= euroArr.filter(movie =>movie.vote_average >= ratingSort);
            }
      
            euroArr = euroArr.splice(0,20);
                    
            displaySortedMovies("Europe",euroArr);
                      
          }, error: function(error){
    
          }
        })
          break;
        case "Africa":
                
        let afriArr = [];
        let areaAf = "NG";
        $.ajax({
          dataType: 'json',
          type:"GET",   
          url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${areaAf}`,
          success: function(data){
            let temp = data.results;
                    
            // // load movies in trending section of browse page
            afriArr = temp;
                
          },error: function(error){
            // handle as it comes
          }
        })
                
        areaAf = "ZA";
        $.ajax({
          dataType: 'json',
          type:"GET",
          url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&sort_by=popularity.desc&with_origin_country=${areaAf}`,
          success: function(data){
            let temp = data.results;
                
            for(i = 0; i < temp.length; i++){
              afriArr.push(temp[i]);
            }
                
            // sort by average vote, high to low
            afriArr = afriArr.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });

            if(yearSort != ""){
              afriArr= afriArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
            }
            if(ratingSort != ""){
              afriArr= afriArr.filter(movie =>movie.vote_average >= ratingSort);
            }
                
            afriArr = afriArr.slice(0,20);
            displaySortedMovies("Africa",afriArr)  
                
          }, error: function(error){
                
          }
        })
          break;
        case "Asia":
          let asiaArr = [];
          let areaAs = "KR";
          $.ajax({
            dataType: 'json',
            type:"GET",
            url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${areaAs}`,
            success: function(data){
              let temp = data.results;
                    
              // load movies in trending section of browse page
              asiaArr = temp;
                
            },error: function(error){
              // handle as it comes
            }
          })
            
          areaAs = "JP";
          $.ajax({
            dataType: 'json',
            type:"GET",
            url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${areaAs}`,
            success: function(data){
              let temp = data.results;
                
              for(i = 0; i < temp.length; i++){
                asiaArr.push(temp[i]);
              }
                      
              // sort by average vote, high to low
              asiaArr = asiaArr.sort((a,b) =>{
                return b.vote_average - a.vote_average;    
              });
                
              if(yearSort != ""){
                asiaArr= asiaArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
              }
              if(ratingSort != ""){
                asiaArr= asiaArr.filter(movie =>movie.vote_average >= ratingSort);
              }


              asiaArr = asiaArr.slice(0,20);
                
              displaySortedMovies("Asia",asiaArr);
                
                
            }, error: function(error){
                
            }
          })
            break;
        case "India":
          area = "IN";
          $.ajax({
            dataType: 'json',
            type:"GET",
            url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${area}`,
            success: function(data){
              let temp = data.results;
                
              // sort by average vote, high to low
              temp = temp.sort((a,b) =>{
                return b.vote_average - a.vote_average;    
              });

              if(yearSort != ""){
                temp= temp.filter(movie =>movie.release_date.split("-")[0] === yearSort);
              }
              if(ratingSort != ""){
                temp= temp.filter(movie =>movie.vote_average >= ratingSort);
              }
                
              temp = temp.slice(0,20);
                
              displaySortedMovies("India",temp);
                
                
            }, error: function(error){
                
            }
          })
              break;
        case "All":
              
              $("#trendingContainer").show();
              $("#trendingRow").show();
              $("#asianContainer").show();
              $("#asianRow").show();
              $("#africanContainer").show();
              $("#africanRow").show();
              $("#indianContainer").show();
              $("#indianRow").show();
              $("#europeContainer").show();
              $("#europeRow").show();
    
    
              loadAfricanMovies();
              loadAsianMovies();
              loadEuroMovies();
              loadIndianMovies();
              loadTrendingMovies();
    
              $("#footerLib").removeClass("extend-footer")
    
                break;
        default:
          console.log("All Selected") 
      }
  }
  else if(genre != "All" && region !="All" && genre != "" && region != ""){
    if(genre && region){
          
      // get the id chosen as id and not name
      let chosenGenreID;
      for(i = 0; i <genres.length; i++){
        if(genres[i].name === genre){
          chosenGenreID = genres[i].id;
          console.log(genres[i].id)
        }
      }
  
      switch(region) {
      // europe case
      // ===============================================================================================
        case "Europe":
          let euroArr = [];
          let areaEu = "FR";
  
          // calls data from French region + selected region
            $.ajax({
              dataType: 'json',
              type:"GET",
              // gets the first page of results
              url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${chosenGenreID}&with_origin_country=${areaEu}`,
              success: function(data){
                let temp = data.results;
                euroArr = temp;    
              },
                error: function(error){
                  // handle as it comes
                }
              })
  
              // calls data from German region + selected region
              areaEu = "DE";
              $.ajax({
                dataType: 'json',
                type:"GET",
                // gets the first page of results
                url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${chosenGenreID}&with_origin_country=${areaEu}`,
                success: function(data){
                  let temp = data.results;
  
                  // combines two regions into one array
                  for(i = 0; i < temp.length; i++){
                    euroArr.push(temp[i]);
                  }
      
                  // sort by average vote, high to low
                  euroArr = euroArr.sort((a,b) =>{
                    return b.vote_average - a.vote_average;    
                  });

                  if(yearSort != ""){
                    euroArr= euroArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
                  }
                  if(ratingSort != ""){
                    euroArr= euroArr.filter(movie =>movie.vote_average >= ratingSort);
                  }
      
                  euroArr = euroArr.splice(0,20);
                    
                  displaySortedMovies("Europe",euroArr);
                      
                }, error: function(error){
    
                }
              })
                break;
        case "Africa":     
          let afriArr = [];
          let areaAf = "NG";
          $.ajax({
            dataType: 'json',
            type:"GET",
            // gets the first page of results
            url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${chosenGenreID}&with_origin_country=${areaAf}`,
            success: function(data){
              let temp = data.results;
              // load movies in trending section of browse page
              afriArr = temp;
              },error: function(error){
                // handle as it comes
              }
          })
                
          areaAf = "ZA";
          $.ajax({
          dataType: 'json',
          type:"GET",
          url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${chosenGenreID}&with_origin_country=${areaAf}`,
          success: function(data){
            let temp = data.results;
                
            for(i = 0; i < temp.length; i++){
              afriArr.push(temp[i]);
            }
                
            // sort by average vote, high to low
            afriArr = afriArr.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });

            if(yearSort != ""){
              afriArr=  afriArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
            }
            if(ratingSort != ""){
              afriArr=  afriArr.filter(movie =>movie.vote_average >= ratingSort);
            }
                
            afriArr = afriArr.slice(0,20);
            displaySortedMovies("Africa",afriArr)  
                
            }, error: function(error){
                
            }
          })
            break;
        case "Asia":
        let asiaArr = [];
        let areaAs = "KR";
        $.ajax({
          dataType: 'json',
          type:"GET",
          url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${chosenGenreID}&with_origin_country=${areaAs}`,
          success: function(data){
            let temp = data.results;
            // load movies in trending section of browse page
            asiaArr = temp;
            },error: function(error){
              // handle as it comes
            }
        })
        areaAs = "JP";
        $.ajax({
        dataType: 'json',
        type:"GET",
        url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${chosenGenreID}&with_origin_country=${areaAs}`,
        success: function(data){
          let temp = data.results;
            for(i = 0; i < temp.length; i++){
              asiaArr.push(temp[i]);
            }
            // sort by average vote, high to low
            asiaArr = asiaArr.sort((a,b) =>{
              return b.vote_average - a.vote_average;    
            });
  
            if(yearSort != ""){
              asiaArr=  asiaArr.filter(movie =>movie.release_date.split("-")[0] === yearSort);
            }
            if(ratingSort != ""){
              asiaArr=  asiaArr.filter(movie =>movie.vote_average >= ratingSort);
            }

            asiaArr = asiaArr.slice(0,20);
                
            displaySortedMovies("Asia",asiaArr);
          }, error: function(error){
                
          }
        })
                break;
        case "India":
        area = "IN";
        $.ajax({
          dataType: 'json',
          type:"GET",
          // gets the first page of results
          url:`https://api.themoviedb.org/3/discover/movie?api_key=34e9f99aa672c944811b83fab5b6c232&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${chosenGenreID}&with_origin_country=${area}`,
          success: function(data){
          let temp = data.results;
                
          // sort by average vote, high to low
          temp = temp.sort((a,b) =>{
            return b.vote_average - a.vote_average;    
          });


          if(yearSort != ""){
            temp= temp.filter(movie =>movie.release_date.split("-")[0] === yearSort);
          }
          if(ratingSort != ""){
            temp= temp.filter(movie =>movie.vote_average >= ratingSort);
          }
                
          temp = temp.slice(0,20);
                
          displaySortedMovies("India",temp);
  
          }, error: function(error){
                
          }
        })
          break;
        case "All":
  
          $("#trendingContainer").show();
          $("#trendingRow").show();
          $("#asianContainer").show();
          $("#asianRow").show();
          $("#africanContainer").show();
          $("#africanRow").show();
          $("#indianContainer").show();
          $("#indianRow").show();
          $("#europeContainer").show();
          $("#europeRow").show();
    
          loadAfricanMovies();
          loadAsianMovies();
          loadEuroMovies();
          loadIndianMovies();
          loadTrendingMovies();
    
          $("#footerLib").removeClass("extend-footer")
    
            break;
          default:
            console.log("All Selected") 
      }
    }
  }
  else if(region === "All" || region === ""){
    console.log("just sort by genre")

    // get the id chosen as id and not name
    let chosenGenreID;
    for(i = 0; i <genres.length; i++){
      if(genres[i].name === genre){
        chosenGenreID = genres[i].id;
        console.log(genres[i].id)
      }
    }

    loadTrendingMovies(chosenGenreID)
    loadEuroMovies(chosenGenreID);
    loadAfricanMovies(chosenGenreID);
    loadAsianMovies(chosenGenreID);
    loadIndianMovies(chosenGenreID);

  }

}


function displaySortedMovies(country,moviesToDisplay){
  $("#trendingContainer").hide();
  $("#trendingRow").hide();
  $("#asianContainer").hide();
  $("#asianRow").hide();
  $("#africanContainer").hide();
  $("#africanRow").hide();
  $("#indianContainer").hide();
  $("#indianRow").hide();
  $("#europeContainer").hide();
  $("#europeRow").hide();
  // hides other categories
  switch(country){
    case "Europe":
      $("#europeContainer").show();
      $("#europeRow").show();

      // fills the euro container
      fillEuroMovies(moviesToDisplay);

      // fix footer margin
      $("#footerLib").addClass("extend-footer")
      break;
      
      
    case "Africa":
      $("#africanContainer").show();
      $("#africanRow").show();

      // fills the euro container
      fillAfricanMovies(moviesToDisplay);

      // fix footer margin
      $("#footerLib").addClass("extend-footer")
      break;


      case "Asia":
        $("#asianContainer").show();
        $("#asianRow").show();
  
        // fills the euro container
        fillAsianMovies(moviesToDisplay);
  
        // fix footer margin
        $("#footerLib").addClass("extend-footer")
        break;


        case "India":
          $("#indianContainer").show();
          $("#indianRow").show();
  
        // fills the euro container
        fillIndianMovies(moviesToDisplay);
  
        // fix footer margin
        $("#footerLib").addClass("extend-footer")
        break;
      
  }
}

// store genre objects
function storeGenreObj(GenreObjArr){
  genres = GenreObjArr;
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
          <p class="add-icon-lib"><i class="bi bi-plus-circle"></i></p>
      </div>
      </div>`);

      $(moviesToShow).find("#moviePoster").css("background-image","url(" + imgUrl + ")"); 

      // navigates to single movie page
      card.on('click','.lib-card',function(){

        window.location.href = `singleFilm.html?id=${moviesToShow.id}`;
      });

      // to add the movie from the library page to the watch list
      // when the button is clicked
      card.on('click','.add-icon-lib',function(){

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
          <p class="add-icon-lib"><i class="bi bi-plus-circle"></i></p>
      </div>
      </div>`);

      $(moviesToShow).find("#moviePoster").css("background-image","url(" + imgUrl + ")"); 

      // navigates to single movie page
      card.on('click','.lib-card',function(){

        window.location.href = `singleFilm.html?id=${moviesToShow.id}`;
      });

      // to add the movie from the library page to the watch list
      // when the button is clicked
      card.on('click','.add-icon-lib',function(){

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
          <p class="add-icon-lib"><i class="bi bi-plus-circle"></i></p>
      </div>
      </div>`);

      $(moviesToShow).find("#moviePoster").css("background-image","url(" + imgUrl + ")"); 

      // navigates to single movie page
      card.on('click','.lib-card',function(){

        window.location.href = `singleFilm.html?id=${moviesToShow.id}`;
      });

      // to add the movie from the library page to the watch list
      // when the button is clicked
      card.on('click','.add-icon-lib',function(){

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


