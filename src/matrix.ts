
import * as vector from './vector';

export type Matrix = vector.Vector[];

/** Make a zero matrix, n rows, m columns */
export function mZero(n: number, m: number): Matrix {
    return Array(n).fill(0).map(() => vector.vZero(m));
}

/** Make a 3d graphics affine matrix (4x4) from a rotation (3x3) and translation vector */
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

/** Get the [row, columns] shape of matrix M. */
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
}

/** Make an n x n identity matrix */
export function eye(n: number): Matrix {
    let result = mZero(n, n);
    for (let i = 0; i < n; i++) {
        result[i][i] = 1;
    }
    return result;
}

/** Matrix dot vector product. */
export function MvProduct(M: Matrix, v: vector.Vector): vector.Vector {
    let result = vector.vZero(M.length);
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M[i].length; j++) {
            result[i] += M[i][j] * v[j];
        }
    }
    return result;
}

/** Matrix x Matrix product. */
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

/** Matrix copy */
export function MCopy(M: Matrix): Matrix {
    return M.map(row => row.slice());
}

/** round matrix entries near integer values (mainly for testing) */
export function MTolerate(M: Matrix, epsilon = 0.001): Matrix {
    return M.map(row => row.map(x => Math.abs(x - Math.round(x)) < epsilon ? Math.round(x) : x));
}

/** Apply an affine 4x4 transform matrix for 3d space to a 3d vector */
export function applyAffine3d(M: Matrix, v: vector.Vector): vector.Vector {
    return MvProduct(M, v.concat(1)).slice(0, 3);
};

/** Flatten a matrix into a list. */
export function MAsList(M: Matrix): vector.Vector {
    return M.reduce((acc, row) => acc.concat(row), []);
};

/** unflatten a list into a matrix */
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

/** Swap row i with row j from M. */
export function MswapRows(M: Matrix, i: number, j: number, inplace: bool=false): Matrix {
    let result = M;
    if (!inplace) {
        result = MCopy(M);
    }
    let temp = result[i];
    result[i] = result[j];
    result[j] = temp;
    return result;
};

/** Adjoin [M1 | M2] */
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

/** Return equivalent of numpy M[minrow:maxrow, mincol:maxcol] */
export function Mslice(M: Matrix, minrow: number, maxrow: number, mincol: number, maxcol: number): Matrix {
    let result = mZero(maxrow - minrow, maxcol - mincol);
    for (let i = minrow; i < maxrow; i++) {
        for (let j = mincol; j < maxcol; j++) {
            result[i - minrow][j - mincol] = M[i][j];
        }
    }
    return result;
};

/** Row-eschelon reduction. */
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

/** simple matrix inverse using row eschelon reduction. */
export function MInverse(M: Matrix): Matrix {
    let [rows, cols] = Mshape(M);
    if (rows !== cols) {
        throw new Error(`Matrix is not square, cannot invert.`);
    }
    let result = MAdjoin(M, eye(rows));
    result = MRowEchelon(result);
    return Mslice(result, 0, rows, rows, 2*rows);
};

/** aircraft roll matrix */
export function Mroll(roll: number): Matrix {
    var cr = Math.cos(roll);
    var sr = Math.sin(roll);
    var rollM = [
        [cr, -sr, 0],
        [sr, cr, 0],
        [0, 0, 1],
    ];
    return rollM;
};

/** aircraft yaw matrix */
export function Myaw(yaw: number): Matrix {
    var cy = Math.cos(yaw);
    var sy = Math.sin(yaw);
    var yawM = [
        [1, 0, 0],
        [0, cy, sy],
        [0, -sy, cy],
    ];
    return yawM;
};

/** aircraft pitch matrix */
export function Mpitch(yaw: number): Matrix {
    var cy = Math.cos(yaw);
    var sy = Math.sin(yaw);
    var yawM = [
        [cy, 0, sy],
        [0, 1, 0],
        [-sy, 0, cy],
    ];
    return yawM;
};
