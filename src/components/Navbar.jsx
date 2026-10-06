import React, { useState, useEffect } from "react"
import "./Navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-content">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="El Patrón del Mal Logo" className="nav-logo-img" />
        </div>

        <div className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <a href="#home" onClick={(e) => handleNavLinkClick(e, "home")}>Home</a>
          <a href="#about" onClick={(e) => handleNavLinkClick(e, "about")}>Our Story</a>
          <a href="#benefits" onClick={(e) => handleNavLinkClick(e, "benefits")}>Benefits</a>
          <a href="#prices" onClick={(e) => handleNavLinkClick(e, "prices")}>Prices</a>
          <a href="#order" className="btn-order" onClick={(e) => handleNavLinkClick(e, "order")}>Order Now</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
