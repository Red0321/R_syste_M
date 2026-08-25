/*
 * ========================================
 * R_syste_M
 * SOON — JUMPSCARE SYSTEM
 * ========================================
 */


(function () {

    "use strict";


    /*
     * ========================================
     * CONFIGURATION
     * ========================================
     */

    const IMPACT_IMAGE =
        "images/soon/impact.png";


    const IMPACT_DURATION =
        1000;


    /*
     * ========================================
     * ELEMENTS
     * ========================================
     */

    const soonFinal =
        document.querySelector(
            ".soon-final"
        );


    /*
     * ========================================
     * STATE
     * ========================================
     */

    let triggered =
        false;


    let audioContext =
        null;


    /*
     * ========================================
     * PRELOAD IMAGE
     * ========================================
     *
     * The image is loaded before the
     * jumpscare occurs.
     */

    const preloadImage =
        new Image();


    preloadImage.src =
        IMPACT_IMAGE;


    /*
     * ========================================
     * AUDIO INITIALIZATION
     * ========================================
     */

    function initializeAudio() {


        if (audioContext) {

            return;

        }


        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            console.warn(
                "R_syste_M — Web Audio API unavailable."
            );

            return;

        }


        audioContext =
            new AudioContext();


    }


    /*
     * ========================================
     * UNLOCK AUDIO
     * ========================================
     *
     * The browser normally allows audio
     * after a user interaction.
     *
     * No visible button is required.
     */

    function unlockAudio() {


        initializeAudio();


        if (
            audioContext &&
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }

    }


    document.addEventListener(
        "pointerdown",
        unlockAudio,
        {
            once: true
        }
    );


    document.addEventListener(
        "keydown",
        unlockAudio,
        {
            once: true
        }
    );


    document.addEventListener(
        "touchstart",
        unlockAudio,
        {
            once: true
        }
    );


    /*
     * ========================================
     * CREATE IMPACT
     * ========================================
     */

    function createImpact() {


        const impact =
            document.createElement(
                "div"
            );


        impact.id =
            "soon-impact";


        /*
         * Full-screen container.
         */

        Object.assign(
            impact.style,
            {

                position: "fixed",

                top: "0",

                left: "0",

                width: "100vw",

                height: "100vh",

                zIndex: "999999",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                overflow: "hidden",

                background: "#000",

                opacity: "1",

                visibility: "visible",

                pointerEvents: "none"

            }
        );


        /*
         * ========================================
         * IMAGE
         * ========================================
         */

        const image =
            document.createElement(
                "img"
            );


        image.src =
            IMPACT_IMAGE;


        image.alt =
            "";


        Object.assign(
            image.style,
            {

                display: "block",

                width: "100%",

                height: "100%",

                objectFit: "cover",

                margin: "0",

                padding: "0"

            }
        );


        impact.appendChild(
            image
        );


        document.body.appendChild(
            impact
        );


        return impact;

    }


    /*
     * ========================================
     * CREATE DISTORTION CURVE
     * ========================================
     */

    function createDistortionCurve() {


        const curve =
            new Float32Array(
                1024
            );


        for (
            let i = 0;
            i < curve.length;
            i++
        ) {


            const x =
                (i * 2) /
                curve.length -
                1;


            curve[i] =
                Math.tanh(
                    x * 6
                );


        }


        return curve;

    }


    /*
     * ========================================
     * PLAY SCREAM
     * ========================================
     */

    function playScream() {


        /*
         * Make sure the audio system exists.
         */

        initializeAudio();


        if (!audioContext) {

            return;

        }


        /*
         * Resume audio if necessary.
         */

        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }


        const now =
            audioContext.currentTime;


        /*
         * ========================================
         * MASTER
         * ========================================
         */

        const master =
            audioContext.createGain();


        master.gain.setValueAtTime(
            0,
            now
        );


        master.gain.linearRampToValueAtTime(
            1.0,
            now + 0.01
        );


        master.gain.exponentialRampToValueAtTime(
            0.001,
            now + 1.35
        );


        /*
         * ========================================
         * DISTORTION
         * ========================================
         */

        const distortion =
            audioContext.createWaveShaper();


        distortion.curve =
            createDistortionCurve();


        distortion.oversample =
            "4x";


        /*
         * ========================================
         * MAIN SCREAM
         * ========================================
         */

        const scream =
            audioContext.createOscillator();


        scream.type =
            "sawtooth";


        /*
         * Rapid high-pitched rise.
         */

        scream.frequency.setValueAtTime(
            480,
            now
        );


        scream.frequency.exponentialRampToValueAtTime(
            2100,
            now + 0.14
        );


        /*
         * Unstable fall.
         */

        scream.frequency.exponentialRampToValueAtTime(
            1200,
            now + 0.55
        );


        scream.frequency.exponentialRampToValueAtTime(
            650,
            now + 1.15
        );


        /*
         * ========================================
         * VIBRATO
         * ========================================
         */

        const vibrato =
            audioContext.createOscillator();


        const vibratoGain =
            audioContext.createGain();


        vibrato.frequency.value =
            32;


        vibratoGain.gain.value =
            110;


        vibrato.connect(
            vibratoGain
        );


        vibratoGain.connect(
            scream.frequency
        );


        /*
         * ========================================
         * HIGH HARMONIC
         * ========================================
         */

        const harmonic =
            audioContext.createOscillator();


        const harmonicGain =
            audioContext.createGain();


        harmonic.type =
            "triangle";


        harmonic.frequency.setValueAtTime(
            960,
            now
        );


        harmonic.frequency.exponentialRampToValueAtTime(
            3200,
            now + 0.15
        );


        harmonic.frequency.exponentialRampToValueAtTime(
            1300,
            now + 1.10
        );


        harmonicGain.gain.setValueAtTime(
            0,
            now
        );


        harmonicGain.gain.linearRampToValueAtTime(
            0.42,
            now + 0.015
        );


        harmonicGain.gain.exponentialRampToValueAtTime(
            0.001,
            now + 1.20
        );


        /*
         * ========================================
         * CONNECTIONS
         * ========================================
         */

        scream.connect(
            distortion
        );


        harmonic.connect(
            harmonicGain
        );


        harmonicGain.connect(
            distortion
        );


        distortion.connect(
            master
        );


        master.connect(
            audioContext.destination
        );


        /*
         * ========================================
         * ECHO
         * ========================================
         */

        const echo =
            audioContext.createDelay(
                1.0
            );


        const echoGain =
            audioContext.createGain();


        echo.delayTime.value =
            0.18;


        echoGain.gain.value =
            0.35;


        master.connect(
            echo
        );


        echo.connect(
            echoGain
        );


        echoGain.connect(
            audioContext.destination
        );


        /*
         * ========================================
         * START
         * ========================================
         */

        scream.start(
            now
        );


        harmonic.start(
            now
        );


        vibrato.start(
            now
        );


        /*
         * ========================================
         * STOP
         * ========================================
         */

        scream.stop(
            now + 1.35
        );


        harmonic.stop(
            now + 1.35
        );


        vibrato.stop(
            now + 1.35
        );

    }


    /*
     * ========================================
     * TRIGGER
     * ========================================
     */

    function triggerImpact() {


        /*
         * Prevent duplicate activation.
         */

        if (triggered) {

            return;

        }


        triggered =
            true;


        /*
         * ========================================
         * VISUAL
         * ========================================
         */

        const impact =
            createImpact();


        /*
         * ========================================
         * SOUND
         * ========================================
         *
         * Both are triggered from the
         * same function.
         */

        playScream();


        /*
         * ========================================
         * REMOVE
         * ========================================
         */

        setTimeout(
            function () {


                if (
                    impact &&
                    impact.parentNode
                ) {

                    impact.parentNode.removeChild(
                        impact
                    );

                }


            },
            IMPACT_DURATION
        );

    }


    /*
     * ========================================
     * WAIT FOR "SOON"
     * ========================================
     *
     * The jumpscare starts when the
     * animation of .soon-final ends.
     */

    if (soonFinal) {


        soonFinal.addEventListener(
            "animationend",
            function (event) {


                /*
                 * Ignore animations belonging
                 * to nested elements.
                 */

                if (
                    event.target !==
                    soonFinal
                ) {

                    return;

                }


                triggerImpact();


            },
            {
                once: true
            }
        );


    }


})();