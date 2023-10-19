// ======================================================
// variables

// to be replaced by API data - Kurt
// for watchlist
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
// ================================================================================

$(document).ready(function(){
    // array of movies sent to watch List
    loadShows(arrPlaylist);

    // on click goes in document.ready
    //onclick event for sort button
    $("input[name = 'sortRadio']").click(function(){
        const appliedSort = $(this).attr('value');
        console.log("Applied Sort: "+appliedSort);
        displayStreams();
    });

})
// =======================================



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

// ======================================================
// Add to Watchlist

let watchlistData = JSON.parse(localStorage.getItem('watchlistMovie'));
console.log(watchlistData);