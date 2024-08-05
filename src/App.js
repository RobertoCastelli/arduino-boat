// src/App.js
import React from "react";
import "./styles/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectMaterials from "./pages/ProjectMaterials";
import Breadboard from "./pages/Breadboard";
import CodeSnippet from "./pages/CodeSnippet";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ProjectDetails />
        <ProjectMaterials />
        <Breadboard />
        <CodeSnippet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
