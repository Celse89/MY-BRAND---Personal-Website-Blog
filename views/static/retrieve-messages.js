const MESSAGE_API_URL = 'http://localhost:5500/api/messages';

document.addEventListener('DOMContentLoaded', function() {
    let token = localStorage.getItem('token');
    fetch(MESSAGE_API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(`HTTP error! status: ${response.status}, message: ${error.message}`);
            });
        }
        return response.json();
    })
    .then(data => {
        document.querySelector('.highlight-messages').textContent = data.data.length;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});