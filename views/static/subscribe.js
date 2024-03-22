document.addEventListener('DOMContentLoaded', function() {
    const USERS_API_URL = 'https://my-brand-personal-website-blog-back-end.onrender.com/api/users';

    document.querySelector('.subscribe-form form').addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.querySelector('#subscribe-email');
        const email = emailInput.value;

        if (!email) {
            document.querySelector('#subscribeEmailError').innerHTML = 'Email is required';
            return;
        }

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        fetch(`${USERS_API_URL}/${userId}/subscription`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ subscribed: true })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            emailInput.value = '';
            alert('Subscription updated successfully');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});