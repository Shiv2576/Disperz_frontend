"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[80%] max-w-6xl h-17 -translate-x-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-md flex items-center justify-between px-8">
      {/* Logo + App Name */}
      <Link href="/" className="flex items-center space-x-2">
        <img src="/Ada.svg" alt="Disperz Logo" className="h-10 w-10" />
        <span className="text-3xl font-bold text-gray-800">ᴅɪꜱᴘᴇʀᴢ</span>
      </Link>

      {/* Navigation Links */}
      <div className="relative hidden md:flex space-x-20">
        {["Home", "Product", "About"].map((tab) => (
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

            {/* Dropdown Articles */}
            <AnimatePresence>
              {activeTab === tab && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-1/2 w-64 -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg border border-gray-100"
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

      {/* Custom Wallet Connect Button */}
      <div className="flex items-center">
        <div className="relative group">
          {/* Glow behind button */}
          <div className="absolute inset-0 bg-[#A08F92] rounded-full blur-md opacity-30 group-hover:opacity-50 transition" />

          {/* Button itself */}
          <div className="relative rounded-full bg-[#7A6D70] text-white px-5 py-2 text-sm font-medium shadow-md hover:bg-[#655A5C] hover:shadow-lg transition">
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
                        className="hover:underline"
                      >
                        {account.displayName}
                      </button>
                    ) : (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="hover:underline"
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
    </nav>
  );
}
