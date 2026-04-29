// Mode registry. Each mode exports start(ctx) → cleanup fn.
import goldenEgg from './goldenEgg';
import thresholdMash from './thresholdMash';
import doNotPress from './doNotPress';

export const MODES = {
  goldenEgg,
  thresholdMash,
  doNotPress,
};
