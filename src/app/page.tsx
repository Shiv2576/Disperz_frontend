// src/app/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import Reel from "./components/reel";
import LoadingScreen from "./components/loading";
import { Form } from "./components/form";
import { Globe } from "./components/globe";
import Banner from "./components/banner";
import RoadmapSection from "./components/cards";
import Footer from "./components/footer";

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
        <Reel />
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
            top: "28%",
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
              fontFamily: "'Poppins', 'Segoe UI', 'Helvetica Neue', sans-serif", // formal + slim look
              fontWeight: 300, // lighter = slim
              fontSize:
                typeof window !== "undefined" && window.innerWidth >= 768
                  ? "70px"
                  : "50px",
              color: "#5eead4", // teal base color
              lineHeight: 1.1,
              marginBottom: "3rem",
              letterSpacing: "1px",
              textShadow: `
                0 0 5px rgba(13, 148, 136, 0.7),
                0 0 10px rgba(13, 148, 136, 0.5),
                0 0 20px rgba(13, 148, 136, 0.3)
              `, // glowing effect
              transition: "all 0.3s ease-in-out",
            }}
          >
            Seamless Collaboration
          </h2>

          <p
            style={{
              fontFamily: "'Poppins', 'Segoe UI', 'Helvetica Neue', sans-serif", // clean + professional
              fontWeight: 300, // slim
              fontSize: "clamp(1rem, 2vw, 1.3rem)", // responsive but subtle
              lineHeight: 1.7, // more readable
              color: "#d6d6d6", // softer white for elegance
              letterSpacing: "0.03em", // just a touch of spacing
              maxWidth: "65ch", // slightly wider for better flow
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            Disperz streamlines token distribution with a gas-optimized batch
            airdrop contract. Send tokens to unlimited recipients in one
            transaction — cutting gas fees by up to 90%, eliminating repetitive
            workflows,
            <br />
            and ensuring secure, auditable distributions for DAOs,
            <br />
            projects, and communities. Built for scale and
            <br />
            transparency, Disperz provides intuitive analytics,
            <br />
            on-chain proof of distribution, and integration
            <br />
            support for leading DeFi platforms empowering
            <br />
            projects to reward contributors, engage communities,
            <br />
            and automate complex token campaigns effortlessly.
          </p>
        </div>
      </div>
      <Banner />
      <RoadmapSection />
      <Footer />
    </div>
  );
}
