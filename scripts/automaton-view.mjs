import { buildRandColorArray } from "array-util";
import { MAX_NUM_STATES } from "constants";

// ----------------------------------------------------------------------------
//                             Public Variables
// ----------------------------------------------------------------------------

const viewElements = {
    pauseButton: document.getElementById("pause-btn"),
    resetButton: document.getElementById("reset-btn"),
    colorButton: document.getElementById("color-btn"),
    ruleButton: document.getElementById("rule-btn"),
    pixPerCellInput: document.getElementById("pix-per-cell"),
    numStatesInput: document.getElementById("num-states")
};

// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Initialize the canvases and return the dimensions of the hidden canvas.
function initCanvases() {
    const pixPerCell = parseInt(viewElements.pixPerCellInput.value);
    const rows = Math.round(window.innerHeight / pixPerCell);
    const cols = Math.round(window.innerWidth / pixPerCell);
    _resizeCanvas(_hiddenCanvas, rows, cols);
    _hiddenData = _hiddenContext.createImageData(cols, rows);
    _pixelArray = _hiddenData.data;
    _initAlpha(_pixelArray);
    _resizeToViewport(_canvas);
    _disableSmoothing();
    return [rows, cols];
}

// Initialize the user interface.
function initUI() {
    newColors();
    _initSliders();
    _initEventHandlers();
}

// Display a representation of the current grid on the canvas.
function draw(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    _updateHiddenCanvas(grid);
    _hiddenContext.putImageData(_hiddenData, 0, 0);
    _context.drawImage(_hiddenCanvas, 0, 0, cols, rows,
                                      0, 0, _canvas.width, _canvas.height);
}

// Set the color array to random colors.
function newColors() {
    _colorArray = buildRandColorArray(MAX_NUM_STATES);
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

const _canvas = document.getElementById("canvas");
const _context = _canvas.getContext("2d");
const _hiddenCanvas = document.createElement("canvas");
const _hiddenContext = _hiddenCanvas.getContext("2d");
const _settings = document.getElementById("settings");
const _pixPerCellValue = document.getElementById("pix-per-cell-val");
const _numStatesValue = document.getElementById("num-states-val");
let _hiddenData; // Hidden canvas pixel data.
let _pixelArray; // Hidden canvas pixel values.
let _colorArray; // Array of colors.

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Display the current value of the pixels per cell slider.
function _showPixPerCell() {
    _pixPerCellValue.value = viewElements.pixPerCellInput.value;
}

// Display the current value of the number of states slider.
function _showNumStates() {
    _numStatesValue.value = viewElements.numStatesInput.value;
}

// Toggle the visibility of the settings panel.
function _toggleSettings() {
    if (_settings.style.display === "none") {
        _settings.style.display = "flex";
        _canvas.style.cursor = "auto";
    } else {
        _settings.style.display = "none";
        _canvas.style.cursor = "none";
    }
}

// Set the dimensions of a canvas.
function _resizeCanvas(canvas, height, width) {
    canvas.height = height;
    canvas.width = width;
}

// Set the dimensions of a canvas to the viewport dimensions.
function _resizeToViewport(canvas) {
    _resizeCanvas(canvas, window.innerHeight, window.innerWidth);
}

// Set alpha to max value for 1D array of RBGA color values.
function _initAlpha(array) {
    for (let i = 3; i < array.length; i += 4)
        array[i] = 255;
}

// Disable image smoothing for the canvas.
function _disableSmoothing() {
    _context.imageSmoothingEnabled       = false;
    _context.webkitImageSmoothingEnabled = false;
    _context.msimageSmoothingEnabled     = false;
}

// Update the hidden canvas to represent the current grid.
function _updateHiddenCanvas(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let i = 0;
    for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++) {
            [_pixelArray[i],
             _pixelArray[i + 1],
             _pixelArray[i + 2]] = _colorArray[grid[row][col]];
            i += 4;
        }
}

// Display initial slider values.
function _initSliders() {
    viewElements.numStatesInput.max = MAX_NUM_STATES;
    _showPixPerCell();
    _showNumStates();
}

// Initialize event handlers for the display.
function _initEventHandlers() {
    _canvas.addEventListener("click", _toggleSettings);
    viewElements.pixPerCellInput.addEventListener("input", _showPixPerCell);
    viewElements.numStatesInput.addEventListener("input", _showNumStates);
}

// ----------------------------------------------------------------------------

export {
    viewElements,
    initCanvases,
    initUI,
    draw,
    newColors
};

