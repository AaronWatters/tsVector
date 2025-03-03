
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
} from './matrix';