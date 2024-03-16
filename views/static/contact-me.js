const MESSAGE_API_URL = 'http://localhost:5500/api/messages';

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const messageError = validatemessage(message);

        document.getElementById('nameError').textContent = nameError;
        document.getElementById('emailError').textContent = emailError;
        document.getElementById('messageError').textContent = messageError;

        if (!nameError && !emailError && !messageError) {
            const contactData = {
                name: name,
                email: email,
                message: message
            };
        
            fetch(MESSAGE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
                credentials: 'include',
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
                document.getElementById('messageSuccess').innerHTML = '<i class="fas fa-check"></i> Sent successful!';
          
                setTimeout(() => {
                    window.location.href = '/templates/index.html';
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });












    
    // Subscribe form validation
    document.querySelector('.subscribe-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const subscribeEmail = document.getElementById('subscribe-email').value;
        const subscribeEmailError = validateEmail(subscribeEmail);
    
        document.getElementById('subscribeEmailError').textContent = subscribeEmailError;
    
        if (!subscribeEmailError) {
            const subscribeData = {
                email: subscribeEmail
            };
    
            // Handling the subscribeData object
            console.log(subscribeData);
    
            // Clear the input field
            document.getElementById('subscribe-email').value = '';
        }
    });
});

function validateName(name) {
    if (name.length < 5) {
        return 'Name must be at least 5 characters.';
    }
    return '';
}

function validateEmail(email) {
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return 'Please enter a valid email address.';
    }
    return '';
}

function validatemessage(message) {
    if (message.trim() === '') {
        return 'message cannot be empty.';
    }
    return '';
}