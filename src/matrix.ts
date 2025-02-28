
import * as vector from './vector';

export type Matrix = vector.Vector[];

/** Make a zero matrix, n rows, m columns */
export function mZero(n: number, m: number): Matrix {
    return Array(n).fill(0).map(() => vector.vZero(m));
}

/** Make a 3d graphics affine matrix (4x4) from a rotation (3x3) and translation vector */
export function affine3d(rotation: Matrix, translation: vector.Vector): Matrix {
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

