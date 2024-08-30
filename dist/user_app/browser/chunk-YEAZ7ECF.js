import {
  __async
} from "./chunk-YF4Z52PK.js";

// node_modules/@ionic/core/dist/esm/lock-controller-316928be.js
var createLockController = () => {
  let waitPromise;
  const lock = () => __async(void 0, null, function* () {
    const p = waitPromise;
    let resolve;
    waitPromise = new Promise((r) => resolve = r);
    if (p !== void 0) {
      yield p;
    }
    return resolve;
  });
  return {
    lock
  };
};

export {
  createLockController
};
