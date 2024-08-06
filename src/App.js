// src/App.js
import React from "react";
import "./styles/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectMaterials from "./pages/ProjectMaterials";
import ProjectBreadboard from "./pages/ProjectBreadboard";
import CodeSnippet from "./pages/CodeSnippet";
import ProjectFoto from "./pages/ProjectFoto";
import ProjectConclusion from "./pages/ProjectConclusion";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ProjectDetails />
        <ProjectMaterials />
        <ProjectBreadboard />
        <CodeSnippet />
        <ProjectFoto />
        <ProjectConclusion />
      </main>
      <Footer />
    </div>
  );
}

export default App;
