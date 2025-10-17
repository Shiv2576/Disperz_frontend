"use client";
import React from "react";

export default function Footbar() {
  const logos = [
    "/avax.svg",
    "/coinbase.svg",
    "/ethereum.svg",
    "/pancakeswap.svg",
    "/polygon.svg",
    "/tether.svg",
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full px-6 py-6 md:px-12">
      <div className="max-w-6xl mx-auto relative h-24">
        {/* Left Block */}
        <div
          className="absolute -left-30 flex flex-col -space-y-2"
          style={{ bottom: "60px" }}
        >
          <span className="text-[50px] md:text-[65px] font-medium text-teal-500 leading-tight">
            Fully Automated
          </span>
          <span className="text-[50px] md:text-[65px] font-medium text-white leading-tight">
            Mass Token Distributor
          </span>
        </div>

        {/* Right Block: Description + Sliding/Fading Logos */}
        <div
          className="absolute -right-3 flex flex-col items-start space-y-3 max-w-[380px]"
          style={{ transform: "translate(120px, -100px)" }}
        >
          <div className="text-left">
            <p className="text-white text-sm font-extralight md:text-base leading-relaxed">
              Disperz brings multi-token distribution in one go sustainable,
              cost-efficient, and scalable. Ready for the future.
            </p>
            <p className="text-gray-400 text-xs md:text-sm mt-1.5">
              Trusted by leading companies
            </p>
          </div>

          {/* Sliding + Fading Carousel */}
          <div className="relative overflow-hidden w-full h-12">
            {/* Gradient fade edges */}
            <div
              className="absolute left-0 top-0 w-16 h-full z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #313131, rgba(49, 49, 49, 0.8), transparent)",
              }}
            ></div>
            <div
              className="absolute right-0 top-0 w-16 h-full z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, #313131, rgba(49, 49, 49, 0.8), transparent)",
              }}
            ></div>

            {/* Scrolling container */}
            <div className="flex gap-8 animate-infinite-scroll">
              {/* First set */}
              {logos.map((logo, idx) => (
                <div
                  key={`set1-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Logo ${idx + 1}`}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}

              {/* Second set for seamless loop */}
              {logos.map((logo, idx) => (
                <div
                  key={`set2-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Logo ${idx + 1}`}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}

              {/* Third set for extra smoothness */}
              {logos.map((logo, idx) => (
                <div
                  key={`set3-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Logo ${idx + 1}`}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 10s linear infinite;
          display: flex;
          will-change: transform;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </footer>
  );
}
