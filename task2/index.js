const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getRecords(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) return reject(err);

            const lines = data.trim().split('\r\n');
            const records = lines.map(line => {
                const [id, title, description] = line.split(",");
                return { id, title, description };
            });
                
            resolve(records);
        });
    });
}

function addRecord(filename, record) {
    return new Promise((resolve, reject) => {
        const newLine = `${record.id},${record.title},${record.description}\r\n`;

        fs.appendFile(filename, newLine, err => {
            if (err) return reject(err);
            resolve(record);
        });
    });
}

app.get('/zadaci', async (req, res) => {
    try {
        const records = await getRecords('tasks.txt');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(records, null, 4));
    } catch (error) {
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.post('/zadatak', async (req, res) => {
    const { id, title, description } = req.body;

    try {
        const records = await getRecords('tasks.txt');
        const jsonResponse = {}

        if (records.some(record => record.id === id)) {
            jsonResponse.status = "ID already exists!";
        } else {
            await addRecord('tasks.txt', { id, title, description });
            jsonResponse.status = "Task added successfully!";
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonResponse, null, 4));
    } catch (err) {
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.listen(8085);