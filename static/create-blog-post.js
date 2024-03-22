const BASE_URL = 'https://my-brand-personal-website-blog-back-end.onrender.com/api/blogs'; 

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');

    const form = document.querySelector('#blog-form'); 
    const titleInput = document.querySelector('#blog-title'); 
    const contentInput = document.querySelector('#blog-content'); 
    const imageInput = document.querySelector('#blog-file');
    const cancelButton = document.querySelector('#cancel-button');

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id'); // Get the blog id from the URL

    let currentImage = ""; // Define currentImage variable

    if (blogId) {
        fetch(`${BASE_URL}/${blogId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                const blog = data.data;
                titleInput.value = blog.title;
                contentInput.value = blog.content;
                currentImage = blog.image; // Store the current image URL
            }
        })
        .catch(error => console.error('Error:', error));
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        
        const title = titleInput.value;
        const content = contentInput.value;
        let image = imageInput.files[0];


        if (!title) {
            alert('Title is required');
            return;
        }
    
        // If no new image is selected, use the current image
        if (!image && blogId) {
            image = currentImage; // Assuming `currentImage` is the URL of the current image
        }
        // If no new image is selected, use the current image
        if (!image && blogId) {
            image = currentImage; // Assuming `currentImage` is the URL of the current image
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        
        fetch(blogId ? `${BASE_URL}/${blogId}` : BASE_URL, {
            method: blogId ? 'PUT' : 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log('Server response:', response);
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