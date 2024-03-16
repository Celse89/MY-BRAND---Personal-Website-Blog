const MESSAGE_API_URL = 'http://localhost:3000/api/messages';

document.addEventListener('DOMContentLoaded', function () {
    fetch(MESSAGE_API_URL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        const messages = data.data;
        const messagesContainer = document.querySelector('.list-group'); 

        messages.forEach((message) => {
            const messageElement = document.createElement('a');
            messageElement.href = `/templates/reply.html?id=${message._id}`; // This sets the href to the reply page for the specific message
            messageElement.classList.add("list-group-item", "list-group-item-action", "mb-2", "border", "rounded");
        
            const messageContent = document.createElement('div');
            messageContent.classList.add("d-flex", "w-100", "justify-content-between", "align-items-center");
        
            const senderInfo = document.createElement('div');
            senderInfo.classList.add("d-flex", "align-items-center");
        
            const senderImage = document.createElement('img');
            senderImage.src = "/images/elon-profile.jpg"; // You'll need to replace this with the actual profile image of the sender
            senderImage.alt = "Sender's Profile";
            senderImage.classList.add("rounded-circle", "mr-2");
            senderImage.width = "40";
            senderImage.height = "40";
        
            const senderName = document.createElement('h5');
            senderName.textContent = message.name; // Use the name property as the sender's name
            senderName.classList.add("mb-1", "mr-2");
            senderName.style.color = "#333";
            senderName.style.fontSize = "1em";
        
            senderInfo.appendChild(senderImage);
            senderInfo.appendChild(senderName);
        
            const messageText = document.createElement('p');
            messageText.textContent = message.message; // Use the message property as the message content
            messageText.classList.add("mb-1", "flex-grow-1", "ml-4");
            messageText.style.color = "#666";
        
            const messageTime = document.createElement('small');
            messageTime.textContent = new Date(message.createdAt).toLocaleString();
            messageContent.appendChild(senderInfo);
            messageContent.appendChild(messageText);
            messageContent.appendChild(messageTime);
        
            messageElement.appendChild(messageContent);
        
            messagesContainer.appendChild(messageElement);
        });
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});