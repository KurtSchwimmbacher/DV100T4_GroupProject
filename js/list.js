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


    $("input[name= 'filterRadio']").click(function(){
        appliedFilter = $(this).attr('value');
        console.log("Applied Filter "+ appliedFilter)
        basicFilterSortTrips();
    });
    
    
    $("input[name = 'sortRadio']").click( function(){
        appliedSort = $(this).attr('value');
        console.log(appliedSort);
        basicFilterSortTrips();
    });



})
// =======================================
// Filter buttons
// ================================================================================================



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

// ================================================================================================
function basicFilterSortTrips(){
    let filterSortTripArr = [];

        //Filter Trips
        if(appliedFilter !=""){
            if(appliedFilter == "short"){
                filterSortTripArr = tripArr.filter(trip =>trip.duration < 6);
            }
            else if(appliedFilter == "long"){
                filterSortTripArr = tripArr.filter(trip =>trip.duration > 5);
            }
            else if(appliedFilter == "single"){
                filterSortTripArr = tripArr.filter(trip =>trip.destinations.split(",").length === 1);
            }
            else if(appliedFilter == "multi"){
                filterSortTripArr = tripArr.filter(trip =>trip.destinations.split(",").length > 1);
            }
            else if(appliedFilter == "round"){
                filterSortTripArr = tripArr.filter(trip =>trip.roundTrip === true);
            }
            else if(appliedFilter == "row"){
                let arr = tripArr.sort(function (a, b) { 
                     return b - a; 
                });
                filterSortTripArr = arr.slice(Math.max(arr.length - 5, 0))
            }
        }   
        else{
            filterSortTripArr = tripArr;
        }

        if(appliedSort){
            if(appliedSort === "low to high"){
                // sort by price
                filterSortTripArr = filterSortTripArr.sort((a,b) =>{
                    return a.price -b.price;    
                });
            }
            else if(appliedSort === "alphabetically"){
                // sort by alphabetically, a to z
                filterSortTripArr = filterSortTripArr.sort((a,b) =>{
                    return a.name.localeCompare(b.name);    
                });
            }
            else if(appliedSort === "date added"){
                // sort by date added
                filterSortTripArr = filterSortTripArr.sort((a,b) =>{
                    let da = new Date(a.addedDate);
                    let db = new Date(b.addedDate);
                    
                    return db-da;
                });
            }
        }

        console.log(filterSortTripArr);


        loadTrips(filterSortTripArr);
}
