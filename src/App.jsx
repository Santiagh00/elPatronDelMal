import React from "react"
import Navbar from "./components/Navbar"
import "./index.css"

function App() {
  return (
    <div>
      <Navbar />
      <div id="home" style={{ height: "100vh", paddingTop: "100px" }}>
        <h1 style={{ textAlign: "center" }}>Welcome to El Patrón del Mal</h1>
      </div>
      <div id="about" style={{ height: "100vh" }}>About Section</div>
      <div id="benefits" style={{ height: "100vh" }}>Benefits Section</div>
      <div id="prices" style={{ height: "100vh" }}>Prices Section</div>
      <div id="order" style={{ height: "100vh" }}>Order Section</div>
    </div>
  )
}

export default App
