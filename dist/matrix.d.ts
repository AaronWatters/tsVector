import * as vector from './vector';
export type Matrix = vector.Vector[];
/** Make a zero matrix, n rows, m columns */
export declare function mZero(n: number, m: number): Matrix;
/** Make a 3d graphics affine matrix (4x4) from a rotation (3x3) and translation vector */
export declare function affine3d(rotation: Matrix, translation: vector.Vector): Matrix;
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
//# sourceMappingURL=matrix.d.ts.map