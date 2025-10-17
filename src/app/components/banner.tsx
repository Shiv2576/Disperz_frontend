import React from "react";

interface BannerProps {
  position?: "top" | "center" | "bottom";
}

const Banner: React.FC<BannerProps> = ({ position = "top" }) => {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    padding: "3em 0",
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
    position: "relative",
  };

  return (
    <>
      {typeof document !== "undefined" &&
        !document.querySelector('link[href*="Raleway"]') && (
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:400,400i,700"
            rel="stylesheet"
          />
        )}

      <style>
        {`
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
            margin-bottom: 3em;
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

          /* Footer Styles */
          .site-footer {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5em;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 2em;
            font-size: 16px;
            color: #F5F5F5; /* Soft white */
          }

          .footer-column {
            flex: 1;
            min-width: 180px;
          }

          .footer-column h3 {
            color: #C0A080; /* Warm beige */
            margin-bottom: 1em;
            font-weight: 700;
            font-size: 1.1em;
          }

          .footer-column p,
          .footer-column address,
          .footer-column a {
            color: #F5F5F5;
            text-decoration: none;
            line-height: 1.6;
            font-weight: 400;
          }

          .footer-column a:hover {
            color: #FFFFFF; /* Pure white on hover */
          }

          .footer-column address {
            font-style: normal;
          }

          .footer-bottom {
            margin-top: 2.5em;
            padding-top: 1.5em;
            border-top: 1px solid #444;
            text-align: center;
            color: #F5F5F5;
            font-size: 0.9em;
            width: 100%;
          }

          @media (max-width: 650px) {
            .site-footer {
              flex-direction: column;
              gap: 1.5em;
            }
          }

          .footer-top-line {
            height: 2px;
            background: #C0A080; /* Warm beige — elegant and subtle */
            width: 100%;
            max-width: 1200px;
            margin: 0 auto 2.5em;
            border-radius: 1px;
            /* Optional: add a soft glow */
            box-shadow: 0 0 6px rgba(192, 160, 128, 0.3);
          }
        `}
      </style>

      <div className="banner-root" style={containerStyle}>
        <div className="banner-marquee">
          <div className="banner-marquee-blur" aria-hidden="true">
            <p className="banner-marquee-text">Join The Waitlist on Telegram</p>
          </div>
          <div className="banner-marquee-clear">
            <p className="banner-marquee-text">Join The Waitlist on Telegram</p>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="site-footer">
          {/* Top accent line */}
          <div className="footer-top-line"></div>

          <div className="footer-column">
            <h3>About</h3>
            <p>
              We blend design and technology to create meaningful digital
              experiences.
            </p>
          </div>

          <div className="footer-column">
            <h3>Product</h3>
            <p>A next-gen platform for creators, teams, and visionaries.</p>
          </div>

          <div className="footer-column">
            <h3>Location</h3>
            <address>
              Studio 7B, Creative Hub
              <br />
              Berlin, Germany
            </address>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <p>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </p>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} Your Brand. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Banner;
