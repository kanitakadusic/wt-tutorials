const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'some secret code',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/guessTheNumber.html');
});

app.post('/', (req, res) => {
    let sessionExists = req.session.number;
    let number, numberOfAttempts, message = '';
    
    if (!sessionExists) {
        req.session.number = number = Math.floor((Math.random() * 100) + 1);
        req.session.numberOfAttempts = numberOfAttempts = 10;
        message = 'Guess the number!';
    } else {
        number = req.session.number;
        numberOfAttempts = req.session.numberOfAttempts;

        if (numberOfAttempts > 0) {
            req.session.numberOfAttempts = --numberOfAttempts;
    
            if (req.body['userAttemptNumber'] == number) {
                message = 'You guessed the number!';
            } else if (req.body['userAttemptNumber'] > number) {
                message = 'The number is smaller.';
            } else {
                message = 'The number is higher.';
            }
        } else {
            req.session.number = null;
            message = 'Game over!';
        }
    }

    res.json({ attempt: {
        numberOfAttempts: numberOfAttempts,
        message: message
    }});
});

app.listen(3000);