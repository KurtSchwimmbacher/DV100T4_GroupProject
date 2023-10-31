$(document).ready(function(){

$("#upvoteOpen").on('click',function(){
    console.log("Works");
    $("#rReview").addClass("openreview");
    $("#rReview").removeClass("review")
});

$("#closeBtn").on('click',function(){
    $("#rReview").removeClass("openreview");
    $("#rReview").addClass("review")
})


});
