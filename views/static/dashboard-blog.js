document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const blogsContainer = document.querySelector('.row'); // The container where you want to append the blogs

    fetch('http://localhost:5500/api/blogs', {
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
            <div class="col-md-4 mb-4">
            <div class="card" style="margin-top: 20px;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="card-title" style="font-size: 1.5rem; font-weight: 600;">${blog.title}</h3>
                        <img src="/images/elon-profile.jpg" alt="Author" class="rounded-circle" width="40" height="40">
                    </div>
                    <h5 style="font-size: .975em; font-weight: 600;">Description</h5>
                    <p class="card-text">
                        ${blog.content.substring(0, 100)}... <!-- Limit the content to 100 characters -->
                    </p>
                    <div class="d-flex justify-content-between align-items-center" style="font-size: 1em; color: #888; margin-top: 10px;"> <!-- Increase the font size -->
                    <a href="single-blog.html?id=${blog._id}" class="btn btn-primary read-more">Read More</a> <!-- Add the blog id as a query parameter --> 
                        <div>
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

        console.log('Updated DOM:', blogsContainer.innerHTML); // Log the updated DOM
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});