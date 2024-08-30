import {
  win
} from "./chunk-MIOLVGSM.js";

// node_modules/@ionic/core/dist/esm/capacitor-59395cbd.js
var getCapacitor = () => {
  if (win !== void 0) {
    return win.Capacitor;
  }
  return void 0;
};

export {
  getCapacitor
};
