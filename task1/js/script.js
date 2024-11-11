window.onload = () => {
    document.querySelector("#prva ul")?.classList.add("hidden");
    document.querySelector("#druga ul")?.classList.add("hidden");
}

function onClickGodina(event) {
    const p = event.target;
    const skriven = p.parentElement.querySelector("ul")?.classList.toggle("hidden");

    if (skriven !== undefined) {
        p.textContent = skriven ? p.textContent.replace("-", "+") : p.textContent.replace("+", "-");
    }
}

document.querySelector("#prva p").addEventListener("click", (event) => {
    onClickGodina(event);
});

document.querySelector("#druga p").addEventListener("click", (event) => {
    onClickGodina(event);
});