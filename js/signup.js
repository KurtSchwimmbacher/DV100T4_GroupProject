
// Commented out for now

// const form = document.getElementById('form');
// const username = document.getElementById('UsernameInputSU');
// const email = document.getElementById('EmailInputSU');
// const password = document.getElementById('PasswordInputSU');
// const password2 = document.getElementById('PasswordConfirmSU');

//    form.addEventListener('submit' , e => {
//        e.preventDefault();


//        validateInputs();
//    });

// const setError = (element, message) => {
//        const inputControl = element.parentElement;
//        const errorDisplay = inputControl.querySelector('.error');

//        errorDisplay.innerText = message;
//        inputControl.classList.add('error');
//        inputControl.classList.remove('Success');
// }

// const setSuccess = element => {
//       const inputControl = element.parentElement;
//       const errorDisplay = inputControl.querySelector('.error');

//       errorDisplay.innertext = '';
//       inputControl.classList.add('success');
//       inputControl.classList.remove('error');

// }
   
// const validateInputs = () => {
//       const usernameValue = username.value.trim();
//       const emailValue = email.value.trim();
//       const passwordValue = password.value.trim();
//       const password2Value = password2.value.trim();

//         if (usernameValue === '') {
//             setError(username , "Username is Required!");
//         }
//         else if (usernameValue.length < 8){
//             setError(username , "Username must be 8 or more Characters!");
//         }
//         else{
//              setSuccess(username);
//         }

//         if(emailValue === '') {
//             setError(email, 'Email is required!');
//         }

//         else{
//             setSuccess(email);
//         }
            
//        if(passwordValue === '') {
//               setError(password , 'Password is required!');
//         }

//         else if (passwordValue.length < 8 ) {
//             setError(password , 'Password must be 8 or more characters!')
//         }
//         else {
//             setSuccess(password);
//         }

//     if (password2Value === '') {
//         setError(password2, 'Please Confirm Password!');
//     }
//     else if (passwordValue !== passwordValue){
//         setError(password2, 'Passwords does not match!');
//     }
//     else{
//         setSuccess(password2);
//     }
// };


$(document).ready(function(){
// Kurts jquery and bootstrap attempts
// -----------------------------------------------------------------
// on sign up submit prevent default submission
$("#signUpForm").submit(function(event){

    event.preventDefault();

    if(this.checkValidity() === false){
        event.stopPropagation();
    }else{
        // add submission code, like saving to localstorage
        window.location.href = 'pages/browse.html';
    }
    $(this).addClass('was-validated');

});
});