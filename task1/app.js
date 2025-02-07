const express = require('express');
const { AddressBook } = require('./database');

const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/addressBook', async (req, res) => {
    try {
        const rows = await AddressBook.findAll();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});