/* ========================================
   R_syste_M — THE GAME
======================================== */


/* ========================================
   GAME DATA
======================================== */

const gameData = [

    {
        number: "001",

        context: "KINGDOM HEARTS",

        type: "text",

        content:
`A HEART WAS LOST.

THE BODY REMAINED.

THE SOUL COULD NOT RETURN.

WHAT REMAINED
WAS NOT THE PERSON.

AN EMPTY EXISTENCE
BORN FROM ABSENCE.`,

        answer: "NOBODY"
    },


    {
        number: "002",

        context: "METAL GEAR",

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

        context: "BIOHAZARD",

        type: "text",

        content:
`RECORD CORRUPTED:

-TRIVUS`,

        answer: "T-VIRUS"
    },


    {
        number: "004",

        context: "CHRONO TRIGGER",

        type: "text",

        content:
`TEMPORAL FILE

RECORD 1999 A.D.:

DAY OF __________`,

        answer: "LAVOS"
    },


    {
        number: "005",

        context: "CASTLEVANIA",

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

        context: "THE LEGEND OF ZELDA",

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

        context: "STAR WARS",

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

        context: "GOD OF WAR",

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

        context: "EVANGELION",

        type: "text",

        content:
`EVA-01

PILOT:

SHINJI ________`,

        answer: "IKARI"
    },


    {
        number: "010",

        context: "LORD OF THE RINGS",

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

        context: "DEATH STRANDING",

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

        context: "FINAL FANTASY",

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
   VARIABLES
======================================== */

let currentQuestion = 0;


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
   START
======================================== */

showQuestion();


/* ========================================
   SHOW QUESTION
======================================== */

function showQuestion() {

    const question =
        gameData[currentQuestion];


    questionNumber.textContent =
        `RECORD // ${question.number}`;


    questionContext.textContent =
        question.context;


    questionContent.textContent =
        question.content;


    answerArea.innerHTML = "";

    feedback.textContent = "";


    if (question.type === "text") {

        createTextInput(question);

    }


    if (question.type === "edit") {

        createEditInputs(question);

    }


    if (question.type === "select") {

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


    const button =
        document.createElement("button");


    button.className =
        "game-button";

    button.textContent =
        "SUBMIT";


    button.onclick = () => {

        checkText(
            input.value,
            question.answer
        );

    };


    input.onkeydown = event => {

        if (event.key === "Enter") {

            checkText(
                input.value,
                question.answer
            );

        }

    };


    answerArea.appendChild(input);

    answerArea.appendChild(button);

    input.focus();

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


    question.values.forEach(value => {

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


        inputs.push(input);

        wrapper.appendChild(input);

    });


    const button =
        document.createElement("button");


    button.className =
        "game-button";

    button.textContent =
        "SUBMIT";


    button.onclick = () => {

        const values =
            inputs.map(
                input =>
                    input.value
                        .trim()
                        .toUpperCase()
            );


        checkEdit(
            values,
            question.answer
        );

    };


    wrapper.appendChild(button);

    answerArea.appendChild(wrapper);

}


/* ========================================
   SELECT
======================================== */

function createSelect(question) {

    question.options.forEach(option => {

        const button =
            document.createElement("button");


        button.className =
            "game-button";

        button.textContent =
            option;


        button.onclick = () => {

            checkText(
                option,
                question.answer
            );

        };


        answerArea.appendChild(button);

    });

}


/* ========================================
   CHECK TEXT
======================================== */

function checkText(
    value,
    answer
) {

    const userAnswer =
        value
            .trim()
            .toUpperCase();


    if (userAnswer === answer) {

        correct();

    } else {

        incorrect();

    }

}


/* ========================================
   CHECK EDIT
======================================== */

function checkEdit(
    values,
    answers
) {

    const correct =
        values.length === answers.length &&
        values.every(
            (value, index) =>
                value === answers[index]
        );


    if (correct) {

        correct();

    } else {

        incorrect();

    }

}


/* ========================================
   CORRECT
======================================== */

function correct() {

    feedback.textContent =
        "RECORD RESTORED.";


    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion >=
            gameData.length
        ) {

            finishGame();

        } else {

            showQuestion();

        }

    }, 1600);

}


/* ========================================
   INCORRECT
======================================== */

function incorrect() {

    feedback.textContent =
        "RECORD NOT ACCEPTED.";

}
    

/* ========================================
   FINISH
======================================== */

function finishGame() {

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

}