import {
    grid,
    numStates,
    setNumStates,
    randomizeCellStates,
    initCells,
    newRule,
    iterate,
    updateGrid
} from "automaton-model";
import {
    viewElements,
    initCanvases,
    initUI,
    draw,
    newColors
} from "automaton-view";
import { clear2DArray } from "array-util";
import { RESIZE_DELAY } from "constants";

// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Initialize the program.
function init() {
    _refreshNumStates();
    _changeColors();
    _resize();
    _initEventHandlers();
    initUI();
    newRule();
}

// Update the display with the current cell states and iterate the automaton.
function update() {
    if (_isPaused) return;
    updateGrid();
    draw(grid);
    iterate();
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

let _isPaused = false;

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Resize the canvases, grid, and cell state arrays.
function _resize() {
    const [rows, cols] = initCanvases();
    initCells(rows, cols);
    draw(grid);
}

// Set the number of states to the current slider value.
function _refreshNumStates() {
    setNumStates(parseInt(viewElements.numStatesInput.value));
}

// Randomly generate new colors.
function _changeColors() {
    newColors(numStates);
}

// Change the number of possible cell states.
function _changeNumStates() {
    _refreshNumStates();
    _changeColors();
    newRule();
    randomizeCellStates();
    clear2DArray(grid);
}

// Handler for pressing play/pause.
function _togglePause() {
    _isPaused = !_isPaused;
}

// Return window resize handler.
function _getHandleResize() {
    let timeout = 0;
    function handleResize() {
        clearTimeout(timeout);
        timeout = setTimeout(_resize, RESIZE_DELAY);
    }
    return handleResize;
}

// Keypress handler.
function _handleKeypress(event) {
    if (event.key === " ") _togglePause();
    else if (event.key === "Enter") newRule();
}

// Initialize event handlers.
function _initEventHandlers() {
    window.addEventListener("resize", _getHandleResize());
    window.addEventListener("keyup", _handleKeypress);
    viewElements.pauseButton.addEventListener("click", _togglePause);
    viewElements.resetButton.addEventListener("click", randomizeCellStates);
    viewElements.colorButton.addEventListener("click", _changeColors);
    viewElements.ruleButton.addEventListener("click", newRule);
    viewElements.pixPerCellInput.addEventListener("change", _resize);
    viewElements.numStatesInput.addEventListener("change", _changeNumStates);
}

// ----------------------------------------------------------------------------

export { init, update };

