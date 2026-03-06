
/**
 * A vector represented as an array of numbers
 */
export type Vector = number[];

/**
 * Creates a zero vector of length n
 * 
 * @param n - The length of the vector to create
 * @returns A new vector of length n filled with zeros
 */
export function vZero(n: number): Vector {
    return Array(n).fill(0);
}

/**
 * Adds two vectors element-wise
 * 
 * @param a - The first vector
 * @param b - The second vector
 * @returns A new vector where each element is the sum of corresponding elements from a and b
 */
export function vAdd(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = a[i] + b[i];
    }
    return result;
}

/**
 * Computes the element-wise minimum of two vectors
 * 
 * @param a - The first vector
 * @param b - The second vector
 * @returns A new vector where each element is the minimum of corresponding elements from a and b
 */
export function vMin(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = Math.min(a[i], b[i]);
    }
    return result;
}

/**
 * Computes the element-wise maximum of two vectors
 * 
 * @param a - The first vector
 * @param b - The second vector
 * @returns A new vector where each element is the maximum of corresponding elements from a and b
 */
export function vMax(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = Math.max(a[i], b[i]);
    }
    return result;
}

/**
 * Multiplies a vector by a scalar value
 * 
 * @param a - The scalar value to multiply by
 * @param b - The vector to scale
 * @returns A new vector where each element is multiplied by the scalar a
 */
export function vScale(a: number, b: Vector): Vector {
    let result = vZero(b.length);
    for (let i = 0; i < b.length; i++) {
        result[i] = a * b[i];
    }
    return result;
}

/**
 * Subtracts one vector from another element-wise
 * 
 * @param a - The vector to subtract from
 * @param b - The vector to subtract
 * @returns A new vector representing a - b
 */
export function vSub(a: Vector, b: Vector): Vector {
    return vAdd(a, vScale(-1, b));
};

/**
 * Multiplies two vectors element-wise (Hadamard product)
 * 
 * @param a - The first vector
 * @param b - The second vector
 * @returns A new vector where each element is the product of corresponding elements from a and b
 */
export function vMul(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = a[i] * b[i];
    }
    return result;
};

/**
 * Divides two vectors element-wise
 * 
 * @param a - The dividend vector
 * @param b - The divisor vector
 * @returns A new vector where each element is the quotient of corresponding elements from a and b
 */
export function vDiv(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = a[i] / b[i];
    }
    return result;
};

/**
 * Computes the dot product (inner product) of two vectors
 * 
 * @param a - The first vector
 * @param b - The second vector
 * @returns The scalar dot product of a and b
 */
export function vDot(a: Vector, b: Vector): number {
    return a.reduce((acc, x, i) => acc + x*b[i], 0);
};

/**
 * Calculates the Euclidean length (L2 norm) of a vector
 * 
 * @param a - The vector to measure
 * @returns The Euclidean length of the vector
 */
export function vLength(a: Vector): number {
    return Math.sqrt(a.reduce((acc, x) => acc + x*x, 0));
}

/**
 * Normalizes a vector to unit length (length 1.0) in Euclidean norm
 * 
 * @param a - The vector to normalize
 * @returns A new vector in the same direction as a with length 1.0
 */
export function vNormalize(a: Vector): Vector {
    return vScale(1/vLength(a), a);
}

/**
 * Tests whether a vector is nearly the zero vector within a tolerance
 * 
 * @param a - The vector to test
 * @param epsilon - The tolerance threshold (default: 1e-6)
 * @returns True if the vector's length is less than epsilon, false otherwise
 */
export function vNearlyZero(a: Vector, epsilon = 1e-6): boolean {
    return vLength(a) < epsilon;
}

/**
 * Tests whether two vectors are very close within a tolerance
 * 
 * @param a - The first vector
 * @param b - The second vector
 * @param epsilon - The tolerance threshold (default: 1e-6)
 * @returns True if the vectors are within epsilon distance of each other, false otherwise
 */
export function vClose(a: Vector, b: Vector, epsilon = 1e-6): boolean {
    return vNearlyZero(vSub(a, b), epsilon);
}

/**
 * Computes the 3D cross product of two 3D vectors
 * 
 * @param a - The first 3D vector
 * @param b - The second 3D vector
 * @returns A new 3D vector perpendicular to both a and b
 */
export function vCross(a: Vector, b: Vector): Vector {
    // from https://en.wikipedia.org/wiki/Cross_product
    const [a1, a2, a3] = a;
    const [b1, b2, b3] = b;
    const result = [
        a2 * b3 - a3 * b2,
        a3 * b1 - a1 * b3,
        a1 * b2 - a2 * b1
    ];
    return result;
}
