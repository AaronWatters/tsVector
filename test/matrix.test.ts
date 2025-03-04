
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
    applyAffine3d,
    MAsList,
    listAsM,
    MswapRows,
    MAdjoin,
    Mslice,
    MRowEchelon,
    MInverse,
    Mroll,
    Myaw,
    Mpitch,
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

    it('should apply an affine transformation to a vector', () => {
        const v = [1,2,3];
        //const T = null;
        const R = [
            [0, 1, 0],
            [1, 0, 0],
            [0, 0, 1],
        ];
        const A = affine3d(R, [4, 5, 6]);
        const expected = [2+4,1+5,3+6];
        const applied = applyAffine3d(A, v);
        expect(applied).toStrictEqual(expected);
    });

    it('should flatten a matrix to a list', () => {
        const A = [[0, 1, 2], [3, 4, 5]];
        const L = [0, 1, 2, 3, 4, 5];
        expect(MAsList(A)).toStrictEqual(L);
    });

    it('should make a matrix from a list', () => {
        const A = [[0, 1, 2], [3, 4, 5]];
        const L = [0, 1, 2, 3, 4, 5];
        expect(listAsM(L, 2, 3)).toStrictEqual(A);
    });

    it('should swap rows of a matrix', () => {
        const A = [[6,6,6], [0, 1, 2], [3, 4, 5]];
        const B = [[6,6,6], [3, 4, 5], [0, 1, 2]];
        expect(MswapRows(A, 1, 2, false)).toStrictEqual(B);
    });

    it('should adjoin two matrices', () => {
        const A = [[0, 1, 2], [3, 4, 5]];
        const B = [[6, 7], [8, 9]];
        const C = [[0, 1, 2, 6, 7], [3, 4, 5, 8, 9]];
        expect(MAdjoin(A, B)).toStrictEqual(C);
    });

    it('should fail to adjoin incompatible matrices', () => {
        const A = [[0, 1, 2], [3, 4, 5]];
        const B = [[6, 7], [8, 9], [10, 11]];
        const C = [[0, 1, 2, 6, 7], [3, 4, 5, 8, 9]];
        expect(() => MAdjoin(A, B)).
            toThrow();
    });

    it('should slice a matrix', () => {
        const A = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const B =  [ [ 4 ], [ 7 ] ];
        expect(Mslice(A, 1, 3, 1, 2)).toStrictEqual(B);
    });

    it('should row echelon a matrix', () => {
        const M = [
            [1,0,1,1,0,0],
            [0,1,0,0,1,0],
            [1,2,2,0,0,1],
        ];
        const red = [
            [ 1, 0, 0, 2, 2, -1 ], 
            [ 0, 1, 0, 0, 1, 0 ], 
            [ 0, 0, 1, -1, -2, 1 ]
        ];
        expect(MRowEchelon(M)).toStrictEqual(red);
    });

    it('should invert a matrix', () => {
        const M = [
            [1,0,1],
            [0,1,0],
            [1,2,2],
        ];
        const I = [
            [ 2, 2, -1 ], 
            [ 0, 1, 0 ], 
            [ -1, -2, 1 ]
        ];
        expect(MInverse(M)).toStrictEqual(I);
        // verify that M * M^-1 = I
        expect(MMProduct(M, I)).toStrictEqual(eye(3));
        // verify that M^-1 * M = I
        expect(MMProduct(I, M)).toStrictEqual(eye(3));
    });

    it('should make a 90 degree roll matrix', () => {
        const rM = MTolerate(Mroll(Math.PI/2.0));
        const eM = [
            [0, -1, 0],
            [1, 0, 0],
            [0, 0, 1],
        ];
        expect(rM).toStrictEqual(eM);
    });

    it('should make a yaw matrix', () => {
        const yM = MTolerate(Myaw(Math.PI/2.0));
        const eM = [
            [ 1, 0, 0 ], 
            [ 0, 0, 1 ], 
            [ 0, -1, 0 ] 
        ];
        expect(yM).toStrictEqual(eM);
    });

    it('should make a pitch matrix', () => {
        const pM = MTolerate(Mpitch(Math.PI/2.0));
        const eM = [
            [ 0, 0, 1 ], 
            [ 0, 1, 0 ], 
            [ -1, 0, 0 ] 
        ];
        expect(pM).toStrictEqual(eM);
    });

    it("should apply a translation matrix", () => {
        const translation = [1, 2, 3];
        const M = affine3d(null, translation);
        const v = [4, 5, 6];
        const expected = [5, 7, 9];
        const applied = applyAffine3d(M, v);
        expect(applied).toStrictEqual(expected);
    });

    it ("should apply a rotation affine matrix", () => {
        const rotation = [
            [0, 1, 0],
            [1, 0, 0],
            [0, 0, 1],
        ];
        const M = affine3d(rotation);
        const v = [4, 5, 6];    
        const expected = [5, 4, 6];
        const applied = applyAffine3d(M, v);
        expect(applied).toStrictEqual(expected);
    });
});