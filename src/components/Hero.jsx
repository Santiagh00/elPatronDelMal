import React from "react"
import heroImage from "../assets/hero.png"
import "./Hero.css"

const Hero = () => {
  const scrollToSection = (targetId) => {
    const target = document.getElementById(targetId)

    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
        <div className="hero-copy">
          <span className="hero-eyebrow">Powerful pest control</span>

          <h1 className="glitch-title" data-text="SAY GOODBYE TO INSECTS!">
            SAY GOODBYE TO INSECTS!
          </h1>

          <p className="hero-subtitle">
            The brute force of the plains concentrated in a single product.
            El Patrón del Mal does not forgive pests.
          </p>

          <div className="hero-actions">
            <button
              className="hero-button hero-button-primary"
              type="button"
              onClick={() => scrollToSection("order")}
            >
              Buy Now
            </button>

            <a
              className="hero-instagram"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <button
              className="hero-button hero-button-secondary"
              type="button"
              onClick={() => scrollToSection("about")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="El Patrón del Mal product">
          <div className="hero-product-glow"></div>
          <span className="spark spark-one"></span>
          <span className="spark spark-two"></span>
          <span className="spark spark-three"></span>

          <div className="hero-product-frame">
            <img
              className="hero-product-image"
              src={heroImage}
              alt="El Patrón del Mal product"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
