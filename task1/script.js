const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('address_book.txt', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Error reading file');
        }

        const rows = data.toString('utf-8').trim().split('\n');
        const headers = ['firstname', 'lastname', 'address', 'phoneNumber'];

        const jsonArray = rows.map(row => {
            const values = row.split(',');

            const object = {};
            headers.forEach((header, index) => object[header] = values[index]);
            return object;
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonArray, null, 4));
    });
}).listen(8080);