import React from "react";

const Sensors = () => {
  return (
    <div className="code-sensors">
      <h1>Descrizione delle Funzioni dei Sensori</h1>
      <p>
        Il codice gestisce l'inizializzazione e la lettura dei dati dai sensori,
        nonché il calcolo delle direzioni e delle distanze per un sistema di
        navigazione. Ecco una panoramica delle funzioni principali:
      </p>
      <ul>
        <li>
          <strong>
            <code>initSensors()</code>
          </strong>
          :<br />
          Inizializza i sensori dell'accelerometro, magnetometro, giroscopio e
          barometro, e il modulo GPS. Se un sensore non viene rilevato, stampa
          un messaggio di errore e blocca l'esecuzione del programma.
        </li>
        <li>
          <strong>
            <code>courseGPS()</code>
          </strong>
          :<br />
          Restituisce la direzione (corso) corrente dal modulo GPS.
        </li>
        <li>
          <strong>
            <code>courseToTarget()</code>
          </strong>
          :<br />
          Calcola la direzione dal punto corrente al punto target utilizzando la
          libreria TinyGPSPlus.
        </li>
        <li>
          <strong>
            <code>distanceToTarget()</code>
          </strong>
          :<br />
          Calcola la distanza tra il punto corrente e il punto target
          utilizzando la libreria TinyGPSPlus.
        </li>
        <li>
          <strong>
            <code>distanceFromHome()</code>
          </strong>
          :<br />
          Calcola la distanza tra il punto corrente e il punto di origine
          utilizzando la libreria TinyGPSPlus.
        </li>
        <li>
          <strong>
            <code>updateDistanceFromPath()</code>
          </strong>
          :<br />
          Calcola e aggiorna la distanza dalla traiettoria tra due punti di
          checkpoint.
        </li>
        <li>
          <strong>
            <code>readGPS()</code>
          </strong>
          :<br />
          Legge i dati dal modulo GPS e aggiorna la posizione corrente. I dati
          GPS vengono anche registrati in un file di log.
        </li>
        <li>
          <strong>
            <code>readIMU()</code>
          </strong>
          :<br />
          Legge i dati dall'accelerometro, magnetometro, giroscopio e barometro.
          L'orientamento viene aggiornato e i dati IMU vengono registrati in un
          file di log.
        </li>
        <li>
          <strong>
            <code>updateErrHeading()</code>
          </strong>
          :<br />
          Calcola l'errore di direzione tra la direzione corrente e quella
          calcolata, e lo registra in un file di log.
        </li>
        <li>
          <strong>
            <code>updateCalcHeading()</code>
          </strong>
          :<br />
          Aggiorna la direzione calcolata in base alla traiettoria e alla
          variazione di direzione, e registra queste informazioni in un file di
          log.
        </li>
      </ul>
    </div>
  );
};

export default Sensors;
