document.addEventListener('DOMContentLoaded', function () {
    const BACKEND_URL = 'http://localhost:3001';
    const token = localStorage.getItem('jwt_token');
    const profileInfo = document.getElementById('profile-info');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!token) {
        profileInfo.textContent = 'Not logged in.';
        return;
    }

    fetch(`${BACKEND_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            profileInfo.textContent = data.message;
        } else {
            profileInfo.textContent = 'Failed to load profile.';
        }
    })
    .catch(() => {
        profileInfo.textContent = 'Failed to load profile.';
    });

    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('jwt_token');
        window.location.href = 'login.html';
    });
});
