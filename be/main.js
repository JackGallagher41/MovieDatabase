const mysql = require('mysql');

// Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'movie_store'
});

// Close the connection
connection.end();