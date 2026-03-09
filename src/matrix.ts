
import * as vector from './vector';

/**
 * A matrix represented as an array of vectors (rows)
 */
export type Matrix = vector.Vector[];

/**
 * Creates a zero matrix with n rows and m columns
 * 
 * @param n - The number of rows
 * @param m - The number of columns
 * @returns A new n×m matrix filled with zeros
 */
export function mZero(n: number, m: number): Matrix {
    return Array(n).fill(0).map(() => vector.vZero(m));
}

/**
 * Creates a 4×4 affine transformation matrix for 3D graphics from a 3×3 rotation matrix and a translation vector
 * 
 * @param rotation - A 3×3 rotation matrix, or null to use identity
 * @param translation - A 3D translation vector (default: [0,0,0])
 * @returns A 4×4 affine transformation matrix
 */
export function affine3d(rotation: Matrix | null, translation: vector.Vector=[0,0,0]): Matrix {
    if (rotation === null) {
        rotation = eye(3);
    }
    let result = mZero(4, 4);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i][j] = rotation[i][j];
        }
        result[i][3] = translation[i];
    }
    result[3][3] = 1;
    return result;
}

/**
 * Gets the shape (dimensions) of a matrix as [rows, columns]
 * 
 * @param M - The matrix to measure
 * @param check - If true, validates that all rows have the same number of columns (default: false)
 * @returns A tuple containing [number of rows, number of columns]
 * @throws Error if check is true and rows have inconsistent lengths
 */
export function Mshape(M: Matrix, check=false): [number, number] {
    let rows = M.length;
    let cols = M[0].length;
    if (check) {
        for (let i = 1; i < rows; i++) {
            if (M[i].length !== cols) {
                throw new Error(`Row ${i} has ${M[i].length} columns, expected ${cols}`);
            }
        }
    }
    return [M.length, M[0].length];
};

/**
 * Transposes a matrix (swaps rows and columns)
 * 
 * @param M - The matrix to transpose
 * @returns A new matrix where M[i][j] becomes M[j][i]
 */
export function MTranspose(M: Matrix): Matrix {
    const [rows, cols] = Mshape(M);
    let result = mZero(cols, rows);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = M[i][j];
        }
    }
    return result;
};

/**
 * Creates an n×n identity matrix
 * 
 * @param n - The size of the identity matrix
 * @returns An n×n identity matrix (1s on diagonal, 0s elsewhere)
 */
export function eye(n: number, scalar=1): Matrix {
    let result = mZero(n, n);
    for (let i = 0; i < n; i++) {
        result[i][i] = scalar;
    }
    return result;
}

/**
 * Computes the matrix-vector product M·v
 * 
 * @param M - The matrix
 * @param v - The vector
 * @returns A new vector resulting from the matrix-vector multiplication
 */
export function MvProduct(M: Matrix, v: vector.Vector): vector.Vector {
    let result = vector.vZero(M.length);
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M[i].length; j++) {
            result[i] += M[i][j] * v[j];
        }
    }
    return result;
}

/**
 * Computes the matrix-matrix product A·B
 * 
 * @param A - The first matrix
 * @param B - The second matrix
 * @returns A new matrix resulting from the matrix multiplication
 * @throws Error if the number of columns in A doesn't match the number of rows in B
 */
export function MMProduct(A: Matrix, B: Matrix): Matrix {
    const [Arows, Acols] = Mshape(A);
    const [Brows, Bcols] = Mshape(B);
    if (Acols !== Brows) {
        throw new Error(`Matrix A has ${Acols} columns, Matrix B has ${Brows} rows. Cannot multiply.`);
    }
    let result = mZero(Arows, Bcols);
    for (let i = 0; i < Arows; i++) {
        for (let j = 0; j < Bcols; j++) {
            for (let k = 0; k < Acols; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}

/**
 * Creates a deep copy of a matrix
 * 
 * @param M - The matrix to copy
 * @returns A new matrix with the same values as M
 */
export function MCopy(M: Matrix): Matrix {
    return M.map(row => row.slice());
}

/**
 * Rounds matrix entries near integer values to integers (mainly for testing)
 * 
 * @param M - The matrix to process
 * @param epsilon - The tolerance for rounding (default: 0.001)
 * @returns A new matrix with near-integer values rounded to integers
 */
export function MTolerate(M: Matrix, epsilon = 0.001): Matrix {
    return M.map(row => row.map(x => Math.abs(x - Math.round(x)) < epsilon ? Math.round(x) : x));
}

/**
 * Applies a 4×4 affine transformation matrix to a 3D vector
 * 
 * @param M - The 4×4 affine transformation matrix
 * @param v - The 3D vector to transform
 * @returns A new 3D vector after applying the transformation
 */
export function applyAffine3d(M: Matrix, v: vector.Vector): vector.Vector {
    return MvProduct(M, v.concat(1)).slice(0, 3);
};

/**
 * Flattens a matrix into a one-dimensional vector (row-major order)
 * 
 * @param M - The matrix to flatten
 * @returns A vector containing all matrix elements concatenated row by row
 */
export function MAsList(M: Matrix): vector.Vector {
    return M.reduce((acc, row) => acc.concat(row), []);
};

/**
 * Reshapes a one-dimensional vector into a matrix
 * 
 * @param M - The vector to reshape
 * @param rows - The number of rows in the resulting matrix
 * @param cols - The number of columns in the resulting matrix
 * @returns A new rows×cols matrix
 * @throws Error if the vector length doesn't match rows × cols
 */
export function listAsM(M: vector.Vector, rows: number, cols: number): Matrix {
    if (M.length !== rows * cols) {
        throw new Error(`List length ${M.length} does not match ${rows}x${cols} matrix`);
    }
    let result = mZero(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[i][j] = M[i*cols + j];
        }
    }
    return result;
}

/**
 * Swaps two rows in a matrix
 * 
 * @param M - The matrix to modify
 * @param i - The index of the first row
 * @param j - The index of the second row
 * @param inplace - If true, modifies M directly; if false, creates a copy (default: false)
 * @returns The matrix with rows i and j swapped
 */
export function MswapRows(M: Matrix, i: number, j: number, inplace: boolean=false): Matrix {
    let result = M;
    if (!inplace) {
        result = MCopy(M);
    }
    let temp = result[i];
    result[i] = result[j];
    result[j] = temp;
    return result;
};

/**
 * Adjoins (horizontally concatenates) two matrices side by side
 * 
 * @param M1 - The first matrix
 * @param M2 - The second matrix
 * @returns A new matrix [M1 | M2] with M1's columns followed by M2's columns
 * @throws Error if M1 and M2 have different numbers of rows
 */
export function MAdjoin(M1: Matrix, M2: Matrix): Matrix {
    const [rows1, cols1] = Mshape(M1);
    const [rows2, cols2] = Mshape(M2);
    if (rows1 !== rows2) {
        throw new Error(`Matrix M1 has ${rows1} rows, Matrix M2 has ${rows2} rows. Cannot adjoin.`);
    }
    let result = mZero(rows1, cols1 + cols2);
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols1; j++) {
            result[i][j] = M1[i][j];
        }
        for (let j = 0; j < cols2; j++) {
            result[i][cols1 + j] = M2[i][j];
        }
    }   
    return result;
};

/**
 * Extracts a submatrix from a matrix (similar to NumPy slicing)
 * 
 * @param M - The source matrix
 * @param minrow - The starting row index (inclusive)
 * @param maxrow - The ending row index (exclusive)
 * @param mincol - The starting column index (inclusive)
 * @param maxcol - The ending column index (exclusive)
 * @returns A new matrix containing M[minrow:maxrow, mincol:maxcol]
 */
export function Mslice(M: Matrix, minrow: number, maxrow: number, mincol: number, maxcol: number): Matrix {
    let result = mZero(maxrow - minrow, maxcol - mincol);
    for (let i = minrow; i < maxrow; i++) {
        for (let j = mincol; j < maxcol; j++) {
            result[i - minrow][j - mincol] = M[i][j];
        }
    }
    return result;
};

/**
 * Performs row echelon reduction (Gaussian elimination) on a matrix
 * 
 * @param M - The matrix to reduce
 * @returns A new matrix in row echelon form
 */
export function MRowEchelon(M: Matrix): Matrix {
    let result = MCopy(M);
    let [rows, cols] = Mshape(result);
    let lead = 0;
    for (let r = 0; r < rows; r++) {
        if (cols <= lead) {
            return result;
        }
        let i = r;
        while (result[i][lead] === 0) {
            i++;
            if (rows === i) {
                i = r;
                lead++;
                if (cols === lead) {
                    return result;
                }
            }
        }
        result = MswapRows(result, i, r);
        let val = result[r][lead];
        result[r] = result[r].map(x => x / val);
        for (let i = 0; i < rows; i++) {
            if (i !== r) {
                val = result[i][lead];
                result[i] = vector.vSub(result[i], vector.vScale(val, result[r]));
            }
        }
        lead++;
    }
    return result;
};

/**
 * Computes the inverse of a square matrix using row echelon reduction
 * 
 * @param M - The matrix to invert
 * @returns The inverse matrix M⁻¹
 * @throws Error if the matrix is not square
 */
export function MInverse(M: Matrix): Matrix {
    let [rows, cols] = Mshape(M);
    if (rows !== cols) {
        throw new Error(`Matrix is not square, cannot invert.`);
    }
    let result = MAdjoin(M, eye(rows));
    result = MRowEchelon(result);
    return Mslice(result, 0, rows, rows, 2*rows);
};

/**
 * Creates a 3D rotation matrix for yaw (rotation around the z-axis)
 * 
 * @param angle - The yaw angle in radians
 * @returns A 3×3 rotation matrix for yaw
 */
export function yaw(angle: number): Matrix {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return [
        [c, -s, 0],
        [s, c, 0],
        [0, 0, 1],
    ];
};

/**
 * Creates a 3D rotation matrix for roll (rotation around the x-axis)
 * 
 * @param angle - The roll angle in radians
 * @returns A 3×3 rotation matrix for roll
 */
export function roll(angle: number): Matrix {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return [
        [1, 0, 0],
        [0, c, s],
        [0, -s, c],
    ];
};

/**
 * Creates a 3D rotation matrix for pitch (rotation around the y-axis)
 * 
 * @param angle - The pitch angle in radians
 * @returns A 3×3 rotation matrix for pitch
 */
export function pitch(angle: number): Matrix {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return [
        [c, 0, s],
        [0, 1, 0],
        [-s, 0, c],
    ];
};

/**
 * @deprecated Use {@link yaw} instead. Mroll will be removed in a future version.
 */
export const Mroll = yaw;

/**
 * @deprecated Use {@link roll} instead. Myaw will be removed in a future version.
 */
export const Myaw = roll;

/**
 * @deprecated Use {@link pitch} instead. Mpitch will be removed in a future version.
 */
export const Mpitch = pitch;
