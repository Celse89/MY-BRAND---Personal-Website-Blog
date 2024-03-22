window.addEventListener('load', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');

    if (isLoggedIn === 'true') {
        document.getElementById('userMenu').style.display = 'block';
        if (isAdmin === 'true') {
            document.getElementById('dashboardLink').style.display = 'block';
        } else {
            document.getElementById('dashboardLink').style.display = 'none';
        }
    } else {
        document.getElementById('login').style.display = 'block';
    }
});