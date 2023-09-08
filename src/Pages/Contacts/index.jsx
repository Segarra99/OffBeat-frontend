import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ContactsPage() {
  const [activeSection, setActiveSection] = useState("firstContact");

  const handleNextSection = () => {
    if (activeSection === "firstContact") {
      setActiveSection("secondContact");
    } else if (activeSection === "secondContact") {
      setActiveSection("thirdContact");
    } else {
      setActiveSection("thirdContact");
    }
  };

  const handlePreviousSection = () => {
    if (activeSection === "secondContact") {
      setActiveSection("firstContact");
    } else if (activeSection === "thirdContact") {
      setActiveSection("secondContact");
    } else {
      setActiveSection("firstContact");
    }
  };

  return (
    <div className="list-container" style={{ paddingTop: "72px" }}>
      <div className="mainContacts">
        <br />
        <h1>Contacts</h1>
      </div>
      <div className="btnCenter">
      <div className="BtnDiv">
        <button className="contactsBtn" onClick={handlePreviousSection}>
          <ArrowBackIosNewIcon />
        </button>
        <button className="contactsBtn" onClick={handleNextSection}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      </div>
      <div className="insideContacts">
        <section
          className={`firstContact ${
            activeSection === "firstContact" ? "section-visible" : ""
          }`}
        >
          <h3>We're Listening, We're Here</h3>
          <p>
            At OffBeat, we believe that every note counts - not just in music
            but also in how we connect with you, our valued users. Our
            development team is more than just code; we're a group of passionate
            individuals dedicated to creating an exceptional platform for the
            musical community.
          </p>
          <h3>Your Voice Matters:</h3>
          <div>
            <h5>🎤 Your Opinions Shape Us:</h5>
            <p>
              We're not just building an app; we're crafting an experience
              tailored to your needs. We eagerly welcome your thoughts,
              suggestions, and ideas on how we can enhance OffBeat. Your input
              drives our innovations.
            </p>
          </div>
          <h5>🤝 Collaboration Beyond Music:</h5>
          <p>
            Just as musicians harmonize, we aim to harmonize with our users.
            Your feedback is our guiding melody, helping us refine features,
            solve issues, and bring you the best possible platform.
          </p>
        </section>
        <section
          className={`secondContact ${
            activeSection === "secondContact" ? "section-visible" : ""
          }`}
        >
          <h3>Getting in Touch:</h3>
          <h5>💬 Contact Us:</h5>
          <p>
            Have an idea, a question, or a concern? We're all ears. Reach out to
            us at contact@offbeatmusic.com - your message won't get lost in the
            noise, and we promise a timely response.
          </p>
          <div>
            <h5>📣 Share Your Insights:</h5>
            <p>
              We encourage you to share your opinions and suggestions. Our
              regular surveys and feedback forms are your chance to influence
              OffBeat's evolution directly.
            </p>
          </div>
        </section>
        <section
          className={`thirdContact ${
            activeSection === "thirdContact" ? "section-visible" : ""
          }`}
        >
          <h3>Together in Harmony</h3>
          <p>
            OffBeat isn't just an app; it's a community, and you're an integral
            part of it. With your support and insights, we're growing into
            something extraordinary. Thank you for being a part of our journey
            to reshape how musicians connect and collaborate.
          </p>
          <p>
            Have a suggestion, concern, or just want to say hello? Drop us a
            line. Let's keep the conversation alive.
          </p>
          <h3>Stay Creative, Stay Connected, Stay OffBeat!</h3>
        </section>
      </div>
    </div>
  );
}

export default ContactsPage;
