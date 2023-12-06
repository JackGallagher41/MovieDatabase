// server.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moviestore'
});

app.get('/movies', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    connection.query('SELECT movie_id, title, director, image FROM movies', (error, results, fields) => {
        if (error) {
            console.error('Error fetching movies: ' + error.stack);
            res.status(500).send('Error fetching movies');
            return;
        }
        res.json(results);
    });
});

app.post('/add-to-cart', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    const { movie_id, user_id } = req.body;

    if (!movie_id || !user_id) {
        res.status(400).send('Both movie_id and user_id are required');
        return;
    }

    // Check if the combination of movie_id and user_id already exists
    connection.query('SELECT * FROM carts WHERE movie_id = ? AND user_id = ?', [movie_id, user_id], (error, results, fields) => {
        if (error) {
            console.error('Error checking cart: ' + error.stack);
            res.status(500).send('Error checking cart');
            return;
        }

        if (results.length > 0) {
            // If the combination exists, update the quantity
            connection.query('UPDATE carts SET quantity = quantity + 1 WHERE movie_id = ? AND user_id = ?', [movie_id, user_id], (updateError, updateResults, updateFields) => {
                if (updateError) {
                    console.error('Error updating cart: ' + updateError.stack);
                    res.status(500).send('Error updating cart');
                    return;
                }
                res.status(200).send('Quantity updated in cart successfully');
            });
        } else {
            // If the combination doesn't exist, insert a new record
            connection.query('INSERT INTO carts (movie_id, user_id, quantity) VALUES (?, ?, 1)', [movie_id, user_id], (insertError, insertResults, insertFields) => {
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


app.listen(3000, () => {
    console.log('App listening on port 3000');
});
