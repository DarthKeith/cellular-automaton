import {
    buildZeroArray,
    buildZeroArray2D,
    randInt,
    buildRandCubeArray
} from "array-util";

// ----------------------------------------------------------------------------
//                             Public Variables
// ----------------------------------------------------------------------------

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
// Return the 2D grid.
function initCells(rows, cols) {
    _cellStates = buildZeroArray(cols); 
    _tempCellStates = buildZeroArray(cols);
    randomizeCellStates();
    return buildZeroArray2D(rows, cols);
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

// Shift grid down by one row and insert current array of cell states.
function updateGrid(grid) {
    for (let row = grid.length - 1; row > 0; row--) {
        grid[row] = grid[row - 1];
    }
    grid[0] = _cellStates.slice();
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

let _cellStates;     // 1D array of the automaton's cell states.
let _tempCellStates; // Temporary 1D cell state array used during iteration.
let _rule;           // 3D array representing the automaton's iteration rule.

// ----------------------------------------------------------------------------

export {
    numStates,
    setNumStates,
    randomizeCellStates,
    initCells,
    newRule,
    iterate,
    updateGrid
};

