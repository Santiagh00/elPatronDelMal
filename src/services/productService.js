const STORAGE_KEY = 'el_patron_products_catalog'

const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'El Patrón del Mal - Concentrado 1000ml',
    category: 'Insecticida Concentrado',
    presentation: '1000ml',
    price: 12000,
    wholesalePrice: 8500,
    stock: 48,
    targetPests: 'Cucarachas, hormigas, arañas, alacranes, pulgas y garrapatas',
    description: 'Fórmula ultra concentrada de choque y residualidad prolongada. Rinde hasta 20 litros de mezcla para interiores y exteriores.',
    imageUrl: '/src/assets/envase.png',
    status: 'active',
    createdAt: '2026-10-01T10:00:00.000Z',
    updatedAt: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 'prod-002',
    name: 'El Patrón del Mal - Concentrado 500ml',
    category: 'Insecticida Concentrado',
    presentation: '500ml',
    price: 7500,
    wholesalePrice: 6500,
    stock: 75,
    targetPests: 'Cucarachas, zancudos, moscas, polillas y chinches',
    description: 'Presentación práctica y de alto rendimiento. Ideal para hogares, locales comerciales y bodegas de tamaño mediano.',
    imageUrl: '/src/assets/ImagenMuestra.png',
    status: 'active',
    createdAt: '2026-10-02T11:00:00.000Z',
    updatedAt: '2026-10-02T11:00:00.000Z'
  },
  {
    id: 'prod-003',
    name: 'El Patrón Gel Cebo Cucarachicida 30g',
    category: 'Cebo en Gel',
    presentation: '30g',
    price: 15000,
    wholesalePrice: 11500,
    stock: 32,
    targetPests: 'Cucaracha alemana, cucaracha americana y chiripas',
    description: 'Atrayente alimenticio de acción en cadena con efecto dominó para nidos y grietas profundas en cocinas y despensas.',
    imageUrl: '/src/assets/ImagenProducto.png',
    status: 'active',
    createdAt: '2026-10-03T09:30:00.000Z',
    updatedAt: '2026-10-03T09:30:00.000Z'
  },
  {
    id: 'prod-004',
    name: 'El Patrón Polvo Seco Polivalente 250g',
    category: 'Polvo Seco',
    presentation: '250g',
    price: 9000,
    wholesalePrice: 7200,
    stock: 22,
    targetPests: 'Hormigas arrieras, termitas, alacranes y grillos',
    description: 'Polvo microencapsulado resistente a la humedad. Se aplica en zócalos, cajas eléctricas y jardines sin manchar.',
    imageUrl: '/src/assets/hero.png',
    status: 'active',
    createdAt: '2026-10-04T14:15:00.000Z',
    updatedAt: '2026-10-04T14:15:00.000Z'
  },
  {
    id: 'prod-005',
    name: 'Bomba Aspersora de Presión Manual 2L',
    category: 'Accesorios y Aplicación',
    presentation: '2 Litros',
    price: 28000,
    wholesalePrice: 22000,
    stock: 14,
    targetPests: 'Aplicación general de insecticidas líquidos',
    description: 'Aspersor con válvula de alta presión de bronce regulable. Permite rocío en niebla fina o chorro directo de largo alcance.',
    imageUrl: '/src/assets/Trabajo2.png',
    status: 'active',
    createdAt: '2026-10-05T08:00:00.000Z',
    updatedAt: '2026-10-05T08:00:00.000Z'
  }
]

export const getProducts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS))
      return INITIAL_PRODUCTS
    }
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS
  } catch (error) {
    console.error('Error fetching products from storage:', error)
    return INITIAL_PRODUCTS
  }
}

export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (error) {
    console.error('Error saving products to storage:', error)
  }
}

export const getProductById = (id) => {
  const products = getProducts()
  return products.find((product) => product.id === id) || null
}

export const createProduct = (productData) => {
  const products = getProducts()
  const timestamp = new Date().toISOString()
  const nextIdNumber = products.length + 1
  const id = `prod-${String(nextIdNumber).padStart(3, '0')}-${Date.now().toString().slice(-4)}`

  const newProduct = {
    id,
    name: productData.name.trim(),
    category: productData.category.trim(),
    presentation: productData.presentation.trim(),
    price: Number(productData.price),
    wholesalePrice: Number(productData.wholesalePrice),
    stock: Number(productData.stock),
    targetPests: productData.targetPests.trim(),
    description: productData.description.trim(),
    imageUrl: productData.imageUrl?.trim() || '/src/assets/envase.png',
    status: productData.status || 'active',
    createdAt: timestamp,
    updatedAt: timestamp
  }

  const updatedProducts = [newProduct, ...products]
  saveProducts(updatedProducts)
  return newProduct
}

export const updateProduct = (id, productData) => {
  const products = getProducts()
  const index = products.findIndex((product) => product.id === id)

  if (index === -1) {
    throw new Error(`Product with ID "${id}" was not found.`)
  }

  const existingProduct = products[index]
  const updatedProduct = {
    ...existingProduct,
    name: productData.name.trim(),
    category: productData.category.trim(),
    presentation: productData.presentation.trim(),
    price: Number(productData.price),
    wholesalePrice: Number(productData.wholesalePrice),
    stock: Number(productData.stock),
    targetPests: productData.targetPests.trim(),
    description: productData.description.trim(),
    imageUrl: productData.imageUrl?.trim() || existingProduct.imageUrl,
    status: productData.status || existingProduct.status,
    updatedAt: new Date().toISOString()
  }

  products[index] = updatedProduct
  saveProducts(products)
  return updatedProduct
}

export const deleteProduct = (id) => {
  const products = getProducts()
  const filteredProducts = products.filter((product) => product.id !== id)
  saveProducts(filteredProducts)
  return filteredProducts
}

export const toggleProductStatus = (id) => {
  const products = getProducts()
  const updatedProducts = products.map((product) => {
    if (product.id === id) {
      return {
        ...product,
        status: product.status === 'active' ? 'inactive' : 'active',
        updatedAt: new Date().toISOString()
      }
    }
    return product
  })
  saveProducts(updatedProducts)
  return updatedProducts
}

export const resetProductsToDefault = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS))
  return INITIAL_PRODUCTS
}

export const validateProduct = (productData, existingProducts = [], currentId = null) => {
  const errors = {}

  // Name validation
  if (!productData.name || !productData.name.trim()) {
    errors.name = 'El nombre del producto es obligatorio.'
  } else if (productData.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres.'
  } else if (productData.name.trim().length > 70) {
    errors.name = 'El nombre no puede exceder 70 caracteres.'
  } else {
    const isDuplicate = existingProducts.some(
      (p) => p.name.trim().toLowerCase() === productData.name.trim().toLowerCase() && p.id !== currentId
    )
    if (isDuplicate) {
      errors.name = 'Ya existe un producto registrado con este mismo nombre.'
    }
  }

  // Category validation
  if (!productData.category || !productData.category.trim()) {
    errors.category = 'Selecciona una categoría válida.'
  }

  // Presentation validation
  if (!productData.presentation || !productData.presentation.trim()) {
    errors.presentation = 'La presentación es obligatoria (ej: 1000ml, 500ml).'
  }

  // Unit Price validation
  if (productData.price === '' || productData.price === null || productData.price === undefined) {
    errors.price = 'El precio unitario es obligatorio.'
  } else {
    const numericPrice = Number(productData.price)
    if (isNaN(numericPrice) || numericPrice <= 0) {
      errors.price = 'El precio unitario debe ser un valor numérico mayor a 0 COP.'
    }
  }

  // Wholesale Price validation
  if (productData.wholesalePrice === '' || productData.wholesalePrice === null || productData.wholesalePrice === undefined) {
    errors.wholesalePrice = 'El precio al por mayor es obligatorio.'
  } else {
    const numericWholesale = Number(productData.wholesalePrice)
    const numericPrice = Number(productData.price)
    if (isNaN(numericWholesale) || numericWholesale <= 0) {
      errors.wholesalePrice = 'El precio al por mayor debe ser mayor a 0 COP.'
    } else if (!isNaN(numericPrice) && numericWholesale > numericPrice) {
      errors.wholesalePrice = 'El precio al por mayor no puede ser superior al precio unitario.'
    }
  }

  // Stock validation
  if (productData.stock === '' || productData.stock === null || productData.stock === undefined) {
    errors.stock = 'El stock es obligatorio.'
  } else {
    const numericStock = Number(productData.stock)
    if (isNaN(numericStock) || numericStock < 0 || !Number.isInteger(numericStock)) {
      errors.stock = 'El stock debe ser un número entero mayor o igual a 0.'
    }
  }

  // Target pests validation
  if (!productData.targetPests || !productData.targetPests.trim()) {
    errors.targetPests = 'Indica las plagas que combate el producto.'
  } else if (productData.targetPests.trim().length < 3) {
    errors.targetPests = 'Ingresa al menos 3 caracteres descriptivos de plagas.'
  }

  // Description validation
  if (!productData.description || !productData.description.trim()) {
    errors.description = 'La descripción es obligatoria.'
  } else if (productData.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres explicativos.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
