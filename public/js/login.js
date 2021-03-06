const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace('/');
    } else {
      const error = await response.json();
      if (error.message) {
        alert(error.message);
      } else {
        alert('Login Failed!');
      }
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirm = document
    .querySelector('#password-signup-confirm')
    .value.trim();
  if (
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email
    )
  ) {
    if (/[a-zA-Z]/.test(password) && /\d/.test(password) && /\W/.test(password))
      if (password.length >= 10) {
        if (confirm === password) {
          if (username && email && password) {
            // Send a POST request to the API endpoint
            const response = await fetch('/api/users', {
              method: 'POST',
              body: JSON.stringify({ username, email, password }),
              headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
              // If successful, redirect the browser to the home page
              document.location.replace('/');
            } else {
              const error = await response.json();
              if (error.message) {
                alert(error.message);
              } else {
                alert('Sign up failed!');
              }
            }
          } else {
            window.alert('You must fill out all fields!');
          }
        } else {
          window.alert("Your passwords don't match!");
        }
      } else {
        window.alert('Your password must be at least 10 characters long!');
      }
    else {
      window.alert(
        'Your password must contain at least one letter, number, and symbol.'
      );
    }
  } else {
    window.alert('You must use a valid email address.');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
