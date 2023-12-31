//*** Ryan Hassell & Jack Gallagher
//*** Database Management Systems
//*** 12/11/2023
//*** Final Project
//*** This project is a movie store. This store is complete with a functioning cart, user system, login and registration, client-side error checking, reviews, and search function.


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
  username VARCHAR(50) NOT NULL Unique,
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
  image VARCHAR(50),
  price DECIMAL(10, 2),
  PRIMARY KEY (movie_id)
)`, function(error, results, fields) {
    if (error) throw error;
    console.log('Table movies created successfully');
});

//Create Cart table
connection.query(`CREATE TABLE IF NOT EXISTS moviestore.cart (
    cart_id INT AUTO_INCREMENT,
    movie_id INT,
    user_id INT,
    quantity INT,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    PRIMARY KEY (cart_id)
    )`, function(error, results, fields) {
    if (error) throw error;
    console.log('Table carts created successfully');
});

// Create Review Table
connection.query(`CREATE TABLE IF NOT EXISTS moviestore.review (
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
    console.log('Table review created successfully');
});

// Insert Movies
connection.query(`
    INSERT IGNORE INTO movies (title, genre, release_date, director, image, price)
    VALUES 
        ('Inception', 'Sci-Fi', '2010-07-16', 'Christopher Nolan', 'inception.jpg', 12.99),
        ('The Shawshank Redemption', 'Drama', '1994-09-23', 'Frank Darabont', 'shawshank_redemption.jpg', 15.99),
        ('The Dark Knight', 'Action', '2008-07-18', 'Christopher Nolan', 'dark_knight.jpg', 9.99),
        ('Pulp Fiction', 'Crime', '1994-10-14', 'Quentin Tarantino', 'pulp_fiction.jpg', 19.99),
        ('Iron Man', 'Action', '2008-05-02', 'Jon Favreau', 'iron_man.jpg', 14.99),
        ('The Godfather', 'Crime', '1972-03-24', 'Francis Ford Coppola', 'the_godfather.jpg', 14.99),
        ('Forrest Gump', 'Drama', '1994-07-06', 'Robert Zemeckis', 'forrest_gump.jpg', 14.99),
        ('The Matrix', 'Sci-Fi', '1999-03-31', 'Lana Wachowski, Lilly Wachowski', 'the_matrix.jpg', 9.99),
        ('The Lord of the Rings: The Fellowship of the Ring', 'Fantasy', '2001-12-19', 'Peter Jackson', 'lord_of_the_rings.jpg', 24.99),
        ('The Silence of the Lambs', 'Thriller', '1991-02-14', 'Jonathan Demme', 'silence_of_the_lambs.jpg', 12.99),
        ('The Social Network', 'Biography', '2010-10-01', 'David Fincher', 'the_social_network.jpg', 15.99),
        ('The Departed', 'Crime', '2006-10-06', 'Martin Scorsese', 'the_departed.jpg', 9.99),
        ('Gladiator', 'Action', '2000-05-05', 'Ridley Scott', 'gladiator.jpg', 19.99),
        ('The Godfather: Part II', 'Crime', '1974-12-20', 'Francis Ford Coppola', 'the_godfather_2.jpg', 14.99),
        ('Inglourious Basterds', 'War', '2009-08-21', 'Quentin Tarantino', 'inglourious_basterds.jpg', 14.99),
        ('The Green Mile', 'Drama', '1999-12-10', 'Frank Darabont', 'the_green_mile.jpg', 9.99),
        ('Fight Club', 'Drama', '1999-10-15', 'David Fincher', 'fight_club.jpg', 24.99),
        ('The Dark Knight Rises', 'Action', '2012-07-20', 'Christopher Nolan', 'dark_knight_rises.jpg', 12.99),
        ('The Amazing Spider-Man', 'Action', '2012-07-03', 'Marc Webb', 'the_amazing_spiderman.jpg', 24.99);`,function(error, results, fields) {
    if (error) throw error;
    console.log('Movies inserted successfully');
});

// Close the connection
connection.end();