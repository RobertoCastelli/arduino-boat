import React from "react";

const Boat = () => {
  return (
    <div className="code-boat">
      <h1>Descrizione del Controllo di Navigazione</h1>
      <p>
        Il codice gestisce il controllo e la navigazione di una barca robotica.
        Ecco una sintesi delle sue funzioni principali:
      </p>
      <ul>
        <li>
          <strong>
            <code>setup()</code>
          </strong>
          :<br />
          Configura le porte seriali, inizializza i sensori e i motori, imposta
          le modalità e lo stato della barca, e carica i punti di controllo.
        </li>
        <li>
          <strong>
            <code>loop()</code>
          </strong>
          :<br />
          Gestisce la ricezione dei dati radio e seriali, esegue aggiornamenti
          periodici basati su GPS e IMU, verifica la temperatura dei motori, lo
          stato delle batterie e aggiorna la navigazione della barca. Gestisce
          la perdita e il recupero del segnale GPS.
        </li>
        <li>
          <strong>
            <code>readGPS()</code>
          </strong>
          :<br />
          Legge i dati GPS e aggiorna la navigazione della barca.
        </li>
        <li>
          <strong>
            <code>readIMU()</code>
          </strong>
          :<br />
          Legge i dati dall'unità IMU e aggiorna il controllo di navigazione.
        </li>
        <li>
          <strong>
            <code>PID</code>
          </strong>
          :<br />
          Utilizza controllori PID per gestire l'orientamento e il comando dei
          motori.
        </li>
        <li>
          <strong>
            <code>boatNav_GPS_update()</code>
          </strong>{" "}
          e{" "}
          <strong>
            <code>boatNav_IMU_update()</code>
          </strong>
          :<br />
          Aggiornano la navigazione in base ai dati ricevuti dai sensori GPS e
          IMU.
        </li>
        <li>
          <strong>
            <code>SERCOM3_Handler()</code>
          </strong>
          :<br />
          Gestisce le interruzioni per la comunicazione seriale GPS.
        </li>
      </ul>
    </div>
  );
};

export default Boat;
