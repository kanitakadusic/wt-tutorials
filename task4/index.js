const express = require('express');
const mysql = require('mysql');

const PORT = 3000;

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wt_lab9'
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Connected to database');
});

/*
connection.end((error) => {
    if (error) throw error;
    console.log('Disconnected from database');
});
*/

app.get('/addressBook', async (req, res) => {
    try {
        connection.query('SELECT * FROM address_book', (error, rows) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database query failed' });
            }

            res.status(200).json(rows);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});