
import { describe, expect, it } from 'vitest';
import { 
    Matrix,
    mZero,
    affine3d,
    Mshape,
    eye,
    MvProduct,
    MMProduct,
    MCopy,
    MTolerate,
 } from '../src/index';

describe('Matrix Functions', () => {
    it('should make zeros', () => {
        let M23 = [[0, 0, 0], [0, 0, 0]];
        expect(mZero(2,3)).toStrictEqual(M23);
    });

    it('should make an affine matrix', () => {
        let R = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        let T = [1, 2, 3];
        let A = [[1, 0, 0, 1], [0, 1, 0, 2], [0, 0, 1, 3], [0, 0, 0, 1]];
        expect(affine3d(R, T)).toStrictEqual(A);
    });

    it('should get the shape of a matrix', () => {
        let M23 = [[0, 0, 0], [0, 0, 0]];
        expect(Mshape(M23)).toStrictEqual([2, 3]);
    });

    it('should get the shape of a matrix with checking', () => {
        let M23 = [[0, 0, 0], [0, 0, 0]];
        expect(Mshape(M23, true)).toStrictEqual([2, 3]);
    });

    it('should throw an error for mismatched row lengths', () => {
        let M23 = [[0, 0, 0], [0, 0]];
        expect(() => Mshape(M23, true)).toThrow();
    });

    it('should make an identity matrix', () => {
        let I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        expect(eye(3)).toStrictEqual(I3);
    });

    it('should multiply a matrix by a vector', () => {
        const M = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14]];
        const v = [4,5,-6];
        const Mv = [-7, 2, 11, 20, 29]
        expect(MvProduct(M, v)).toStrictEqual(Mv);
    });

    it('should multiply two matrices', () => {
        const A23 = [[0, 1, 2], [3, 4, 5]];
        const A32 = [[0, 1], [2, 3], [4, 5]];
        const P = [[10, 13], [28, 40]];
        expect(MMProduct(A23, A32)).toStrictEqual(P);
    });

    it('should throw an error for mismatched matrix dimensions', () => {
        const A23 = [[0, 1, 2], [3, 4, 5]];
        const A32 = [[0, 1], [2, 3], [4, 5], [6, 7]];
        expect(() => MMProduct(A23, A32)).toThrow();
    });

    it('should make a copy of a matrix', () => {
        const A = [[0, 1, 2], [3, 4, 5]];
        const B = MCopy(A);
        expect(B).toStrictEqual(A);
        const A11 = A[1][1];
        B[1][1] = 100;
        expect(A[1][1]).toBe(A11);
        expect(B[1][1]).toBe(100);
    });

    it('should tolerate matrix equality', () => {
        const A = [[0.000001, -0.9999999]];
        const B = [[0, -1]];
        expect(MTolerate(A)).toStrictEqual(B);
    });
});