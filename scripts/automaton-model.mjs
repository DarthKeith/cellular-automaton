import {
    buildZeroArray,
    buildZeroArray2D,
    randInt,
    buildRandCubeArray
} from "array-util";

// ----------------------------------------------------------------------------
//                             Public Variables
// ----------------------------------------------------------------------------

let grid;      // 2D grid of cell states.
let numStates; // Number of possible cell states.

// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Set the number of possible cell states.
function setNumStates(n) {
    numStates = n;
}

// Set the automaton's cells to random states.
function randomizeCellStates() {
    for (let i = 0; i < _cellStates.length; i++)
        _cellStates[i] = randInt(numStates);
}

// Initialize the data structures that hold cell states.
function initCells(rows, cols) {
    grid = buildZeroArray2D(rows, cols);
    _cellStates = buildZeroArray(cols); 
    _tempCellStates = buildZeroArray(cols);
    randomizeCellStates();
}

// Randomly generate a new rule.
function newRule() {
    _rule = buildRandCubeArray(numStates);
}

// Iterate the cellular automaton.
function iterate() {
    const lastCell = _cellStates.length - 1;
    for (let i = 0; i <= lastCell; i++) {
        const left = i === 0 ? lastCell : i - 1;
        const right = i === lastCell ? 0 : i + 1;
        _tempCellStates[i] = _rule[_cellStates[left]]
                                  [_cellStates[i]]
                                  [_cellStates[right]];
    }
    [_cellStates, _tempCellStates] = [_tempCellStates, _cellStates];
}

// Shift the grid up by one row and insert the current array of cell states.
function updateGrid() {
    for (let row = 1; row < grid.length; row++) {
        grid[row - 1] = grid[row];
    }
    grid[grid.length - 1] = _cellStates.slice();
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

let _cellStates;     // 1D array of the automaton's cell states.
let _tempCellStates; // Temporary 1D cell state array used during iteration.
let _rule;           // 3D array representing the automaton's iteration rule.

// ----------------------------------------------------------------------------

export {
    grid,
    numStates,
    setNumStates,
    randomizeCellStates,
    initCells,
    newRule,
    iterate,
    updateGrid
};

