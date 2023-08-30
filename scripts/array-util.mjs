// ----------------------------------------------------------------------------
//                             Public Functions
// ----------------------------------------------------------------------------

// Return array of zeros.
function buildZeroArray(len) { return Array(len).fill(0); }

// Return 2D array of zeros.
function buildZeroArray2D(rows, cols) {
    return buildZeroArray(rows).map(() => buildZeroArray(cols));
}

// Return random integer in range [0, n-1].
function randInt(n) { return Math.floor(Math.random() * n); }

// Return 3D cube array of size n with random integers in range [0, n-1].
function buildRandCubeArray(n) {
    return buildZeroArray(n).map(() => _buildRandArray2D(n, n, n));
}

// Return array of random colors.
function buildRandColorArray(len) {
    return buildZeroArray(len).map(_randColor);
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
function _buildRandArray(len, n) {
    return buildZeroArray(len).map(() => randInt(n));
}

// Return 2D array of random integers in range [0, n-1].
function _buildRandArray2D(rows, cols, n) {
    return buildZeroArray(rows).map(() => _buildRandArray(cols, n));
}

// Return random 3-tuple of RGB color values.
function _randColor() {
    return [randInt(256), randInt(256), randInt(256)];
}

// ----------------------------------------------------------------------------

export {
    buildZeroArray,
    buildZeroArray2D,
    randInt,
    buildRandCubeArray,
    buildRandColorArray,
    clear2DArray
};

