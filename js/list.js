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


    $("input[name= 'filterRadio']").click(function(){
        appliedFilter = $(this).attr('value');
        console.log("Applied Filter "+ appliedFilter)
        basicFilterSortShows();
    });
    
    
    $("input[name = 'sortRadio']").click( function(){
        appliedSort = $(this).attr('value');
        console.log(appliedSort);
        basicFilterSortShows();
    });



})


// ================================================================================================
function basicFilterSortShows(){

        if(appliedSort){
            if(appliedSort === "name"){
                // sort by price
                filterSortShowsArr= filterSortShowsArr.sort((a,b) =>{
                    return a.name.localeCompare(b.name);     
                });
            }
            else if(appliedSort === "show"){
                // sort by alphabetically, a to z
                filterSortShowsArr= filterSortShowsArr.sort((a,b) =>{
                    return a.name.localeCompare(b.name);    
                });
            }
            
        }

      //console.log(filterSortTripArr);


       //loadtrips();
}




//if(appliedSort){
  //  if(appliedSort === "low to high"){
        // sort by price
   //     filterSortShowsArr= filterSortShowsArr.sort((a,b) =>{
   //         return a.name.localeCompare(b.name);     
 //       });
 //   }
