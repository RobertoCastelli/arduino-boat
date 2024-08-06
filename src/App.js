// src/App.js
import React from "react";
import "./styles/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Intro from "./pages/Intro";
import Materials from "./pages/Materials";
import Breadboard from "./pages/Breadboard";
import Code from "./pages/Code";
import Photo from "./pages/Photo";
import Conclusions from "./pages/Conclusions";
import ThanksPage from "./pages/ThanksPage";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Intro />
        <Materials />
        <Breadboard />
        <Code />
        <Photo />
        <Conclusions />
        <ThanksPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
