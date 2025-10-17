"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe, { Marker } from "cobe";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;

    const onResize = () => {
      width = canvasRef.current?.clientWidth ?? 0;
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // Lighter region near equator
        ...Array(200)
          .fill(null)
          .map(() => ({
            location: [Math.random() * 360 - 180, Math.random() * 15 - 10] as [
              number,
              number,
            ],
            size: Math.random() / 20 + 0.02,
          })),
        // Random global markers
        ...Array(100)
          .fill(null)
          .map(() => ({
            location: [Math.random() * 360 - 180, Math.random() * 180 - 90] as [
              number,
              number,
            ],
            size: Math.random() / 40 + 0.01,
          })),
      ] satisfies Marker[],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    setIsLoaded(true);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          aspectRatio: "1",
          contain: "layout paint size",
        }}
        className={isLoaded ? "" : "opacity-0"}
      />
    </div>
  );
}
