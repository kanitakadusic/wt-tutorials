window.onload = () => {
    const paragrafs = document.getElementsByTagName("p");

    for (let p of paragrafs) {
        p.style.backgroundColor = "red";
    }
};