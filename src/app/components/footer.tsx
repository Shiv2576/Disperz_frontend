// src/app/components/footer.tsx
"use client";

import React from "react";

const Footer = () => {
  const columnStyle: React.CSSProperties = {
    flex: "0 1 200px",
    minWidth: "100px",
  };

  const linkStyle: React.CSSProperties = {
    color: "#F5F5F5",
    textDecoration: "none",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#FFFFFF";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#F5F5F5";
  };

  return (
    <footer
      style={{
        backgroundColor: "#313131",
        color: "#F5F5F5",
        padding: "3rem 2rem 2rem",
        fontFamily: "'Poppins', sans-serif",
        borderTop: "1px solid #444",
      }}
    >
      <div
        style={{
          maxWidth: "12000px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          padding: "0 1rem",
        }}
      >
        {/* Product */}
        <div
          style={{
            flex: "0 1 200px",
            minWidth: "180px",
            transform: "translateX(-8px)",
          }}
        >
          <h3
            style={{ color: "#C0A080", marginBottom: "1rem", fontWeight: 600 }}
          >
            Product
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.6rem" }}>
              <a
                href="/features"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Features
              </a>
            </li>
            <li style={{ marginBottom: "0.6rem" }}>
              <a
                href="/roadmap"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Roadmap
              </a>
            </li>
            <li>
              <a
                href="/security"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Security
              </a>
            </li>
          </ul>
        </div>

        {/* Docs */}
        <div
          style={{
            flex: "0 1 200px",
            minWidth: "180px",
            transform: "translateX(-7px)",
          }}
        >
          <h3
            style={{ color: "#C0A080", marginBottom: "1rem", fontWeight: 600 }}
          >
            Docs
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.6rem" }}>
              <a
                href="https://docs.disperz.xyz"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Developer Guide
              </a>
            </li>
            <li>
              <a
                href="https://docs.disperz.xyz/api"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                API Reference
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div
          style={{
            flex: "0 1 200px",
            minWidth: "180px",
            transform: "translateX(100px)",
          }}
        >
          <h3
            style={{ color: "#C0A080", marginBottom: "1rem", fontWeight: 600 }}
          >
            Company
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.6rem" }}>
              <a
                href="/about"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                About
              </a>
            </li>
            <li style={{ marginBottom: "0.6rem" }}>
              <a
                href="/careers"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="/contact"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div
          style={{
            flex: "0 1 200px",
            minWidth: "180px",
            transform: "translateX(110px)",
          }}
        >
          <h3
            style={{ color: "#C0A080", marginBottom: "1rem", fontWeight: 600 }}
          >
            Connect
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.6rem" }}>
              <a
                href="https://twitter.com/disperz"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Twitter
              </a>
            </li>
            <li style={{ marginBottom: "0.6rem" }}>
              <a
                href="https://t.me/disperz"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/disperz"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "2.5rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid #444",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#aaa",
          padding: "0 1rem",
        }}
      >
        © {new Date().getFullYear()} Disperz. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
