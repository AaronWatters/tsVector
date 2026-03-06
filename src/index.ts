
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
    MTranspose,
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
    yaw,
    roll,
    pitch,
    // Deprecated aliases for backward compatibility
    Mroll,
    Myaw,
    Mpitch,
} from './matrix';