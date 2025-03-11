
export type Vector = number[];

export function vZero(n: number): Vector {
    return Array(n).fill(0);
}

export function vAdd(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = a[i] + b[i];
    }
    return result;
}

/** Pointwise vector minimum */
export function vMin(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = Math.min(a[i], b[i]);
    }
    return result;
}

/** Pointwise vector maximum */
export function vMax(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = Math.max(a[i], b[i]);
    }
    return result;
}

/** multiply a scalar and a vector */
export function vScale(a: number, b: Vector): Vector {
    let result = vZero(b.length);
    for (let i = 0; i < b.length; i++) {
        result[i] = a * b[i];
    }
    return result;
}

/** Subtract two vectors */
export function vSub(a: Vector, b: Vector): Vector {
    return vAdd(a, vScale(-1, b));
};

/** pointwise vector multiplication. */
export function vMul(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = a[i] * b[i];
    }
    return result;
};

/** pointwise vector division. */
export function vDiv(a: Vector, b: Vector): Vector {
    let result = vZero(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = a[i] / b[i];
    }
    return result;
};

/** Dot product of two vectors */
export function vDot(a: Vector, b: Vector): number {
    return a.reduce((acc, x, i) => acc + x*b[i], 0);
};

/** Euclidean vector length */
export function vLength(a: Vector): number {
    return Math.sqrt(a.reduce((acc, x) => acc + x*x, 0));
}

/** Vector normalized to length 1.0 in euclidean norm. */
export function vNormalize(a: Vector): Vector {
    return vScale(1/vLength(a), a);
}

/** Test whether a vector is nearly the zero vector */
export function vNearlyZero(a: Vector, epsilon = 1e-6): boolean {
    return vLength(a) < epsilon;
}

/** Test whether two vectors are very close */
export function vClose(a: Vector, b: Vector, epsilon = 1e-6): boolean {
    return vNearlyZero(vSub(a, b), epsilon);
}

/** 3d vector cross product */
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
