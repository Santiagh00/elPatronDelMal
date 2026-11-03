import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  resetProductsToDefault
} from '../services/productService'
import ProductModal from './ProductModal'
import './ProductManagement.css'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount)
}

const ProductManagement = () => {
  const [products, setProducts] = useState(() => getProducts())
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [scentFilter, setScentFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [viewMode, setViewMode] = useState('table') // 'table' | 'cards'

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)
  const [productDetail, setProductDetail] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)

  // Notification Toast
  const [toast, setToast] = useState(null)

  const reloadProducts = useCallback(() => {
    setProducts(getProducts())
  }, [])

  useEffect(() => {
    window.addEventListener('storage', reloadProducts)
    return () => window.removeEventListener('storage', reloadProducts)
  }, [reloadProducts])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  // Filtered products list (Consulta)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.targetPests.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.scent && product.scent.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        categoryFilter === 'ALL' || product.category === categoryFilter

      const matchesScent =
        scentFilter === 'ALL' || product.scent === scentFilter

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'active' && product.status === 'active') ||
        (statusFilter === 'inactive' && product.status === 'inactive') ||
        (statusFilter === 'low-stock' && product.stock < 20)

      return matchesSearch && matchesCategory && matchesScent && matchesStatus
    })
  }, [products, searchTerm, categoryFilter, scentFilter, statusFilter])

  // KPIs
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === 'active').length
  const totalStockUnits = products.reduce((sum, p) => sum + (p.stock || 0), 0)
  const totalInventoryValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0
  )

  // Categories list for filter dropdown
  const uniqueCategories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return Array.from(set)
  }, [products])

  // Scents list for filter dropdown
  const uniqueScents = useMemo(() => {
    const set = new Set(products.map((p) => p.scent).filter(Boolean))
    return Array.from(set)
  }, [products])

  // Handlers
  const handleOpenCreateModal = () => {
    setProductToEdit(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (product) => {
    setProductToEdit(product)
    setIsModalOpen(true)
  }

  const handleSaveProduct = (formData) => {
    try {
      if (productToEdit) {
        // Update product with validations
        const updated = updateProduct(productToEdit.id, formData)
        reloadProducts()
        setIsModalOpen(false)
        setProductToEdit(null)
        showToast(`Producto "${updated.name}" actualizado con éxito.`, 'success')
      } else {
        // Create product with validations
        const created = createProduct(formData)
        reloadProducts()
        setIsModalOpen(false)
        showToast(`Producto "${created.name}" registrado correctamente en el catálogo.`, 'success')
      }
    } catch (error) {
      showToast(error.message || 'Error al guardar el producto.', 'error')
    }
  }

  const handleToggleStatus = (id, name) => {
    const updated = toggleProductStatus(id)
    setProducts(updated)
    const product = updated.find((p) => p.id === id)
    showToast(
      `Estado de "${name}" cambiado a ${product.status === 'active' ? 'Activo' : 'Inactivo'}.`,
      'info'
    )
  }

  const handleConfirmDelete = () => {
    if (!productToDelete) return
    deleteProduct(productToDelete.id)
    reloadProducts()
    showToast(`Producto "${productToDelete.name}" eliminado del catálogo.`, 'error')
    setProductToDelete(null)
  }

  const handleResetDefaults = () => {
    if (window.confirm('¿Deseas restaurar los productos predeterminados de El Patrón del Mal?')) {
      const reset = resetProductsToDefault()
      setProducts(reset)
      showToast('Catálogo restablecido con los productos de demostración.', 'info')
    }
  }

  return (
    <section id="admin-catalog" className="admin-section">
      <div className="container">
        {/* Section Header */}
        <div className="admin-header">
          <div className="admin-badge">
            <i className="fas fa-shield-alt"></i> Panel de Administración
          </div>
          <h2 className="admin-title">Gestión de Catálogo de Productos</h2>
          <p className="admin-subtitle">
            Crea, consulta y actualiza los productos con validaciones en tiempo real para
            mantener el catálogo oficial siempre al día.
          </p>
        </div>

        {/* Toast Feedback */}
        {toast && (
          <div className={`admin-toast ${toast.type === 'error' ? 'error-toast' : ''}`}>
            <div className="toast-content">
              <i
                className={`fas ${
                  toast.type === 'error'
                    ? 'fa-exclamation-triangle'
                    : toast.type === 'info'
                    ? 'fa-info-circle'
                    : 'fa-check-circle'
                }`}
              ></i>
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              className="toast-close"
              onClick={() => setToast(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon-wrap primary">
              <i className="fas fa-boxes"></i>
            </div>
            <div className="kpi-data">
              <span className="kpi-value">{totalProducts}</span>
              <span className="kpi-label">Productos Registrados</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap success">
              <i className="fas fa-check-double"></i>
            </div>
            <div className="kpi-data">
              <span className="kpi-value">{activeProducts}</span>
              <span className="kpi-label">Productos Activos</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap warning">
              <i className="fas fa-warehouse"></i>
            </div>
            <div className="kpi-data">
              <span className="kpi-value">{totalStockUnits}</span>
              <span className="kpi-label">Unidades en Stock</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap info">
              <i className="fas fa-coins"></i>
            </div>
            <div className="kpi-data">
              <span className="kpi-value">{formatCurrency(totalInventoryValue)}</span>
              <span className="kpi-label">Valor del Inventario</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Filters, View Modes, Add Button */}
        <div className="admin-toolbar">
          <div className="toolbar-filters">
            {/* Search */}
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por nombre, plagas, categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">Todas las categorías</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Scent Filter */}
            <select
              className="filter-select"
              value={scentFilter}
              onChange={(e) => setScentFilter(e.target.value)}
            >
              <option value="ALL">Todos los aromas</option>
              {uniqueScents.map((scent) => (
                <option key={scent} value={scent}>
                  {scent}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Todos los estados</option>
              <option value="active">Solo Activos</option>
              <option value="inactive">Solo Inactivos</option>
              <option value="low-stock">Bajo Stock (&lt; 20 un)</option>
            </select>
          </div>

          <div className="toolbar-actions">
            {/* View switcher */}
            <div className="view-toggle-group">
              <button
                type="button"
                className={`btn-view-toggle ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Vista en Tabla"
              >
                <i className="fas fa-table-list"></i>
              </button>
              <button
                type="button"
                className={`btn-view-toggle ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
                title="Vista en Tarjetas"
              >
                <i className="fas fa-th-large"></i>
              </button>
            </div>

            {/* Reset button */}
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={handleResetDefaults}
              title="Restablecer datos demo"
              style={{ padding: '9px 12px', fontSize: '0.85rem' }}
            >
              <i className="fas fa-undo"></i>
            </button>

            {/* Add Product Button */}
            <button
              type="button"
              className="btn-add-product"
              onClick={handleOpenCreateModal}
            >
              <i className="fas fa-plus-circle"></i> Nuevo Producto
            </button>
          </div>
        </div>

        {/* Product Display (Consulta) */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-search-minus"></i>
            </div>
            <h3 className="empty-title">No se encontraron productos</h3>
            <p className="empty-text">
              No hay productos que coincidan con los filtros o término de búsqueda.
            </p>
            <button
              type="button"
              className="btn-modal-submit"
              onClick={() => {
                setSearchTerm('')
                setCategoryFilter('ALL')
                setStatusFilter('ALL')
              }}
            >
              Limpiar Filtros
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Aroma</th>
                  <th>Plagas Objetivo</th>
                  <th>Precio Venta</th>
                  <th>Mayorista</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const isLowStock = product.stock > 0 && product.stock < 20
                  const isOutOfStock = product.stock <= 0

                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="table-product-cell">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="table-product-thumb"
                            onError={(e) => {
                              e.target.src = '/src/assets/envase.png'
                            }}
                          />
                          <div>
                            <div className="product-cell-name">{product.name}</div>
                            <div className="product-cell-meta">
                              ID: {product.id} &bull; {product.presentation}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge-category">{product.category}</span>
                      </td>

                      <td>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#202020',
                            border: '1px solid #333',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '0.76rem',
                            color: '#e0e0e0',
                            fontWeight: 600
                          }}
                        >
                          <i className="fas fa-wind" style={{ color: '#e63946', fontSize: '0.7rem' }}></i>
                          {product.scent || 'Neutro'}
                        </span>
                      </td>

                      <td style={{ maxWidth: '240px' }}>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            color: '#b0b0b0',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          title={product.targetPests}
                        >
                          {product.targetPests}
                        </span>
                      </td>

                      <td>
                        <div className="price-main">{formatCurrency(product.price)}</div>
                      </td>

                      <td>
                        <div className="price-wholesale">{formatCurrency(product.wholesalePrice)}</div>
                      </td>

                      <td>
                        <span
                          className={`badge-stock ${
                            isOutOfStock
                              ? 'out-of-stock'
                              : isLowStock
                              ? 'low-stock'
                              : 'in-stock'
                          }`}
                        >
                          <i
                            className={`fas ${
                              isOutOfStock
                                ? 'fa-times-circle'
                                : isLowStock
                                ? 'fa-exclamation-triangle'
                                : 'fa-check-circle'
                            }`}
                          ></i>
                          {product.stock} un
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className={`status-pill ${
                            product.status === 'active' ? 'active' : 'inactive'
                          }`}
                          onClick={() => handleToggleStatus(product.id, product.name)}
                          title="Clic para cambiar estado"
                        >
                          <i
                            className={`fas fa-circle`}
                            style={{ fontSize: '0.45rem' }}
                          ></i>
                          {product.status === 'active' ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>

                      <td>
                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            className="btn-action-icon view"
                            onClick={() => setProductDetail(product)}
                            title="Ver Ficha Técnica"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            type="button"
                            className="btn-action-icon edit"
                            onClick={() => handleOpenEditModal(product)}
                            title="Actualizar / Editar Producto"
                          >
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn-action-icon delete"
                            onClick={() => setProductToDelete(product)}
                            title="Eliminar Producto"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Cards Grid View */
          <div className="admin-cards-grid">
            {filteredProducts.map((product) => {
              const isLowStock = product.stock > 0 && product.stock < 20
              const isOutOfStock = product.stock <= 0

              return (
                <div key={product.id} className="admin-product-card">
                  <div>
                    <div className="card-top">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="card-thumb"
                        onError={(e) => {
                          e.target.src = '/src/assets/envase.png'
                        }}
                      />
                      <div className="card-meta-top">
                        <span className="badge-category">{product.category}</span>
                        <h4 className="card-name">{product.name}</h4>
                        <span style={{ fontSize: '0.78rem', color: '#888' }}>
                          Pres: {product.presentation}
                        </span>
                      </div>
                    </div>

                    <div className="card-details-list">
                      <div className="card-detail-item">
                        <span className="card-detail-label">Precio Unitario:</span>
                        <strong style={{ color: '#fff' }}>{formatCurrency(product.price)}</strong>
                      </div>
                      <div className="card-detail-item">
                        <span className="card-detail-label">Precio Mayorista:</span>
                        <span style={{ color: '#aaa' }}>{formatCurrency(product.wholesalePrice)}</span>
                      </div>
                      <div className="card-detail-item">
                        <span className="card-detail-label">Inventario:</span>
                        <span
                          className={`badge-stock ${
                            isOutOfStock
                              ? 'out-of-stock'
                              : isLowStock
                              ? 'low-stock'
                              : 'in-stock'
                          }`}
                        >
                          {product.stock} unidades
                        </span>
                      </div>
                      <div className="card-detail-item">
                        <span className="card-detail-label">Plagas:</span>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: '#ccc',
                            maxWidth: '160px',
                            textAlign: 'right',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                          }}
                          title={product.targetPests}
                        >
                          {product.targetPests}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-bottom-actions">
                    <button
                      type="button"
                      className={`status-pill ${
                        product.status === 'active' ? 'active' : 'inactive'
                      }`}
                      onClick={() => handleToggleStatus(product.id, product.name)}
                    >
                      {product.status === 'active' ? 'Activo' : 'Inactivo'}
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className="btn-action-icon view"
                        onClick={() => setProductDetail(product)}
                        title="Ver detalle"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        type="button"
                        className="btn-action-icon edit"
                        onClick={() => handleOpenEditModal(product)}
                        title="Actualizar Producto"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        className="btn-action-icon delete"
                        onClick={() => setProductToDelete(product)}
                        title="Eliminar Producto"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modal for Creating and Updating Products with Validations */}
        <ProductModal
          key={isModalOpen ? productToEdit?.id || 'new-modal' : 'closed-modal'}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setProductToEdit(null)
          }}
          onSave={handleSaveProduct}
          productToEdit={productToEdit}
          existingProducts={products}
        />

        {/* Product Technical Details Modal */}
        {productDetail && (
          <div
            className="modal-overlay"
            onClick={() => setProductDetail(null)}
            role="dialog"
          >
            <div
              className="detail-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i
                    className="fas fa-clipboard-list"
                    style={{ color: '#e63946', fontSize: '1.4rem' }}
                  ></i>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>
                    Ficha Técnica del Producto
                  </h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setProductDetail(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <img
                  src={productDetail.imageUrl}
                  alt={productDetail.name}
                  style={{
                    width: '110px',
                    height: '110px',
                    objectFit: 'contain',
                    background: '#1f1f1f',
                    borderRadius: '10px',
                    padding: '8px',
                    border: '1px solid #333'
                  }}
                  onError={(e) => {
                    e.target.src = '/src/assets/envase.png'
                  }}
                />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>
                    {productDetail.name}
                  </h4>
                  <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '6px' }}>
                    Código SKU: <code>{productDetail.id}</code>
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge-category">{productDetail.category}</span>
                    <span className="badge-category" style={{ color: '#ff6b6b' }}>
                      <i className="fas fa-wind"></i> {productDetail.scent}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  background: '#1a1a1a',
                  padding: '16px',
                  borderRadius: '10px',
                  marginBottom: '18px'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#888', display: 'block' }}>
                    PRECIO MENUDEO
                  </span>
                  <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
                    {formatCurrency(productDetail.price)}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#888', display: 'block' }}>
                    PRECIO MAYOREO
                  </span>
                  <strong style={{ fontSize: '1.1rem', color: '#e63946' }}>
                    {formatCurrency(productDetail.wholesalePrice)}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#888', display: 'block' }}>
                    PRESENTACIÓN
                  </span>
                  <span style={{ color: '#eee', fontWeight: 600 }}>
                    {productDetail.presentation}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#888', display: 'block' }}>
                    STOCK DISPONIBLE
                  </span>
                  <span style={{ color: '#eee', fontWeight: 600 }}>
                    {productDetail.stock} unidades
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600 }}>
                  PLAGAS QUE CONTROLA:
                </span>
                <p style={{ color: '#e0e0e0', marginTop: '4px', fontSize: '0.9rem' }}>
                  {productDetail.targetPests}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600 }}>
                  DESCRIPCIÓN DE LA FÓRMULA:
                </span>
                <p
                  style={{
                    color: '#b0b0b0',
                    marginTop: '4px',
                    fontSize: '0.88rem',
                    lineHeight: 1.5
                  }}
                >
                  {productDetail.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setProductDetail(null)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn-modal-submit"
                  onClick={() => {
                    const toEdit = productDetail
                    setProductDetail(null)
                    handleOpenEditModal(toEdit)
                  }}
                >
                  <i className="fas fa-edit"></i> Editar este producto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {productToDelete && (
          <div
            className="modal-overlay"
            onClick={() => setProductToDelete(null)}
            role="dialog"
          >
            <div
              className="detail-modal-box"
              style={{ maxWidth: '440px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(230, 57, 70, 0.15)',
                    color: '#e63946',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    margin: '0 auto 16px'
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                </div>
                <h3 style={{ color: '#fff', marginBottom: '8px' }}>
                  ¿Eliminar Producto del Catálogo?
                </h3>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                  Estás a punto de eliminar{' '}
                  <strong style={{ color: '#fff' }}>"{productToDelete.name}"</strong>.
                  Esta acción no se puede deshacer.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setProductToDelete(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn-modal-submit"
                  style={{ background: '#ff4d4f' }}
                  onClick={handleConfirmDelete}
                >
                  Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductManagement
