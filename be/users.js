//*** Ryan Hassell & Jack Gallagher
//*** Database Management Systems
//*** 12/11/2023
//*** Final Project
//*** This project is a movie store. This store is complete with a functioning cart, user system, login and registration, client-side error checking, reviews, and search function.

function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Client side error checking:
    if (!username || !password || !email) {
        console.error('Missing required fields for creating user');
        return;
    }

    // Send the user data to the backend
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('User created:', data);
            window.location.href = 'login.html';
        })
        .catch(error => console.error('Error creating user:', error));
}
function redirectToRegister() {
    window.location.href = 'register.html';
}
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Client side error checking
    if (username === "" || password === "") {
        alert("Please enter both username and password");
        return;
    }

    fetch('http://localhost:3000/list-users')
        .then(response => response.json())
        .then(users => {
            const matchedUser = users.find(user => user.username === username && user.password === password);

            if (matchedUser) {
                window.location.href = `main.html?user_id=${matchedUser.user_id}`;
            } else {
                alert("Invalid username or password");
            }
        })
        .catch(error => console.error('Error:', error));
}