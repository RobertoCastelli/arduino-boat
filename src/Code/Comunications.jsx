import React from "react";

const Communications = () => {
  return (
    <div className="code-communications">
      <h1>Descrizione delle Funzioni di Comunicazione</h1>
      <p>
        Il codice gestisce la comunicazione seriale con altri dispositivi o
        moduli. Ecco una panoramica delle funzioni principali:
      </p>
      <ul>
        <li>
          <strong>
            <code>sendComm()</code>
          </strong>
          :<br />
          Invia informazioni sullo stato attuale della barca attraverso le porte
          seriali. Include dati come la modalità della barca, lo stato dei
          motori, comandi motori, e dati GPS e IMU. I dati vengono inviati sia
          alla porta seriale principale che a quella secondaria.
        </li>
        <li>
          <strong>
            <code>serialReceive()</code>
          </strong>
          :<br />
          Gestisce la ricezione di comandi dalla porta seriale principale. Legge
          i caratteri finché non trova un carattere di nuova linea, quindi
          esegue il comando ricevuto.
        </li>
        <li>
          <strong>
            <code>radioReceive()</code>
          </strong>
          :<br />
          Gestisce la ricezione di comandi dalla porta seriale secondaria.
          Analogamente alla funzione `serialReceive`, legge i caratteri fino al
          carattere di nuova linea, esegue il comando ricevuto e invia una
          conferma di ricezione.
        </li>
        <li>
          <strong>
            <code>execSerialCmd()</code>
          </strong>
          :<br />
          Esegue i comandi ricevuti tramite seriale. I comandi possono includere
          modifiche alla modalità della barca, alla direzione e velocità dei
          motori, aggiornamenti dei parametri PID, e cambiamenti della modalità
          operativa. Dopo l'esecuzione, invia una comunicazione con lo stato
          aggiornato.
        </li>
      </ul>
    </div>
  );
};

export default Communications;
