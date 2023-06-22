const boardContainer = document.querySelector('.board-container');
const dimensionsBtn = document.querySelector('.dimensions-button');
const randomBtn = document.querySelector('.random-button');
const darkeningBtn = document.querySelector('.darkening-button');
var rainbowIsActive = false;
var darkeningIsActive = false;

dimensionsBtn.addEventListener('click', () => {
    var inputedSize = prompt("Please enter dimensions", "32");
    while(inputedSize > 100){inputedSize = prompt("Please enter dimensions (100 max)", "32");}
    return createGrid(inputedSize);
})

darkeningBtn.addEventListener('click', () => {
    if(!darkeningIsActive) {
        darkeningIsActive = !darkeningIsActive;
        rainbowIsActive = false;
    }
    else {
        darkeningIsActive = !darkeningIsActive;
    }
})

randomBtn.addEventListener('click', () => {
    if(!rainbowIsActive) {
        rainbowIsActive = !rainbowIsActive;
        darkeningIsActive = false;
    }
    else {
        rainbowIsActive = !rainbowIsActive;
    }
});


function getColor(currentColor) {
    if(rainbowIsActive) {
        return `rgb(${generateRGBvalue()}, ${generateRGBvalue()}, ${generateRGBvalue()})`;
    }
    else if(darkeningIsActive){
        var rgbArray = currentColor.match(/\d+/g).map(Number);
        return `rgb(${rgbArray[0] * 0.85}, ${rgbArray[1] * 0.85}, ${rgbArray[2] * 0.85})`;
    }
    else {
        return 'rgb(0, 0, 0)';
    }
}

function generateRGBvalue() {
    return Math.floor(Math.random() * 255);
}

function paintPixel() {
    var currentBrightness = 100;
    var currentColor = this.style.backgroundColor;
    this.style.backgroundColor = getColor(currentColor);
}

function createGrid(size) {

    // edita la clase del contenedor para las columnas y filas
    boardContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boardContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // va creando los pixels, les pone la clase y despues los agrega
    // se le agrega el event listner para que en el hover se pinte 
    for (let i = 0; i < (size * size); i++) {
        var createdDiv = document.createElement('div');
        createdDiv.classList = 'pixelDiv';
        createdDiv.style.backgroundColor = 'rgb(255, 255, 255)';
        boardContainer.appendChild(createdDiv);

        createdDiv.addEventListener('mouseover', paintPixel);

    }
}

createGrid(32);