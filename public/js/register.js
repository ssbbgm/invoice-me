//DOM Elements
const registerForm = document.getElementById('register');
const registerButton = document.getElementById('register-submit');


// registerButton.addEventListener('click', () => {
//     console.log('hey!')
// })



const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const pw_confirm = document.querySelector('#password_confirmation').value.trim();



      // Send a POST request to the API endpoint
    const response = await fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard/profile');
      } else {
        console.log(response.statusText);
      }
    
};

registerForm.addEventListener('submit', loginFormHandler)
