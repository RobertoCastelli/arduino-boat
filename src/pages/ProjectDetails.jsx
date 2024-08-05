// src/ProjectDetails.js
import React from "react";
import "../styles/index.css";

const ProjectDetails = () => {
  return (
    <section className="project-container--details">
      <h3>cos'è arduino</h3>
      <p>
        Arduino è una piattaforma open-source per la prototipazione elettronica,
        composta da una scheda di sviluppo e un ambiente di programmazione.
        Permette di creare progetti interattivi utilizzando sensori, attuatori e
        microcontrollori, rendendo l'elettronica accessibile a tutti.
      </p>
      <h3>descrizione del progetto</h3>
      In questo progetto, ho creato un motore di barca personalizzato
      utilizzando una scheda Arduino. Questo progetto DIY (fai-da-te) dimostra
      come sia possibile costruire un motore funzionale per una barca
      utilizzando componenti elettronici comuni e la programmazione.
      <p>
        Seguendo le nostre istruzioni, potrai realizzare un motore di barca che
        ti permetterà di navigare con facilità.
      </p>
      <h3>livello di difficoltà</h3>
      <p>4/5</p>
    </section>
  );
};

export default ProjectDetails;
