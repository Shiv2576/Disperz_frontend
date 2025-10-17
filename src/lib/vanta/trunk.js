// src/lib/vanta/trunk.js
import { P5Base, VANTA } from "./_p5Base.js";
import { mobileCheck, hexToRgb } from "./helpers.js";

class TRUNK extends P5Base {
  static initClass() {
    this.prototype.defaultOptions = {
      color: 0x595557,
      backgroundColor: 0x313131,
      spacing: 5,
      chaos: 2.5,
    };
  }

  constructor(userOptions) {
    super(userOptions);
    if (typeof window === "undefined") return;
    this.onInit();
  }

  onInit() {
    if (!window.p5) {
      console.error("Vanta TRUNK: p5.js is required but not loaded.");
      return;
    }

    const effect = this;
    const p5 = window.p5;

    const sketch = (p) => {
      let rings = mobileCheck() ? 25 : 40;
      const dim_init = 40;
      const dim_delta = 5;
      const spacing = effect.options.spacing || 2;
      const chaos_mag = 18;
      const chaos_base = 0.15;
      const chaos_step = 0.1;

      let ox = p.random(10000);
      let oy = p.random(10000);
      let oz = p.random(10000);

      const oySpeed = 0.008;
      const ozSpeed = 0.0003;

      p.setup = () => {
        effect.initP5(p); // ✅ sets up canvas size & background

        const [r, g, b] = hexToRgb(effect.options.color);
        p.stroke(r, g, b);
        p.strokeWeight(1.2);
        p.noFill();
        p.smooth();
      };

      p.draw = () => {
        const [bgR, bgG, bgB] = hexToRgb(effect.options.backgroundColor);
        p.background(bgR, bgG, bgB);
        p.translate(p.width / 2, p.height / 2);
        display();
      };

      // Handle window resize
      if (typeof window !== "undefined") {
        effect._resizeHandler = () => {
          if (p.resizeCanvas) {
            p.resizeCanvas(effect.el.clientWidth, effect.el.clientHeight);
          }
        };
        window.addEventListener("resize", effect._resizeHandler);
      }

      const display = () => {
        oy -= oySpeed;
        oz += ozSpeed;

        for (let i = 0; i < rings; i++) {
          p.beginShape();
          for (let a = 0; a < 360; a += 2) {
            const radian = p.radians(a);
            const chaosOffset =
              effect.options.chaos *
              chaos_mag *
              p.noise(
                ox + p.cos(radian) * (chaos_step * i + chaos_base),
                oy + p.sin(radian) * (chaos_step * i + chaos_base),
                oz,
              );
            const radius = chaosOffset + dim_delta * i + dim_init + i * spacing;
            p.vertex(radius * p.cos(radian), radius * p.sin(radian));
          }
          p.endShape(p.CLOSE);
        }
      };
    };

    this.p5Instance = new p5(sketch, this.canvasContainer);
  }

  destroy() {
    // Clean up resize listener
    if (this._resizeHandler) {
      window.removeEventListener("resize", this._resizeHandler);
    }

    // Remove p5 instance
    if (this.p5Instance) {
      this.p5Instance.remove();
      this.p5Instance = null;
    }

    // Remove canvas container
    if (this.canvasContainer?.parentNode) {
      this.canvasContainer.parentNode.removeChild(this.canvasContainer);
    }
  }
}

TRUNK.initClass();

// ✅ Register with VANTA
const TRUNKEffect = VANTA.register("TRUNK", TRUNK);

export default TRUNKEffect;
