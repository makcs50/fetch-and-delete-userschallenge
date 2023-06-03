const userListElement = document.getElementById('userList');

async function getUsers() {
  try {
    const response = await fetch('https://reqres.in/api/users');
    const data = await response.json();

    if (response.ok) {
      const users = data.data;
      displayUsers(users);
    } else {
      (data.error);
    }
  } catch (error) {
    displayError(error.message);
  }
}

function displayUsers(users) {
  userListElement.innerHTML = '';

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    
    const userElement = document.createElement('div');
    userElement.className = 'user';

    const avatar = document.createElement('img');
    avatar.src = user.avatar;
    userElement.appendChild(avatar);

    const name = document.createElement('span');
    name.textContent = `${user.first_name} ${user.last_name}`;
    userElement.appendChild(name);

    const email = document.createElement('span');
    email.textContent = user.email;
    userElement.appendChild(email);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
      deleteUser(user.id, userElement);
    });
    userElement.appendChild(deleteButton);

    userListElement.appendChild(userElement);
  }
}


async function deleteUser(id, node) {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      node.remove();
    } else {
      console.log('error');
    }
  } catch (error) {
    displayError(error.message);
  }
}

function displayError(errorMessage) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.textContent = errorMessage;

  document.body.insertBefore(errorElement, document.body.firstChild);

}

getUsers();
