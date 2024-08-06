// src/ProjectDetails.js
import React from "react";
import "../styles/index.css";
import { VscCode } from "react-icons/vsc";
import { IoBuildOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";

const Intro = () => {
  return (
    <section className="intro-container">
      <div className="intro-icons">
        <div>
          <VscCode size={30} color="cadetblue" />
          <span>difficile</span>
        </div>
        <div>
          <IoBuildOutline size={30} color="cadetblue" />
          <span>facile</span>
        </div>
        <div>
          <IoTimeOutline size={30} color="cadetblue" />
          <span>3 settimane</span>
        </div>
      </div>
      <h3>descrizione del progetto</h3>
      <p>
        Questo progetto consiste nella creazione di un un sistema di navigazione
        e controllo di una barca robotica utilizzando una scheda Arduino.
      </p>
      <p>
        Combina controllo dei motori, navigazione avanzata con GPS e IMU, e
        gestione dei dati tramite scheda SD.
      </p>
      <p>
        Il sistema monitora la temperatura dei motori e la tensione delle
        batterie, regola la velocità e la direzione della barca, e utilizza il
        GPS e l'IMU per mantenere la rotta e analizzare le performance.
      </p>
      <p>
        La comunicazione è gestita tramite porte seriali, garantendo
        aggiornamenti e controlli in tempo reale.
      </p>

      <h3>cos'è arduino</h3>
      <p>
        Arduino è una piattaforma open-source per la prototipazione elettronica,
        composta da una scheda di sviluppo e un ambiente di programmazione.
        Permette di creare progetti interattivi utilizzando sensori, attuatori e
        microcontrollori, rendendo l'elettronica accessibile a tutti.
      </p>

      <h3>indice</h3>
      <ol>
        <li>elenco materiali</li>
        <li>schema breadboard</li>
        <li>codice</li>
        <li>foto</li>
        <li>conclusioni</li>
      </ol>
    </section>
  );
};

export default Intro;
