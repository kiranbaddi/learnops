document.addEventListener('DOMContentLoaded', function () {
    // You can variabilize this as in script.js if needed
    const BACKEND_URL = 'http://localhost:3001';

    function handleLoginSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = {
            email: form.uname.value, // backend expects email
            password: form.psw.value,
        };
        fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result.token) {
                // Store JWT in localStorage for session persistence
                localStorage.setItem('jwt_token', result.token);
                alert('Login successful!');
                // Optionally redirect to profile page
                window.location.href = 'profile.html';
            } else {
                alert('Login failed.');
            }
        });
    }

    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', handleLoginSubmit);
    }
});
