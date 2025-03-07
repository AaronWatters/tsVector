export type Vector = number[];
export declare function vZero(n: number): Vector;
export declare function vAdd(a: Vector, b: Vector): Vector;
/** Pointwise vector minimum */
export declare function vMin(a: Vector, b: Vector): Vector;
/** Pointwise vector maximum */
export declare function vMax(a: Vector, b: Vector): Vector;
/** multiply a scalar and a vector */
export declare function vScale(a: number, b: Vector): Vector;
/** Subtract two vectors */
export declare function vSub(a: Vector, b: Vector): Vector;
/** Dot product of two vectors */
export declare function vDot(a: Vector, b: Vector): number;
/** Euclidean vector length */
export declare function vLength(a: Vector): number;
/** Vector normalized to length 1.0 in euclidean norm. */
export declare function vNormalize(a: Vector): Vector;
/** Test whether a vector is nearly the zero vector */
export declare function vNearlyZero(a: Vector, epsilon?: number): boolean;
/** Test whether two vectors are very close */
export declare function vClose(a: Vector, b: Vector, epsilon?: number): boolean;
/** 3d vector cross product */
export declare function vCross(a: Vector, b: Vector): Vector;
//# sourceMappingURL=vector.d.ts.map