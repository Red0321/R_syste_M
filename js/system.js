const backLayer = document.getElementById("code-back");
const middleLayer = document.getElementById("code-middle");
const frontLayer = document.getElementById("code-front");

const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function createCode(fontSize, lineHeight) {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const characterWidth = fontSize * 0.6;

    const columns = Math.ceil(width / characterWidth) + 20;
    const rows = Math.ceil(height / lineHeight) + 20;

    let output = "";

    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            const randomIndex =
                Math.floor(Math.random() * characters.length);

            output += characters[randomIndex];
        }

        output += "\n";
    }

    return output;
}

function generateSystem() {

    backLayer.textContent = createCode(12, 15);

    middleLayer.textContent = createCode(14, 17);

    frontLayer.textContent = createCode(16, 19);
}

generateSystem();

window.addEventListener("resize", generateSystem);