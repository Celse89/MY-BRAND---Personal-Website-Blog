const BLOGS_API_URL = 'https://my-brand-personal-website-blog-back-end.onrender.com/api/blogs';

document.addEventListener('DOMContentLoaded', function() {
    let token = localStorage.getItem('token');
    fetch(BLOGS_API_URL, {
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
        document.querySelector('.highlight-blogs').textContent = data.data.length;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});