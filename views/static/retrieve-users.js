const USERS_API_URL = 'http://localhost:5500/api/users';

function handleResponse(response) {
    console.log('Response:', response); // Log the response
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function fetchUsers() {
    let token = localStorage.getItem('token');

    console.log('Fetching users...'); // Log before fetching users

    return fetch(USERS_API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(handleResponse)
    .then(data => {
        console.log('Data:', data); // Log the data
        return data.data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Log when DOM is loaded
    fetchUsers().then(users => {
        console.log('Users:', users); // Log the users
        const numberOfUsers = users.length; // Get the number of users
        console.log('Number of users:', numberOfUsers); // Log the number of users
        document.querySelector('.highlight-users').textContent = numberOfUsers; // Display the number of users
    });
    
});