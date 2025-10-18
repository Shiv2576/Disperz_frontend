"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RoadmapItem = {
  id: number;
  quarter: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
};

const RoadmapSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const roadmapItems: RoadmapItem[] = [
    {
      id: 1,
      quarter: "Q4 2024",
      title: "Token Airdrop Engine",
      description: "Gas-optimized batch distribution for unlimited recipients.",
      status: "completed",
    },
    {
      id: 2,
      quarter: "Q1 2025",
      title: "DAO Governance Dashboard",
      description: "On-chain voting, proposal tracking, and analytics.",
      status: "in-progress",
    },
    {
      id: 3,
      quarter: "Q2 2025",
      title: "Cross-Chain Support",
      description: "Deploy airdrops across Ethereum, Base, Arbitrum, and more.",
      status: "planned",
    },
    {
      id: 4,
      quarter: "Q3 2025",
      title: "Automated Campaigns",
      description:
        "Schedule recurring token distributions with smart triggers.",
      status: "planned",
    },
    {
      id: 5,
      quarter: "Q4 2025",
      title: "Community Rewards Hub",
      description: "Gamified engagement with NFT badges and point system.",
      status: "planned",
    },
    {
      id: 6,
      quarter: "2026+",
      title: "AI-Powered Allocation",
      description:
        "Smart suggestions for fair, sybil-resistant token distribution.",
      status: "planned",
    },
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cards = cardsRef.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );
    const directions = ["up", "down", "left", "right"] as const;

    cards.forEach((card) => {
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
      let x = 0;
      let y = 0;

      if (direction === "left") x = -60;
      if (direction === "right") x = 60;
      if (direction === "up") y = 40;
      if (direction === "down") y = -40;

      gsap.fromTo(
        card,
        { opacity: 0, x, y, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const getStatusColor = (status: RoadmapItem["status"]) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#3b82f6";
      default:
        return "#C0A080"; // use warm beige for "planned"
    }
  };

  return (
    <section
      ref={sectionRef}
      className="roadmap-section"
      style={{
        padding: "1rem 2rem",
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        // ✅ No background color — inherits from parent (e.g., #313131)
        color: "#F5F5F5", // default soft white for body
      }}
    >
      <style jsx>{`
        .roadmap-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 4rem;
          color: #ffffff; /* Pure white for impact */
        }
        .roadmap-card {
          /* ✅ No background — but add subtle border for definition */
          background: transparent;
          border: 1px solid #c0a08020; /* Very subtle warm border */
          border-radius: 16px;
          padding: 1.8rem;
          margin-bottom: 2.5rem;
          backdrop-filter: blur(4px); /* Optional: slight frosted effect */
          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }
        .roadmap-card:hover {
          transform: translateY(-4px);
          border-color: #c0a08040; /* Slightly more visible on hover */
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .quarter {
          font-size: 0.9rem;
          color: #c0a080; /* Warm beige for time labels */
          font-weight: 600;
        }
        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: transparent;
          border: 1px solid;
          /* Color comes from inline style */
        }
        .card-title {
          font-size: 1.4rem;
          margin: 0.5rem 0;
          color: #ffffff; /* Pure white for titles */
        }
        .card-description {
          color: #f5f5f5; /* Soft white for readability */
          line-height: 1.6;
          font-weight: 300;
        }
      `}</style>

      <div className="roadmap-container">
        <h2 className="section-title">Our Roadmap</h2>
        {roadmapItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="roadmap-card"
          >
            <div className="card-header">
              <span className="quarter">{item.quarter}</span>
              <span
                className="status-badge"
                style={{
                  borderColor: getStatusColor(item.status),
                  color: getStatusColor(item.status),
                }}
              >
                {item.status.replace("-", " ")}
              </span>
            </div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoadmapSection;
