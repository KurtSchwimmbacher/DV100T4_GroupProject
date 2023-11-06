$(document).ready(function(){

$("#upvoteOpen").on('click',function(){
    console.log("Works");
    $("#review").addClass("openreview");
    $("#review").removeClass("review")
});

$("#closeBtn").on('click',function(){
    $("#review").removeClass("openreview");
    $("#review").addClass("review")


 
});

})
