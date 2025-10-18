import React from "react";

interface BannerProps {
  position?: "top" | "center" | "bottom";
}

const Banner: React.FC<BannerProps> = ({ position = "top" }) => {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    padding: "1em 0",
    fontFamily: "'Raleway', sans-serif",
    backgroundColor: "#313131",
    color: "#fff",
    minHeight: position === "center" ? "100vh" : "auto",
    display: "flex",
    justifyContent:
      position === "center"
        ? "center"
        : position === "bottom"
          ? "flex-end"
          : "flex-start",
    alignItems: "center",
    margin: 0,
    boxSizing: "border-box",
  };

  React.useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.querySelector('link[href*="Raleway"]')
    ) {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css?family=Raleway:400,400i,700";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <style>{`
        .banner-marquee {
          position: relative;
          width: 100%;
          height: 1.3em;
          font-size: 5em;
          overflow: hidden;
          margin-bottom: 3em;
        }
        .banner-marquee-text {
          position: absolute;
          min-width: 100%;
          white-space: nowrap;
          animation: marquee 16s infinite linear;
        }
        @keyframes marquee {
          from { transform: translateX(70%); }
          to { transform: translateX(-70%); }
        }
        .banner-marquee-blur {
          position: absolute;
          inset: 0;
          background: #313131;
          background-image:
            linear-gradient(to right, white 1rem, transparent 5%),
            linear-gradient(to left, white 1rem, transparent 5%);
          filter: contrast(10);
          display: grid;
          place-items: center;
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
      `}</style>

      <div style={containerStyle}>
        <div className="banner-marquee">
          <div className="banner-marquee-blur" aria-hidden="true">
            <p className="banner-marquee-text">Join The Waitlist on Telegram</p>
          </div>
          <div className="banner-marquee-clear">
            <p className="banner-marquee-text">Join The Waitlist on Telegram</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
