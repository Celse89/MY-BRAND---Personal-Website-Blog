document.getElementById('editUserForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = window.location.pathname.split('/').pop();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const isAdmin = document.getElementById('isAdmin').value === 'true';

    fetch(`http://localhost:5500/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            isAdmin: isAdmin,
        }),
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('User updated successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});