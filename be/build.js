// THIS FILE BUILDS THE MYSQL DATABASE WHEN RUN
// IF INCOMPATIBLE ERROR RUN THIS IN MYSQL: ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
const mysql = require('mysql');

// Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moviestore'
});

// Create the database
// Create Database
connection.query('CREATE DATABASE IF NOT EXISTS moviestore', function(error, results, fields) {
    if (error) throw error;
    console.log('Database moviestore created successfully');
});

// Create Users Table
connection.query(`CREATE TABLE IF NOT EXISTS moviestore.users (
  user_id INT AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id)
)`, function(error, results, fields) {
    if (error) throw error;
    console.log('Table users created successfully');
});

// Create Movies Table
connection.query(`CREATE TABLE IF NOT EXISTS moviestore.movies (
  movie_id INT AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  genre VARCHAR(50),
  release_date DATE,
  director VARCHAR(100),
  PRIMARY KEY (movie_id)
)`, function(error, results, fields) {
    if (error) throw error;
    console.log('Table movies created successfully');
});

// Create Reviews Table
connection.query(`CREATE TABLE IF NOT EXISTS moviestore.reviews (
    review_id INT AUTO_INCREMENT,
    movie_id INT,
    user_id INT,
    rating DECIMAL(3, 2),
    review_text TEXT,
    review_date DATE,
    PRIMARY KEY (review_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`, function(error, results, fields) {
    if (error) throw error;
    console.log('Table reviews created successfully');
});


// Close the connection
connection.end();