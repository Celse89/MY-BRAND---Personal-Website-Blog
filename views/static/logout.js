function logout() {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');

    window.location.href = '/templates/login.html';
}


document.getElementById('logoutLink').addEventListener('click', function (event) {
    event.preventDefault();
    logout();
});