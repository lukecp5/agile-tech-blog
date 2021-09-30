async function signupFormHandler(event) {
      event.preventDefault();
    
      const username = document.querySelector('#user-user-name').value.trim();
      const email = document.querySelector('#user-email').value.trim();
      const password = document.querySelector('#user-password').value.trim();
    
      if (username && email && password) {
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
    
        // check the response status
        if (response.ok) {
          console.log('success');
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
  }
    
  document.querySelector('#register-form').addEventListener('submit', signupFormHandler);