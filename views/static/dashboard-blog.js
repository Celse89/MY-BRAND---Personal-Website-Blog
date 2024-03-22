document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const blogsContainer = document.querySelector('.row'); // The container where you want to append the blogs
    const successMessage = document.getElementById('success-message');
    fetch('https://my-brand-personal-website-blog-back-end.onrender.com/api/blogs', {
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
        const data = responseData.data; // Access the 'data' property of the response
        console.log('Fetched data:', data);// Log the fetched data

        // Loop through each blog post and create the HTML
        data.forEach((blog) => {
            const blogHTML = `
            <div class="col-md-6 mb-4">
                <div class="card h-100" style="margin-top: 20px;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h3 class="card-title" style="font-size: 1.5rem; font-weight: 600;">${blog.title}</h3>
                            <img src="/images/elon-profile.jpg" alt="Author" class="rounded-circle" width="40" height="40">
                        </div>
                        <h5 style="font-size: .975em; font-weight: 600;">Description</h5>
                        <p class="card-text">
                            ${blog.content.substring(0, 100)}... <!-- Limit the content to 100 characters -->
                        </p>
                        <div class="d-flex justify-content-betwdeen align-items-center" style="font-size: 1em; color: #888; margin-top: 10px;"> <!-- Increase the font size -->
                        <div>
                            <a href="single-blog.html?id=${blog._id}" class="btn btn-primary read-more">Read More</a> <!-- Add the blog id as a query parameter -->
                            <button class="btn btn-success edit-button" data-id="${blog._id}">Edit</button>
                            <button class="btn btn-danger delete-button" data-id="${blog._id}">Delete</button>
                            </div>
                            <div class="ml-3">
                                <i class="fas fa-clock"></i>
                                <span>Posted on: ${new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                            </div>
                        <div class="mt-2" style="font-size: .975em; font-weight: 600; margin-top: 0">
                            <p>By <span>${blog.author}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        
            // Append the blog post to the container
            blogsContainer.innerHTML += blogHTML;
        });

        // Add event listeners to the edit and delete buttons
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const blogId = this.getAttribute('data-id');
                window.location.href = `create-blog-post.html?id=${blogId}`;
            });
        });
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const blogId = this.getAttribute('data-id');
                const confirmation = window.confirm('Are you sure you want to delete this blog post?');
                if (confirmation) {
                    fetch(`https://my-brand-personal-website-blog-back-end.onrender.com/api/blogs/${blogId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.ok) {
                            // Remove the blog post from the DOM
                            this.closest('.col-md-6').remove();
        
                            // Show the success message
                            successMessage.style.display = 'block';
                            setTimeout(() => {
                                successMessage.style.display = 'none';
                            }, 3000); // Hide the success message after 3 seconds
                        }
                    })
                    .catch(error => console.error('Error:', error));
                }
            });
        });

        console.log('Updated DOM:', blogsContainer.innerHTML); // Log the updated DOM
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});