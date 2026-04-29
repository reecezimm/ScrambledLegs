// Mode registry. Each mode exports start(ctx) → cleanup fn.
import goldenEgg from './goldenEgg';
import thresholdMash from './thresholdMash';
import doNotPress from './doNotPress';
import twilight from './twilight';
import pigDodge from './pigDodge';

export const MODES = {
  goldenEgg,
  thresholdMash,
  doNotPress,
  twilight,
  pigDodge,
};
