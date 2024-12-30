let attemptElement, numberOfAttemptsElement, messageElement;

window.onload = () => {
    attemptElement = document.getElementById('attempt-number');
    numberOfAttemptsElement = document.getElementById('number-of-attempts');
    messageElement = document.getElementById('message');

    tryAjax(null, write);

    document.getElementById('send-button').addEventListener('click', () => {
        tryAjax(attemptElement.value, write);
    });
}

function write(message, numberOfAttempts) {
    messageElement.innerHTML = message;
    numberOfAttemptsElement.innerHTML = numberOfAttempts;
}

function tryAjax(userAttemptNumber, callback) {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            let jsonResponse = JSON.parse(ajax.responseText);
            callback(jsonResponse.attempt.message, jsonResponse.attempt.numberOfAttempts);
        } else if (ajax.readyState == 4) {
            callback(ajax.statusText, null);
        }
    };
    
    ajax.open('POST', 'http://localhost:3000', true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify({ userAttemptNumber: userAttemptNumber }));
}