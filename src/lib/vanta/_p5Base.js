// vanta/_p5Base.js
import { extendDefaults } from "./helpers.js";

let p5 = typeof window !== "undefined" ? window.p5 : null;

class P5Base {
  constructor(userOptions = {}) {
    this.options = extendDefaults(this.defaultOptions, userOptions);
    this.el = this.options.el;
    if (!this.el) {
      console.error("Vanta: el required");
      return;
    }
    this.prepareEl();
  }

  prepareEl() {
    // Ensure el is a DOM element
    if (typeof this.el === "string") {
      this.el = document.querySelector(this.el);
    }
    if (!this.el) {
      console.error("Vanta: el not found");
      return;
    }

    // Create a canvas container if needed
    this.canvasContainer = document.createElement("div");
    this.canvasContainer.style.position = "absolute";
    this.canvasContainer.style.top = "0";
    this.canvasContainer.style.left = "0";
    this.canvasContainer.style.width = "100%";
    this.canvasContainer.style.height = "100%";
    this.canvasContainer.style.zIndex = "-1";
    this.el.appendChild(this.canvasContainer);
  }

  initP5(p) {
    this.p = p;
    p.resizeCanvas(this.el.clientWidth, this.el.clientHeight);
    if (this.options.backgroundColor !== undefined) {
      p.background(this.options.backgroundColor);
    }
  }

  // Optional: handle resize
  handleResize() {
    if (this.p) {
      this.p.resizeCanvas(this.el.clientWidth, this.el.clientHeight);
      if (this.options.backgroundColor !== undefined) {
        this.p.background(this.options.backgroundColor);
      }
    }
  }
}

let VANTA = {
  register(name, effectClass) {
    // Return a FUNCTION that creates a new instance
    const effectFactory = (opts) => {
      return new effectClass(opts);
    };

    // Also attach to window.VANTA for compatibility (optional)
    if (typeof window !== "undefined") {
      window.VANTA = window.VANTA || {};
      window.VANTA[name] = effectFactory;
    }

    return effectFactory;
  },
};

export { P5Base, VANTA };
