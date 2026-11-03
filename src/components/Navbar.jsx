import React, { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#home" className="logo" onClick={(e) => handleNavLinkClick(e, 'home')}>
          <img
            src="/src/assets/logo.png"
            alt="El Patron del Mal Logo"
            className="nav-logo-img"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <span className="nav-logo-text">EL PATRÓN DEL MAL</span>
        </a>

        <div
          className="menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => handleNavLinkClick(e, 'home')}>
            Inicio
          </a>
          <a href="#catalog" onClick={(e) => handleNavLinkClick(e, 'catalog')}>
            Catálogo
          </a>
          <a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')}>
            Nuestra Historia
          </a>
          <a href="#benefits" onClick={(e) => handleNavLinkClick(e, 'benefits')}>
            Beneficios
          </a>
          <a
            href="#admin-catalog"
            className="btn-admin-nav"
            onClick={(e) => handleNavLinkClick(e, 'admin-catalog')}
          >
            <i className="fas fa-user-shield"></i> Administrador
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
