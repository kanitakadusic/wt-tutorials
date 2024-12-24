const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(express.static('public'));

app.post('/get-token', async (req, res) => {
    try {
        const response = await axios.post(
            'https://bitbucket.org/site/oauth2/access_token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')}`
                }
            }
        );
        
        res.json({ access_token: response.data.access_token });
    } catch (error) {
        res.status(500).json({ error: 'Unable to get access token' });
    }
});

app.listen(8085);