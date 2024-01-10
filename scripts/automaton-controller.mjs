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
    setNumStates(DEFAULT_NUM_STATES);
    initUI();
    _initEventHandlers();
    _resize(_cellSize);
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
let _cellSize = DEFAULT_CELL_SIZE;

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Resize the canvases, grid, and cell state arrays.
function _resize(cellSize) {
    const [rows, cols] = initCanvases(cellSize);
    initCells(rows, cols);
    draw(grid);
}

// Event handler for changing cell size.
function _onSetSize(cellSize) {
    if (cellSize === _cellSize) {
        return;
    }
    _cellSize = cellSize;
    _resize(cellSize);
}

// Event handler for changing colors.
function _onChangeColors() {
    newColors();
    if (_isPaused) {
        draw(grid);
    }
}

// Event handler for changing the number of possible cell states to `n`.
function _onChangeNumStates(n) {
    if (n === numStates) {
        return;
    }
    setNumStates(n);
    newRule();
    randomizeCellStates();
    clear2DArray(grid);
    if (_isPaused) {
        draw(grid);
    }
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
    else if (event.key === "c") _onChangeColors();
    else if (event.key === "Enter") newRule();
}

// Initialize event handlers.
function _initEventHandlers() {
    window.addEventListener("resize", _getOnResize());
    window.addEventListener("keyup", _onKeypress);
    viewElements.pauseButton.addEventListener("click", _onTogglePause);
    viewElements.resetButton.addEventListener("click", randomizeCellStates);
    viewElements.colorButton.addEventListener("click", _onChangeColors);
    viewElements.ruleButton.addEventListener("click", newRule);
    for (const button of viewElements.cellSizeButtons.children) {
        const n = parseInt(button.value);
        button.addEventListener("click", () => _onSetSize(n));
    }
    for (const button of viewElements.numStatesButtons.children) {
        const n = parseInt(button.value);
        button.addEventListener("click", () => _onChangeNumStates(n));
    }
}

// ----------------------------------------------------------------------------

export { init, update };

