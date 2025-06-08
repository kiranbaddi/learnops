document.addEventListener('DOMContentLoaded', function () {
    const welcomeButton = document.getElementById('welcome-button');
    const registerButton = document.getElementById('register-button');
    const loginButton = document.getElementById('login-button');

    if (welcomeButton) {
        welcomeButton.addEventListener('click', function () {
            alert('Welcome to the application!');
        });
    }

    if (registerButton) {
        registerButton.addEventListener('click', function () {
            alert('Redirecting to registration page...');
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', function () {
            alert('Redirecting to login page...');
        });
    }

    // Use a hardcoded URL or runtime variable (process.env won't work in browser)
    const BACKEND_URL = 'http://localhost:3001'; // adjust based on your setup

    function handleRegisterSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = {
            name: form.uname.value,
            email: form.mail.value,
            password: form.psw.value,
        };
        fetch(`${BACKEND_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed.');
            }
        });
    }

    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', handleRegisterSubmit);
    }
});
