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
    verticalResize,
    initUI,
    drawNextFrame,
    newColors,
    changeCellSize
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
    _resize();
}

// Update the display with the next frame of animation.
function update() {
    if (_isPaused) return;
    drawNextFrame(getNextCellStates);
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

let _isPaused = false;

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Resize the canvases and cell state arrays.
function _resize() {
    const cols = initCanvases();
    initCells(cols);
    drawNextFrame(getNextCellStates);
}

// Event handler for changing cell size.
function _onSetCellSize(cellSize) {
    if (!changeCellSize(cellSize)) return;
    _resize();
}

// Event handler for changing the number of possible cell states to `n`.
function _onChangeNumStates(n) {
    if (!changeNumStates(n)) return;
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
    function doResize() {
        if (!verticalResize()) _resize();
    }
    function onResize() {
        clearTimeout(timeout);
        timeout = setTimeout(doResize, RESIZE_DELAY);
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

