function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;

    // Simple validation (you should implement server-side validation)
    if (username === "" || password === "" || email === "") {
        alert("Please fill in all fields");
        return;
    }

    // Simulate sending data to the server using fetch API
    fetch('http://localhost:3000/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log('Server response:', data);
            alert('Account created successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating account. Please try again.');
        });
}