document.getElementById('replyButton').addEventListener('click', function() {
    document.getElementById('reply-form').style.display = 'block';
    document.getElementById('replyButton').style.display = 'none';
});



var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],                                         // remove formatting button
    ['link', 'image', 'video'],                        // link and image, video
    ['emoji'],                                         // emoji
    ['mention'],                                       // mention
    ['undo', 'redo'],                                  // undo and redo
];

var quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions,
        'emoji-shortname': true,                       // enable emoji-shortname module
        'emoji-textarea': true,                        // enable emoji-textarea module
        'emoji-toolbar': true,                         // enable emoji-toolbar module
        'mention': true,                               // enable mention module
    },
    theme: 'snow'
});
















const BASE_URL = 'http://localhost:5500/api/messages';


document.addEventListener('DOMContentLoaded', function () {
    let messageId = new URLSearchParams(window.location.search).get('id');

    if (!messageId) {
        messageId = sessionStorage.getItem('messageId');
    } else {
    
        sessionStorage.setItem('messageId', messageId);
    }

    fetch(`${BASE_URL}/${messageId}`, {
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
        const message = data.data;
        const messageElement = document.querySelector('#message');
        messageElement.textContent = message.message;

        const senderNameElement = document.querySelector('#senderName');
        senderNameElement.textContent = message.name;

        const messageTimeElement = document.querySelector('#messageTime');
        const messageTime = new Date(message.createdAt);
        const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        messageTimeElement.innerHTML = `<i class="fas fa-clock"></i> Sent on ${messageTime.toLocaleString(undefined, timeOptions)}`;
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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
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
    const quillEditor = document.querySelector('#editor');


    
    document.getElementById('replyButton').addEventListener('click', function() {
        document.getElementById('reply-form').style.display = 'block';
        document.getElementById('replyButton').style.display = 'none';
    });
    
    
    
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],                                         // remove formatting button
        ['link', 'image', 'video'],                        // link and image, video
        ['emoji'],                                         // emoji
        ['mention'],                                       // mention
        ['undo', 'redo'],                                  // undo and redo
    ];
    
    var quill = new Quill('#editor', {
        modules: {
          toolbar: toolbarOptions,
          'emoji-shortname': true,
          'emoji-textarea': true,
          'emoji-toolbar': true,
          'mention': true,
        },
        theme: 'snow'
    });



    sendButton.addEventListener('click', function (event) {
        event.preventDefault();
    
        const replyContent = quill.root.innerHTML;
    
        // Log the content of the editor
        console.log(quill.getContents());
    
        fetch(`${BASE_URL}/${messageId}/reply`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
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
            quill.setContents([]);
            alert('Reply sent successfully!');
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
});