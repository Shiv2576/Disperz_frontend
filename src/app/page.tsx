// src/app/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import Footbar from "./components/footbar";
import LoadingScreen from "./components/loading";
import { Form } from "./components/form";
import { Globe } from "./components/globe";

export default function Page() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  let vantaEffect: any = null; // store effect for cleanup

  // ✅ Initialize Vanta AFTER p5 is ready
  useEffect(() => {
    const initVanta = async () => {
      try {
        // 1. Load p5
        const p5Module = await import("p5");
        if (typeof window !== "undefined") {
          (window as any).p5 = p5Module.default || p5Module;
        }

        // 2. Load TRUNK effect
        const { default: TRUNK } = await import("@/lib/vanta/trunk.js");

        // 3. ✅ CREATE THE EFFECT
        if (vantaRef.current) {
          vantaEffect = TRUNK({
            el: vantaRef.current,
            color: 0x595557,
            backgroundColor: 0x313131,
            spacing: 3,
            chaos: 3.0,
          });
        }
      } catch (err) {
        console.error("Failed to initialize Vanta TRUNK:", err);
      }
    };

    initVanta();

    // Cleanup on unmount
    return () => {
      if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
      }
    };
  }, []);

  // Scroll effect (optional)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 800;
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const liftAmount = scrollProgress * 100;

  return (
    <div style={{ minHeight: "200vh", backgroundColor: "#313131" }}>
      <LoadingScreen />

      {/* First Section — Hero with Vanta */}
      <div
        style={{
          height: "100vh",
          position: "relative",
          transform: `translateY(-${liftAmount}px)`,
          transition: "transform 0.1s linear",
          zIndex: 2,
          boxShadow:
            scrollProgress > 0 ? "0 10px 50px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* ✅ Vanta background container — MUST have size */}
        <div
          ref={vantaRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />

        <Navbar />
        {/* Optional: hero content */}
        <main style={{ padding: "2rem", color: "white" }} />
        <Footbar />
      </div>

      {/* Second Section — Form + Globe */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#313131",
          position: "relative",
          zIndex: 1,
          padding: "4rem 2rem",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: "0 0 auto", maxWidth: "500px", zIndex: 2 }}>
          <Form />
        </div>

        {/* Globe */}
        <div
          style={{
            position: "absolute",
            right: "6rem",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <div style={{ width: "280px", height: "280px" }}>
            <Globe />
          </div>
        </div>

        {/* Text */}
        <div
          style={{
            position: "absolute",
            right: "150px",
            top: "30%",
            transform: "translateY(-27%)",
            maxWidth: "700px",
            color: "#e0e0e0",
            fontFamily: "'Inter', 'Arial', sans-serif",
            lineHeight: 1.6,
            fontSize: "1.15rem",
            zIndex: 3,
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              fontWeight: "500", // 'font-medium' = 500
              color: "#0d9488", // teal-500
              lineHeight: 1.2, // 'leading-tight' ≈ 1.2
              marginBottom: "3rem",
              textShadow: "0 0 1px rgba(0, 212, 255, 0.3)",

              ...(typeof window !== "undefined" && window.innerWidth >= 768
                ? { fontSize: "65px" }
                : {}),
            }}
          >
            Seamless Collaboration
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 10vw, 1.5rem)",
              lineHeight: 1.5,
              color: "#e0e0e0",
              letterSpacing: "0.04em",
              maxWidth: "60ch",
            }}
          >
            Disperz streamlines token distribution with a gas-optimized batch
            airdrop contract.Send tokens to unlimited recipients in one
            transaction — cutting gas fees by up to 90%,
            <br />
            eliminating repetitive workflows,and ensuring secure,auditable
            distributions for DAOs,
            <br />
            projects, and communities.
            <br />
            Built for scale and transparency, Disperz
            <br />
            provides intuitive analytics, on-chain
            <br />
            proof of distribution, and integration support
            <br />
            for leading DeFi platforms — empowering projects to reward
            <br />
            contributors, engage communities, and automate complex token
            campaigns effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
