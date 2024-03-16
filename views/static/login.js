const LOGIN_API_URL = 'http://localhost:5500/api/auth/login';
const AUTH_API_URL = 'http://localhost:5500/api/auth/checkToken';

document.addEventListener('DOMContentLoaded', function () {
    fetch(AUTH_API_URL, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => {
            if (data.isLoggedIn) {
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                localStorage.setItem('isLoggedIn', 'false');
            }
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('loginButton').addEventListener('click', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        document.getElementById('emailError').innerHTML = emailError || '';
        document.getElementById('passwordError').innerHTML = passwordError || '';

        if (!emailError && !passwordError) {
            const userData = {
                email: email,
                password: password
            };

            fetch(LOGIN_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
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
                localStorage.setItem('isLoggedIn', 'true');
                document.getElementById('loginSuccess').innerHTML = '<i class="fas fa-check"></i> Login successful!';
                document.getElementById('loginError').innerHTML = '';
                document.getElementById('login').style.display = 'none';
                document.getElementById('userMenu').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/templates/index.html';
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.message.includes('Invalid credentials')) {
                    document.getElementById('loginError').innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid email or password';
                }
            });
        }
    });
});


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