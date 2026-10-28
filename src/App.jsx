import React from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import ContactSection from "./components/ContactSection"
import "./index.css"

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />

      <div id="benefits" style={{ height: "100vh" }}>
        Benefits Section
      </div>

      <div id="prices" style={{ height: "100vh" }}>
        Prices Section
      </div>

      <ContactSection />
    </div>
  )
}

export default App