import React from "react";

const SdCard = () => {
  return (
    <div className="code-sd">
      <h1>Descrizione delle Funzioni della Scheda SD</h1>
      <p>
        Il codice gestisce l'interazione con una scheda SD per registrare e
        leggere dati dalla barca robotica. Ecco una panoramica delle sue
        funzioni principali:
      </p>
      <ul>
        <li>
          <strong>
            <code>initSD()</code>
          </strong>
          :<br />
          Inizializza la scheda SD e verifica se l'operazione di
          inizializzazione è andata a buon fine. Stampa un messaggio di errore
          se non riesce a inizializzare la scheda.
        </li>
        <li>
          <strong>
            <code>gps_print()</code>
          </strong>
          :<br />
          Registra i dati GPS, come latitudine, longitudine, velocità e altro,
          in un file chiamato "boat_gps.txt" sulla scheda SD. Stampa un
          messaggio di errore se non riesce ad aprire il file.
        </li>
        <li>
          <strong>
            <code>imu_print()</code>
          </strong>
          :<br />
          Registra i dati dell'IMU, inclusi accelerometro, magnetometro,
          giroscopio, temperatura e pressione, in un file chiamato
          "boat_imu.txt" sulla scheda SD. Stampa un messaggio di errore se non
          riesce ad aprire il file.
        </li>
        <li>
          <strong>
            <code>log_print(const char *dataString)</code>
          </strong>
          :<br />
          Registra un messaggio di log in un file chiamato "boat_log.txt" sulla
          scheda SD e lo stampa anche sulla seriale. Stampa un messaggio di
          errore se non riesce ad aprire il file.
        </li>
        <li>
          <strong>
            <code>loadCheckpoints()</code>
          </strong>
          :<br />
          Carica i checkpoint da un file chiamato "checkpts.txt" sulla scheda SD
          e li memorizza in un array. Ogni checkpoint contiene latitudine e
          longitudine. Stampa un messaggio di errore se non riesce ad aprire il
          file.
        </li>
      </ul>
    </div>
  );
};

export default SdCard;
