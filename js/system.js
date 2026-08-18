const backLayer = document.getElementById("code-back");
const middleLayer = document.getElementById("code-middle");
const frontLayer = document.getElementById("code-front");


/* ========================================
   CHARACTERS
======================================== */

const characters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


/* ========================================
   GENERATE RANDOM CODE
======================================== */

function createCode(fontSize, lineHeight) {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const characterWidth = fontSize * 0.6;

    const columns =
        Math.ceil(width / characterWidth) + 10;

    const rows =
        Math.ceil(height / lineHeight) + 5;

    let output = "";


    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            const random =
                Math.floor(Math.random() * characters.length);

            output += characters[random];
        }

        output += "\n";
    }


    return output;
}


/* ========================================
   GENERATE ALL THREE LAYERS
======================================== */

function generateSystem() {

    backLayer.textContent =
        createCode(12, 15);

    middleLayer.textContent =
        createCode(14, 17);

    frontLayer.textContent =
        createCode(16, 19);
}


/* ========================================
   START
======================================== */

generateSystem();


/* ========================================
   WINDOW RESIZE
======================================== */

window.addEventListener(
    "resize",
    generateSystem
);