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

THE SIGNAL WAS RECEIVED.

THE MESSAGE WAS NOT.

ONE WORD REMAINS:

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
       RECORD 012
    ======================================== */

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
        shuffleArray(
            question.letters
        );


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
        document.createElement("div");


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

            currentQuestion++;

            selectedLetter = null;

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


    const circle =
        document.createElement("div");

    circle.className =
        "god-circle";


    const selectedCorrect = [];


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


            button.addEventListener(
                "click",
                function () {

                    if (answerLocked) {

                        return;

                    }


                    /*
                     * Correct Egyptian god.
                     */

                    if (
                        question.answer.includes(god)
                    ) {

                        if (
                            !selectedCorrect.includes(god)
                        ) {

                            selectedCorrect.push(god);

                        }


                        button.classList.add(
                            "removed"
                        );


                        setTimeout(
                            function () {

                                button.remove();


                                /*
                                 * All three Egyptian
                                 * gods removed.
                                 */

                                if (
                                    selectedCorrect.length ===
                                    question.answer.length
                                ) {

                                    correctAnswer();

                                }

                            },
                            350
                        );

                    }


                    /*
                     * Wrong mythology.
                     */

                    else {

                        incorrectAnswer();

                        button.classList.add(
                            "wrong"
                        );


                        setTimeout(
                            function () {

                                button.classList.remove(
                                    "wrong"
                                );

                            },
                            500
                        );

                    }

                }
            );


            circle.appendChild(button);

        }
    );


    wrapper.appendChild(circle);

    answerArea.appendChild(wrapper);

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
     * Shuffle complete rows.
     */

    const shuffled =
        shuffleEvaRows(question.values);


    shuffled.forEach(
        function (item) {

            const row =
                document.createElement("div");

            row.className =
                "eva-row";


            row.draggable =
                true;


            const name =
                document.createElement("span");

            name.className =
                "eva-name";

            name.textContent =
                item.name;


            const unit =
                document.createElement("span");

            unit.className =
                "eva-unit";

            unit.textContent =
                item.unit;


            row.appendChild(name);

            row.appendChild(unit);


            /*
             * Drag start.
             */

            row.addEventListener(
                "dragstart",
                function () {

                    row.classList.add(
                        "eva-dragging"
                    );

                }
            );


            /*
             * Drag end.
             */

            row.addEventListener(
                "dragend",
                function () {

                    row.classList.remove(
                        "eva-dragging"
                    );

                    checkEvaAnswer(
                        list,
                        question.answer
                    );

                }
            );


            /*
             * Allow dropping.
             */

            row.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();


                    const dragging =
                        list.querySelector(
                            ".eva-dragging"
                        );


                    if (
                        !dragging ||
                        dragging === row
                    ) {

                        return;

                    }


                    const rect =
                        row.getBoundingClientRect();


                    const middle =
                        rect.top +
                        rect.height / 2;


                    if (
                        event.clientY < middle
                    ) {

                        list.insertBefore(
                            dragging,
                            row
                        );

                    }
                    else {

                        list.insertBefore(
                            dragging,
                            row.nextSibling
                        );

                    }

                }
            );


            list.appendChild(row);

        }
    );


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