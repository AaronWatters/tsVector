
export { add, subtract } from './math';

export type { Vector } from './vector';

export { 
    //Vector,
    vZero,
    vAdd,
    vMin,
    vMax,
    vScale,
    vSub,
    vLength,
    vNormalize,
    vNearlyZero,
    vClose,
    vCross,
    vDot,
    vDiv,
    vMul,
} from './vector';

export type { Matrix } from './matrix';

export {
    //Matrix,
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
} from './matrix';