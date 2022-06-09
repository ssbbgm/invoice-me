//DOM Elements
const registerForm = document.getElementById('register');
const registerButton = document.getElementById('register-submit');
const passwordModal = document.getElementById('popup-modal');


// registerButton.addEventListener('click', () => {
//     console.log('hey!')
// })


const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const pw_confirm = document.querySelector('#password_confirmation').value.trim();

  
    if (password === pw_confirm) {
      // Send a POST request to the API endpoint
      const response = await fetch('/dashboard/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        console.log(response.statusText);
      }
    } else {
      alert('Passwords must match. Please try again.');
    }

};

registerForm.addEventListener('submit', loginFormHandler)
