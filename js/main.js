// movies array //

console.log("hello")

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

//displays shows in console//

loadShows(arrPlaylist);
let appliedSort ="allStreams";

function loadShows(){
    console.log(arrPlaylist);

    for (let index = 0; index < arrPlaylist.length; index++) {
        const programs = arrPlaylist[index];
        
        console.log(programs)

        $("#soapiesBox").children().eq(index).find("#title").text(programs.name)
        $("#soapiesBox").children().eq(index).find("#description").text(programs.show)
    }
}

//onclick event//



$("input[name = 'sortRadio']").click(function(){
    const appliedSort = $(this).attr('value');
 
     console.log(appliedSort);
     displayStreams();
 })



function streams(displayStreams){
    
    let streams = [];

    streams = arrPlaylist.sort(show => show.name === appliedSort)
}








