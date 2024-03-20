const USERS_API_URL = 'http://localhost:5500/api/users';
let currentUserId;
let allUsers = [];


function fetchUsers() {
    const tableBody = document.getElementById('userTableBody');
    const loadingIndicator = document.getElementById('loadingIndicator');
    let token = localStorage.getItem('token');

    loadingIndicator.style.display = 'block'; 

    fetch(USERS_API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(handleResponse)
    .then(data => {
        loadingIndicator.style.display = 'none';
        allUsers = data.data;
        populateTable(allUsers, tableBody);
    })
    .catch(error => {
        loadingIndicator.style.display = 'none';
        const errorElement = document.createElement('p');
        errorElement.textContent = 'Error fetching users';
        tableBody.appendChild(errorElement);
        console.error('Error:', error);
    });
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function populateTable(users, tableBody) {
    // Clear the table body
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = createRow(user, index);
        row.dataset.index = index; 

        tableBody.appendChild(row);
    });
}

function positionModal(index) {
    const modal = document.querySelector('.modal-content');
    const rowHeight = 50;
    const topPosition = index * rowHeight;
    modal.style.top = `${topPosition}px`;
    modal.style.display = 'block';
}

function createRow(user, index) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = index + 1;
    row.appendChild(idCell);

    const usernameCell = document.createElement('td');
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const isAdminCell = document.createElement('td');
    isAdminCell.textContent = user.isAdmin;
    row.appendChild(isAdminCell);

    const subscriptionCell = document.createElement('td');
    subscriptionCell.textContent = user.subscribed ? 'Subscribed' : 'Not Subscribed';
    row.appendChild(subscriptionCell);
 

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', (event) => {
        event.preventDefault();
        populateModal(user, index);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => deleteUser(user._id));

    const actionsCell = document.createElement('td');
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    return row;
}

function populateModal(user, index) {
    const modal = document.querySelector('.modal');
    const usernameInput = modal.querySelector('#username');
    const emailInput = modal.querySelector('#email');
    const isAdminInput = modal.querySelector('#isAdmin');
    const isSubscribedInput = modal.querySelector('#isSubscribed'); // Assuming you have an input field with id 'isSubscribed'

    if (!modal || !usernameInput || !emailInput || !isAdminInput || !isSubscribedInput) {
        console.error('Modal or input fields not found');
        return;
    }

    usernameInput.value = user.username;
    emailInput.value = user.email;
    isAdminInput.checked = user.isAdmin;
    isSubscribedInput.checked = user.subscribed; // Assuming 'subscribed' is a boolean

    positionModal(index);
    modal.style.display = 'block';

    const saveButton = modal.querySelector('.btn-primary');
    const closeButton = modal.querySelector('.btn-secondary');

    saveButton.removeEventListener('click', saveChanges);
    closeButton.removeEventListener('click', closeModal);

    saveButton.addEventListener('click', saveChanges);
    closeButton.addEventListener('click', closeModal);

    currentUserId = user._id;
}

function saveChanges() {
    const modal = document.querySelector('.modal');
    const usernameInput = modal.querySelector('#username');
    const emailInput = modal.querySelector('#email');
    const isAdminInput = modal.querySelector('#isAdmin');
    const isSubscribedInput = modal.querySelector('#isSubscribed');

    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        isAdmin: isAdminInput.checked,
        subscribed: isSubscribedInput.checked

    };

    updateUser(currentUserId, user);

    modal.style.display = 'none';
    fetchUsers();
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

function updateUser(userId, userData) {
    let token = localStorage.getItem('token');

    fetch(`${USERS_API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
    .then(handleResponse)
    .then(data => {
        console.log('User updated successfully:', data);
        fetchUsers(); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteUser(userId) {
    let token = localStorage.getItem('token');

    fetch(`${USERS_API_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(handleResponse)
    .then(() => {
        fetchUsers();
    })
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();
});

document.getElementById('editUserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('editUserId').value;
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;
    const isAdmin = document.getElementById('editIsAdmin').checked;

    updateUser(userId, { username, email, isAdmin });
});

// Add this code to add an event listener to the search input
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (event) => {
    filterUsers(event.target.value);
});

function filterUsers(searchValue) {
    const filteredUsers = allUsers.filter(user => 
        user.username.toLowerCase().includes(searchValue.toLowerCase()) || 
        user.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    const tableBody = document.getElementById('userTableBody');
    populateTable(filteredUsers, tableBody);
}
