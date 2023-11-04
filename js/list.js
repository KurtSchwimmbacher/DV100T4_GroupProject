// ======================================================
// variables

// to be replaced by API data - Kurt
// for watch-list
const arrPlaylist = [
    {
        name:"The green knight",
        show:"tvShows"
    },

    {
        name:"Pearl",
        show:"tvMovies"
    },

    {
        name:"When you finish saving the world",
        show:"tvMovies"
    }

   
];


 


// for watch list
function loadShows(){
    console.log(arrPlaylist);

    for (let index = 0; index < arrPlaylist.length; index++) {
        const programs = arrPlaylist[index];
        
        console.log(programs)
  }
};

// ================================================================================

$(document).ready(function(){
    // array of movies sent to watch List
    loadShows(arrPlaylist);

    // on click goes in document.ready
    //onclick event for sort button
    $("#series").click(function(){
        const appliedSort = $(this).attr('value');
        
        console.log(appliedSort);
        
    });

    $("#movies").click(function(){
        const appliedSort = $(this).attr('value');
        
        console.log(appliedSort);
        
    });

    $("#allShows").click(function(){
        const appliedSort = $(this).attr('value');
        
        console.log(appliedSort);
        
    });


    $("input[name= 'filterRadio']").click(function(){
        appliedFilter = $(this).attr('value');
        console.log("Applied Filter "+ appliedFilter)
        basicFilterSortShows();
    });
    
    
    $("input[name = 'filterRadio']").click( function(){
        appliedSort = $(this).attr('value');
        console.log(appliedSort);
        basicFilterSortShows();
    });



})



  $(document).ready(function () {
    const radioButtons = $('input[name="sortRadio"]');
    const movieCards = $('.watchlist-card');
    const storageKey = 'selectedFilter';

    // Check for a previously selected filter in local storage
    const selectedFilter = localStorage.getItem(storageKey);
    if (selectedFilter) {
      const matchingRadio = $(`input[value="${selectedFilter}"]`);
      if (matchingRadio.length > 0) {
        matchingRadio.prop('checked', true);
        applyFilter(selectedFilter);
      }
    }

    radioButtons.on('change', function () {
      const selectedFilter = this.value;

      // Store the selected filter in local storage
      localStorage.setItem(storageKey, selectedFilter);

      applyFilter(selectedFilter);
    });

    function applyFilter(filter) {
      // Hide all movie cards
      movieCards.hide();

      // Show movie cards with the selected category
      if (filter === 'allStreams') {
        // Show all movies if "All Shows" is selected
        movieCards.show();
      } else {
        var selectedCategory = '.' + filter;
        var matchingCards = movieCards.filter(selectedCategory);
        matchingCards.show();
      }
    }
  });




  