   
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
