function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Ensure all values are defined before sending the request
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
            window.location.href = '/fe/login.html';
            // Handle success, maybe redirect or update UI
        })
        .catch(error => console.error('Error creating user:', error));
}
function redirectToRegister() {
    window.location.href = '/fe/register.html';
}
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Simple validation (you should implement server-side validation)
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