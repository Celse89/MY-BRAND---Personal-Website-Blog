document.addEventListener('DOMContentLoaded', function() {
    const USERS_API_URL = 'http://localhost:5500/api/users';

    document.querySelector('.subscribe-form form').addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.querySelector('#subscribe-email');
        const email = emailInput.value;

        if (!email) {
            document.querySelector('#subscribeEmailError').textContent = 'Email is required';
            return;
        }

        const token = localStorage.getItem('token');

        fetch(`${USERS_API_URL}/email?email=${encodeURIComponent(email)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return fetch(`${USERS_API_URL}/${data.data._id}/subscription`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ subscribed: true })
            });
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