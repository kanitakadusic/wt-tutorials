document.querySelector("#calculate-button").addEventListener("click", () => {
    const form = document.forms["sphere-volume-calculation"];

    if (form) {
        const radiusInput = form["radius"];
        const volumeOutput = form["volume"];

        if (radiusInput && volumeOutput) {
            const radiusValue = Number(radiusInput.value);

            if (radiusValue < 0) {
                alert("Please enter a valid radius.");
                return;
            }
            
            const volume = 4 * Math.PI * radiusValue * radiusValue * radiusValue / 3;
            volumeOutput.value = volume.toFixed(4);
        } else {
            console.log("Ne postoje blokovi za unos radijusa i/ili zapremine.");
        }
    } else {
        console.log("Ne postoji \"sphere-volume-calculation\" forma.");
    }
});