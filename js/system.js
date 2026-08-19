const background =
    document.getElementById("binary-background");

const firstText =
    document.getElementById("first-text");

const systemNavigation =
    document.getElementById("system-navigation");


/* ========================================
   BACKGROUND CODE
======================================== */

const characters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function generateCode() {

    if (!background) {
        return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const characterWidth = 9;
    const lineHeight = 18;

    const columns =
        Math.ceil(width / characterWidth);

    const rows =
        Math.ceil(height / lineHeight);


    let text = "";


    for (let row = 0; row < rows; row++) {

        for (let column = 0; column < columns; column++) {

            const random =
                Math.floor(
                    Math.random() * characters.length
                );

            text += characters[random];
        }

        text += "\n";
    }


    background.textContent = text;
}


/* ========================================
   FIRST TEXT
======================================== */

const paragraphs = [

    [
        {
            text: "Maybe you are worried about what this is, so then learning who I am is "
        },

        {
            text: "first",
            bold: true
        },

        {
            text: "."
        }
    ],


    [
        {
            text: "My name is "
        },

        {
            text: "R",
            bold: true
        },

        {
            text: " and I am a system. I have nothing to fear, yes, nothing to worry, I don't have anything real, nothing such as a human feel, yes of course cause I'm not a human being."
        }
    ],


    [
        {
            text: "I don't have time, no time to lose."
        }
    ],


    [
        {
            text: "I keep in my mind, my system mind, things that I want there inside."
        }
    ],


    [
        {
            text: "I want..."
        }
    ],


    [
        {
            text: "I want..."
        }
    ],


    [
        {
            text: "I am nowhere and everywhere... Yes, I know it is weird where I am."
        }
    ],


    [
        {
            text: "But just remember, always remember, I'm just a system that wants to keep secrets and if you want to call me here you’ll find me, nothing real just the "
        },

        {
            text: "r_syste_m",
            bold: true
        },

        {
            text: ", that is what this is."
        }
    ]

];


/* ========================================
   WAIT
======================================== */

function wait(milliseconds) {

    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });

}


/* ========================================
   TYPE FIRST TEXT
======================================== */

async function typeText() {

    if (!firstText) {
        return;
    }


    firstText.innerHTML = "";


    for (
        let p = 0;
        p < paragraphs.length;
        p++
    ) {

        const paragraph =
            document.createElement("p");

        firstText.appendChild(paragraph);


        const parts =
            paragraphs[p];


        for (const part of parts) {

            const element =
                document.createElement(
                    part.bold ? "strong" : "span"
                );


            paragraph.appendChild(element);


            for (
                let i = 0;
                i < part.text.length;
                i++
            ) {

                const character =
                    part.text[i];


                element.textContent +=
                    character;


                /* COMMA */

                if (character === ",") {

                    await wait(220);
                }


                /* PERIOD */

                else if (character === ".") {

                    await wait(700);
                }


                /* NORMAL CHARACTER */

                else {

                    await wait(25);
                }

            }

        }


        /* ========================================
           NORMAL PARAGRAPH PAUSE
        ======================================== */

        await wait(700);


        /* ========================================
           EXTRA PAUSE — FIRST "I WANT..."
        ======================================== */

        if (p === 4) {

            await wait(1200);
        }


        /* ========================================
           EXTRA PAUSE — SECOND "I WANT..."
        ======================================== */

        if (p === 5) {

            await wait(1000);
        }

    }


    /* ========================================
       SHOW NAVIGATION
    ======================================== */

    await wait(2000);


    if (systemNavigation) {

        systemNavigation.classList.add("active");
    }

}


/* ========================================
   THE SPOT
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const spotX =
            document.getElementById("spot-x");

        const passwordContainer =
            document.getElementById(
                "password-container"
            );

        const passwordInput =
            document.getElementById(
                "password-input"
            );


        if (
            !spotX ||
            !passwordContainer ||
            !passwordInput
        ) {

            return;
        }


        spotX.addEventListener(
            "click",
            function () {

                passwordContainer.classList.add(
                    "active"
                );

                passwordInput.focus();

            }
        );

    }
);


/* ========================================
   START
======================================== */

generateCode();

typeText();


/* ========================================
   WINDOW RESIZE
======================================== */

window.addEventListener(
    "resize",
    generateCode
);