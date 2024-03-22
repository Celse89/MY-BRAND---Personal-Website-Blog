// Constants
const USERS_API_URL = 'https://my-brand-personal-website-blog-back-end.onrender.com/api/users';

// Utility functions
function getSelectedUserId() {
  return localStorage.getItem('userId');
}

function getHeaders(contentType = 'application/json') {
  return {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': contentType
  };
}

async function fetchWithErrorHandler(url, options) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// User data fetching and editing functions
async function fetchUserData(userId) {
  return fetchWithErrorHandler(`${USERS_API_URL}/${userId}`, {
    method: 'GET',
    headers: getHeaders()
  });
}

async function updateUserInformation(userId, formData) {
  const body = {
    username: formData.get('username'),
    email: formData.get('email')
  };

  return fetchWithErrorHandler(`${USERS_API_URL}/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: getHeaders()
  });
}

async function updateProfilePicture(userId, formData) {
  const profilePictureFormData = new FormData();
  profilePictureFormData.append('profilePicture', formData.get('profilePicture'));

  return fetchWithErrorHandler(`${USERS_API_URL}/${userId}/profilePicture`, {
    method: 'PUT',
    body: profilePictureFormData,
    headers: getHeaders()
  });
}

async function updateUserPassword(userId, formData) {
  const body = {
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword')
  };

  const response = await fetchWithErrorHandler(`${USERS_API_URL}/${userId}/password`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: getHeaders()
  });

  return { status: response.status, message: response.message };
}

// Main function to edit user
async function editUser(formData) {
  const userId = getSelectedUserId();

  await updateUserInformation(userId, formData);

  if (formData.get('profilePicture')) {
    await updateProfilePicture(userId, formData);
  }

  if (formData.get('currentPassword') && formData.get('newPassword')) {
    await updateUserPassword(userId, formData);
  }

  const updatedUserData = await fetchUserData(userId);
  console.log('Updated user data:', updatedUserData);
}


window.onload = async function() {
  const userId = getSelectedUserId();
  const response = await fetchUserData(userId);
  const userData = response.data;
  document.getElementById('displayUsername').innerText = userData.username;

  // Select the update password button
  
}


document.getElementById('updateButton').addEventListener('click', async function(event) {
  event.preventDefault(); 
  const updateButton = document.getElementById('updateButton');
  const originalButtonText = updateButton.innerText;

  // Display loading message
  updateButton.innerText = 'Loading...';

  const formData = new FormData(document.getElementById('editForm'));
  await editUser(formData);

  // Display success message and change button color
  updateButton.innerText = 'Success!';
  updateButton.style.backgroundColor = 'green';

  // After 2 seconds, revert the button text and color
  setTimeout(() => {
    updateButton.innerText = originalButtonText;
    updateButton.style.backgroundColor = ''; // Reset to original color
  }, 2000);

  // Clear the form
  document.getElementById('editForm').reset();

  // Reload the page to reflect the changes
  setTimeout(() => {
    location.reload();
  }, 2500);
});


document.getElementById('cancelButton').addEventListener('click', function(event) {
  event.preventDefault(); 

  // Add your effect here. For example, reload the page:
  location.reload();
});




const updatePasswordButton = document.getElementById('updatePasswordButton');

// Add click event listener to the button
updatePasswordButton.addEventListener('click', async (event) => {
  // Prevent the default form submission
  event.preventDefault();

  // Get the form that contains the password fields
  const formData = new FormData(document.getElementById('editForm'));

  // Get the password data
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');

  // Get the userId
  const userId = getSelectedUserId();

  // Call the updateUserPassword function
  const response = await updateUserPassword(userId, formData);

  // Check the response status
  if (response.status === 200) {
    // Display success message and change button color
    updatePasswordButton.innerText = 'Success!';
    updatePasswordButton.style.backgroundColor = 'green';

    // After 2 seconds, revert the button text and color
    setTimeout(() => {
      updatePasswordButton.innerText = 'Update Password';
      updatePasswordButton.style.backgroundColor = ''; // Reset to original color
    }, 2000);
  } else {
    // Display error message below the password input field
    const passwordField = document.getElementById('currentPassword');
    let errorMessage = passwordField.parentNode.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.className = 'error-message';
      errorMessage.style.color = 'red';
      passwordField.parentNode.insertBefore(errorMessage, passwordField.nextSibling);
    }
    errorMessage.innerText = response.message;
  }
});



