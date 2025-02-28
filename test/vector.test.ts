
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
});
