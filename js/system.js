const binaryBackground = document.getElementById("binary-background");


/* ========================================
   CHARACTERS USED BY THE SYSTEM
======================================== */

const characters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


/* ========================================
   HIDDEN WORDS
   We will use these later.
======================================== */

const hiddenWords = [
    "R_syste_M",
    "FIRST",
    "WORLD",
    "WIND",
    "DIVE",
    "SOON",
    "GAME",
    "SPOT"
];


/* ========================================
   GENERATE BACKGROUND CODE
======================================== */

function generateCode() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    /*
       Courier New is approximately 0.6 times
       the font size in character width.
    */

    const characterWidth = 15 * 0.6;
    const lineHeight = 18;

    const columns = Math.ceil(width / characterWidth) + 10;
    const rows = Math.ceil(height / lineHeight) + 5;

    let output = "";


    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            const randomIndex = Math.floor(
                Math.random() * characters.length
            );

            output += characters[randomIndex];
        }

        output += "\n";
    }


    binaryBackground.textContent = output;
}


/* ========================================
   INITIAL GENERATION
======================================== */

generateCode();


/* ========================================
   REGENERATE WHEN WINDOW SIZE CHANGES
======================================== */

window.addEventListener("resize", generateCode);