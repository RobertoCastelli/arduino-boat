import React, { useState } from "react";
import "../styles/index.css";

const Code = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleLinkClick = (section) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const renderCodeContent = (section) => {
    switch (section) {
      case "boat":
        return "Il codice gestisce l'inizializzazione dei sensori e motori, la navigazione basata su GPS e IMU, e la comunicazione con i moduli seriali.";
      case "motors":
        return "Il codice gestisce l'inizializzazione, il controllo della temperatura e la protezione dei motori, la lettura delle tensioni delle batterie e il comando dei motori per il movimento e la direzione.";
      case "navigation":
        return "Il codice gestisce la navigazione della barca, il controllo dei motori e la gestione dello stato in base ai dati ricevuti dai sensori e dalla modalità operativa.";
      case "sd-card":
        return "Il codice gestisce la registrazione e la lettura dei dati sensoriali e dei checkpoint tramite la scheda SD, fornendo funzionalità di logging e salvataggio delle informazioni raccolte.";
      case "sensors":
        return "Il codice gestisce l'inizializzazione dei sensori, la lettura dei dati, e il calcolo delle direzioni e distanze, fornendo funzionalità di navigazione e monitoraggio per la barca robotica.";
      case "comunications":
        return "Il codice gestisce la comunicazione e l'esecuzione di comandi ricevuti tramite porte seriali, mantenendo il sistema aggiornato e funzionante.";
      default:
        return "";
    }
  };

  return (
    <section className="project-container--snippet">
      <h3>3. Codice</h3>
      <ul>
        <li>
          <button onClick={() => handleLinkClick("boat")} className="nav-link">
            Barca
          </button>
          {activeSection === "boat" && <p>{renderCodeContent("boat")}</p>}
        </li>
        <li>
          <button
            onClick={() => handleLinkClick("motors")}
            className="nav-link"
          >
            Motore
          </button>
          {activeSection === "motors" && <p>{renderCodeContent("motors")}</p>}
        </li>
        <li>
          <button
            onClick={() => handleLinkClick("navigation")}
            className="nav-link"
          >
            Navigazione
          </button>
          {activeSection === "navigation" && (
            <p>{renderCodeContent("navigation")}</p>
          )}
        </li>
        <li>
          <button
            onClick={() => handleLinkClick("sd-card")}
            className="nav-link"
          >
            Scheda SD
          </button>
          {activeSection === "sd-card" && <p>{renderCodeContent("sd-card")}</p>}
        </li>
        <li>
          <button
            onClick={() => handleLinkClick("sensors")}
            className="nav-link"
          >
            Sensori
          </button>
          {activeSection === "sensors" && <p>{renderCodeContent("sensors")}</p>}
        </li>
        <li>
          <button
            onClick={() => handleLinkClick("comunications")}
            className="nav-link"
          >
            Comunicazioni
          </button>
          {activeSection === "comunications" && (
            <p>{renderCodeContent("comunications")}</p>
          )}
        </li>
      </ul>
    </section>
  );
};

export default Code;
