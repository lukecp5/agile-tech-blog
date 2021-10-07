$("#login-form").bootstrapValidator();

$("#login-form").submit(async (evt) => {
    evt.preventDefault();
    const email = document.querySelector("#user-email").value
    const password = document.querySelector("#user-password").value

    try {
       const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            console.log(response);
            document.location.replace('/dashboard')
        } else {
            console.log(response)
            window.alert(response.statusText)
        }
    } catch (e) {
        window.alert("Login Failed")
    }
});

async function signupFormHandler(event) {
    event.preventDefault();

    // get the information from the sign up form
    const username = document.querySelector('#user-user-name').value.trim();
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();

    // if all three fields have content
    if (username && email && password) {
        // POST the new user to the user table in the database
        const response = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                username,
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // when the fetch promise is fufilled, check the response status and convey the results
        if (response.ok) {
            alert('Account created! Logging you in now.');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);