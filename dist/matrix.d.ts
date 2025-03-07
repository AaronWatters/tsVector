import * as vector from './vector';
export type Matrix = vector.Vector[];
/** Make a zero matrix, n rows, m columns */
export declare function mZero(n: number, m: number): Matrix;
/** Make a 3d graphics affine matrix (4x4) from a rotation (3x3) and translation vector */
export declare function affine3d(rotation: Matrix | null, translation?: vector.Vector): Matrix;
/** Get the [row, columns] shape of matrix M. */
export declare function Mshape(M: Matrix, check?: boolean): [number, number];
/** Make an n x n identity matrix */
export declare function eye(n: number): Matrix;
/** Matrix dot vector product. */
export declare function MvProduct(M: Matrix, v: vector.Vector): vector.Vector;
/** Matrix x Matrix product. */
export declare function MMProduct(A: Matrix, B: Matrix): Matrix;
/** Matrix copy */
export declare function MCopy(M: Matrix): Matrix;
/** round matrix entries near integer values (mainly for testing) */
export declare function MTolerate(M: Matrix, epsilon?: number): Matrix;
/** Apply an affine 4x4 transform matrix for 3d space to a 3d vector */
export declare function applyAffine3d(M: Matrix, v: vector.Vector): vector.Vector;
/** Flatten a matrix into a list. */
export declare function MAsList(M: Matrix): vector.Vector;
/** unflatten a list into a matrix */
export declare function listAsM(M: vector.Vector, rows: number, cols: number): Matrix;
/** Swap row i with row j from M. */
export declare function MswapRows(M: Matrix, i: number, j: number, inplace?: boolean): Matrix;
/** Adjoin [M1 | M2] */
export declare function MAdjoin(M1: Matrix, M2: Matrix): Matrix;
/** Return equivalent of numpy M[minrow:maxrow, mincol:maxcol] */
export declare function Mslice(M: Matrix, minrow: number, maxrow: number, mincol: number, maxcol: number): Matrix;
/** Row-eschelon reduction. */
export declare function MRowEchelon(M: Matrix): Matrix;
/** simple matrix inverse using row eschelon reduction. */
export declare function MInverse(M: Matrix): Matrix;
/** aircraft roll matrix */
export declare function Mroll(roll: number): Matrix;
/** aircraft yaw matrix */
export declare function Myaw(yaw: number): Matrix;
/** aircraft pitch matrix */
export declare function Mpitch(yaw: number): Matrix;
//# sourceMappingURL=matrix.d.ts.map