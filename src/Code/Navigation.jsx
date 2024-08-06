import React from "react";

const Navigation = () => {
  return (
    <div className="code-navigation">
      <h1>Descrizione del Controllo di Navigazione della Barca</h1>
      <p>
        Il codice gestisce la navigazione e il controllo della barca robotica.
        Ecco una sintesi delle sue funzioni principali:
      </p>
      <ul>
        <li>
          <strong>
            <code>boatNav_loop()</code>
          </strong>
          :<br />
          Gestisce le azioni della barca in base alla modalità di funzionamento
          (`A` per auto, `C` per corso). Calcola e applica i comandi dei motori
          utilizzando i controllori PID.
        </li>
        <li>
          <strong>
            <code>boatNav_IMU_update()</code>
          </strong>
          :<br />
          Aggiorna lo stato della barca in base ai dati dell'IMU. Gestisce la
          modalità di configurazione e arresto della barca, e applica timeout
          per la modalità di auto-navigazione.
        </li>
        <li>
          <strong>
            <code>boatNav_GPS_update()</code>
          </strong>
          :<br />
          Aggiorna la navigazione basata sui dati GPS. Gestisce i checkpoint, la
          modalità di auto-navigazione e di mantenimento della posizione.
        </li>
        <li>
          <strong>
            <code>nextCheckpoint()</code>
          </strong>
          :<br />
          Passa al prossimo checkpoint nel percorso, se ce n'è uno.
        </li>
        <li>
          <strong>
            <code>gpsLostSignal()</code>
          </strong>{" "}
          e{" "}
          <strong>
            <code>gpsFoundSignal()</code>
          </strong>
          :<br />
          Gestiscono la perdita e il recupero del segnale GPS, aggiornando lo
          stato della barca di conseguenza.
        </li>
        <li>
          <strong>
            <code>setBoatMode(char mode)</code>
          </strong>
          :<br />
          Imposta la modalità operativa della barca (`D`, `M`, `A`, `P`, `C`,
          `H`), aggiornando di conseguenza la modalità dei motori e dello stato
          della barca.
        </li>
        <li>
          <strong>
            <code>setBoatStatus(char stat)</code>
          </strong>
          :<br />
          Imposta lo stato della barca (`S`, `s`, `A`, `C`, `G`), configurando i
          controllori PID e i motori.
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
