/* ========================================
   R_syste_M — THE GAME
======================================== */

const gameData = [

    /* ========================================
   RECORD 001
======================================== */

{
    number: "001",

    type: "text",

    inputStyle: "cursor",

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


    /* ========================================
       RECORD 002
    ======================================== */

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


    /* ========================================
       RECORD 003
    ======================================== */

    {
        number: "003",

        type: "rearrange",

        content:
`BIOHAZARD

RECORD CORRUPTED:`,

        letters: [
            "-",
            "T",
            "R",
            "I",
            "V",
            "U",
            "S"
        ],

        answer: [
            "T",
            "-",
            "V",
            "I",
            "R",
            "U",
            "S"
        ]
    },


    /* ========================================
       RECORD 004
    ======================================== */

    {
        number: "004",

        type: "inline",

        before:
`TEMPORAL FILE

RECORD 1999 A.D.:

DAY OF`,

        answer: "LAVOS"
    },


    /* ========================================
   RECORD 005
======================================== */

{
    number: "005",

    type: "text",

    inputStyle: "cursor",

    content:
`HE HAS DIED
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

    /* ========================================
       RECORD 006
    ======================================== */

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


    /* ========================================
       RECORD 007
    ======================================== */

    {
        number: "007",

        type: "inline",

        before:
`TRANSMISSION // 004

SIGNAL RECEIVED.

MESSAGE INCOMPLETE

YOU ARE MY ONLY`,

        answer: "HOPE"
    },


    /* ========================================
   RECORD 008
======================================== */

{
    number: "008",

    type: "gods",

    content:
`RECORD CORRUPTED`,

    options: [
        "ZEUS",
        "ARES",
        "FREYA",
        "ATHENA",
        "PANDORA",
        "BALDUR",
        "ODIN",
        "THOR",
        "POSEIDON",
        "ANUBIS",
        "RA",
        "OSIRIS"
    ],

    answer: [
        "ANUBIS",
        "RA",
        "OSIRIS"
    ]
},


    /* ========================================
   RECORD 009
   SYNCHRONIZATION
======================================== */

{
    number: "009",

    type: "eva",

    content:
`SYNCHRONIZATION`,

    values: [
        {
            name: "NAMIKAMI",
            unit: "UNIT-00"
        },
        {
            name: "NAGISA",
            unit: "UNIT-01"
        },
        {
            name: "LANGLEY",
            unit: "UNIT-02"
        },
        {
            name: "IKARI",
            unit: "UNIT-03"
        },
        {
            name: "SUZUHARA",
            unit: "UNIT-06"
        },
        {
            name: "AYANAMI",
            unit: "UNIT-08"
        }
    ],

    answer: [
        "NAMIKAMI|UNIT-08",
        "NAGISA|UNIT-06",
        "LANGLEY|UNIT-02",
        "IKARI|UNIT-01",
        "SUZUHARA|UNIT-03",
        "AYANAMI|UNIT-00"
    ]
},

    /* ========================================
   RECORD 010
======================================== */

{
    number: "010",

    type: "text",

    inputStyle: "cursor",

    content:
`One to rule them all,
One to find them,
One to bring them all
and in the darkness bind them.`,

    answer: "THE ONE RING"
},


    /* ========================================
   RECORD 011 — CONNECTION LOST
======================================== */

{
    number: "011",

    type: "connection",

    content:
`CONNECTION LOST`
},


    /* ========================================
   RECORD 012 — JUMBO FLAN
======================================== */

{
    number: "012",

    type: "jumboflan",

    content:
`JUMBO FLAN`,

    answer: "DEFEATED"
},
/* ========================================
   RECORD 013 — SUBJECT NO IDENTIFIED
======================================== */

{
    number: "013",

    type: "xehanort",

    content:
`SUBJECT NO IDENTIFIED`,

    letters: [
        "N",
        "O",
        "X",
        "H",
        "E",
        "A",
        "R",
        "T"
    ],

    answer: [
        "X",
        "E",
        "H",
        "A",
        "N",
        "O",
        "R",
        "T"
    ]
},

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

}
else {

    showQuestion();

}


/* ========================================
   SHOW QUESTION
======================================== */

function showQuestion() {
if (window.currentCleanup) {

    window.currentCleanup();

    window.currentCleanup = null;

}
    const question =
        gameData[currentQuestion];


    if (!question) {

        finishGame();

        return;

    }


    answerLocked = false;


    questionNumber.textContent =
        `RECORD ${question.number}`;


    if (questionContext) {

        questionContext.textContent = "";

    }


    questionContent.textContent = "";

    answerArea.innerHTML = "";

    feedback.textContent = "";


    /* ====================================
       TYPE: TEXT
    ==================================== */

    if (question.type === "text") {

        questionContent.textContent =
            question.content;

        createTextInput(question);

    }


    /* ====================================
       TYPE: EDIT
    ==================================== */

    else if (question.type === "edit") {

        createEditQuestion(question);

    }


    /* ====================================
       TYPE: REARRANGE
    ==================================== */

    else if (question.type === "rearrange") {

        questionContent.textContent =
            question.content;

        createRearrange(question);

    }


    /* ====================================
       TYPE: INLINE
    ==================================== */

    else if (question.type === "inline") {

        createInline(question);

    }


    /* ====================================
       TYPE: SELECT
    ==================================== */

    else if (question.type === "select") {

        questionContent.textContent =
            question.content;

        createSelect(question);

    }


/* ====================================
   TYPE: GODS
==================================== */

else if (question.type === "gods") {

    questionContent.textContent =
        question.content;

    createGodCircle(question);

}
/* ====================================
   TYPE: EVA
==================================== */

else if (question.type === "eva") {

    questionContent.textContent =
        question.content;

    createEvaQuestion(question);

}
/* ====================================
   TYPE: CONNECTION
==================================== */

else if (question.type === "connection") {

    questionContent.textContent =
        question.content;

    createConnectionQuestion();

}

/* ====================================
   TYPE: XEHANORT
==================================== */

else if (question.type === "xehanort") {

    questionContent.textContent =
        question.content;

    createXehanortQuestion(question);

}

/* ====================================
   TYPE: JUMBO FLAN
==================================== */

else if (question.type === "jumbo-flan") {

    questionContent.textContent =
        question.content;

    createJumboFlanQuestion();

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


    /*
     * Records that use only the blinking
     * cursor have no visible underline.
     */

    if (question.inputStyle === "cursor") {

        input.classList.add(
            "invisible-input"
        );

    }


    input.type =
        "text";


    input.autocomplete =
        "off";


    input.spellcheck =
        false;


    input.placeholder =
        "";


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


    focusInput(input);

}

/* ========================================
   EDIT QUESTION
======================================== */

function createEditQuestion(question) {

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


    focusInput(inputs[0]);

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
   RECORD 003
   REARRANGE
======================================== */

function createRearrange(question) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "rearrange-record";


    const lettersContainer =
        document.createElement("div");


    lettersContainer.className =
        "rearrange-letters";


    /*
     * Create the letters in random order.
     */

    const shuffled =
    [...question.letters];


    shuffled.forEach(
        function (letter) {

            const button =
                document.createElement("button");


            button.className =
                "rearrange-letter";


            button.type =
                "button";


            button.textContent =
                letter;


            button.draggable =
                true;


            /*
             * Clicking two letters swaps them.
             */

            button.addEventListener(
                "click",
                function () {

                    handleLetterClick(
                        button,
                        lettersContainer
                    );

                }
            );


            /*
             * Drag and drop.
             */

            button.addEventListener(
                "dragstart",
                function (event) {

                    event.dataTransfer.setData(
                        "text/plain",
                        ""
                    );

                    button.classList.add(
                        "dragging"
                    );

                }
            );


            button.addEventListener(
                "dragend",
                function () {

                    button.classList.remove(
                        "dragging"
                    );

                    checkRearrangeAnswer(
                        lettersContainer,
                        question.answer
                    );

                }
            );


            button.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();

                    const dragging =
                        lettersContainer.querySelector(
                            ".dragging"
                        );


                    if (
                        dragging &&
                        dragging !== button
                    ) {

                        const rect =
                            button.getBoundingClientRect();


                        const middle =
                            rect.left +
                            rect.width / 2;


                        if (
                            event.clientX <
                            middle
                        ) {

                            lettersContainer.insertBefore(
                                dragging,
                                button
                            );

                        }
                        else {

                            lettersContainer.insertBefore(
                                dragging,
                                button.nextSibling
                            );

                        }

                    }

                }
            );


            lettersContainer.appendChild(
                button
            );

        }
    );


    wrapper.appendChild(
        lettersContainer
    );


    answerArea.appendChild(
        wrapper
    );

}


/* ========================================
   LETTER CLICK SWAP
======================================== */

let selectedLetter = null;


function handleLetterClick(
    button,
    container
) {

    if (answerLocked) {

        return;

    }


    if (!selectedLetter) {

        selectedLetter = button;

        button.classList.add(
            "selected"
        );

        return;

    }


    if (
        selectedLetter === button
    ) {

        button.classList.remove(
            "selected"
        );

        selectedLetter = null;

        return;

    }


    const buttons =
        Array.from(
            container.children
        );


    const firstIndex =
        buttons.indexOf(
            selectedLetter
        );


    const secondIndex =
        buttons.indexOf(
            button
        );


    if (
        firstIndex < secondIndex
    ) {

        container.insertBefore(
            button,
            selectedLetter
        );

    }
    else {

        container.insertBefore(
            selectedLetter,
            button
        );

    }


    selectedLetter.classList.remove(
        "selected"
    );


    selectedLetter = null;


    /*
     * Check immediately.
     */

    const current =
        Array.from(
            container.children
        ).map(
            function (element) {

                return element.textContent;

            }
        );


    checkRearrangeArray(
        current
    );

}


/* ========================================
   CHECK REARRANGE
======================================== */

function checkRearrangeAnswer(
    container,
    answer
) {

    const current =
        Array.from(
            container.children
        ).map(
            function (element) {

                return element.textContent;

            }
        );


    if (
        arraysEqual(
            current,
            answer
        )
    ) {

        correctAnswer();

    }

}


function checkRearrangeArray(
    current
) {

    const question =
        gameData[currentQuestion];


    if (!question) {

        return;

    }


    if (
        arraysEqual(
            current,
            question.answer
        )
    ) {

        correctAnswer();

    }

}


/* ========================================
   RECORD 004 / 007
   INLINE INPUT
======================================== */

function createInline(question) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "inline-question";


    const text =
        document.createElement("span");

    text.className =
        "inline-text";

    text.textContent =
        question.before;


    const input =
        document.createElement("input");

    input.className =
        "inline-input";

    input.type =
        "text";

    input.autocomplete =
        "off";

    input.spellcheck =
        false;

    input.placeholder =
        "";


    input.addEventListener(
        "input",
        function () {

            if (answerLocked) {

                return;

            }


            if (
                normalize(input.value) ===
                normalize(question.answer)
            ) {

                correctAnswer();

            }

        }
    );


    wrapper.appendChild(text);

    wrapper.appendChild(input);


    answerArea.appendChild(wrapper);


    focusInput(input);

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
   FOCUS
======================================== */

function focusInput(input) {

    if (!input) {

        return;

    }


    setTimeout(
        function () {

            input.focus();

        },
        100
    );

}


/* ========================================
   SHUFFLE
======================================== */

function shuffleArray(array) {

    const result =
        [...array];


    /*
     * Keep shuffling until the result
     * is different from the answer.
     */

    let attempts = 0;


    do {

        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );


            [
                result[i],
                result[j]
            ] =
            [
                result[j],
                result[i]
            ];

        }


        attempts++;

    }
    while (
        arraysEqual(
            result,
            gameData[currentQuestion].answer
        )
        &&
        attempts < 10
    );


    return result;

}


/* ========================================
   ARRAY COMPARISON
======================================== */

function arraysEqual(
    a,
    b
) {

    if (
        a.length !==
        b.length
    ) {

        return false;

    }


    return a.every(
        function (value, index) {

            return (
                value === b[index]
            );

        }
    );

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

        selectedLetter = null;

        if (
            gameData[currentQuestion].type ===
            "xehanort"
        ) {

            questionNumber.textContent = "";

            questionContext.textContent = "";

            questionContent.textContent =
                "WHO ARE THE PATRIOTS?";

            answerArea.innerHTML = "";

            feedback.textContent = "";

            return;

        }


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
/* ========================================
   RECORD 008
   GOD CIRCLE
======================================== */

function createGodCircle(question) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "god-circle-wrapper";


    /*
     * Circle
     */

    const circle =
        document.createElement("div");

    circle.className =
        "god-circle";


    /*
     * Outside area
     */

    const outside =
        document.createElement("div");

    outside.className =
        "god-outside";


    /*
     * Keep track of gods currently
     * outside the circle.
     */

    const outsideGods = [];


    /*
     * Create all gods.
     */

    question.options.forEach(
        function (god, index) {

            const button =
                document.createElement("button");

            button.className =
                "god-option";

            button.type =
                "button";

            button.textContent =
                god;


            /*
             * Position around the circle.
             */

            const angle =
                (360 / question.options.length) *
                index;


            button.style.setProperty(
                "--god-angle",
                `${angle}deg`
            );


            /*
             * Click:
             *
             * Inside  -> Outside
             * Outside -> Inside
             */

            button.addEventListener(
                "click",
                function () {

                    if (answerLocked) {

                        return;

                    }


                    /*
                     * GOD IS INSIDE
                     * Move it outside.
                     */

                    if (
                        button.parentElement === circle
                    ) {

                        outside.appendChild(
                            button
                        );


                        button.classList.add(
                            "outside"
                        );


                        outsideGods.push(
                            god
                        );


                        /*
                         * Check whether the
                         * three Egyptian gods
                         * are outside.
                         */

                        checkGodAnswer();

                    }


                    /*
                     * GOD IS OUTSIDE
                     * Move it back inside.
                     */

                    else {

                        const index =
                            outsideGods.indexOf(
                                god
                            );


                        if (index !== -1) {

                            outsideGods.splice(
                                index,
                                1
                            );

                        }


                        circle.appendChild(
                            button
                        );


                        button.classList.remove(
                            "outside"
                        );


                        /*
                         * Restore its original
                         * circular position.
                         */

                        button.style.setProperty(
                            "--god-angle",
                            `${angle}deg`
                        );

                    }

                }
            );


            circle.appendChild(
                button
            );

        }
    );


    /*
     * Check solution.
     */

    function checkGodAnswer() {

        const correct =
            question.answer.every(
                function (god) {

                    return outsideGods.includes(
                        god
                    );

                }
            );


        /*
         * Important:
         *
         * There must be exactly three
         * gods outside.
         */

        if (
            correct &&
            outsideGods.length ===
            question.answer.length
        ) {

            correctAnswer();

        }

    }


    wrapper.appendChild(
        circle
    );


    wrapper.appendChild(
        outside
    );


    answerArea.appendChild(
        wrapper
    );

}
/* ========================================
   RECORD 009
   EVA SYNCHRONIZATION
======================================== */

function createEvaQuestion(question) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "eva-record";


    const list =
        document.createElement("div");

    list.className =
        "eva-list";


    /*
     * Create independent shuffled lists.
     */

    const names =
        shuffleArray(
            question.values.map(
                function (item) {
                    return item.name;
                }
            )
        );


    const units =
        shuffleArray(
            question.values.map(
                function (item) {
                    return item.unit;
                }
            )
        );


    let draggedElement = null;


    /*
     * Create rows.
     */

    for (
        let i = 0;
        i < question.values.length;
        i++
    ) {

        const row =
            document.createElement("div");

        row.className =
            "eva-row";


        /*
         * NAME
         */

        const name =
            document.createElement("div");

        name.className =
            "eva-name";

        name.textContent =
            names[i];

        name.draggable =
            true;


        /*
         * UNIT
         */

        const unit =
            document.createElement("div");

        unit.className =
            "eva-unit";

        unit.textContent =
            units[i];

        unit.draggable =
            true;


        row.appendChild(name);

        row.appendChild(unit);

        list.appendChild(row);


        /* ====================================
           NAME DRAG
        ==================================== */

        name.addEventListener(
            "dragstart",
            function () {

                if (answerLocked) {

                    return;

                }

                draggedElement =
                    name;

                name.classList.add(
                    "eva-dragging"
                );

            }
        );


        name.addEventListener(
            "dragend",
            function () {

                name.classList.remove(
                    "eva-dragging"
                );

                draggedElement = null;

            }
        );


        /* ====================================
           UNIT DRAG
        ==================================== */

        unit.addEventListener(
            "dragstart",
            function () {

                if (answerLocked) {

                    return;

                }

                draggedElement =
                    unit;

                unit.classList.add(
                    "eva-dragging"
                );

            }
        );


        unit.addEventListener(
            "dragend",
            function () {

                unit.classList.remove(
                    "eva-dragging"
                );

                draggedElement = null;


                checkEvaAnswer(
                    list,
                    question.answer
                );

            }
        );


        /* ====================================
           NAME DROP
        ==================================== */

        name.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

            }
        );


        name.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();


                if (
                    !draggedElement ||
                    draggedElement === name
                ) {

                    return;

                }


                /*
                 * Only swap names with names.
                 */

                if (
                    draggedElement.classList.contains(
                        "eva-name"
                    )
                ) {

                    const temp =
                        name.textContent;


                    name.textContent =
                        draggedElement.textContent;


                    draggedElement.textContent =
                        temp;

                }

            }
        );


        /* ====================================
           UNIT DROP
        ==================================== */

        unit.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

            }
        );


        unit.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();


                if (
                    !draggedElement ||
                    draggedElement === unit
                ) {

                    return;

                }


                /*
                 * Only swap units with units.
                 */

                if (
                    draggedElement.classList.contains(
                        "eva-unit"
                    )
                ) {

                    const temp =
                        unit.textContent;


                    unit.textContent =
                        draggedElement.textContent;


                    draggedElement.textContent =
                        temp;


                    checkEvaAnswer(
                        list,
                        question.answer
                    );

                }

            }
        );

    }


    /*
     * SYNC RATE
     */

    const sync =
        document.createElement("div");

    sync.className =
        "sync-rate";

    sync.textContent =
        "SYNC RATE: 00%";


    wrapper.appendChild(list);

    wrapper.appendChild(sync);

    answerArea.appendChild(wrapper);

}
/* ========================================
   SHUFFLE EVA ROWS
======================================== */

function shuffleEvaRows(values) {

    const result =
        [...values];


    let attempts = 0;


    do {

        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );


            [
                result[i],
                result[j]
            ] =
            [
                result[j],
                result[i]
            ];

        }


        attempts++;

    }
    while (
        isEvaCorrectOrder(result) &&
        attempts < 10
    );


    return result;

}


/* ========================================
   CHECK INITIAL ORDER
======================================== */

function isEvaCorrectOrder(rows) {

    const expected = [
        "NAMIKAMI|UNIT-08",
        "NAGISA|UNIT-06",
        "LANGLEY|UNIT-02",
        "IKARI|UNIT-01",
        "SUZUHARA|UNIT-03",
        "AYANAMI|UNIT-00"
    ];


    return rows.every(
        function (row, index) {

            return (
                `${row.name}|${row.unit}` ===
                expected[index]
            );

        }
    );

}


/* ========================================
   CHECK EVA ANSWER
======================================== */

function checkEvaAnswer(
    list,
    answer
) {

    const rows =
        Array.from(
            list.children
        );


    const current =
        rows.map(
            function (row) {

                const name =
                    row.querySelector(
                        ".eva-name"
                    ).textContent;

                const unit =
                    row.querySelector(
                        ".eva-unit"
                    ).textContent;


                return `${name}|${unit}`;

            }
        );


    const correct =
        current.length === answer.length &&
        current.every(
            function (value, index) {

                return (
                    value === answer[index]
                );

            }
        );


    if (!correct) {

        return;

    }


    animateSyncRate();

}
/* ========================================
   SYNCHRONIZATION ANIMATION
======================================== */

function animateSyncRate() {

    if (answerLocked) {

        return;

    }


    answerLocked = true;


    const sync =
        document.querySelector(
            ".sync-rate"
        );


    if (!sync) {

        correctAnswer();

        return;

    }


    const rates = [
        1,
        27,
        64,
        100
    ];


    let index = 0;


    function nextRate() {

        if (index >= rates.length) {

            sync.textContent =
                "SYNCHRONIZATION COMPLETE.";


            setTimeout(
                function () {

                    feedback.textContent =
                        "RECORD RESTORED.";


                    setTimeout(
                        function () {

                            currentQuestion++;

                            showQuestion();

                        },
                        1600
                    );

                },
                1000
            );


            return;

        }


        sync.textContent =
            `SYNC RATE: ${String(
                rates[index]
            ).padStart(2, "0")}%`;


        index++;


        setTimeout(
            nextRate,
            800
        );

    }


    nextRate();

}
/* ========================================
   RECORD 011
   CONNECTION
======================================== */

function createConnectionQuestion() {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "connection-record";


    const field =
        document.createElement("div");

    field.className =
        "connection-field";


    const player =
        document.createElement("div");

    player.className =
        "connection-player";

    player.textContent =
        "A→";


    const target =
        document.createElement("div");

    target.className =
        "connection-target";

    target.textContent =
        "B";


    /*
     * Starting position.
     */

    let x = 25;

    let y = 70;


    /*
     * Target position.
     */

    const targetX = 72;

    const targetY = 38;


    function updatePosition() {

        player.style.left =
            `${x}%`;

        player.style.top =
            `${y}%`;

    }


    updatePosition();


    field.appendChild(player);

    field.appendChild(target);

    wrapper.appendChild(field);

    answerArea.appendChild(wrapper);


    /*
     * Keyboard control.
     */

    function handleMovement(event) {

        if (answerLocked) {

            return;

        }


        const step = 2;


        if (
            event.key === "ArrowUp"
        ) {

            y -= step;

            event.preventDefault();

        }


        else if (
            event.key === "ArrowDown"
        ) {

            y += step;

            event.preventDefault();

        }


        else if (
            event.key === "ArrowLeft"
        ) {

            x -= step;

            event.preventDefault();

        }


        else if (
            event.key === "ArrowRight"
        ) {

            x += step;

            event.preventDefault();

        }


        /*
         * Keep player inside field.
         */

        x =
            Math.max(
                3,
                Math.min(
                    97,
                    x
                )
            );


        y =
            Math.max(
                5,
                Math.min(
                    95,
                    y
                )
            );


        updatePosition();


        /*
         * Check physical contact.
         */

        const distance =
            Math.sqrt(
                Math.pow(
                    x - targetX,
                    2
                ) +
                Math.pow(
                    y - targetY,
                    2
                )
            );


        if (distance < 7) {

            connectionEstablished();

        }

    }


    document.addEventListener(
        "keydown",
        handleMovement
    );
window.currentCleanup = function () {

    document.removeEventListener(
        "keydown",
        handleMovement
    );

};

    /*
     * Store listener so it can be
     * removed when leaving the record.
     */

    document.body.focus();

}
/* ========================================
   RECORD 012
   JUMBO FLAN
======================================== */

function createJumboFlanQuestion() {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "jumbo-flan-record";


    /*
     * Enemy
     */

    const enemy =
        document.createElement("div");

    enemy.className =
        "jumbo-flan-enemy";

    enemy.textContent =
        "JUMBO FLAN";


    /*
     * Battle message
     */

    const message =
        document.createElement("div");

    message.className =
        "jumbo-flan-message";

    message.textContent =
        "";


    /*
     * Main menu
     */

    const menu =
        document.createElement("div");

    menu.className =
        "battle-menu";


    const options = [
        "ATTACK",
        "MAGIC",
        "DEFEND"
    ];


    options.forEach(
        function (option) {

            const button =
                document.createElement("button");

            button.className =
                "battle-option";

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
                        option === "ATTACK"
                    ) {

                        message.textContent =
                            "JUMBO FLAN DEFENDS HIMSELF.";

                    }


                    else if (
                        option === "DEFEND"
                    ) {

                        message.textContent =
                            "DEFENDING.";

                    }


                    else if (
                        option === "MAGIC"
                    ) {

                        showMagicMenu();

                    }

                }
            );


            menu.appendChild(button);

        }
    );


    /*
     * Magic menu
     */

    const magicMenu =
        document.createElement("div");

    magicMenu.className =
        "battle-magic";

    magicMenu.style.display =
        "none";


    const magicOptions = [
        "FIRE",
        "BLIZZARD",
        "THUNDER",
        "CURE",
        "REFLECT",
        "MIRROR"
    ];


    magicOptions.forEach(
        function (magic) {

            const button =
                document.createElement("button");

            button.className =
                "battle-option";

            button.type =
                "button";

            button.textContent =
                magic;


            button.addEventListener(
                "click",
                function () {

                    if (answerLocked) {

                        return;

                    }


                    /*
                     * Reflect / Mirror
                     */

                    if (
                        magic === "REFLECT" ||
                        magic === "MIRROR"
                    ) {

                        message.textContent =
                            "SELECT TARGET.";

                        showTargets(
                            magicMenu,
                            magic
                        );

                        return;

                    }


                    /*
                     * Offensive magic
                     */

                    if (
                        magic === "FIRE" ||
                        magic === "BLIZZARD" ||
                        magic === "THUNDER"
                    ) {

                        message.textContent =
                            "MAGIC REFLECTED.\n\nMIRROR.";

                        return;

                    }


                    /*
                     * Defensive magic
                     */

                    if (
                        magic === "CURE"
                    ) {

                        message.textContent =
                            "NO EFFECT.";

                    }

                }
            );


            magicMenu.appendChild(
                button
            );

        }
    );


    /*
     * Add everything
     */

    wrapper.appendChild(enemy);

    wrapper.appendChild(message);

    wrapper.appendChild(menu);

    wrapper.appendChild(magicMenu);

    answerArea.appendChild(wrapper);


    /*
     * MAGIC MENU
     */

    function showMagicMenu() {

        menu.style.display =
            "none";

        magicMenu.style.display =
            "flex";

        message.textContent =
            "MAGIC";

    }


    /*
     * TARGET SELECTION
     */

    function showTargets(
        currentMagicMenu,
        magic
    ) {

        currentMagicMenu.innerHTML =
            "";


        const self =
            document.createElement("button");

        self.className =
            "battle-option";

        self.textContent =
            "SELF";


        const enemyTarget =
            document.createElement("button");

        enemyTarget.className =
            "battle-option";

        enemyTarget.textContent =
            "JUMBO FLAN";


        /*
         * Correct target:
         * SELF
         */

        self.addEventListener(
            "click",
            function () {

                message.textContent =
                    "REFLECT ACTIVE.";

                showSelfMagic();

            }
        );


        /*
         * Wrong target:
         * JUMBO FLAN
         */

        enemyTarget.addEventListener(
            "click",
            function () {

                message.textContent =
                    "MAGIC REFLECTED.\n\nMIRROR.";

            }
        );


        currentMagicMenu.appendChild(
            self
        );

        currentMagicMenu.appendChild(
            enemyTarget
        );

    }


    /*
     * Magic to cast on SELF
     */

    function showSelfMagic() {

        magicMenu.innerHTML =
            "";


        const selfDamageMagic = [
            "FIRE",
            "BLIZZARD",
            "THUNDER"
        ];


        selfDamageMagic.forEach(
            function (magic) {

                const button =
                    document.createElement("button");

                button.className =
                    "battle-option";

                button.textContent =
                    magic;


                button.addEventListener(
                    "click",
                    function () {

                        if (answerLocked) {

                            return;

                        }


                        answerLocked = true;


                        magicMenu.style.display =
                            "none";


                        message.textContent =
`REFLECT ACTIVE.

MAGIC CAST.

DAMAGE:

9999

JUMBO FLAN DEFEATED.`;


                        setTimeout(
                            function () {

                                feedback.textContent =
                                    "RECORD RESTORED.";

                            },
                            800
                        );


                        setTimeout(
                            function () {

                                currentQuestion++;

                                showQuestion();

                            },
                            2400
                        );

                    }
                );


                magicMenu.appendChild(
                    button
                );

            }
        );

    }

}
/* ========================================
   RECORD 013
   XEHANORT
======================================== */

function createXehanortQuestion(question) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "xehanort-record";


    const lettersContainer =
        document.createElement("div");

    lettersContainer.className =
        "rearrange-letters";


    question.letters.forEach(
        function (letter) {

            const button =
                document.createElement("button");

            button.className =
                "rearrange-letter";

            button.type =
                "button";

            button.textContent =
                letter;

            button.draggable =
                true;


            button.addEventListener(
                "click",
                function () {

                    handleLetterClick(
                        button,
                        lettersContainer
                    );

                }
            );


            button.addEventListener(
                "dragstart",
                function () {

                    button.classList.add(
                        "dragging"
                    );

                }
            );


            button.addEventListener(
                "dragend",
                function () {

                    button.classList.remove(
                        "dragging"
                    );

                    checkRearrangeAnswer(
                        lettersContainer,
                        question.answer
                    );

                }
            );


            button.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();

                    const dragging =
                        lettersContainer.querySelector(
                            ".dragging"
                        );

                    if (
                        !dragging ||
                        dragging === button
                    ) {

                        return;

                    }


                    const rect =
                        button.getBoundingClientRect();

                    const middle =
                        rect.left +
                        rect.width / 2;


                    if (
                        event.clientX < middle
                    ) {

                        lettersContainer.insertBefore(
                            dragging,
                            button
                        );

                    }
                    else {

                        lettersContainer.insertBefore(
                            dragging,
                            button.nextSibling
                        );

                    }

                }
            );


            lettersContainer.appendChild(
                button
            );

        }
    );


    wrapper.appendChild(
        lettersContainer
    );

    answerArea.appendChild(
        wrapper
    );

}