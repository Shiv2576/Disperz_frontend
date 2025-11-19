"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 768px is the 'md' breakpoint in Tailwind CSS
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = ["Home", "Product", "About"];

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-6xl -translate-x-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-md flex items-center justify-between px-6 py-3 md:px-8">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <img
          src="/Ada.svg"
          alt="Disperz Logo"
          className="h-8 w-8 md:h-10 md:w-10"
        />
        <span className="text-xl md:text-3xl font-bold text-gray-800">
          ᴅɪꜱᴘᴇʀᴢ
        </span>
      </Link>

      {/* Center: Desktop Navigation (hidden on mobile) */}
      <div className="hidden md:flex space-x-20">
        {navItems.map((tab) => (
          <div
            key={tab}
            className="relative"
            onMouseEnter={() => setActiveTab(tab)}
            onMouseLeave={() => setActiveTab(null)}
          >
            <Link
              href={`/${tab.toLowerCase() === "home" ? "" : tab.toLowerCase()}`}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              {tab}
            </Link>

            {/* Desktop-only dropdown */}
            <AnimatePresence>
              {activeTab === tab && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-1/2 w-64 -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg border border-gray-100 z-50"
                >
                  <h3 className="text-gray-800 font-semibold text-sm mb-2">
                    {tab} Articles
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Read insights and stories related to {tab.toLowerCase()}.
                  </p>
                  <Link
                    href={`/${tab.toLowerCase()}`}
                    className="mt-2 inline-block text-[#7A6D70] text-sm font-medium hover:underline"
                  >
                    Explore →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Right: Wallet Button + Hamburger on mobile */}
      <div className="flex items-center space-x-4">
        {/* Hamburger icon - only on mobile. Placed *before* the wallet button for standard right-side placement. */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none p-1 rounded-md" // Added padding and rounded for better hit area and style
            aria-label="Toggle menu"
          >
            {/* Added 'rounded-full' for rounded corners on the bars */}
            <div className="w-6 h-0.5 bg-gray-800 mb-1.5 rounded-full"></div>
            <div className="w-6 h-0.5 bg-gray-800 mb-1.5 rounded-full"></div>
            <div className="w-6 h-0.5 bg-gray-800 rounded-full"></div>
          </button>
        )}

        {/* Wallet Button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#A08F92] rounded-full blur-md opacity-30 group-hover:opacity-50 transition" />
          <div className="relative rounded-full bg-[#7A6D70] text-white px-4 py-1.5 text-sm font-medium shadow-md hover:bg-[#655A5C] hover:shadow-lg transition">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected =
                  ready && account && chain && !chain.unsupported;

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {connected ? (
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className="hover:underline text-sm"
                      >
                        {account.displayName}
                      </button>
                    ) : (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="hover:underline text-sm"
                      >
                        Connect Wallet
                      </button>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (Rest of the overlay logic remains the same) */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Slide-in menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-4/5 max-w-xs bg-white/95 backdrop-blur-md shadow-xl z-50 flex flex-col p-6 pt-20 md:hidden"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end mb-6 text-gray-600 hover:text-gray-900"
                aria-label="Close menu"
              >
                ✕
              </button>

              <nav className="flex flex-col space-y-6">
                {navItems.map((tab) => (
                  <Link
                    key={tab}
                    href={`/${tab.toLowerCase() === "home" ? "" : tab.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-medium text-gray-800 hover:text-[#7A6D70] transition-colors"
                  >
                    {tab}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
