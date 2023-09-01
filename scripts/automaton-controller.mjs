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

// Event handler for changing the number of possible cell states.
function _onChangeNumStates() {
    _refreshNumStates();
    _changeColors();
    newRule();
    randomizeCellStates();
    clear2DArray(grid);
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
        timeout = setTimeout(_resize, RESIZE_DELAY);
    }
    return onResize;
}

// Keypress event handler.
function _onKeypress(event) {
    if (event.key === " ") _onTogglePause();
    else if (event.key === "Enter") newRule();
}

// Initialize event handlers.
function _initEventHandlers() {
    window.addEventListener("resize", _getOnResize());
    window.addEventListener("keyup", _onKeypress);
    viewElements.pauseButton.addEventListener("click", _onTogglePause);
    viewElements.resetButton.addEventListener("click", randomizeCellStates);
    viewElements.colorButton.addEventListener("click", _changeColors);
    viewElements.ruleButton.addEventListener("click", newRule);
    viewElements.pixPerCellInput.addEventListener("change", _resize);
    viewElements.numStatesInput.addEventListener("change", _onChangeNumStates);
}

// ----------------------------------------------------------------------------

export { init, update };

