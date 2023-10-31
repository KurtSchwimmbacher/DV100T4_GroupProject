let review = document.getElementById("rReview");

function openReview(){
    review.classList.remove('rrreview');
    review.classList.add('openreview');
}

function closeReview(){
    review.classList.remove("openreview");
    review.classList.add('rrreview');
}


