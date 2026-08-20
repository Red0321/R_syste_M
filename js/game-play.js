/* ========================================
   R_syste_M — THE GAME
======================================== */


/* ========================================
   GAME DATA
======================================== */

const gameData = [

    /* ----------------------------------------
       RECORD 001 — KINGDOM HEARTS
    ---------------------------------------- */

    {
        number: "001",

        type: "text",

        content:
`A being that is neither darkness nor light; 
belonging nowhere; abandoned by its heart; 
a mere shell of its former self.
The relation between the heart and body is complex. However,
I am certain that if your self exists here, then by definition, 
the other cannot truly "exist."
The other, the one which does not exist, 
shall be dubbed...

        answer: "NOBODY"
    },


    /* ----------------------------------------
       RECORD 002 — METAL GEAR
    ---------------------------------------- */

    {
        number: "002",

        type: "edit",

        values: [
            "SOLID",
            "LIQUID",
            "GAS"
        ],

        answer: [
            "SOLID",
            "LIQUID",
            "SOLIDUS"
        ]
    },


    /* ----------------------------------------
       RECORD 003 — RESIDENT EVIL
    ---------------------------------------- */

    {
        number: "003",

        type: "text",

        content:
`BIOHAZARD

RECORD CORRUPTED:

-TRIVUS`,

        answer: "T-VIRUS"
    },


    /* ----------------------------------------
       RECORD 004 — CHRONO TRIGGER
    ---------------------------------------- */

    {
        number: "004",

        type: "text",

        content:
`TEMPORAL FILE

RECORD 1999 A.D.:

DAY OF __________`,

        answer: "LAVOS"
    },


    /* ----------------------------------------
       RECORD 005 — CASTLEVANIA
    ---------------------------------------- */

    {
        number: "005",

        type: "text",

        content:
`GOTHIC RECORD

HE HAS DIED
MORE TIMES THAN
HE CAN BE COUNTED.

HE RETURNS
WHEN THE NIGHT
NEEDS A MASTER.

THE BLOOD OF HIS
FAMILY FLOWS
THROUGH THE CASTLE.

HE IS THE LORD
OF THE NIGHT.`,

        answer: "DRACULA"
    },


    /* ----------------------------------------
       RECORD 006 — THE LEGEND OF ZELDA
    ---------------------------------------- */

    {
        number: "006",

        type: "edit",

        values: [
            "COURAGE",
            "R",
            "SM"
        ],

        answer: [
            "COURAGE",
            "POWER",
            "WISDOM"
        ]
    },


    /* ----------------------------------------
       RECORD 007 — STAR WARS
    ---------------------------------------- */

    {
        number: "007",

        type: "text",

        content:
`TRANSMISSION // 004

THE SIGNAL WAS RECEIVED.

THE MESSAGE WAS NOT.

ONE WORD REMAINS:

YOU ARE MY ONLY _____`,

        answer: "HOPE"
    },


    /* ----------------------------------------
       RECORD 008 — GOD OF WAR
    ---------------------------------------- */

    {
        number: "008",

        type: "text",

        content:
`MYTHOLOGY FILE

SON OF ZEUS.

GOD OF WAR.

FATHER OF ATREUS.

THE GHOST OF SPARTA.`,

        answer: "KRATOS"
    },


    /* ----------------------------------------
       RECORD 009 — EVANGELION
    ---------------------------------------- */

    {
        number: "009",

        type: "text",

        content:
`EVA-01

PILOT:

SHINJI ________`,

        answer: "IKARI"
    },


    /* ----------------------------------------
       RECORD 010 — LORD OF THE RINGS
    ---------------------------------------- */

    {
        number: "010",

        type: "text",

        content:
`AN OBJECT WAS CREATED
TO RULE THEM ALL.

IT WAS DESTROYED
WHERE IT WAS BORN.

ITS CREATOR
WAS NOT ITS MASTER.`,

        answer: "THE ONE RING"
    },


    /* ----------------------------------------
       RECORD 011 — DEATH STRANDING
    ---------------------------------------- */

    {
        number: "011",

        type: "text",

        content:
`CONNECTION FILE

THE WORLD WAS BROKEN.

THE DEAD COULD NO LONGER
REMAIN DEAD.

THE LIVING COULD NO LONGER
REMAIN ________.`,

        answer: "ALONE"
    },


    /* ----------------------------------------
       RECORD 012 — FINAL FANTASY
    ---------------------------------------- */

    {
        number: "012",

        type: "select",

        content:
`MEMORY FILE

ONE NAME WAS LEFT BEHIND.`,

        options: [
            "CLOUD",
            "AERITH",
            "TIFA",
            "BARRET",
            "SEPHIROTH"
        ],

        answer: "SEPHIROTH"
    }

];


/* ========================================
   GAME STATE
======================================== */

let currentQuestion = 0;

let answerLocked = false;


/* ========================================
   ELEMENTS
======================================== */

const questionNumber =
    document.getElementById("question-number");

const questionContext =
    document.getElementById("question-context");

const questionContent =
    document.getElementById("question-content");

const answerArea =
    document.getElementById("answer-area");

const feedback =
    document.getElementById("feedback");


/* ========================================
   INITIALIZE
======================================== */

showQuestion();


/* ========================================
   SHOW QUESTION
======================================== */

function showQuestion() {

    const question =
        gameData[currentQuestion];


    if (!question) {

        finishGame();

        return;

    }


    answerLocked = false;


    /*
     * Only the record number is visible.
     */

    questionNumber.textContent =
        `RECORD ${question.number}`;


    /*
     * Franchise names are intentionally
     * not displayed.
     */

    questionContext.textContent =
        "";


    questionContent.textContent =
        question.content;


    answerArea.innerHTML =
        "";


    feedback.textContent =
        "";


    /*
     * Fade between records.
     */

    const interfaceElement =
        document.getElementById("game-interface");


    interfaceElement.style.opacity =
        "0";


    setTimeout(() => {

        interfaceElement.style.transition =
            "opacity 1.2s ease";

        interfaceElement.style.opacity =
            "1";

    }, 50);


    /*
     * Create the appropriate
     * interaction.
     */

    switch (question.type) {

        case "text":

            createTextInput(question);

            break;


        case "edit":

            createEditInputs(question);

            break;


        case "select":

            createSelect(question);

            break;

    }

}


/* ========================================
   TEXT INPUT
======================================== */

function createTextInput(question) {

    const input =
        document.createElement("input");


    input.className =
        "game-input";


    input.type =
        "text";


    input.autocomplete =
        "off";


    input.spellcheck =
        false;


    /*
     * The answer is checked
     * automatically as the player types.
     */

    input.addEventListener(
        "input",
        () => {

            if (answerLocked) {

                return;

            }


            const value =
                normalize(input.value);


            /*
             * Empty answers are ignored.
             */

            if (!value) {

                return;

            }


            /*
             * Correct answer.
             */

            if (
                value ===
                normalize(question.answer)
            ) {

                correctAnswer();

            }

        }
    );


    answerArea.appendChild(input);


    /*
     * Automatically focus the field.
     */

    setTimeout(() => {

        input.focus();

    }, 100);

}


/* ========================================
   EDITABLE RECORD
======================================== */

function createEditInputs(question) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "edit-record";


    const inputs = [];


    question.values.forEach(
        (value, index) => {

            const input =
                document.createElement("input");


            input.className =
                "edit-input";


            input.type =
                "text";


            input.value =
                value;


            input.autocomplete =
                "off";


            input.spellcheck =
                false;


            /*
             * Check automatically whenever
             * the player edits a field.
             */

            input.addEventListener(
                "input",
                () => {

                    if (answerLocked) {

                        return;

                    }


                    checkEditAnswer(
                        inputs,
                        question.answer
                    );

                }
            );


            inputs.push(input);


            wrapper.appendChild(input);

        }
    );


    answerArea.appendChild(wrapper);


    /*
     * Focus the first editable field.
     */

    setTimeout(() => {

        if (inputs.length > 0) {

            inputs[0].focus();

        }

    }, 100);

}


/* ========================================
   SELECT
======================================== */

function createSelect(question) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "select-record";


    question.options.forEach(
        option => {

            const button =
                document.createElement("button");


            button.className =
                "game-option";


            button.type =
                "button";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    if (answerLocked) {

                        return;

                    }


                    if (
                        normalize(option) ===
                        normalize(question.answer)
                    ) {

                        correctAnswer();

                    } else {

                        incorrectAnswer();

                    }

                }
            );


            wrapper.appendChild(button);

        }
    );


    answerArea.appendChild(wrapper);

}


/* ========================================
   CHECK EDIT ANSWER
======================================== */

function checkEditAnswer(
    inputs,
    correctValues
) {

    const values =
        inputs.map(
            input =>
                normalize(input.value)
        );


    /*
     * Do not evaluate until every
     * field contains something.
     */

    if (
        values.some(
            value => value === ""
        )
    ) {

        return;

    }


    const isCorrect =
        values.length ===
        correctValues.length &&

        values.every(
            (value, index) =>
                value ===
                normalize(
                    correctValues[index]
                )
        );


    if (isCorrect) {

        correctAnswer();

    }

}


/* ========================================
   NORMALIZE
======================================== */

function normalize(value) {

    return String(value)
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();

}


/* ========================================
   CORRECT ANSWER
======================================== */

function correctAnswer() {

    if (answerLocked) {

        return;

    }


    answerLocked = true;


    feedback.textContent =
        "RECORD RESTORED.";


    /*
     * Disable all inputs/buttons
     * while the record is being restored.
     */

    const controls =
        answerArea.querySelectorAll(
            "input, button"
        );


    controls.forEach(
        control => {

            control.disabled =
                true;

        }
    );


    /*
     * Give the player time to see
     * the restoration message.
     */

    setTimeout(() => {

        nextQuestion();

    }, 1600);

}


/* ========================================
   INCORRECT ANSWER
======================================== */

function incorrectAnswer() {

    if (answerLocked) {

        return;

    }


    feedback.textContent =
        "RECORD NOT ACCEPTED.";


    /*
     * Remove the message after
     * a short period.
     */

    setTimeout(() => {

        if (!answerLocked) {

            feedback.textContent =
                "";

        }

    }, 1200);

}


/* ========================================
   NEXT QUESTION
======================================== */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        gameData.length
    ) {

        finishGame();

        return;

    }


    showQuestion();

}


/* ========================================
   FINISH GAME
======================================== */

function finishGame() {

    answerLocked = true;


    questionNumber.textContent =
        "";


    questionContext.textContent =
        "";


    questionContent.textContent =
        "ALL RECORDS RESTORED.";


    answerArea.innerHTML =
        "";


    feedback.textContent =
        "";


    const interfaceElement =
        document.getElementById(
            "game-interface"
        );


    interfaceElement.style.opacity =
        "0";


    setTimeout(() => {

        interfaceElement.style.transition =
            "opacity 2s ease";

        interfaceElement.style.opacity =
            "1";

    }, 50);

}