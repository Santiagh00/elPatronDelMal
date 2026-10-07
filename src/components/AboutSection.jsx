import React from "react"
import heroImage from "../assets/hero.png"
import "./AboutSection.css"

const MissionIcon = () => (
  <svg className="about-card-icon" viewBox="0 0 24 24" role="img" aria-label="Mission">
    <path
      d="M12 2 15 8.2 22 9.2 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.2 9 8.2 12 2Z"
      fill="currentColor"
    />
  </svg>
)

const VisionIcon = () => (
  <svg className="about-card-icon" viewBox="0 0 24 24" role="img" aria-label="Vision">
    <path
      d="M12 5C6.5 5 2.1 8.4 1 12c1.1 3.6 5.5 7 11 7s9.9-3.4 11-7c-1.1-3.6-5.5-7-11-7Zm0 11.2A4.2 4.2 0 1 1 12 7.8a4.2 4.2 0 0 1 0 8.4Zm0-2A2.2 2.2 0 1 0 12 9.8a2.2 2.2 0 0 0 0 4.4Z"
      fill="currentColor"
    />
  </svg>
)

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <div className="about-visual">
          <div className="about-image-frame">
            <div className="about-image-glow"></div>

            <img
              className="about-product-image"
              src={heroImage}
              alt="El Patrón del Mal pest control product"
            />

            <div className="plains-pride-badge">
              <span className="badge-small-text">Made with</span>
              <strong>Plains Pride</strong>
            </div>
          </div>
        </div>

        <div className="about-content">
          <span className="about-kicker">Our Story</span>
          <h2>Our Roots</h2>

          <p className="about-lead">
            El Patrón del Mal is a plains-born company focused on practical pest
            control solutions for homes and businesses.
          </p>

          <p className="about-description">
            Our current product line is designed for cockroach control and is
            available in three presentations and three fragrance options. We
            combine direct customer service with products created to make pest
            control easier, more convenient, and more pleasant to use.
          </p>

          <div className="about-cards">
            <article className="about-card">
              <div className="about-icon-wrapper">
                <MissionIcon />
              </div>
              <div>
                <h3>Our Mission</h3>
                <p>
                  Provide homes and businesses with practical pest control
                  solutions through clear information, different product
                  presentations, and direct customer support.
                </p>
              </div>
            </article>

            <article className="about-card">
              <div className="about-icon-wrapper">
                <VisionIcon />
              </div>
              <div>
                <h3>Our Vision</h3>
                <p>
                  Grow El Patrón del Mal as a recognized regional brand while
                  expanding its product catalog and preserving reliable,
                  customer-focused service.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
