import {
    changeNumStates,
    randomizeCellStates,
    initCells,
    newRule,
    getNextCellStates
} from "automaton-model";
import {
    viewElements,
    initCanvases,
    initUI,
    drawNextFrame,
    newColors
} from "automaton-view";
import {
    RESIZE_DELAY,
    DEFAULT_NUM_STATES,
    DEFAULT_CELL_SIZE
} from "constants";

// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Initialize the program.
function init() {
    changeNumStates(DEFAULT_NUM_STATES);
    newRule();
    newColors();
    initUI();
    _initEventHandlers();
    _resize(_cellSize);
}

// Update the display with the next frame of animation.
function update() {
    if (_isPaused) return;
    drawNextFrame(_cellSize, getNextCellStates);
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

let _isPaused = false;
let _cellSize = DEFAULT_CELL_SIZE;

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Resize the canvases and cell state arrays.
function _resize(cellSize) {
    const cols = initCanvases(cellSize);
    initCells(cols);
    drawNextFrame(cellSize, getNextCellStates);
}

// Event handler for changing cell size.
function _onSetCellSize(cellSize) {
    if (cellSize === _cellSize) {
        return;
    }
    _cellSize = cellSize;
    _resize(cellSize);
}

// Event handler for changing the number of possible cell states to `n`.
function _onChangeNumStates(n) {
    if (!changeNumStates(n)) {
        return;
    }
    newRule();
    randomizeCellStates();
}

// Event handler for pressing play/pause.
function _onTogglePause() {
    _isPaused = !_isPaused;
}

// Return window resize event handler.
function _getOnResize() {
    let timeout = 0;
    function onResize() {
        clearTimeout(timeout);
        timeout = setTimeout(() => _resize(_cellSize), RESIZE_DELAY);
    }
    return onResize;
}

// Keypress event handler.
function _onKeypress(event) {
    if (event.key === " ") _onTogglePause();
    else if (event.key === "Backspace") randomizeCellStates();
    else if (event.key === "c") newColors();
    else if (event.key === "Enter") newRule();
}

// Initialize event handlers.
function _initEventHandlers() {
    window.addEventListener("resize", _getOnResize());
    window.addEventListener("keyup", _onKeypress);
    viewElements.pauseButton.addEventListener("click", _onTogglePause);
    viewElements.resetButton.addEventListener("click", randomizeCellStates);
    viewElements.colorButton.addEventListener("click", newColors);
    viewElements.ruleButton.addEventListener("click", newRule);
    for (const button of viewElements.cellSizeButtons.children) {
        const n = parseInt(button.value);
        button.addEventListener("click", () => _onSetCellSize(n));
    }
    for (const button of viewElements.numStatesButtons.children) {
        const n = parseInt(button.value);
        button.addEventListener("click", () => _onChangeNumStates(n));
    }
}

// ----------------------------------------------------------------------------

export { init, update };

