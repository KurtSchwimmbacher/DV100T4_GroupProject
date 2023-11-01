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
getFilters();

})




// ==============================================================================================================
// api dynamic load page






// ==========================================================================================


// ===============================================================================================================
// functions


function loadTrendingMovies(){

let moviesToShow = [];
let euroArr = [];
let asiaArr = [];
let afriArr = [];

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
            
            moviesToShow = moviesToShow.slice(0,8);
            console.log(moviesToShow)
            fillTrendingMovies(moviesToShow);
            
      
        }, error: function(error){
      
        }
      })

};

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
        <div id="cardBody" class="card-body mt-2 mb-5">
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

      euroArr = euroArr.slice(0,8);

     fillEuroMovies(euroArr);


  }, error: function(error){

  }
})
};

function loadAfricanMovies(){
  // api Pulls
  let afriArr = [];
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
  
        afriArr = afriArr.slice(0,8);
  
       fillAfricanMovies(afriArr);
  
  
    }, error: function(error){
  
    }
  })
  };


  function loadAsianMovies(){
    // api Pulls
    let asiaArr = [];
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
    

          asiaArr = asiaArr.slice(0,8);
    
         fillAsianMovies(asiaArr);
    
    
      }, error: function(error){
    
      }
    })
    };




    function loadIndianMovies(){
      // api Pulls
       
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
      
            temp = temp.slice(0,8);
      
           fillIndianMovies(temp);
      
      
        }, error: function(error){
      
        }
      })
      
      };

      function getFilters(){
        let genreFilter = "";
        let regionFilter = "";


          // regions
          let regions = ["Africa","Europe","Asia","India","All"];
          $("#regionCon").empty();
          regions.forEach(regions =>{
            console.log(regions)

            const regionTitle = $(`
              <p class="region-link" id="regionLink">${regions}</p>
            `);

            $("#regionCon").append(regionTitle);

            regionTitle.on('click',function(){
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

              temp.forEach(temp =>{
                
                const genreTitle = $(`
                <p class="genre-link" id = "genreLink">${temp.name}</p>
                `);
                $("#genreCon").append(genreTitle);

                genreTitle.on('click',function(){
                  genreFilter = temp.name;
                  filterSortMovies(genreFilter,regionFilter);
                });
              });
        
          }, error: function(error){
        
          }
        })

      }



      function filterSortMovies(genre,region){
        console.log(genre)
        console.log(region)
        let area1,area2 = "";
        switch(region) {
          // europe case
          // ===============================================================================================
          case "Europe":
            let euroArr = [];
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

                euroArr = euroArr.splice(0,20);
                
                displaySortedMovies("Europe",euroArr);

              


            }, error: function(error){

            }
          })
            break;
          case "Africa":
            area1 = "ZA";
            area2 = "NG";
            console.log(area1 + area2)
            break;
          case "Asia":
            area1 = "KR";
            area2 = "JP";
            console.log(area1 + area2)
            break;
          case "India":
            area1 = "IN";
            console.log(area1)
            break;
          case "All":
            console.log("All Selected")
            break;
          default:
            console.log("All Selected") 
        }
      }


function displaySortedMovies(country,moviesToDisplay){
  // hides other categories
  switch(country){
    case "Europe":
      $("#trendingContainer").hide();
      $("#trendingTitle").hide();
      $("#asianContainer").hide();
      $("#asianTitle").hide();
      $("#africanContainer").hide();
      $("#africanTitle").hide();
      $("#indianContainer").hide();
      $("#indianTitle").hide();
      // $("#europeContainer").hide();

      // fills the euro container
      fillEuroMovies(moviesToDisplay);
      break;
      
  }
}