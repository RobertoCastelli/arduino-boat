import React from "react";

const Motors = () => {
  return (
    <div className="code-motors">
      <h1>Descrizione del Controllo dei Motori</h1>
      <p>
        Il codice gestisce il controllo e la protezione dei motori di una barca
        robotica. Ecco una sintesi delle sue funzioni principali:
      </p>
      <ul>
        <li>
          <strong>
            <code>initMotors()</code>
          </strong>
          :<br />
          Inizializza i pin dei motori e configura i pin di abilitazione e flag.
          Imposta i valori iniziali dei PWM dei motori e abilita i motori.
        </li>
        <li>
          <strong>
            <code>checkMotorsOverload()</code>
          </strong>
          :<br />
          Controlla i pin di flag dei motori per verificare sovraccarichi.
          Disabilita i motori se viene rilevato un sovraccarico.
        </li>
        <li>
          <strong>
            <code>checkMotorsTemp()</code>
          </strong>
          :<br />
          Legge e calcola la temperatura dei motori dai pin analogici.
          Restituisce <code>true</code> se la temperatura di uno dei motori
          supera i 45°C.
        </li>
        <li>
          <strong>
            <code>enableMotors()</code>
          </strong>
          :<br />
          Abilita i motori impostando i pin di abilitazione ai valori
          specificati.
        </li>
        <li>
          <strong>
            <code>driveMotors(int MotorDir, int MotorSpeed)</code>
          </strong>
          :<br />
          Calcola e imposta i valori di PWM per i motori in base alla direzione
          e alla velocità desiderate. Regola la velocità dei motori e logga le
          informazioni di controllo.
        </li>
        <li>
          <strong>
            <code>checkBattery()</code>
          </strong>
          :<br />
          Legge le tensioni delle batterie dei motori e della scheda Arduino.
          Restituisce <code>true</code> se una delle tensioni è inferiore a
          3.8V.
        </li>
        <li>
          <strong>
            <code>readMotorBattery(int btPin)</code>
          </strong>{" "}
          e{" "}
          <strong>
            <code>readArduinoBattery()</code>
          </strong>
          :<br />
          Leggono il valore della tensione della batteria dai pin analogici e lo
          convertono in una misura di voltaggio.
        </li>
      </ul>
    </div>
  );
};

export default Motors;
