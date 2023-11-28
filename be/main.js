const mysql = require('mysql');

// Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moviestore'
});

// Close the connection
connection.end();