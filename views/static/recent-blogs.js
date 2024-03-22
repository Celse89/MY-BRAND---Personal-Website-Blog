document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const blogsContainer = document.querySelector('#recent-blogs'); // The container where you want to append the blogs
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
   // ...
    .then((responseData) => {
        const data = responseData.data; // Access the 'data' property of the response
        console.log('Fetched data:', data); // Log the fetched data

        // Slice the data array to only include the first two blogs
        const limitedData = data.slice(0, 2);

        // Loop through each blog post and create the HTML
        limitedData.forEach((blog) => {
            const blogHTML = `
            <div class="blog-post">
            <div class="card-body">
            <div class="media">
                <img src="/images/elon-profile.jpg" class="mr-3" alt="Post 1">
                <div class="media-body">
                    <h5 class="mt-0">${blog.title}</h5>
                    <p><span class="author">By ${blog.author}</span></p>
                    <div class="blog-time">
                        <p><i class="far fa-clock mr-1"></i><span>Posted on ${new Date(blog.createdAt).toLocaleDateString()}</span></p>
                    </div>
                    <a  href="single-blog.html?id=${blog._id}" class="btn btn-primary read-more">Read More</a>
                </div>
            </div>
        </div>
        
                
         `;
        
            // Append the blog post to the container
            blogsContainer.innerHTML += blogHTML;
        });

    })
    // ...

    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});