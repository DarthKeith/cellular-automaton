// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Return array of zeros.
function initZeroArray(len) { return Array(len).fill(0); }

// Return 2D array of zeros.
function initZeroArray2D(rows, cols) {
    return initZeroArray(rows).map(() => initZeroArray(cols));
}

// Return random integer in range [0, n-1].
function randInt(n) { return Math.floor(Math.random() * n); }

// Return 3D cube array of size n with random integers in range [0, n-1].
function initRandCubeArray(n) {
    return initZeroArray(n).map(() => _initRandArray2D(n, n, n));
}

// Return array of random colors.
function initRandColorArray(len) {
    return initZeroArray(len).map(_randColor);
}

// Set all elements of a 2D array to 0.
function clear2DArray(array) {
    const [rows, cols] = [array.length, array[0].length];
    for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++)
            array[row][col] = 0;
}

// ----------------------------------------------------------------------------
//                             Private Functions
// ----------------------------------------------------------------------------

// Return array of random integers in range [0, n-1].
function _initRandArray(len, n) {
    return initZeroArray(len).map(() => randInt(n));
}

// Return 2D array of random integers in range [0, n-1].
function _initRandArray2D(rows, cols, n) {
    return initZeroArray(rows).map(() => _initRandArray(cols, n));
}

// Return random 3-tuple of RGB color values.
function _randColor() {
    return [randInt(256), randInt(256), randInt(256)];
}

// ----------------------------------------------------------------------------

export {
    initZeroArray,
    initZeroArray2D,
    randInt,
    initRandCubeArray,
    initRandColorArray,
    clear2DArray
};

