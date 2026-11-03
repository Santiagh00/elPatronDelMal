import React from 'react'
import './Footer.css'

const CURRENT_YEAR = 2026

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img
              src="/src/assets/logo.png"
              alt="Insecticida El Patron del Mal"
              className="footer-logo-img"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <p className="footer-desc">
              Empresa llanera especializada en la fabricación y distribución de
              insecticidas de choque y protección continua para hogares, campo y bodegas.
            </p>
            <div className="footer-social-links">
              <a
                href="https://wa.me/573113179094"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="https://www.instagram.com/insecticidaelpatrondelmal/"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Navegación</h4>
            <div className="footer-links-list">
              <a href="#home">Inicio</a>
              <a href="#catalog">Catálogo de Productos</a>
              <a href="#admin-catalog">Panel de Administración</a>
              <a href="#about">Nuestra Historia</a>
              <a href="#benefits">Beneficios</a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Atención & Envíos</h4>
            <div className="footer-links-list">
              <span><i className="fas fa-truck" style={{ color: '#e63946', marginRight: '6px' }}></i> Envíos a todo el país</span>
              <span><i className="fas fa-clock" style={{ color: '#e63946', marginRight: '6px' }}></i> Despacho en 24 horas</span>
              <span><i className="fas fa-money-bill-wave" style={{ color: '#e63946', marginRight: '6px' }}></i> Todos los medios de pago</span>
              <span><i className="fas fa-phone" style={{ color: '#e63946', marginRight: '6px' }}></i> +57 311 317 9094</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {CURRENT_YEAR} El Patrón del Mal. Todos los derechos reservados.</p>
          <p>Catálogo y Administración de Productos &bull; Santiago Gutiérrez Henao & Miguel Moreno Serna</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
