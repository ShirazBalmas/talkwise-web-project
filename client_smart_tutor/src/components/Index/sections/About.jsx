import React from 'react';

const About = () => (
  <section id="about" className="content-section">
    <div className="section-inner">
      <h2 className="section-title">About Us</h2>
      <div className="section-content">
        <div className="about-grid">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              We are a team of passionate computer science students dedicated to revolutionizing English language learning through artificial intelligence. Our goal is to make language learning accessible, engaging, and effective for everyone.
            </p>
          </div>
          
          <div className="about-card">
            <h3>Smart Tutor</h3>
            <p>
              Smart Tutor is our innovative platform that combines cutting-edge AI technology with proven language learning methodologies. We're creating a friendly and intelligent environment where users can improve their English skills naturally and effectively.
            </p>
          </div>

          <div className="about-card">
            <h3>Our Team</h3>
            <p>
              Meet our dedicated team of third-year computer science students:
            </p>
            <ul className="team-list">
              <li>Roni</li>
              <li>Shiraz</li>
              <li>Shir</li>
              <li>Matan</li>
              <li>Eli</li>
              <li>Yoni</li>
            </ul>
          </div>

          <div className="about-card">
            <h3>Our Vision</h3>
            <p>
              We envision a world where language barriers are broken down through technology. By combining our technical expertise with our passion for education, we're building a platform that makes learning English more accessible and enjoyable than ever before.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;