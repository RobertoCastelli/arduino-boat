import React from "react";

const Navigation = () => {
  return (
    <div className="code-navigation">
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
      <h4>Codice Arduino</h4>
      <pre className="code-block">
        {`
void boatNav_loop()
{
  switch (boatMode) {
    case 'A':
      {
        if (hPID.Compute()) { // if the output is computed
          updateCalcHeading();
        }
        if (mPID.Compute()) {
          driveMotors(MotorCmd, 10);
        }
        break;
      }
    case 'C':
      {
        if (mPID.Compute()) {
          driveMotors(MotorCmd, 10);
        }
        break;
      }
  }
}

void boatNav_IMU_update()
{
  switch (boatMode) {
    case 'C':
      {
        if (CurrPitch > 70) // keep the boat upwards to stop and configure new heading
        {
          CurrPitchCounter += 1; // 5 consecutive readings over 70 to enter programming mode
          if ((CurrPitchCounter) > 5 && (boatStatus != 's')) {
            setBoatStatus('s');
            CurrPitchCounter = 0;
          }
        } else {
          CurrPitchCounter = 0;
        }
      }
  }
  switch (boatStatus) {
    case 'A':
      {
        updateErrHeading();
        break;
      }
    case 'C':
      {
        updateErrHeading();
        if ((millis() - t_C_statusTimer) > 180000) { // stop the boat after 2 minutes
          setBoatStatus('S');
          log_print("Auto course timeout");
        }
        break;
      }
    case 's':
      {
        if (CurrPitch < 40) // keep the boat upwards to stop and configure new heading
        {
          if (t_s_statusTimer == 0) {
            t_s_statusTimer = millis();
          } else if ((millis() - t_s_statusTimer) > 5000) {
            CalcHeading = CurrHeading;
            setBoatStatus('C');
          }
        } else { // if the boat returns upwards reset the timer
          t_s_statusTimer = 0;
        }
        break;
      }
  }
}

void boatNav_GPS_update() {
  if (C_Home.valid == 0) { // first GPS position, set as Home if not yet defined
    coordcpy(&C_Home, &C_Curr);
  }

  switch (boatStatus) {
    case 'A':
      {
        updateDistanceFromPath();
        break;
      }
  }

  switch (boatMode) {
    case 'A':
      {
        if (distanceToTarget() < CHECKPOINT_INNER_RADIUS) {
          // checkpoint reached
          if (!nextCheckpoint()) {
            setBoatMode('P');
          } // else go to next checkpoint
        }
        break;
      }
    case 'P':
      {
        if (distanceToTarget() > CHECKPOINT_OUTER_RADIUS) {
          // checkpoint reached
          coordcpy(&C_Start, &C_Curr);
          setBoatStatus('A');
        }
        if (distanceToTarget() < CHECKPOINT_INNER_RADIUS) {
          setBoatStatus('S');
        }
        break;
      }
  }

}

bool nextCheckpoint() {
  if (currCheckpoint == (numCheckpoints - 1)) {
    // last checkpoint
    return 0;
  }
  currCheckpoint += 1;
  coordcpy(&C_Start, &C_Curr);
  coordcpy(&C_Target, &checkpoints[currCheckpoint]);

  char msg[100];
  snprintf(msg, 100, "nextCheckpoint;%i", currCheckpoint);
  log_print(msg);
  return 1;
}


void gpsLostSignal() {
  GPS_lost = 1;
  switch (boatMode) {
    case 'A':
      {
        setBoatStatus('S');
        break;
      }
  }
}

void gpsFoundSignal() {
  GPS_lost = 0;
  switch (boatMode) {
    case 'A':
      {
        setBoatStatus('A');
        break;
      }
  }
}

void setBoatMode(char mode) {
  char msg[100];
  snprintf(msg, 100, "setBoatMode;%s", mode);
  log_print(msg);
  if (mode == boatMode) {
    return;
  }
  boatMode = mode;
  switch (mode) {
    case 'D':
      {
        break;
      }
    case 'M':
      {
        setBoatStatus('G');
        driveMotors(0, 0);
        break;
      }
    case 'A':
      {
        if (currCheckpoint < numCheckpoints) {
          coordcpy(&C_Start, &C_Curr);
          coordcpy(&C_Target, &checkpoints[currCheckpoint]);
          setBoatStatus('A');
        }
        break;
      }
    case 'P':
      {
        setBoatStatus('S');
        break;
      }
    case 'C':
      {
        CalcHeading = CurrHeading;
        setBoatStatus('C');
        break;
      }
    case 'H':
      {
        coordcpy(&C_Start, &C_Curr);
        coordcpy(&C_Target, &C_Home);
        setBoatStatus('A');
        break;
      }
  }
}


void setBoatStatus(char stat) {
  char msg[100];
  snprintf(msg, 100, "setBoatStatus;%s", stat);
  log_print(msg);

  if (stat == boatStatus) {
    return;
  }
  boatStatus = stat;
  switch (stat) {
    case 'S':
      {
        hPID.SetMode(MANUAL);
        mPID.SetMode(MANUAL);
        L_motor_Enable = 0;
        R_motor_Enable = 0;
        enableMotors();
        driveMotors(0, 0);
        break;
      }
    case 's':
      {
        hPID.SetMode(MANUAL);
        mPID.SetMode(MANUAL);
        L_motor_Enable = 0;
        R_motor_Enable = 0;
        enableMotors();
        driveMotors(0, 0);
        break;
      }
    case 'A':
      {
        hPID.SetMode(AUTOMATIC);
        mPID.SetMode(AUTOMATIC);
        L_motor_Enable = 1;
        R_motor_Enable = 1;
        enableMotors();
        break;
      }
    case 'C':
      {
        hPID.SetMode(MANUAL);
        mPID.SetMode(AUTOMATIC);
        L_motor_Enable = 1;
        R_motor_Enable = 1;
        enableMotors();
        t_C_statusTimer = millis();
        break;
      }
    case 'G':
      {
        hPID.SetMode(MANUAL);
        mPID.SetMode(MANUAL);
        L_motor_Enable = 1;
        R_motor_Enable = 1;
        enableMotors();
        break;
      }
  }
}
        `}
      </pre>
    </div>
  );
};

export default Navigation;
