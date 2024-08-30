import {
  createColorClasses
} from "./chunk-5OCPWRO4.js";
import {
  getIonMode
} from "./chunk-KHVTJGYJ.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-K6DFFUFS.js";
import "./chunk-YF4Z52PK.js";

// node_modules/@ionic/core/dist/esm/ion-text.entry.js
var textCss = ":host(.ion-color){color:var(--ion-color-base)}";
var IonTextStyle0 = textCss;
var Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.color = void 0;
  }
  render() {
    const mode = getIonMode(this);
    return h(Host, { key: "4b76333b1ea5cab134b9dc1f5670c0d5a253fc32", class: createColorClasses(this.color, {
      [mode]: true
    }) }, h("slot", { key: "3dee5f16bc58b3d92547d910bd4f441a00ce2039" }));
  }
};
Text.style = IonTextStyle0;
export {
  Text as ion_text
};
