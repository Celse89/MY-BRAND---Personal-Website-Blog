window.addEventListener('load', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('userMenu').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('userMenu').style.display = 'none';
    }
});