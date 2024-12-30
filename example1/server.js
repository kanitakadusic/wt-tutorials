const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'some secret code',
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    let sessionExists = req.session.number;

    if (!sessionExists) {
        req.session.number = Math.floor((Math.random() * 100) + 1);
        req.session.numberOfAttempts = 10;
    }

    res.render('guessTheNumber', { attempt: {
        numberOfAttempts: 10,
        message: 'Guess the number!'
    }});
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

            if (req.body['attempt'] == number) {
                message = 'You guessed the number!';
            } else if (req.body['attempt'] > number) {
                message = 'The number is smaller.';
            } else {
                message = 'The number is higher.';
            }
        } else {
            req.session.number = null;
            message = 'Game over!';
        }
    }

    res.render('guessTheNumber', { attempt: {
        numberOfAttempts: numberOfAttempts,
        message: message
    }});
});

app.listen(3000);