const http = require('http');
const fs = require('fs');
const url = require('url');
const js2xml = require('js2xmlparser')

function hash(string) {
    return Array.from(string, char => String.fromCharCode(char.charCodeAt(0) % 16 + 55)).join('');
}

function findUserInFile(filename, username, password) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) return reject(err);
    
            const userStartIndex = data.indexOf(`username:${username}, password:${hash(password)}`);
            if (userStartIndex === -1) return resolve(null);
            const userEndIndex = data.indexOf('\n', userStartIndex);
    
            const userProperties = data.substring(userStartIndex, userEndIndex - 1).split(', ');
    
            let user = {};
            userProperties.forEach(property => {
                const separator = property.indexOf(':');
                const key = property.substring(0, separator);
                const value = property.slice(separator + 1);
                user[key] = value;
            });
    
            resolve(user);
        });
    });
}

http.createServer((req, res) => {
    if (req.method == 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);

        req.on('end', async () => {
            const loginDate = new Date();
            const params = new url.URLSearchParams(body);

            const username = params.get('username');
            const password = params.get('password');

            try {
                let user = await findUserInFile('users.txt', username, password);

                const object = {
                    status: user ? 1 : 0,
                    date: loginDate,
                    user: user || { username: username }
                };

                const xmlObject = js2xml.parse("login", object);

                res.writeHead(200, { 'Content-Type': 'application/xml' });
                res.end(xmlObject);
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
}).listen(8080);