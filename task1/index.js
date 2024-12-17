const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

function getRecords(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) return reject(err);

            const lines = data.trim().split('\n');
            const records = lines.map(line => {
                const [firstname, lastname, address, phoneNumber] = line.split(",");
                return { firstname, lastname, address, phoneNumber };
            });
                
            resolve(records);
        });
    });
}

function addRecord(filename, record) {
    return new Promise((resolve, reject) => {
        const newLine = `${record.firstname},${record.lastname},${record.address},${record.phoneNumber}\n`;

        fs.appendFile(filename, newLine, err => {
            if (err) return reject(err);
            resolve(record);
        });
    });
}

app.get('/unos', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/', async (req, res) => {
    const { firstname, lastname, address, phoneNumber } = req.body;

    try {
        await addRecord('address_book.txt', { firstname, lastname, address, phoneNumber });
        const records = await getRecords('address_book.txt');

        let htmlContent = `
            <!DOCTYPE html>
            
            <html lang="hr">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width">
                    
                    <title>Address book</title>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        records.forEach(record => {
            htmlContent += `
                <tr>
                    <td>${record.firstname}</td>
                    <td>${record.lastname}</td>
                    <td>${record.address}</td>
                    <td>${record.phoneNumber}</td>
                </tr>
            `;
        });

        htmlContent += `
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } catch (err) {
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.listen(8085);