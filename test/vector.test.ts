
import { describe, expect, it } from 'vitest';
import { 
    Vector,
    vZero,
    vAdd,
    vMin,
    vMax,
    vScale,
    vSub,
    vLength,
    vNormalize,
    vClose,
    vCross,
    vDot,
    vDiv,
    vMul,
 } from '../src/index';

describe('Vector Functions', () => {
    it('should make zeros', () => {
        expect(vZero(4)).toStrictEqual([0, 0, 0, 0]);
    });

    it('should add vectors correctly', () => {
        expect(vAdd([1,2,3], [3,2,1])).toStrictEqual([4,4,4]);
    });

    it("should minimize pointwise vectors correctly", () => {
        expect(vMin([1,2,3], [3,2,1])).toStrictEqual([1,2,1]);
    });

    it("should maximize pointwise vectors correctly", () => {
        expect(vMax([1,2,3], [3,2,1])).toStrictEqual([3,2,3]);
    });

    it("should scale vectors correctly", () => {
        expect(vScale(2, [1,2,3])).toStrictEqual([2,4,6]);
    });

    it("should subtract vectors correctly", () => {
        expect(vSub([1,2,3], [3,2,1])).toStrictEqual([-2,0,2]);
    });

    it("should calculate vector lengths correctly", () => {
        expect(vLength([3,4])).toBe(5);
    });

    it("should normalize vectors correctly", () => {
        let A = [3,4];
        let B = vNormalize(A);
        let expected = [3/5, 4/5];
        expect(vLength(B)).toBeCloseTo(1);
        expect(vClose(B, expected)).toBe(true);
    });

    it("should calculate cross products correctly", () => {
        const v1 = [1,2,3];
        const v2 = [4,5,6];
        const v1xv2 = [-3, 6, -3];
        let C = vCross(v1, v2);
        expect(C).toStrictEqual(v1xv2);
    });

    it("should calculate dot products correctly", () => {
        const v1 = [1,2,3];
        const v2 = [4,5,6];
        const v1dotv2 = 32;
        let C = vDot(v1, v2);
        expect(C).toBe(v1dotv2);
    });

    it("should pointwise multiply vectors correctly", () => {
        const v1 = [1,2,3];
        const v2 = [4,5,6];
        const v1xv2 = [4,10,18];
        let C = vMul(v1, v2);
        expect(C).toStrictEqual(v1xv2);
    });

    it("should pointwise divide vectors correctly", () => {
        const v1 = [12,20,30];
        const v2 = [4,5,6];
        const v1xv2 = [3,4,5];
        let C = vDiv(v1, v2);
        expect(C).toStrictEqual(v1xv2);
    });

});
