import React, { useState } from "react";
import "../styles/index.css";
import Boat from "../Code/Boat";
import Communications from "../Code/Comunications";
import Motors from "../Code/Motors";
import Navigation from "../Code/Navigation";
import SdCard from "../Code/SdCard";
import Sensors from "../Code/Sensors";

const Code = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleLinkClick = (section) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const renderCodeContent = (section) => {
    switch (section) {
      case "boat":
        return <Boat />;
      case "motors":
        return <Motors />;
      case "navigation":
        return <Navigation />;
      case "sd-card":
        return <SdCard />;
      case "sensors":
        return <Sensors />;
      case "comunications":
        return <Communications />;
      default:
        return "";
    }
  };

  return (
    <section className="code-container">
      <h3>3. Codice</h3>
      <ul>
        <li>
          <div className="code-content">
            <div>
              <strong>BARCA:</strong> gestisce l'inizializzazione dei sensori e
              motori, la navigazione basata su GPS e IMU, e la comunicazione con
              i moduli seriali.
            </div>
            <button
              onClick={() => handleLinkClick("boat")}
              className="nav-link"
            >
              Barca
            </button>
          </div>
          {activeSection === "boat" && <p>{renderCodeContent("boat")}</p>}
        </li>
        <li>
          <div className="code-content">
            <div>
              <strong>MOTORE:</strong> Il codice gestisce l'inizializzazione, il
              controllo della temperatura e la protezione dei motori, la lettura
              delle tensioni delle batterie e il comando dei motori per il
              movimento e la direzione.
            </div>
            <button
              onClick={() => handleLinkClick("motors")}
              className="nav-link"
            >
              Motore
            </button>
          </div>
          {activeSection === "motors" && <p>{renderCodeContent("motors")}</p>}
        </li>
        <li>
          <div className="code-content">
            <div>
              <strong>NAVIGAZIONE:</strong> gestisce la navigazione della barca,
              il controllo dei motori e la gestione dello stato in base ai dati
              ricevuti dai sensori e dalla modalità operativa.
            </div>
            <button
              onClick={() => handleLinkClick("navigation")}
              className="nav-link"
            >
              Navigazione
            </button>
          </div>
          {activeSection === "navigation" && (
            <p>{renderCodeContent("navigation")}</p>
          )}
        </li>
        <li>
          <div className="code-content">
            <div>
              <strong>SCHEDA SD:</strong> gestisce la registrazione e la lettura
              dei dati sensoriali e dei checkpoint tramite la scheda SD,
              fornendo funzionalità di logging e salvataggio delle informazioni
              raccolte.
            </div>
            <button
              onClick={() => handleLinkClick("sd-card")}
              className="nav-link"
            >
              Scheda SD
            </button>
          </div>
          {activeSection === "sd-card" && <p>{renderCodeContent("sd-card")}</p>}
        </li>
        <li>
          <div className="code-content">
            <div>
              <strong>SENSORI:</strong> gestisce l'inizializzazione dei sensori,
              la lettura dei dati, e il calcolo delle direzioni e distanze,
              fornendo funzionalità di navigazione e monitoraggio per la barca
              robotica.
            </div>
            <button
              onClick={() => handleLinkClick("sensors")}
              className="nav-link"
            >
              Sensori
            </button>
          </div>
          {activeSection === "sensors" && <p>{renderCodeContent("sensors")}</p>}
        </li>
        <li>
          <div className="code-content">
            <div>
              <strong>COMUNICAZIONI:</strong> gestisce la comunicazione e
              l'esecuzione di comandi ricevuti tramite porte seriali, mantenendo
              il sistema aggiornato e funzionante.
            </div>
            <button
              onClick={() => handleLinkClick("comunications")}
              className="nav-link"
            >
              Comunicazioni
            </button>
          </div>
          {activeSection === "comunications" && (
            <p>{renderCodeContent("comunications")}</p>
          )}
        </li>
      </ul>
    </section>
  );
};

export default Code;
