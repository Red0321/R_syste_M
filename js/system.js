const binaryBackground = document.getElementById("binary-background");

const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateCode() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const fontSize = 15;
    const lineHeight = 18;

    const columns = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / lineHeight);

    let output = "";

    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            const randomIndex = Math.floor(
                Math.random() * characters.length
            );

            output += characters[randomIndex];
        }

        output += "<br>";
    }

    binaryBackground.innerHTML = output;
}

generateCode();

window.addEventListener("resize", generateCode);