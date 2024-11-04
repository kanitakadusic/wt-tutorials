let odgovor = prompt("Unesite neki tekst", "12345");

if (odgovor != null && odgovor != "") {
    let obrnutOdgovor = "";

    for (let slovo of odgovor) {
        obrnutOdgovor = slovo + obrnutOdgovor;
    }
    
    alert(obrnutOdgovor);
    //alert(odgovor.split("").reverse().join(""));
}