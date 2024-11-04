let odgovor = prompt("Kako se zoves?", "Imenom i prezimenom");

if (odgovor != null && odgovor != "") {
    let ok = confirm("Pritisnite \"OK\" za prikaz imena u alert box-u, a \"Cancel\" za prikaz direktno na stranici.");

    if (ok) alert(odgovor);
    else document.write(odgovor);
}