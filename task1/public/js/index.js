const links = document.querySelectorAll('#menu a');

links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        loadPage(link.dataset.page);
    });
});

function loadPage(page) {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById('contents').innerHTML += ajax.responseText;
        }

        if (ajax.readyState == 4 && ajax.status == 404) {
            document.getElementById('contents').innerHTML += "Error: unknown URL";
        }
    };

    ajax.open("GET", `../html/${page}.html`, true);
    ajax.send();
}