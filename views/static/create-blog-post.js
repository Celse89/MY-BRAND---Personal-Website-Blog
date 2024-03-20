const BASE_URL = 'http://localhost:5500/api/blogs'; 

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');

    const form = document.querySelector('#blog-form'); 
    const titleInput = document.querySelector('#blog-title'); 
    const contentInput = document.querySelector('#blog-content'); 
    const imageInput = document.querySelector('#blog-file');
    const cancelButton = document.querySelector('#cancel-button');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = titleInput.value;
        const content = contentInput.value;
        const image = imageInput.files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        
        fetch(BASE_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
            
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Redirect to dashboard-blog.html after creating a blog post
            window.location.href = '/templates/dashboard-blog.html';
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });

    cancelButton.addEventListener('click', function (event) {
        event.preventDefault();
        titleInput.value = '';
        contentInput.value = '';
        imageInput.value = '';
    });
});