document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const blogsContainer = document.querySelector('.blog-posts'); // The container where you want to append the blogs
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
            <div class="blog-post">
            <div class="post-header">
                <h3 class="post-title">${blog.title}</h3>
                <img class="profile-image" src="/images/profile.jpeg" alt="Profile Image">
            </div>
            <p class="post-description">
                ${blog.content.substring(0, 100)}... <!-- Limit the content to 100 characters -->
            </p>
            <a class="read-more" href="single-blog.html?id=${blog._id}">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
            <div class="post-date">
                <i class="fas fa-clock"></i>
                <span>Posted on ${new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <p class="post-author">By ${blog.author}</p>
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