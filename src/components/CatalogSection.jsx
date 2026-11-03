import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getProducts, SCENT_OPTIONS, PRESENTATION_OPTIONS } from '../services/productService'
import './CatalogSection.css'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount)
}

const SCENT_META = {
  'Lavanda Campestre': {
    icon: 'fa-spa',
    className: 'scent-lavanda',
    recommendation: 'Recomendado para dormitorios, salas y hogares con mascotas. Deja una fragancia suave y relajante.'
  },
  'Cítrico Limón': {
    icon: 'fa-lemon',
    className: 'scent-citrico',
    recommendation: 'Recomendado para patios, terrazas, garajes y bodegas. Neutraliza olores pesados con frescura cítrica.'
  },
  'Neutro / Sin Olor': {
    icon: 'fa-shield-halved',
    className: 'scent-neutro',
    recommendation: 'Recomendado para cocinas, despensas, restaurantes y personas con sensibilidad alérgica u olfativa.'
  },
  'Eucalipto & Menta': {
    icon: 'fa-leaf',
    className: 'scent-eucalipto',
    recommendation: 'Recomendado para zonas con zancudos y mosquitos. Efecto repelente natural y aroma balsámico.'
  },
  'Pino Silvestre': {
    icon: 'fa-tree',
    className: 'scent-pino',
    recommendation: 'Recomendado para sótanos, jardines y áreas perimetrales. Aroma a bosque fresco de larga persistencia.'
  }
}

const PRESENTATION_META = {
  '1000ml': '1 Litro Concentrado — Rinde hasta 20L de mezcla. Máxima economía y rendimiento.',
  '500ml': '500ml Concentrado — Rinde hasta 10L de mezcla. Práctico y fácil de almacenar.',
  '250ml': '250g Polvo Seco — Aplicación directa sin diluir en zócalos y grietas.',
  '30g': '30g Cebo en Gel — Aplicación puntual en gotas para cocinas.',
  '2 Litros': 'Bomba Aspersora 2L — Equipo de aplicación presurizada.'
}

const CatalogSection = () => {
  const [products, setProducts] = useState(() => getProducts())
  const [selectedPresentation, setSelectedPresentation] = useState('ALL')
  const [selectedScent, setSelectedScent] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [inspectingProduct, setInspectingProduct] = useState(null)

  const reloadProducts = useCallback(() => {
    setProducts(getProducts())
  }, [])

  useEffect(() => {
    window.addEventListener('storage', reloadProducts)
    const interval = setInterval(reloadProducts, 2000)
    return () => {
      window.removeEventListener('storage', reloadProducts)
      clearInterval(interval)
    }
  }, [reloadProducts])

  // Active products for customer
  const activeProducts = useMemo(() => {
    return products.filter((p) => p.status === 'active')
  }, [products])

  // Counts per presentation
  const presentationCounts = useMemo(() => {
    const counts = { ALL: activeProducts.length }
    PRESENTATION_OPTIONS.forEach((p) => {
      counts[p] = activeProducts.filter((prod) => prod.presentation === p).length
    })
    return counts
  }, [activeProducts])

  // Counts per scent
  const scentCounts = useMemo(() => {
    const counts = { ALL: activeProducts.length }
    SCENT_OPTIONS.forEach((s) => {
      counts[s] = activeProducts.filter((prod) => prod.scent === s).length
    })
    return counts
  }, [activeProducts])

  // Filtered products according to presentation, scent and search query
  const filteredProducts = useMemo(() => {
    return activeProducts.filter((product) => {
      const matchesPresentation =
        selectedPresentation === 'ALL' || product.presentation === selectedPresentation

      const matchesScent =
        selectedScent === 'ALL' || product.scent === selectedScent

      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.targetPests.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.scent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.presentation.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesPresentation && matchesScent && matchesSearch
    })
  }, [activeProducts, selectedPresentation, selectedScent, searchQuery])

  const handleResetFilters = () => {
    setSelectedPresentation('ALL')
    setSelectedScent('ALL')
    setSearchQuery('')
  }

  const hasActiveFilters =
    selectedPresentation !== 'ALL' || selectedScent !== 'ALL' || searchQuery !== ''

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        {/* Header */}
        <div className="catalog-header">
          <div className="catalog-badge">
            <i className="fas fa-store"></i> Catálogo de Productos
          </div>
          <h2 className="catalog-title">Encuentra Tu Presentación y Aroma Ideal</h2>
          <p className="catalog-subtitle">
            Personaliza tu consulta según el tamaño que necesitas y tu fragancia preferida.
            Todos nuestros insecticidas garantizan erradicación letal y protección prolongada.
          </p>
        </div>

        {/* Consultation Panel: Presentation and Scent Filters */}
        <div className="catalog-consultation-panel">
          {/* Row 1: Filter by Presentation */}
          <div className="filter-row">
            <div className="filter-row-label">
              <i className="fas fa-boxes-stacked" style={{ color: '#e63946' }}></i>
              <span>1. Elige la Presentación:</span>
            </div>
            <div className="filter-chips-wrap">
              <button
                type="button"
                className={`filter-chip ${selectedPresentation === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedPresentation('ALL')}
              >
                Todas las Presentaciones
                <span className="chip-counter">{presentationCounts.ALL}</span>
              </button>
              {PRESENTATION_OPTIONS.map((pres) => (
                <button
                  key={pres}
                  type="button"
                  className={`filter-chip ${selectedPresentation === pres ? 'active' : ''}`}
                  onClick={() => setSelectedPresentation(pres)}
                >
                  <i className="fas fa-flask"></i>
                  {pres}
                  <span className="chip-counter">{presentationCounts[pres] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Filter by Scent / Aroma */}
          <div className="filter-row">
            <div className="filter-row-label">
              <i className="fas fa-wind" style={{ color: '#e63946' }}></i>
              <span>2. Elige el Aroma / Fragancia:</span>
            </div>
            <div className="filter-chips-wrap">
              <button
                type="button"
                className={`filter-chip ${selectedScent === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedScent('ALL')}
              >
                Todos los Aromas
                <span className="chip-counter">{scentCounts.ALL}</span>
              </button>
              {SCENT_OPTIONS.map((scent) => {
                const meta = SCENT_META[scent] || { icon: 'fa-spray-can', className: '' }
                return (
                  <button
                    key={scent}
                    type="button"
                    className={`filter-chip ${meta.className} ${selectedScent === scent ? 'active' : ''}`}
                    onClick={() => setSelectedScent(scent)}
                  >
                    <i className={`fas ${meta.icon}`}></i>
                    {scent}
                    <span className="chip-counter">{scentCounts[scent] || 0}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Row 3: Search within results */}
          <div className="catalog-search-row">
            <div className="catalog-search-box">
              <i className="fas fa-search catalog-search-icon"></i>
              <input
                type="text"
                className="catalog-search-input"
                placeholder="Buscar por plaga (ej. cucarachas, zancudos, alacranes), aroma o nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                className="btn-clear-filters"
                onClick={handleResetFilters}
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        </div>

        {/* Summary Feedback Bar */}
        <div className="catalog-summary-bar">
          <div className="summary-badges">
            <span>Resultados: <strong>{filteredProducts.length}</strong> productos encontrados</span>
            {selectedPresentation !== 'ALL' && (
              <span className="active-filter-tag">
                <i className="fas fa-flask"></i> Presentación: {selectedPresentation}
              </span>
            )}
            {selectedScent !== 'ALL' && (
              <span className="active-filter-tag">
                <i className="fas fa-wind"></i> Aroma: {selectedScent}
              </span>
            )}
            {searchQuery && (
              <span className="active-filter-tag">
                <i className="fas fa-search"></i> "{searchQuery}"
              </span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={handleResetFilters}
            >
              Mostrar Todo el Catálogo
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-empty-box">
            <div className="catalog-empty-icon">
              <i className="fas fa-wind"></i>
            </div>
            <h3 style={{ color: '#ffffff', marginBottom: '8px' }}>
              No hay productos con esa combinación exacta
            </h3>
            <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto 20px' }}>
              No encontramos productos en presentación{' '}
              <strong>"{selectedPresentation !== 'ALL' ? selectedPresentation : 'cualquiera'}"</strong> con
              aroma <strong>"{selectedScent !== 'ALL' ? selectedScent : 'cualquiera'}"</strong>.
              Prueba cambiando el aroma o seleccionando otra presentación.
            </p>
            <button
              type="button"
              className="btn-catalog-order"
              onClick={handleResetFilters}
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredProducts.map((product) => {
              const scentMeta = SCENT_META[product.scent] || {
                icon: 'fa-spray-can',
                className: 'scent-neutro'
              }

              return (
                <div key={product.id} className="catalog-card">
                  <div>
                    {/* Top Badges: Presentation & Scent */}
                    <div className="card-top-badges">
                      <span className="badge-presentation">
                        <i className="fas fa-flask"></i> {product.presentation}
                      </span>
                      <span className={`badge-scent ${scentMeta.className}`}>
                        <i className={`fas ${scentMeta.icon}`}></i> {product.scent}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="catalog-card-image-wrap">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="catalog-card-img"
                        onError={(e) => {
                          e.target.src = '/src/assets/envase.png'
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="catalog-card-category">{product.category}</div>
                    <h3 className="catalog-card-title">{product.name}</h3>
                    <p className="catalog-card-description">{product.description}</p>

                    {/* Target Pests Tag */}
                    <div className="catalog-pests-tag" title={product.targetPests}>
                      <i
                        className="fas fa-crosshairs"
                        style={{ color: '#e63946', marginRight: '6px' }}
                      ></i>
                      <strong>Combate:</strong> {product.targetPests}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="catalog-card-footer">
                    <div className="catalog-card-price-block">
                      <span className="catalog-price-label">Precio al Público</span>
                      <span className="catalog-price-val">{formatCurrency(product.price)}</span>
                    </div>

                    <div className="catalog-actions-group">
                      <button
                        type="button"
                        className="btn-catalog-info"
                        onClick={() => setInspectingProduct(product)}
                        title="Ver Guía de Aroma y Ficha del Producto"
                      >
                        <i className="fas fa-circle-info"></i>
                      </button>

                      <a
                        href={`https://wa.me/573113179094?text=Hola,%20deseo%20ordenar:%20${encodeURIComponent(
                          product.name
                        )}%20(Presentaci%C3%B3n:%20${encodeURIComponent(
                          product.presentation
                        )},%20Aroma:%20${encodeURIComponent(product.scent)})`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-catalog-order"
                      >
                        <i className="fab fa-whatsapp"></i> Pedir
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Customer Product & Scent Guide Modal */}
        {inspectingProduct && (
          <div
            className="modal-overlay"
            onClick={() => setInspectingProduct(null)}
            role="dialog"
          >
            <div
              className="client-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '18px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i
                    className="fas fa-sparkles"
                    style={{ color: '#e63946', fontSize: '1.3rem' }}
                  ></i>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>
                    Guía de Selección del Producto
                  </h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setInspectingProduct(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '18px', marginBottom: '16px' }}>
                <img
                  src={inspectingProduct.imageUrl}
                  alt={inspectingProduct.name}
                  style={{
                    width: '95px',
                    height: '95px',
                    objectFit: 'contain',
                    background: '#222',
                    borderRadius: '10px',
                    padding: '6px',
                    border: '1px solid #333'
                  }}
                  onError={(e) => {
                    e.target.src = '/src/assets/envase.png'
                  }}
                />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '6px' }}>
                    {inspectingProduct.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge-presentation">{inspectingProduct.presentation}</span>
                    <span
                      className={`badge-scent ${
                        (SCENT_META[inspectingProduct.scent] || {}).className || 'scent-neutro'
                      }`}
                    >
                      {inspectingProduct.scent}
                    </span>
                  </div>
                  <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.2rem', marginTop: '8px' }}>
                    {formatCurrency(inspectingProduct.price)} COP
                  </div>
                </div>
              </div>

              {/* Scent Guide Info */}
              <div className="scent-guide-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <i className="fas fa-wand-magic-sparkles" style={{ color: '#e63946' }}></i>
                  <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                    ¿Por qué elegir el aroma {inspectingProduct.scent}?
                  </strong>
                </div>
                <p style={{ color: '#cccccc', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {SCENT_META[inspectingProduct.scent]?.recommendation ||
                    'Aroma desarrollado con aceites esenciales para maximizar el confort tras la aplicación.'}
                </p>
              </div>

              {/* Presentation Guide Info */}
              <div style={{ marginBottom: '16px', background: '#181818', padding: '12px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <i className="fas fa-flask" style={{ color: '#e63946' }}></i>
                  <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>
                    Rendimiento de la presentación {inspectingProduct.presentation}:
                  </strong>
                </div>
                <p style={{ color: '#aaaaaa', fontSize: '0.84rem' }}>
                  {PRESENTATION_META[inspectingProduct.presentation] ||
                    'Presentación oficial con alta concentración y poder residual.'}
                </p>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '20px' }}>
                <strong style={{ color: '#888', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Detalles y Aplicación:
                </strong>
                <p style={{ color: '#ddd', fontSize: '0.88rem', marginTop: '4px', lineHeight: 1.5 }}>
                  {inspectingProduct.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setInspectingProduct(null)}
                >
                  Cerrar
                </button>
                <a
                  href={`https://wa.me/573113179094?text=Hola,%20deseo%20ordenar:%20${encodeURIComponent(
                    inspectingProduct.name
                  )}%20(Presentaci%C3%B3n:%20${encodeURIComponent(
                    inspectingProduct.presentation
                  )},%20Aroma:%20${encodeURIComponent(inspectingProduct.scent)})`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-catalog-order"
                >
                  <i className="fab fa-whatsapp"></i> Pedir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CatalogSection
