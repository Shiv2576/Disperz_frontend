"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling on body when loading starts
    document.body.style.overflow = "hidden";

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      // Re-enable scrolling when component unmounts or loading ends
      document.body.style.overflow = "";
    };
  }, []);

  // Re-enable scrolling when isLoaded becomes true
  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = "";
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#121212] text-white z-50"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {/* Logo + App Name with Shadow Dance */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/Ada.svg"
              alt="Disperz Logo"
              width={60}
              height={60}
              className="rounded-full mb-4"
            />
            <h1 className="shadow-dance-text text-4xl md:text-5xl font-bold tracking-wide">
              ᴅɪꜱᴘᴇʀᴢ
            </h1>
          </div>

          {/* Optional: Subtle loading hint */}
          <motion.p
            className="text-gray-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            initializing...
          </motion.p>

          {/* Inject the shadow-dance CSS */}
          <style jsx global>{`
            .shadow-dance-text {
              font-size: 4rem;
              color: #fff;
              text-shadow:
                5px 5px 0 #ff005e,
                10px 10px 0 #00d4ff;
              animation: shadow-dance 2s infinite;
              font-family: "Arial", sans-serif;
            }

            @keyframes shadow-dance {
              0%,
              100% {
                text-shadow:
                  5px 5px 0 #ff005e,
                  10px 10px 0 #00d4ff;
              }
              50% {
                text-shadow:
                  -5px -5px 0 #00d4ff,
                  -10px -10px 0 #ff005e;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
