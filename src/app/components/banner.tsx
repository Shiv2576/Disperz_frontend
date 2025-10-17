import React from "react";

interface BannerProps {
  position?: "top" | "center" | "bottom";
}

const Banner: React.FC<BannerProps> = ({ position = "top" }) => {
  // Container fills full viewport width with no side padding
  const containerStyle: React.CSSProperties = {
    width: "100%",
    padding: "3em 0", // ← No horizontal padding!
    fontFamily: "'Raleway', sans-serif",
    backgroundColor: "#313131",
    color: "#fff",
    fontSize: "24px",
    display: "flex",
    flexDirection: "column",
    minHeight: position === "center" ? "100vh" : "auto",
    justifyContent:
      position === "center"
        ? "center"
        : position === "bottom"
          ? "flex-end"
          : "flex-start",
    boxSizing: "border-box",
    margin: 0,
    // Ensure it stretches even if parent has constraints
    position: "relative",
    left: 0,
    right: 0,
  };

  return (
    <>
      {/* Google Font - only once per app ideally, but included for portability */}
      {typeof document !== "undefined" &&
        !document.querySelector('link[href*="Raleway"]') && (
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:400,400i,700"
            rel="stylesheet"
          />
        )}

      <style>
        {`
          /* Ensure no unwanted spacing */
          .banner-root {
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .banner-marquee {
            position: relative;
            width: 100%;
            height: 1.3em;
            font-size: 5em;
            display: grid;
            place-items: center;
            overflow: hidden;
            margin-bottom: 2em;
          }

          .banner-marquee-text {
            position: absolute;
            min-width: 100%;
            white-space: nowrap;
            animation: banner-marquee-animation 16s infinite linear;
          }

          @keyframes banner-marquee-animation {
            from { transform: translateX(70%); }
            to { transform: translateX(-70%); }
          }

          .banner-marquee-blur {
            position: absolute;
            inset: 0;
            display: grid;
            place-items: center;
            background-color: #313131;
            background-image:
              linear-gradient(to right, white 1rem, transparent 5%),
              linear-gradient(to left, white 1rem, transparent 5%);
            filter: contrast(10);
          }

          .banner-marquee-blur .banner-marquee-text {
            filter: blur(0.07em);
          }

          .banner-marquee-clear {
            position: absolute;
            inset: 0;
            display: grid;
            place-items: center;
          }

          .banner-description {
            margin: 2em auto;
            padding: 0 1em; /* Add side padding only to text for readability */
            max-width: 40ch;
          }
        `}
      </style>

      {/* This div will stretch to full width of its parent — ensure parent allows it */}
      <div className="banner-root" style={containerStyle}>
        <div className="banner-marquee">
          <div className="banner-marquee-blur" aria-hidden="true">
            <p className="banner-marquee-text">Join The Waitlist on Telegram</p>
          </div>
          <div className="banner-marquee-clear">
            <p className="banner-marquee-text">Join The Waitlist on Telegram</p>
          </div>
        </div>

        <p className="banner-description">
          I wanted to make a Gooey Marquee type effect, tried a couple of
          things, and ended up using two layers of text, one with the effect,
          and a clean one on top so that the text remains readable.
        </p>
      </div>
    </>
  );
};

export default Banner;
