// server.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Using built-in JSON middleware of Express

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moviestore'
});

app.get('/movies', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    connection.query('SELECT movie_id, title, director, image, price FROM movies', (error, results, fields) => {
        if (error) {
            console.error('Error fetching movies: ' + error.stack);
            res.status(500).send('Error fetching movies');
            return;
        }
        res.json(results);
    });
});

app.get('/movies_with_id/:id', (req, res) => {
    const movieId = req.params.id;

    // Use a parameterized query to prevent SQL injection
    connection.query(
        'SELECT * FROM movies WHERE movie_id = ?',
        [movieId],
        (error, results, fields) => {
            if (error) {
                console.error('Error fetching movie details: ' + error.stack);
                res.status(500).send('Error fetching movie details');
                return;
            }

            // Check if any results were found
            if (results.length === 0) {
                console.log('Movie not found');
                res.status(404).send('Movie not found');
                return;
            }

            // Send the details of the found movie
            res.json(results[0]);
        }
    );
});

app.post('/add-to-cart', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    const { movie_id, user_id } = req.body;

    if (!movie_id || !user_id) {
        res.status(400).send('Both movie_id and user_id are required');
        return;
    }

    // Check if the combination of movie_id and user_id already exists
    connection.query('SELECT * FROM cart WHERE movie_id = ? AND user_id = ?', [movie_id, user_id], (error, results, fields) => {
        if (error) {
            console.error('Error checking cart: ' + error.stack);
            res.status(500).send('Error checking cart');
            return;
        }

        if (results.length > 0) {
            // If the combination exists, update the quantity
            connection.query('UPDATE cart SET quantity = quantity + 1 WHERE movie_id = ? AND user_id = ?', [movie_id, user_id], (updateError, updateResults, updateFields) => {
                if (updateError) {
                    console.error('Error updating cart: ' + updateError.stack);
                    res.status(500).send('Error updating cart');
                    return;
                }
                res.status(200).send('Quantity updated in cart successfully');
            });
        } else {
            // If the combination doesn't exist, insert a new record
            connection.query('INSERT INTO cart (movie_id, user_id, quantity) VALUES (?, ?, 1)', [movie_id, user_id], (insertError, insertResults, insertFields) => {
                if (insertError) {
                    console.error('Error adding to cart: ' + insertError.stack);
                    res.status(500).send('Error adding to cart');
                    return;
                }
                res.status(200).send('Movie added to cart successfully');
            });
        }
    });
});
app.get('/reviews', (req, res) => {
    console.log('Request to /reviews endpoint'); // Log to check if endpoint is hit

    const movieId = req.query.movie_id; // Extract movie_id from query parameter

    // Construct the SQL query to fetch reviews filtered by movie ID
    const query = 'SELECT review_id, movie_id, user_id, rating, review_text, review_date FROM review WHERE movie_id = ?';

    connection.query(query, [movieId], (error, results, fields) => {
        if (error) {
            console.error('Error fetching reviews: ' + error.stack);
            res.status(500).send('Error fetching reviews');
            return;
        }
        console.log('Fetched reviews:', results); // Log the fetched reviews
        res.json(results);
    });
});

app.post('/reviews', (req, res) => {
    const { user_id, movie_id, rating, review_text, review_date } = req.body;

    const query = `INSERT INTO review (user_id, movie_id, rating, review_text, review_date) 
                   VALUES (${user_id}, ${movie_id}, ${rating}, '${review_text}', '${review_date}')`;

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error creating review:', error.stack);
            res.status(500).send('Error creating review');
            return;
        }
        res.json({ message: 'Review created successfully', review_id: results.insertId });
    });
});
// GET BY USER ID
app.get('/users', (req, res) => {
    const userId = req.query.user_id; // Extract userId from request query parameters

    // Ensure userId is defined before proceeding with the query
    if (!userId) {
        res.status(400).send('User ID is missing');
        return;
    }

    const query = 'SELECT user_id, username, email, password FROM users WHERE user_id = ?';

    connection.query(query, [userId], (error, results, fields) => {
        if (error) {
            console.error('Error fetching user: ' + error.stack);
            res.status(500).send('Error fetching user');
            return;
        }
        res.json(results);
    });

});
// LIST USERS
app.get('/list-users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    connection.query('SELECT username, password, email, user_id FROM users', (error, results, fields) => {
        if (error) {
            console.error('Error fetching movies: ' + error.stack);
            res.status(500).send('Error fetching movies');
            return;
        }
        res.json(results);
    });
});
//CREATE USER
app.post('/users', (req, res) => {
    const { username, email, password } = req.body;

    const query = `INSERT INTO users (username, email, password) 
                   VALUES (?, ?, ?)`;

    connection.query(query, [username, email, password], (error, results, fields) => {
        if (error) {
            console.error('Error creating user:', error.stack);
            res.status(500).send('Error creating user');
            return;
        }
        res.json({ message: 'User created successfully', user_id: results.insertId });
    });
});

app.get('/carts/:user_id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    const userId = req.params.user_id;
    console.log("test");
    if (!userId) {
        res.status(400).send('User ID is missing');
        return;
    }

    const query = `
        SELECT cart.cart_id, movies.title, movies.price, cart.quantity
        FROM cart
        JOIN movies ON cart.movie_id = movies.movie_id
        WHERE cart.user_id = ?;
    `;
    console.log(query);
    connection.query(query, [userId], (error, results, fields) => {
        if (error) {
            console.error('Error fetching cart items: ' + error.stack);
            res.status(500).send('Error fetching cart items');
            return;
        }

        res.json(results);
    });
});

app.delete('/carts/:cart_id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    const cartId = req.params.cart_id;

    connection.query('DELETE FROM cart WHERE cart_id = ?', [cartId], (error, results, fields) => {
        if (error) {
            console.error('Error deleting item from cart: ' + error.stack);
            res.status(500).send('Error deleting item from cart');
            return;
        }
        res.status(200).send('Item deleted from cart successfully');
    });
});

app.delete('/carts/purchase/:user_id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    const userId = req.params.user_id;

    if (!userId) {
        res.status(400).send('User ID is missing');
        return;
    }

    const query = 'DELETE FROM cart WHERE user_id = ?';

    connection.query(query, [userId], (error, results, fields) => {
        if (error) {
            console.error('Error deleting carts: ' + error.stack);
            res.status(500).send('Error deleting carts');
            return;
        }

        res.status(200).send('All items purchased successfully');
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
