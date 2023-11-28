const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moviestore'
});

app.get('/movies', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    connection.query('SELECT * FROM movies', (error, results, fields) => {
        if (error) {
            console.error('Error fetching movies: ' + error.stack);
            res.status(500).send('Error fetching movies');
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
