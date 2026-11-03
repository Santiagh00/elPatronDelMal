import React, { useState } from 'react'
import { validateProduct, SCENT_OPTIONS, PRESENTATION_OPTIONS } from '../services/productService'
import './ProductModal.css'

const CATEGORY_OPTIONS = [
  'Insecticida Concentrado',
  'Cebo en Gel',
  'Polvo Seco',
  'Spray Listo para Usar',
  'Accesorios y Aplicación',
  'Desinfectante y Sanitizante'
]

const IMAGE_PRESETS = [
  { label: 'Envase 1000ml (Oficial)', path: '/src/assets/envase.png' },
  { label: 'Presentación Muestra 500ml', path: '/src/assets/ImagenMuestra.png' },
  { label: 'Producto Llanero', path: '/src/assets/ImagenProducto.png' },
  { label: 'Aspersor / Aplicación', path: '/src/assets/Trabajo2.png' },
  { label: 'Fórmula Concentrada', path: '/src/assets/hero.png' }
]

const INITIAL_FORM_STATE = {
  name: '',
  category: 'Insecticida Concentrado',
  presentation: '1000ml',
  scent: 'Lavanda Campestre',
  price: '',
  wholesalePrice: '',
  stock: '',
  targetPests: '',
  description: '',
  imageUrl: '/src/assets/envase.png',
  status: 'active'
}

const ProductModal = ({ isOpen, onClose, onSave, productToEdit, existingProducts }) => {
  const [formData, setFormData] = useState(() => {
    if (productToEdit) {
      return {
        name: productToEdit.name || '',
        category: productToEdit.category || 'Insecticida Concentrado',
        presentation: productToEdit.presentation || '1000ml',
        scent: productToEdit.scent || 'Lavanda Campestre',
        price: productToEdit.price !== undefined ? productToEdit.price.toString() : '',
        wholesalePrice: productToEdit.wholesalePrice !== undefined ? productToEdit.wholesalePrice.toString() : '',
        stock: productToEdit.stock !== undefined ? productToEdit.stock.toString() : '',
        targetPests: productToEdit.targetPests || '',
        description: productToEdit.description || '',
        imageUrl: productToEdit.imageUrl || '/src/assets/envase.png',
        status: productToEdit.status || 'active'
      }
    }
    return INITIAL_FORM_STATE
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [customImageMode, setCustomImageMode] = useState(() => {
    if (productToEdit) {
      return !IMAGE_PRESETS.some((preset) => preset.path === productToEdit.imageUrl)
    }
    return false
  })

  if (!isOpen) return null

  const isEditing = Boolean(productToEdit)

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)

    if (touched[name]) {
      const validationResult = validateProduct(
        updatedData,
        existingProducts,
        productToEdit ? productToEdit.id : null
      )
      setErrors(validationResult.errors)
    }
  }

  const handleFieldBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const validationResult = validateProduct(
      formData,
      existingProducts,
      productToEdit ? productToEdit.id : null
    )
    setErrors(validationResult.errors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Mark all fields touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    const validationResult = validateProduct(
      formData,
      existingProducts,
      productToEdit ? productToEdit.id : null
    )

    if (!validationResult.isValid) {
      setErrors(validationResult.errors)
      return
    }

    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-title-icon">
              <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus'}`}></i>
            </div>
            <div>
              <h2 className="modal-title">
                {isEditing ? 'Actualizar Producto' : 'Crear Nuevo Producto'}
              </h2>
              <p className="modal-subtitle">
                {isEditing
                  ? `Editando catálogo: ${productToEdit.name}`
                  : 'Ingresa los datos para incorporar el producto al catálogo con validaciones'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="product-name">
              Nombre del Producto <span className="required-badge">*</span>
            </label>
            <input
              id="product-name"
              name="name"
              type="text"
              className={`form-input ${touched.name && errors.name ? 'is-invalid' : ''}`}
              placeholder="Ej. El Patrón del Mal - Concentrado 1000ml (Lavanda)"
              value={formData.name}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              autoFocus
            />
            {touched.name && errors.name && (
              <span className="form-error">
                <i className="fas fa-exclamation-circle"></i> {errors.name}
              </span>
            )}
          </div>

          {/* Categoría, Presentación y Aroma */}
          <div className="form-grid-3">
            <div className="form-group">
              <label htmlFor="product-category">
                Categoría <span className="required-badge">*</span>
              </label>
              <select
                id="product-category"
                name="category"
                className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`}
                value={formData.category}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {touched.category && errors.category && (
                <span className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.category}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="product-presentation">
                Presentación <span className="required-badge">*</span>
              </label>
              <input
                id="product-presentation"
                name="presentation"
                list="presentation-list"
                type="text"
                className={`form-input ${touched.presentation && errors.presentation ? 'is-invalid' : ''}`}
                placeholder="1000ml, 500ml..."
                value={formData.presentation}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
              />
              <datalist id="presentation-list">
                {PRESENTATION_OPTIONS.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
              {touched.presentation && errors.presentation && (
                <span className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.presentation}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="product-scent">
                Aroma / Fragancia <span className="required-badge">*</span>
              </label>
              <select
                id="product-scent"
                name="scent"
                className={`form-select ${touched.scent && errors.scent ? 'is-invalid' : ''}`}
                value={formData.scent}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
              >
                {SCENT_OPTIONS.map((scent) => (
                  <option key={scent} value={scent}>
                    {scent}
                  </option>
                ))}
              </select>
              {touched.scent && errors.scent && (
                <span className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.scent}
                </span>
              )}
            </div>
          </div>

          {/* Precios y Stock */}
          <div className="form-grid-3">
            <div className="form-group">
              <label htmlFor="product-price">
                Precio Menudeo (COP) <span className="required-badge">*</span>
              </label>
              <input
                id="product-price"
                name="price"
                type="number"
                min="1"
                step="50"
                className={`form-input ${touched.price && errors.price ? 'is-invalid' : ''}`}
                placeholder="Ej. 12000"
                value={formData.price}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
              />
              {touched.price && errors.price && (
                <span className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.price}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="product-wholesale">
                Precio Mayoreo (COP) <span className="required-badge">*</span>
              </label>
              <input
                id="product-wholesale"
                name="wholesalePrice"
                type="number"
                min="1"
                step="50"
                className={`form-input ${touched.wholesalePrice && errors.wholesalePrice ? 'is-invalid' : ''}`}
                placeholder="Ej. 8500"
                value={formData.wholesalePrice}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
              />
              {touched.wholesalePrice && errors.wholesalePrice && (
                <span className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.wholesalePrice}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="product-stock">
                Stock / Unidades <span className="required-badge">*</span>
              </label>
              <input
                id="product-stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                className={`form-input ${touched.stock && errors.stock ? 'is-invalid' : ''}`}
                placeholder="Ej. 50"
                value={formData.stock}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
              />
              {touched.stock && errors.stock && (
                <span className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.stock}
                </span>
              )}
            </div>
          </div>

          {/* Plagas objetivo */}
          <div className="form-group">
            <label htmlFor="product-pests">
              Plagas Objetivo <span className="required-badge">*</span>
            </label>
            <input
              id="product-pests"
              name="targetPests"
              type="text"
              className={`form-input ${touched.targetPests && errors.targetPests ? 'is-invalid' : ''}`}
              placeholder="Ej. Cucarachas, hormigas, alacranes, arañas, moscas"
              value={formData.targetPests}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
            {touched.targetPests && errors.targetPests && (
              <span className="form-error">
                <i className="fas fa-exclamation-circle"></i> {errors.targetPests}
              </span>
            )}
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label htmlFor="product-description">
              Descripción Técnica y de Uso <span className="required-badge">*</span>
            </label>
            <textarea
              id="product-description"
              name="description"
              className={`form-textarea ${touched.description && errors.description ? 'is-invalid' : ''}`}
              placeholder="Detalla las características, forma de aplicación y rendimiento..."
              value={formData.description}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
            {touched.description && errors.description && (
              <span className="form-error">
                <i className="fas fa-exclamation-circle"></i> {errors.description}
              </span>
            )}
          </div>

          {/* Imagen y Estado */}
          <div className="form-grid-2">
            <div className="form-group">
              <label>Imagen del Producto</label>
              {!customImageMode ? (
                <select
                  name="imageUrl"
                  className="form-select"
                  value={formData.imageUrl}
                  onChange={handleFieldChange}
                >
                  {IMAGE_PRESETS.map((preset) => (
                    <option key={preset.path} value={preset.path}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name="imageUrl"
                  type="text"
                  className="form-input"
                  placeholder="URL de la imagen (https://...)"
                  value={formData.imageUrl}
                  onChange={handleFieldChange}
                />
              )}
              <div style={{ marginTop: '4px' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e63946',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    textDecoration: 'underline'
                  }}
                  onClick={() => setCustomImageMode(!customImageMode)}
                >
                  {customImageMode ? 'Usar imagen predefinida de la marca' : 'O ingresar URL externa'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="product-status">Estado en Catálogo</label>
              <select
                id="product-status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleFieldChange}
              >
                <option value="active">Activo (Visible en tienda)</option>
                <option value="inactive">Inactivo (Oculto)</option>
              </select>
            </div>
          </div>

          {/* Vista previa de imagen */}
          {formData.imageUrl && (
            <div className="image-preview-box">
              <img
                src={formData.imageUrl}
                alt="Vista previa"
                className="preview-thumb"
                onError={(e) => {
                  e.target.src = '/src/assets/envase.png'
                }}
              />
              <div>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
                  Vista previa de presentación y aroma
                </p>
                <p className="form-hint">
                  {formData.name || 'Sin título aún'} &bull; {formData.presentation} &bull; {formData.scent}
                </p>
              </div>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-modal-submit">
              <i className="fas fa-save"></i>
              {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
