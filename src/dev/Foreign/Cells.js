function makeCellsImpl(len) {
    return Array(len).fill(0);
}

function readCellsImpl(cells) {
    return cells.slice();
}

function generateCellsImpl(gen, cells) {
    const newVal = (_, i) => { cells[i] = gen(); };
    cells.forEach(newVal);
}

function iterateCellsImpl(rule, cells) {
    const lastCell = cells.length - 1;
    const first = cells[0];
    let left;
    let mid = cells[lastCell];
    let right = first;
    for (let i = 0; i <= lastCell; i++) {
        left = mid;
        mid = right;
        right = (i === lastCell) ? first : cells[i + 1];
        cells[i] = rule[left][mid][right];
    }
}

export {
    generateCellsImpl,
    iterateCellsImpl,
    makeCellsImpl,
    readCellsImpl
};

