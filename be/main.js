const mysql = require('mysql');

// Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'movie_store'
});

// Create the database
connection.query('CREATE DATABASE movie_store');
connection.query('CREATE TABLE users')
// Close the connection
connection.end();