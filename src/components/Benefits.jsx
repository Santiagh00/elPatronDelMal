import React from 'react'
import './Benefits.css'

const Benefits = () => {
  return (
    <section id="benefits" className="benefits-section">
      <div className="container">
        <div className="benefits-header">
          <h2 className="benefits-title">¿Por Qué Elegir El Patrón?</h2>
          <p className="benefits-subtitle">
            Diferenciales que convierten nuestra fórmula en la preferida del mercado.
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-skull"></i>
            </div>
            <h3 className="benefit-card-title">Acción Fulminante</h3>
            <p className="benefit-card-desc">
              Efecto de choque inmediato que paraliza y extermina a los insectos al
              primer contacto o ingestión, evitando proliferación.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-shield-virus"></i>
            </div>
            <h3 className="benefit-card-title">Barrera Prolongada</h3>
            <p className="benefit-card-desc">
              Poder residual activo que continúa protegiendo superficies y rincones
              por semanas consecutivas tras la primera aplicación.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-hand-holding-dollar"></i>
            </div>
            <h3 className="benefit-card-title">Máximo Rendimiento</h3>
            <p className="benefit-card-desc">
              Fórmula concentrada que rinde múltiples diluciones, optimizando tu
              presupuesto frente a aerosoles convencionales de baja duración.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
