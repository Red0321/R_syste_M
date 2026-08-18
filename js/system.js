const background =
    document.getElementById("binary-background");

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


generateCode();


window.addEventListener(
    "resize",
    generateCode
);