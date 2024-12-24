function getAccessToken(callback) {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callback(null, JSON.parse(ajax.responseText).access_token);
        } else if (ajax.readyState == 4) {
            callback(ajax.status, null);
        }
    };

    ajax.open("POST", "/get-token", true);
    ajax.send();
}

function listRepositories(error, token) {
    if (error) {
        console.error("Token error: ", error);
        return;
    }

    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            const data = JSON.parse(ajax.responseText);

            if (!data.values || data.values.length === 0) {
                console.log("No repositories found.");
                return;
            }

            let table = `
                <table>
                    <thead>
                        <tr>
                            <th>Repository</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (let value of data.values) {
                table += `
                    <tr>
                        <td>${value.name}</td>
                        <td>${value.owner.username}</td>
                    </tr>
                `;
            }

            table += `
                    </tbody>
                </table>
            `;

            document.getElementById('table').innerHTML = table;
        } else if (ajax.readyState == 4) {
            console.error("API error: ", ajax.status);
        }
    };

    ajax.open("GET", "https://api.bitbucket.org/2.0/repositories?role=member");
    ajax.setRequestHeader("Authorization", "Bearer " + token);
    ajax.send();
}

getAccessToken(listRepositories);