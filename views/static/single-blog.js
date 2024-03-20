document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'http://localhost:5500/api';
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id'); // Get the blog id from the URL

    fetch(`${API_URL}/blogs/${blogId}`, {
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
    .then((responseData) => {
        console.log(responseData); // Log the response data

        const blog = responseData.data;

        document.querySelector('.header h1').textContent = blog.title;
        document.querySelector('.header .author').textContent = `By ${blog.author}`;
        document.querySelector('.header .date').textContent = `Posted on ${new Date(blog.createdAt).toLocaleDateString()}`;
        document.querySelector('.blog-content p').textContent = blog.content;

        // Fetch the comments for the blog post
        fetch(`${API_URL}/blogs/${blogId}/comments`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Add a console log here to inspect the data
            if (data.ok) {
                const commentsSection = document.querySelector('.comments-section');
                if (Array.isArray(data.comments)) { // Check if data.comments is an array
                    data.comments.forEach(comment => {
                        // Create a new comment HTML structure
                        const commentElement = document.createElement('div');
                        commentElement.classList.add('comment');
        
                        const commentInfo = document.createElement('div');
                        commentInfo.classList.add('comment-info');
        
                        const userName = document.createElement('div');
                        userName.classList.add('user-name');

                        // Create an i element for the font icon
                        // Create an i element for the font icon
                        const userIcon = document.createElement('i');
                        userIcon.classList.add('fas', 'fa-user'); // Replace 'fas fa-user' with the class name of your icon

                        userName.textContent = comment.author.username; // Access the username field of the author object
                        userName.prepend(userIcon); // prepend the userIcon to the userName div

                        userName.textContent = comment.author.username; // Access the username field of the author object
        
                        const commentText = document.createElement('p');
                        commentText.classList.add('comment-text');
                        commentText.textContent = comment.content; // Assuming the comment object has a content property
        
                        commentInfo.appendChild(userName);
                        commentInfo.appendChild(commentText); // Append the comment text to the comment-info div
                        commentElement.appendChild(commentInfo);
        
                        // Append the comment to the comments section
                        commentsSection.appendChild(commentElement);
                    });
                } else {
                    console.error('data.comments is not an array:', data.comments);
                }
            } else {
                console.error('data.ok is false:', data);
            }
        })
        .catch(error => console.error('Error:', error));

        // Like and comment functionality
        const likeButton = document.querySelector('.like-count');
        const commentButton = document.querySelector('.post-comment-button');
        const commentInput = document.querySelector('.comment-input');

        likeButton.addEventListener('click', function () {
            fetch(`${API_URL}/blogs/${blogId}/like`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // Update the like count
                    const likeText = document.querySelector('.like-text');
                    likeText.textContent = parseInt(likeText.textContent) + 1;
                }
            })
            .catch(error => console.error('Error:', error));
        });

        commentButton.addEventListener('click', function () {
            const comment = commentInput.value;
            if (comment) {
                fetch(`${API_URL}/blogs/${blogId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: comment }) // Make sure to send the comment as 'content'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        commentInput.value = '';
        
                        // Create a new comment HTML structure
                        const commentElement = document.createElement('div');
                        commentElement.classList.add('comment');
        
                        const commentInfo = document.createElement('div');
                        commentInfo.classList.add('comment-info');
        
                        const userName = document.createElement('div');
                        userName.classList.add('user-name');

                        // Create an i element for the font icon
                        const userIcon = document.createElement('i');
                        userIcon.classList.add('fas', 'fa-user'); // Replace 'fas fa-user' with the class name of your icon
                        userName.appendChild(userIcon);

                        userName.textContent = data.comment.author.username; // Access the username field of the author object
        
                        const commentText = document.createElement('p');
                        commentText.classList.add('comment-text');
                        commentText.textContent = data.comment.content; // Assuming the comment object has a content property
        
                        commentInfo.appendChild(userName);
                        commentInfo.appendChild(commentText); // Append the comment text to the comment-info div
                        commentElement.appendChild(commentInfo);
        
                        // Append the comment to the comments section
                        commentsSection.appendChild(commentElement);
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});