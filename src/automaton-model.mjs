import {
    buildZeroArray,
    buildZeroArray2D,
    randInt,
    buildRandCubeArray
} from "./array-util.mjs";

// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Set the number of possible cell states, return whether the value changed.
function changeNumStates(n) {
    if (n === _numStates) {
        return false;
    }
    _numStates = n;
    return true;
}

// Set the automaton's cells to random states.
function randomizeCellStates() {
    for (let i = 0; i < _cellStates.length; i++)
        _cellStates[i] = randInt(_numStates);
}

// Initialize arrays to store `n` cell states.
function initCells(n) {
    _cellStates = buildZeroArray(n); 
    _tempCellStates = buildZeroArray(n);
    randomizeCellStates();
}

// Randomly generate a new rule.
function newRule() {
    _rule = buildRandCubeArray(_numStates);
}

// Return a copy of the cell state array before iterating.
function getNextCellStates() {
    const cellStates = _cellStates.slice()
    _iterate();
    return cellStates;
}

// ----------------------------------------------------------------------------
//                             Private Variables
// ----------------------------------------------------------------------------

let _numStates;      // Number of possible cell states.
let _rule;           // 3D array representing the automaton's iteration rule.
let _cellStates;     // 1D array of the automaton's cell states.
let _tempCellStates; // Temporary 1D cell state array used during iteration.

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Iterate the cellular automaton.
function _iterate() {
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

// ----------------------------------------------------------------------------

export {
    changeNumStates,
    randomizeCellStates,
    initCells,
    newRule,
    getNextCellStates
};

