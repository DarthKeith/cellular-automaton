import { buildRandColorArray } from "array-util";
import {
    MAX_NUM_STATES,
    DEFAULT_NUM_STATES,
    DEFAULT_CELL_SIZE,
    SCROLL_DIST
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

// Initialize the canvases and return the automaton length in cells.
function initCanvases() {
    _resizeCanvas(_canvas, window.innerWidth, window.innerHeight);
    const cols = Math.floor(_canvas.width / _cellSize);
    const rows = 1 + Math.ceil(_canvas.height / _cellSize);
    _resizeCanvas(_gridCanvas, cols, rows);
    _resizeCanvas(_rowCanvas, cols, 1);
    _rowImgData = _rowContext.createImageData(cols, 1);
    _pixelArray = _rowImgData.data;
    _initAlpha(_pixelArray);
    _disableSmoothing(_context);
    _drawWidth = cols * _cellSize;
    _drawHeight = rows * _cellSize;
    _gutter = Math.floor((_canvas.width - _drawWidth) / 2);
    _offset = -SCROLL_DIST;
    return cols;
}

// Resize the canvases if the window was only resized vertically.
// Return whether a resize was performed.
function verticalResize() {
    if (_canvas.width !== window.innerWidth) {
        return false;
    }
    _resizeCanvas(_canvas, window.innerWidth, window.innerHeight);
    const rows = 1 + Math.ceil(_canvas.height / _cellSize);
    const imgData = _gridContext.getImageData(0, 0, _gridCanvas.width,
                                                    _gridCanvas.height);
    _resizeCanvas(_gridCanvas, _gridCanvas.width, rows);
    _gridContext.putImageData(imgData, 0, 0);
    _disableSmoothing(_context);
    _drawHeight = rows * _cellSize;
    _context.drawImage(_gridCanvas, _gutter, _offset, _drawWidth, _drawHeight);
    return true;
}

// Initialize the user interface.
function initUI() {
    _initEventHandlers();
    _selectDefaults();
}

// Draw the next frame of animation.
function drawNextFrame(getNextCellStates) {
    _offset += SCROLL_DIST;
    if (_offset > 0) {
        const n = Math.ceil(_offset / _cellSize);
        _scrollGrid(n, getNextCellStates);
        _offset -= n * _cellSize;
    }
    _context.drawImage(_gridCanvas, _gutter, _offset, _drawWidth, _drawHeight);
}

// Set the color array to random colors.
function newColors() {
    _colorMap = buildRandColorArray(MAX_NUM_STATES);
}

// Set the cell size in pixels, return whether the value changed.
function changeCellSize(n) {
    if (n === _cellSize) {
        return false;
    }
    _cellSize = n;
    return true;
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

const _settings = document.getElementById("settings");
const _canvas = document.getElementById("canvas");
const _gridCanvas = document.createElement("canvas");
const _rowCanvas = document.createElement("canvas");
const _context = _canvas.getContext("2d", {alpha: false});
const _gridContext = _gridCanvas.getContext("2d", {alpha: false});
const _rowContext = _rowCanvas.getContext("2d", {alpha: false});
let _rowImgData; // Image data for row of pixels to draw onto grid canvas.
let _pixelArray; // Pixel array for row of pixels.
let _colorMap; // Array mapping cell states to colors.
let _cellSize = DEFAULT_CELL_SIZE; // Width of each cell in pixels.
let _drawWidth; // Width to draw image onto canvas.
let _drawHeight; // Height to draw image onto canvas.
let _gutter; // Distance from left to draw image onto canvas.
let _offset; // Downward distance from top to draw image onto canvas.

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
function _resizeCanvas(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

// Set alpha to max value for 1D array of RBGA color values.
function _initAlpha(array) {
    for (let i = 3; i < array.length; i += 4)
        array[i] = 255;
}

// Disable image smoothing for a canvas.
function _disableSmoothing(context) {
    context.imageSmoothingEnabled       = false;
    context.webkitImageSmoothingEnabled = false;
    context.msimageSmoothingEnabled     = false;
}

// Draw the given cell states onto the pixel array using the color map.
function _drawRow(cellStates) {
    let i = 0;
    for (const state of cellStates) {
        [_pixelArray[i],
         _pixelArray[i + 1],
         _pixelArray[i + 2]] = _colorMap[state];
        i += 4;
    }
}

// Translate grid down by `n` rows and insert new rows.
function _scrollGrid(n, getNextCellStates) {
    const gridImgData = _gridContext.getImageData(0, 0, _gridCanvas.width,
                                                        _gridCanvas.height);
    _gridContext.putImageData(gridImgData, 0, n);
    while (n > 0) {
        n -= 1;
        _drawRow(getNextCellStates());
        _gridContext.putImageData(_rowImgData, 0, n);
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
    verticalResize,
    initUI,
    drawNextFrame,
    newColors,
    changeCellSize
};

