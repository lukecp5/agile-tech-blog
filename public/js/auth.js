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
            document.location.replace('/dashboard')
        } else {
            window.alert(response.statusText)
        }
    } catch (e) {
        window.alert("Login Failed")
    }
});