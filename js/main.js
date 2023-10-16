// movies array //

console.log("hello")

// variables
// ======================================================================================================
// to be replaced by API data - Kurt
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

// order with other variable sets
// default sort
let appliedSort ="allStreams";

//displays shows in console//

// put function calls in document.ready wrapper
$(document).ready(function (){
    // like  this - Kurt
    // array of movies sent to watch List
    loadShows(arrPlaylist);

    // on click goes in document.ready
    //onclick event for sort button
    $("input[name = 'sortRadio']").click(function(){
        const appliedSort = $(this).attr('value');
        console.log("Applied Sort: "+appliedSort);
        displayStreams();
    });



});



// functions 
// ======================================================================================================
function loadShows(){
    console.log(arrPlaylist);

    for (let index = 0; index < arrPlaylist.length; index++) {
        const programs = arrPlaylist[index];
        
        console.log(programs)

        $("#soapiesBox").children().eq(index).find("#title").text(programs.name)
        $("#soapiesBox").children().eq(index).find("#description").text(programs.show)
    }
};


function displayStreams(displayStreams){
    
    let streams = [];

    streams = arrPlaylist.sort(show => show.name === appliedSort)
}








