import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import CatalogSection from './components/CatalogSection'
import ProductManagement from './components/ProductManagement'
import Benefits from './components/Benefits'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <CatalogSection />
        <ProductManagement />
        <Benefits />
      </main>
      <Footer />
    </div>
  )
}

export default App
