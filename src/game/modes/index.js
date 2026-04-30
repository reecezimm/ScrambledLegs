// Mode registry. Each mode exports start(ctx) → cleanup fn.
import goldenEgg from './goldenEgg';
import thresholdMash from './thresholdMash';
import twilight from './twilight';
import pigDodge from './pigDodge';
import pong from './pong';

export const MODES = {
  goldenEgg,
  thresholdMash,
  twilight,
  pigDodge,
  pong,
};
