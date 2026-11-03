import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/productService'
import './CatalogSection.css'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount)
}

const CatalogSection = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const handleUpdate = () => {
      const allProducts = getProducts()
      // Only active products in the customer catalog
      setProducts(allProducts.filter((p) => p.status === 'active'))
    }

    handleUpdate()

    // Listen to storage changes or periodic update
    window.addEventListener('storage', handleUpdate)
    const interval = setInterval(handleUpdate, 1500)
    return () => {
      window.removeEventListener('storage', handleUpdate)
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        <div className="catalog-header">
          <div className="catalog-badge">
            <i className="fas fa-tag"></i> Catálogo Oficial
          </div>
          <h2 className="catalog-title">Nuestros Productos Disponibles</h2>
          <p className="catalog-subtitle">
            Explora las presentaciones y soluciones de choque de El Patrón del Mal.
            Formulaciones certificadas para erradicación y prevención de insectos.
          </p>
        </div>

        <div className="catalog-grid">
          {products.map((product) => (
            <div key={product.id} className="catalog-card">
              <span className="catalog-card-badge">{product.presentation}</span>

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

              <div>
                <div className="catalog-card-category">{product.category}</div>
                <h3 className="catalog-card-title">{product.name}</h3>
                <p className="catalog-card-description">{product.description}</p>

                <div className="catalog-pests-tag">
                  <i
                    className="fas fa-bug"
                    style={{ color: '#e63946', marginRight: '6px' }}
                  ></i>
                  <strong>Combate:</strong> {product.targetPests}
                </div>
              </div>

              <div className="catalog-card-footer">
                <div className="catalog-card-price-block">
                  <span className="catalog-price-label">Precio Unitario</span>
                  <span className="catalog-price-val">{formatCurrency(product.price)}</span>
                </div>

                <a
                  href={`https://wa.me/573113179094?text=Hola,%20deseo%20ordenar%20el%20producto:%20${encodeURIComponent(
                    product.name
                  )}%20(${product.presentation})`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-catalog-order"
                >
                  <i className="fab fa-whatsapp"></i> Pedir
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CatalogSection
