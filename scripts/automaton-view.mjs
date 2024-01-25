import { buildRandColorArray } from "array-util";
import {
    MAX_NUM_STATES,
    DEFAULT_NUM_STATES,
    DEFAULT_CELL_SIZE
 } from "constants";

// ----------------------------------------------------------------------------
//                             Public Variables
// ----------------------------------------------------------------------------

const viewElements = {
    numStatesButtons: document.getElementById("num-states-btns"),
    ruleButton: document.getElementById("rule-btn"),
    resetButton: document.getElementById("reset-btn"),
    cellSizeButtons: document.getElementById("cell-size-btns"),
    colorButton: document.getElementById("color-btn"),
    pauseButton: document.getElementById("pause-btn")
};

// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Initialize the canvases and return the dimensions of the hidden canvas.
function initCanvases(cellSize) {
    const rows = Math.round(window.innerHeight / cellSize);
    const cols = Math.round(window.innerWidth / cellSize);
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
    _initEventHandlers();
    _selectDefaults();
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
let _hiddenData; // Hidden canvas pixel data.
let _pixelArray; // Hidden canvas pixel values.
let _colorArray; // Array of colors.

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Toggle the visibility of the settings panel.
function _toggleSettings() {
    if (_settings.style.display === "none") {
        _settings.style.display = "grid";
        _canvas.style.cursor = "default";
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

// Make button appear selected/unselected.
const _select = button => button.classList.add("selected");
const _deselect = button => button.classList.remove("selected");

// Initialize event handlers for the display.
function _initEventHandlers() {
    _canvas.addEventListener("click", _toggleSettings);
    const blur = event => event.target.blur();
    const blurOnClick = button => button.addEventListener("click", blur);
    document.querySelectorAll("button").forEach(blurOnClick);
    function selectChildOnClick(div) {
        function setSelected(event) {
            if (event.target.tagName !== "BUTTON") {
                return;
            }
            for (const button of div.children) {
                _deselect(button);
            }
            _select(event.target);
        }
        div.addEventListener("click", setSelected);
    }
    selectChildOnClick(viewElements.numStatesButtons);
    selectChildOnClick(viewElements.cellSizeButtons);
}

// Select default buttons.
function _selectDefaults() {
    function selectButton(div, value) {
        for (const button of div.children) {
            if (parseInt(button.getAttribute("value")) === value) {
                _select(button);
                return;
            }
        }
    }
    selectButton(viewElements.numStatesButtons, DEFAULT_NUM_STATES);
    selectButton(viewElements.cellSizeButtons, DEFAULT_CELL_SIZE);
}

// ----------------------------------------------------------------------------

export {
    viewElements,
    initCanvases,
    initUI,
    draw,
    newColors
};

