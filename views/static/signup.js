const SIGNUP_API_URL = 'http://localhost:5500/api/auth/signup';
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupButton').addEventListener('click', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

        document.getElementById('usernameError').innerHTML = usernameError || '';
        document.getElementById('emailError').innerHTML = emailError || '';
        document.getElementById('passwordError').innerHTML = passwordError || '';
        document.getElementById('confirmPasswordError').innerHTML = confirmPasswordError || '';

        if (!usernameError && !emailError && !passwordError && !confirmPasswordError) {
            const userData = {
                username: username,
                email: email,
                password: password, 
                confirmPassword: confirmPassword
            };

            fetch(SIGNUP_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), 
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
                document.getElementById('signupSuccess').innerHTML = '<i class="fas fa-check"></i> Signup successful!';
                document.getElementById('username').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('confirmPassword').value = '';
                setTimeout(() => {
                    window.location.href = '/templates/login.html';
                }, 3000);
            })
            .catch (error => {
                console.error('Error:', error);
                if (error.message.includes('User already exists')) {
                    document.getElementById('signupError').innerHTML = '<i class="fas fa-exclamation-circle"></i> User already exists';
                }
            });
        } else {
            return
        }
    });
});

function validateUsername(username) {
    if (!username) {
        return '<i class="fas fa-exclamation-circle"></i> Username is required';
    }
    if (!/^[a-zA-Z0-9]{3,30}$/.test(username)) {
        return '<i class="fas fa-exclamation-circle"></i> Username must be at least 3 characters';
    }
    return null;
}

function validateEmail(email) {
    if (!email) {
        return '<i class="fas fa-exclamation-circle"></i> Email is required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return '<i class="fas fa-exclamation-circle"></i> Invalid email';
    }
    return null;
}

function validatePassword(password) {
    if (!password) {
        return '<i class="fas fa-exclamation-circle"></i> Password is required';
    }
    if (!/^[a-zA-Z0-9]{3,30}$/.test(password)) {
        return '<i class="fas fa-exclamation-circle"></i> Password must be at least 6 characters';
    }
    return null;
}

function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        return '<i class="fas fa-exclamation-circle"></i> Confirm password does not match';
    }
    return null;
}