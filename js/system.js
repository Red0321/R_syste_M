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

    const width =
        window.innerWidth;

    const height =
        window.innerHeight;

    const characterWidth = 9;

    const lineHeight = 18;


    const columns =
        Math.ceil(
            width / characterWidth
        );


    const rows =
        Math.ceil(
            height / lineHeight
        );


    let text = "";


    for (
        let row = 0;
        row < rows;
        row++
    ) {

        for (
            let column = 0;
            column < columns;
            column++
        ) {

            const random =
                Math.floor(
                    Math.random() *
                    characters.length
                );


            text +=
                characters[random];
        }


        text += "\n";
    }


    background.textContent =
        text;
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

    return new Promise(
        resolve => {
            setTimeout(
                resolve,
                milliseconds
            );
        }
    );

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


        firstText.appendChild(
            paragraph
        );


        const text =
            paragraphs[p];


        let currentTag = null;


        for (
            let i = 0;
            i < text.length;
            i++
        ) {

            const character =
                text[i];


            /*
               HTML tags
               such as <strong>
            */

            if (text.startsWith(
                "<strong>",
                i
            )) {

                currentTag =
                    document.createElement("strong");

                paragraph.appendChild(
                    currentTag
                );

                i += 7;

                continue;
            }


            if (text.startsWith(
                "</strong>",
                i
            )) {

                currentTag = null;

                i += 8;

                continue;
            }


            const target =
                currentTag ||
                paragraph;


            target.textContent +=
                character;


            /*
               Commas
            */

            if (
                character === ","
            ) {

                await wait(220);
            }


            /*
               Periods
            */

            else if (
                character === "."
            ) {

                await wait(700);
            }


            /*
               Normal characters
            */

            else {

                await wait(25);
            }

        }


        /*
           Normal paragraph pause
        */

        await wait(700);


        /*
           Extra pause after
           first "I want..."
        */

        if (p === 4) {

            await wait(1200);
        }


        /*
           Extra pause after
           second "I want..."
        */

        if (p === 5) {

            await wait(1000);
        }

    }

}


/* ========================================
   SPOT PASSWORD
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const spotX =
            document.getElementById(
                "spot-x"
            );


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
   CIPHER MAP LINES
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const map =
            document.querySelector(
                ".system-map"
            );


        const center =
            document.querySelector(
                ".map-center"
            );


        const nodes =
            document.querySelectorAll(
                ".map-node"
            );


        const linesContainer =
            document.querySelector(
                ".map-lines"
            );


        if (
            !map ||
            !center ||
            !linesContainer ||
            !nodes.length
        ) {

            return;
        }


        const connections =
            new Map();


        function createLines() {

            linesContainer.innerHTML = "";

            connections.clear();


            const mapRect =
                map.getBoundingClientRect();


            const centerRect =
                center.getBoundingClientRect();


            const centerX =
                centerRect.left +
                centerRect.width / 2 -
                mapRect.left;


            const centerY =
                centerRect.top +
                centerRect.height / 2 -
                mapRect.top;


            nodes.forEach(
                function (node) {

                    const rect =
                        node.getBoundingClientRect();


                    const nodeCenterX =
                        rect.left +
                        rect.width / 2 -
                        mapRect.left;


                    const nodeCenterY =
                        rect.top +
                        rect.height / 2 -
                        mapRect.top;


                    const deltaX =
                        centerX -
                        nodeCenterX;


                    const deltaY =
                        centerY -
                        nodeCenterY;


                    const distance =
                        Math.sqrt(
                            deltaX * deltaX +
                            deltaY * deltaY
                        );


                    const angle =
                        Math.atan2(
                            deltaY,
                            deltaX
                        ) *
                        (180 / Math.PI);


                    /*
                       Radius of node
                    */

                    const nodeRadius =
                        rect.width / 2;


                    /*
                       Start line at
                       edge of node
                    */

                    const startDistance =
                        nodeRadius;


                    /*
                       Stop line slightly
                       before R_syste_M
                    */

                    const centerGap =
                        45;


                    const lineLength =
                        distance -
                        startDistance -
                        centerGap;


                    if (
                        lineLength <= 0
                    ) {

                        return;
                    }


                    const startX =
                        nodeCenterX +
                        Math.cos(
                            angle *
                            Math.PI /
                            180
                        ) *
                        startDistance;


                    const startY =
                        nodeCenterY +
                        Math.sin(
                            angle *
                            Math.PI /
                            180
                        ) *
                        startDistance;


                    const line =
                        document.createElement(
                            "div"
                        );


                    line.className =
                        "map-line";


                    line.style.width =
                        lineLength + "px";


                    line.style.left =
                        startX + "px";


                    line.style.top =
                        startY + "px";


                    line.style.transform =
                        `rotate(${angle}deg)`;


                    linesContainer.appendChild(
                        line
                    );


                    connections.set(
                        node,
                        line
                    );


                    node.addEventListener(
                        "mouseenter",
                        function () {

                            line.style.opacity =
                                "1";

                        }
                    );


                    node.addEventListener(
                        "mouseleave",
                        function () {

                            line.style.opacity =
                                "0";

                        }
                    );

                }
            );

        }


        createLines();


        window.addEventListener(
            "resize",
            createLines
        );

    }
);


/* ========================================
   START
======================================== */

generateCode();


if (firstText) {

    typeText();

}


/* ========================================
   WINDOW RESIZE
======================================== */

window.addEventListener(
    "resize",
    generateCode
);