/* ========================================
   R_syste_M — THE GAME
======================================== */

const gameData = [

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
shall be dubbed...`,

    answer: "NOBODY"
},


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


    {
        number: "003",

        type: "text",

        content:
`BIOHAZARD

RECORD CORRUPTED:

-TRIVUS`,

        answer: "T-VIRUS"
    },


    {
        number: "004",

        type: "text",

        content:
`TEMPORAL FILE

RECORD 1999 A.D.:

DAY OF __________`,

        answer: "LAVOS"
    },


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


    {
        number: "006",

        type: "edit",

        values: [
            "COURAGE",
            "POWR",
            "WISDM"
        ],

        answer: [
            "COURAGE",
            "POWER",
            "WISDOM"
        ]
    },


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


    {
        number: "009",

        type: "text",

        content:
`EVA-01

PILOT:

SHINJI ________`,

        answer: "IKARI"
    },


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
   STATE
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
   SAFETY CHECK
======================================== */

if (
    !questionNumber ||
    !questionContent ||
    !answerArea ||
    !feedback
) {

    console.error(
        "R_syste_M: Game interface not found."
    );

} else {

    showQuestion();

}


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


    questionNumber.textContent =
        `RECORD ${question.number}`;


    /*
     * Franchise names are intentionally hidden.
     */

    if (questionContext) {

        questionContext.textContent = "";

    }


    questionContent.textContent =
        question.content;


    answerArea.innerHTML =
        "";


    feedback.textContent =
        "";


    /*
     * Create interaction.
     */

    if (question.type === "text") {

        createTextInput(question);

    }

    else if (question.type === "edit") {

        createEditInputs(question);

    }

    else if (question.type === "select") {

        createSelect(question);

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


    input.addEventListener(
        "input",
        function () {

            if (answerLocked) {

                return;

            }


            const value =
                normalize(input.value);


            if (
                value ===
                normalize(question.answer)
            ) {

                correctAnswer();

            }

        }
    );


    answerArea.appendChild(input);


    setTimeout(
        function () {

            input.focus();

        },
        100
    );

}


/* ========================================
   EDIT INPUTS
======================================== */

function createEditInputs(question) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "edit-record";


    const inputs = [];


    question.values.forEach(
        function (value) {

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


            input.addEventListener(
                "input",
                function () {

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


    setTimeout(
        function () {

            if (inputs[0]) {

                inputs[0].focus();

            }

        },
        100
    );

}


/* ========================================
   CHECK EDIT
======================================== */

function checkEditAnswer(
    inputs,
    answers
) {

    const values =
        inputs.map(
            function (input) {

                return normalize(
                    input.value
                );

            }
        );


    /*
     * Wait until every field
     * contains something.
     */

    if (
        values.some(
            function (value) {

                return value === "";

            }
        )
    ) {

        return;

    }


    const correct =
        values.length === answers.length &&
        values.every(
            function (value, index) {

                return (
                    value ===
                    normalize(
                        answers[index]
                    )
                );

            }
        );


    if (correct) {

        correctAnswer();

    }

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
        function (option) {

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
                function () {

                    if (answerLocked) {

                        return;

                    }


                    if (
                        normalize(option) ===
                        normalize(question.answer)
                    ) {

                        correctAnswer();

                    }

                    else {

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
   NORMALIZE
======================================== */

function normalize(value) {

    return String(value)
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();

}


/* ========================================
   CORRECT
======================================== */

function correctAnswer() {

    if (answerLocked) {

        return;

    }


    answerLocked = true;


    feedback.textContent =
        "RECORD RESTORED.";


    const controls =
        answerArea.querySelectorAll(
            "input, button"
        );


    controls.forEach(
        function (control) {

            control.disabled = true;

        }
    );


    setTimeout(
        function () {

            currentQuestion++;

            showQuestion();

        },
        1600
    );

}


/* ========================================
   INCORRECT
======================================== */

function incorrectAnswer() {

    if (answerLocked) {

        return;

    }


    feedback.textContent =
        "RECORD NOT ACCEPTED.";


    setTimeout(
        function () {

            if (!answerLocked) {

                feedback.textContent = "";

            }

        },
        1200
    );

}


/* ========================================
   FINISH
======================================== */

function finishGame() {

    answerLocked = true;


    questionNumber.textContent =
        "";


    if (questionContext) {

        questionContext.textContent =
            "";

    }


    questionContent.textContent =
        "ALL RECORDS RESTORED.";


    answerArea.innerHTML =
        "";


    feedback.textContent =
        "";

}