function tablicaMnozenja() {
    let html = "<table><tr><th>X</th>";

    for (let i = 1; i <= 10; i++)
        html += `<th>${i}</th>`;

    html += "</tr>";

    for (let i = 1; i <= 10; i++) {
        html += `<tr><th>${i}</th>`;

        for (let j = 1; j <= 10; j++)
            html += `<td>${i * j}</td>`;

        html += "</tr>";
    }

    html += "</table>";

    document.write(html);
}

tablicaMnozenja();