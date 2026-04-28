// Build info — injected at build time by GitHub Actions (.github/workflows/deploy.yml).
// Local dev builds fall back to safe defaults so nothing breaks when developing.
//
// Use cases:
//   • Footer "v X.Y · build N · sha" stamp
//   • Console: type `__sl_build` to see what your tab is running
//   • Cache mismatch debugging: compare to /asset-manifest.json hash

import pkg from '../../package.json';

export const APP_VERSION = pkg.version;
export const BUILD_NUM = process.env.REACT_APP_BUILD_NUM || 'dev';
export const BUILD_SHA = process.env.REACT_APP_BUILD_SHA || 'local';
export const BUILD_TIME = process.env.REACT_APP_BUILD_TIME || '';

if (typeof window !== 'undefined') {
  window.__sl_build = {
    version: APP_VERSION,
    num: BUILD_NUM,
    sha: BUILD_SHA,
    time: BUILD_TIME,
  };
}
