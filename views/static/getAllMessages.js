const MESSAGE = 'https://my-brand-personal-website-blog-back-end.onrender.com/api/messages';

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    fetch(MESSAGE, {
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
        console.log(data);
        const messages = data.data;
        const messagesContainer = document.querySelector('.list-group'); 

        messages.forEach((message) => {
            const messageElement = document.createElement('a');
            messageElement.href = `/templates/reply.html?id=${message._id}`; 
            messageElement.classList.add("list-group-item", "list-group-item-action", "mb-2", "border", "rounded");
        
            const messageContent = document.createElement('div');
            messageContent.classList.add("d-flex", "w-100", "justify-content-between", "align-items-center");
        
            const senderInfo = document.createElement('div');
            senderInfo.classList.add("d-flex", "align-items-center");
        
            const senderImage = document.createElement('img');
            senderImage.src = "/images/elon-profile.jpg"; 
            senderImage.alt = "Sender's Profile";
            senderImage.classList.add("rounded-circle", "mr-2");
            senderImage.width = "40";
            senderImage.height = "40";
        
            const senderName = document.createElement('h5');
            senderName.textContent = message.name; 
            senderName.classList.add("mb-1", "mr-2");
            senderName.style.color = "#333";
            senderName.style.fontSize = "1em";
        
            senderInfo.appendChild(senderImage);
            senderInfo.appendChild(senderName);
        
            const messageText = document.createElement('p');
            messageText.textContent = message.message; 
            messageText.classList.add("mb-1", "flex-grow-1", "ml-4");
            messageText.style.color = "#666";
            messageText.style.flex = "1 1 auto";
            messageText.style.textAlign = "justify";
            messageText.style.marginRight = "25px";
        
            const messageTime = document.createElement('small');
            const messageTimeDate = new Date(message.createdAt);
            const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            messageTime.textContent = messageTimeDate.toLocaleString(undefined, timeOptions);
            messageTime.style.flex = "0 0 auto";


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