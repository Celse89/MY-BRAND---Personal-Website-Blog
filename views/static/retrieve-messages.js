const MESSAGE_API_URL = 'http://localhost:5500/api/messages';

document.addEventListener('DOMContentLoaded', function() {
    fetch(MESSAGE_API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
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