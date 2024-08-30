import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-HJIYM5BJ.js";
import "./chunk-36T2BHYJ.js";
import {
  componentOnReady
} from "./chunk-YCY464VT.js";
import {
  readTask,
  writeTask
} from "./chunk-K6DFFUFS.js";
import {
  __async
} from "./chunk-YF4Z52PK.js";

// node_modules/@ionic/core/dist/esm/status-tap-17122cea.js
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(() => __async(void 0, null, function* () {
            contentEl.style.setProperty("--overflow", "hidden");
            yield scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          }));
        });
      }
    });
  });
};
export {
  startStatusTap
};
