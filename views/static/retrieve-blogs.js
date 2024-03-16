const BLOGS_API_URL = 'http://localhost:5500/api/blogs';

document.addEventListener('DOMContentLoaded', function() {
    fetch(BLOGS_API_URL, {
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
        document.querySelector('.highlight-blogs').textContent = data.data.length;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});