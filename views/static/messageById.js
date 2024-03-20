let message;

const BASE_URL = 'http://localhost:5500/api/messages';


document.addEventListener('DOMContentLoaded', function () {
    let messageId = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');

    if (!messageId) {
        messageId = sessionStorage.getItem('messageId');
    } else {
    
        sessionStorage.setItem('messageId', messageId);
    }

    fetch(`${BASE_URL}/${messageId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        message = data.data;
        const messageElement = document.querySelector('#message');
        messageElement.textContent = message.message;
    
        const senderNameElement = document.querySelector('#senderName');
        senderNameElement.textContent = message.name;
    
        const messageTimeElement = document.querySelector('#messageTime');
        const messageTime = new Date(message.createdAt);
        const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        messageTimeElement.innerHTML = `<i class="fas fa-clock"></i> Sent on ${messageTime.toLocaleString(undefined, timeOptions)}`;
    
        // New code to display replies
        const repliesContainer = document.querySelector('#replies-container');
        message.replies.forEach(reply => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'reply-div';
    
            const replyText = document.createElement('span');
            replyText.className = 'reply-text';
            replyText.textContent = reply;
    
            replyDiv.appendChild(replyText);
            repliesContainer.appendChild(replyDiv);
        });
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });

    const deleteButton = document.querySelector('#deleteButton');
    deleteButton.addEventListener('click', function () {
        const confirmDelete = window.confirm('Are you sure you want to delete this message?');
        if (confirmDelete) {
            fetch(`${BASE_URL}/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                window.location.href = "/templates/messages.html";
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
    });

    const sendButton = document.querySelector('#publish-button');
    const editor = document.querySelector('#editor');

    document.getElementById('replyButton').addEventListener('click', function() {
        document.getElementById('reply-form').style.display = 'block';
        document.getElementById('replyButton').style.display = 'none';
    });

    sendButton.addEventListener('click', function (event) {
        event.preventDefault();

        const replyContent = editor.value;
        
        fetch(`${BASE_URL}/${messageId}/reply`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ message: replyContent, email: message.email }), 
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            editor.value = '';
            alert('Reply sent successfully!');
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
});