const background =
    document.getElementById("binary-background");

const firstText =
    document.getElementById("first-text");


/* ========================================
   BACKGROUND CODE
======================================== */

const characters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function generateCode() {

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

    "Maybe you are worried about what this is, so then learning who I am is <strong>first</strong>.",

    "My name is <strong>R</strong> and I am a system. I have nothing to fear, yes, nothing to worry, I don't have anything real, nothing such as a human feel, yes of course cause I'm not a human being.",

    "I don't have time, no time to lose.",

    "I keep in my mind, my system mind, things that I want there inside.",

    "I want...",

    "I want...",

    "I am nowhere and everywhere... Yes, I know it is weird where I am.",

    "But just remember, always remember, I'm just a system that wants to keep secrets and if you want to call me here you’ll find me, nothing real just the <strong>r_syste_m</strong>, that is what this is."

];


function wait(milliseconds) {

    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });

}


async function typeText() {

    firstText.innerHTML = "";


    for (let p = 0; p < paragraphs.length; p++) {

        const paragraph =
            document.createElement("p");

        firstText.appendChild(paragraph);


        const text = paragraphs[p];


        for (let i = 0; i < text.length; i++) {

    const character = text[i];

    paragraph.textContent += character;

    if (character === ",") {
        await wait(220);
    }
    else if (character === ".") {
        await wait(700);
    }
    else {
        await wait(25);
    }
}

        /*
           Normal pause between paragraphs.
        */

        await wait(700);


        /*
           Extra pause around the mysterious
           "I want..." section.
        */

        if (p === 4) {
            await wait(1200);
        }


        /*
           Extra pause before
           "I am nowhere and everywhere..."
        */

        if (p === 5) {
            await wait(1000);
        }

    }

}


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