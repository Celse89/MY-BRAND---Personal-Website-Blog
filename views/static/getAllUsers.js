const USERS_API_URL = 'http://localhost:5500/api/users';

document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();
});

function fetchUsers() {
    const tableBody = document.getElementById('userTableBody');
    const loadingIndicator = document.getElementById('loadingIndicator');

    loadingIndicator.style.display = 'block'; 

    fetch(USERS_API_URL, {
        credentials: 'include',
    })
    .then(handleResponse)
    .then(data => {
        loadingIndicator.style.display = 'none';
        populateTable(data.data, tableBody);
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
    users.forEach((user, index) => {
        const row = createRow(user, index);
        tableBody.appendChild(row);
    });
}

function createRow(user, index) {
    const row = document.createElement('tr');

    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1; 
    row.appendChild(indexCell);
    const actionsCell = document.createElement('td');
    const editLink = document.createElement('a');
    editLink.href = `/edit-user/${user._id}`;
    editLink.textContent = 'Edit';
    editLink.addEventListener('click', function(event) {
        event.preventDefault();
        showEditForm(user);
    });
    actionsCell.appendChild(editLink);
    row.appendChild(actionsCell);

    const deleteLink = document.createElement('a');
    deleteLink.href = `/delete-user/${user._id}`;
    deleteLink.textContent = 'Delete';
    deleteLink.addEventListener('click', function(event) {
        event.preventDefault();
        deleteUser(user._id);
    });
    actionsCell.appendChild(deleteLink);

    row.appendChild(actionsCell);

    return row;
}

function showEditForm(user) {
    document.getElementById('editUserForm').style.display = 'block';
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editIsAdmin').checked = user.isAdmin;
    document.getElementById('editUserId').value = user._id;
}

document.getElementById('editUserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('editUserId').value;
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;
    const isAdmin = document.getElementById('editIsAdmin').checked;

    updateUser(userId, { username, email, isAdmin });
});

function updateUser(userId, userData) {
    fetch(`${USERS_API_URL}/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(handleResponse)
    .then(data => {
        console.log('User updated successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function deleteUser(userId) {
    fetch(`${USERS_API_URL}/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    .then(handleResponse)
    .then(() => {
        fetchUsers();
    })
    .catch(console.error);
}