/* ========================================
   ELEMENTS
======================================== */

const background =
    document.getElementById(
        "binary-background"
    );


const firstText =
    document.getElementById(
        "first-text"
    );


const systemNavigation =
    document.getElementById(
        "system-navigation"
    );



/* ========================================
   BACKGROUND CODE
======================================== */

const characters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function generateCode() {

    /*
       Only run if the page
       has the background.
    */

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
   WAIT
======================================== */

function wait(milliseconds) {

    return new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );

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



/* ========================================
   TYPE FIRST
======================================== */

async function typeText() {


    /*
       If this isn't FIRST,
       stop here.
    */

    if (!firstText) {

        return;

    }


    /*
       Clear previous text.
    */

    firstText.innerHTML = "";



    /* ====================================
       PARAGRAPHS
    ==================================== */

    for (
        let p = 0;
        p < paragraphs.length;
        p++
    ) {


        const paragraph =
            document.createElement(
                "p"
            );


        firstText.appendChild(
            paragraph
        );


        const text =
            paragraphs[p];


        let currentTag = null;



        /* ====================================
           CHARACTERS
        ==================================== */

        for (
            let i = 0;
            i < text.length;
            i++
        ) {


            /*
               OPEN STRONG
            */

            if (
                text.startsWith(
                    "<strong>",
                    i
                )
            ) {


                currentTag =
                    document.createElement(
                        "strong"
                    );


                paragraph.appendChild(
                    currentTag
                );


                /*
                   Skip "<strong>"
                */

                i += 7;


                continue;

            }



            /*
               CLOSE STRONG
            */

            if (
                text.startsWith(
                    "</strong>",
                    i
                )
            ) {


                currentTag =
                    null;


                /*
                   Skip "</strong>"
                */

                i += 8;


                continue;

            }



            /*
               Current writing target.
            */

            const target =
                currentTag ||
                paragraph;



            const character =
                text[i];


            target.textContent +=
                character;



            /* ====================================
               PAUSES
            ==================================== */


            /*
               COMMA
            */

            if (
                character === ","
            ) {

                await wait(220);

            }


            /*
               PERIOD
            */

            else if (
                character === "."
            ) {

                await wait(700);

            }


            /*
               NORMAL CHARACTER
            */

            else {

                await wait(25);

            }

        }



        /* ====================================
           PARAGRAPH PAUSE
        ==================================== */

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



    /* ====================================
       SHOW NAVIGATION
    ==================================== */

    /*
       Wait before showing
       the navigation.
    */

    if (systemNavigation) {


        await wait(2000);


        systemNavigation.classList.add(
            "active"
        );

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



        /*
           If these elements don't
           exist on the current page,
           do nothing.
        */

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
   CIPHER MAP
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



        /*
           Only run on CIPHER.
        */

        if (
            !map ||
            !center ||
            !linesContainer ||
            !nodes.length
        ) {

            return;

        }



        /* ====================================
           CREATE LINES
        ==================================== */

        function createLines() {


            /*
               Remove old lines.
            */

            linesContainer.innerHTML = "";



            const mapRect =
                map.getBoundingClientRect();


            const centerRect =
                center.getBoundingClientRect();



            /*
               Center of R_syste_M
            */

            const centerX =
                centerRect.left +
                centerRect.width / 2 -
                mapRect.left;


            const centerY =
                centerRect.top +
                centerRect.height / 2 -
                mapRect.top;



            /* =================================
               EACH NODE
            ================================= */

            nodes.forEach(
                function (node) {


                    const rect =
                        node.getBoundingClientRect();



                    /*
                       Center of node
                    */

                    const nodeCenterX =
                        rect.left +
                        rect.width / 2 -
                        mapRect.left;


                    const nodeCenterY =
                        rect.top +
                        rect.height / 2 -
                        mapRect.top;



                    /*
                       Difference
                    */

                    const deltaX =
                        centerX -
                        nodeCenterX;


                    const deltaY =
                        centerY -
                        nodeCenterY;



                    /*
                       Distance
                    */

                    const distance =
                        Math.sqrt(
                            deltaX * deltaX +
                            deltaY * deltaY
                        );



                    /*
                       Angle
                    */

                    const angle =
                        Math.atan2(
                            deltaY,
                            deltaX
                        ) *
                        (180 / Math.PI);



                    /*
                       Circle radius
                    */

                    const nodeRadius =
                        rect.width / 2;



                    /*
                       Small gap before
                       R_syste_M
                    */

                    const centerGap = 45;



                    /*
                       Final line length
                    */

                    const lineLength =
                        distance -
                        nodeRadius -
                        centerGap;



                    if (
                        lineLength <= 0
                    ) {

                        return;

                    }



                    /*
                       Starting point
                       at circle edge
                    */

                    const startX =
                        nodeCenterX +
                        Math.cos(
                            angle *
                            Math.PI /
                            180
                        ) *
                        nodeRadius;


                    const startY =
                        nodeCenterY +
                        Math.sin(
                            angle *
                            Math.PI /
                            180
                        ) *
                        nodeRadius;



                    /*
                       Create line
                    */

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



                    /* =========================
                       HOVER ON
                    ========================= */

                    node.addEventListener(
                        "mouseenter",
                        function () {

                            line.style.opacity =
                                "1";

                        }
                    );



                    /* =========================
                       HOVER OFF
                    ========================= */

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



        /*
           Initial calculation.
        */

        createLines();



        /*
           Recalculate when
           window changes size.
        */

        window.addEventListener(
            "resize",
            createLines
        );

    }
);



/* ========================================
   CIPHER VISITED MEMORY
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const mapNodes =
            document.querySelectorAll(
                ".map-node"
            );



        /*
           Only run on CIPHER.
        */

        if (!mapNodes.length) {

            return;

        }



        mapNodes.forEach(
            function (node) {


                const link =
                    node.getAttribute(
                        "href"
                    );


                if (!link) {

                    return;

                }



                /*
                   Remove query/cache
                   information.
                */

                const page =
                    link.split("?")[0];



                /*
                   Check previous visit.
                */

                if (
                    localStorage.getItem(
                        "visited_" + page
                    ) === "true"
                ) {


                    node.classList.add(
                        "visited"
                    );

                }



                /*
                   Save visit.
                */

                node.addEventListener(
                    "click",
                    function () {


                        localStorage.setItem(
                            "visited_" + page,
                            "true"
                        );

                    }
                );

            }
        );

    }
);



/* ========================================
   START
======================================== */


/*
   Generate background
   on every page.
*/

generateCode();



/*
   FIRST only runs when
   #first-text exists.
*/

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