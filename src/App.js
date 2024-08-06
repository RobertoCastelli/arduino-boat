import React from "react";
import "./styles/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Intro from "./pages/Intro";
import Materials from "./pages/Materials";
import Breadboard from "./pages/Breadboard";
import Code from "./pages/Code";
import Photos from "./pages/Photos";
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
        <Photos />
        <Conclusions />
        <ThanksPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
