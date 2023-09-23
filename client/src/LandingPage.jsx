// src/components/LandingPage.js
import React from "react";
import "./LandingPage.css"; // Import your CSS file

function LandingPage() {
  return (
    <div className="landing-page" style={{ zIndex: 1, position: "relative" }}>
      {/* <video autoPlay muted loop className="video-background">
        <source src="../bg.mp4" type="video/mp4" /> */}
      <h1 style={{ zIndex: 1, position: "relative" }}>
        Welcome to <strong>Cancer Blink</strong>
      </h1>
      <p style={{ zIndex: 1, position: "relative" }}>
        In the fight against cancer, priority is not a luxury, its a lifeline.
      </p>
      <div className="buttons-div">
        <button onClick={() => (window.location.href = "/chatbot")}>
          <strong>Diagnose For Patient</strong>
        </button>
        <button onClick={() => (window.location.href = "/priority-list")}>
          <strong>Priority List For Doctors</strong>
        </button>
      </div>
      {/* </video> */}
    </div>
  );
}

export default LandingPage;
