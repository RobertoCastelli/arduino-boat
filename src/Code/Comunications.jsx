import React from "react";

const Communications = () => {
  return (
    <div className="code-communications">
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
      <h4>Codice Arduino</h4>
      <pre className="code-block">
        {`
void sendComm() {
  Serial.print(boatMode);
  Serial1.print(boatMode);
  Serial.print(boatStatus);
  Serial1.print(boatStatus);

  Serial1.print("-L:");
  Serial.print("-L:");
  Serial1.print(L_motor_PWM);
  Serial.print(L_motor_PWM);
  Serial1.print("-R:");
  Serial.print("-R:");
  Serial1.print(R_motor_PWM);
  Serial.print(R_motor_PWM);
  Serial1.print("-CMD:");
  Serial.print("-CMD:");
  Serial1.print(MotorCmd);
  Serial.print(MotorCmd);
  Serial1.print("-HEAD:");
  Serial.print("-HEAD:");
  Serial1.print(CurrHeading);
  Serial.print(CurrHeading);
  Serial1.print("-PITCH:");
  Serial.print("-PITCH:");
  Serial1.print(CurrPitch);
  Serial.print(CurrPitch);
  Serial1.print("-IMU_temp:");
  Serial.print("-IMU_temp:");
  Serial1.println(IMU_temp);
  Serial.println(IMU_temp);

  Serial.print("GPS:");
  Serial.print(gps.location.lat());
  Serial.print('-');
  Serial.print(gps.location.lng());
  Serial.print('-');
  Serial.print(gps.location.age());
  Serial.print("kmph:");
  Serial.print(gps.speed.kmph());
  Serial.print("-head:");
  Serial.print(gps.course.deg());
  Serial.print("alt:");
  Serial.print(gps.altitude.meters());
  Serial.print("sat:");
  Serial.println(gps.satellites.value());

  Serial1.print("GPS:");
  Serial1.print(gps.location.lat());
  Serial1.print('-');
  Serial1.print(gps.location.lng());
  Serial1.print('-');
  Serial1.print(gps.location.age());
  Serial1.print("kmph:");
  Serial1.print(gps.speed.kmph());
  Serial1.print("-head:");
  Serial1.print(gps.course.deg());
  Serial1.print("alt:");
  Serial1.print(gps.altitude.meters());
  Serial1.print("sat:");
  Serial1.println(gps.satellites.value());

  //    Serial.print(Fusion_orientation.heading);
  //    Serial.print('\t');
  //
  //    Serial.println(IMU_temp);

}

void serialReceive() {
  bool cmdEnd = 0;
  while (Serial.available() && cmdEnd == 0) {
    char onechar = Serial.read();
    if (onechar == '\n') {
      cmdEnd = 1;
    } else {
      size_t len = strlen(serialCmd);
      if (len < CMDLEN) {
        serialCmd[len++] = onechar;
        serialCmd[len] = '\0';
      } else {

        // serial command too long
      }

    }
  }
  if (cmdEnd == 1) {
    execSerialCmd();
    strcpy(serialCmd, "\0");
  }
}

void radioReceive() {
  bool cmdEnd = 0;
  while (Serial1.available() && cmdEnd == 0) {
    char onechar = Serial1.read();
    if (onechar == '\n') {
      cmdEnd = 1;
    } else {
      size_t len = strlen(serialCmd);
      if (len < CMDLEN) {
        serialCmd[len++] = onechar;
        serialCmd[len] = '\0';
      } else {

        // serial command too long
      }

    }
  }
  if (cmdEnd == 1) {
    Serial1.print("Message received: ");
    Serial1.println(serialCmd);
    execSerialCmd();
    strcpy(serialCmd, "\0");
  }
}

void execSerialCmd() {
  char msg[100];
  char* cmd;
  cmd = serialCmd;
  snprintf(msg, 100, "execSerialCmd;%s", serialCmd);
  log_print(msg);
  switch (serialCmd[0]) {
    case 'M':
      {
        cmd++;
        char* separator = strchr(cmd, ':');
        int MotorDir = 0, MotorSpeed = 0;

        if (separator != 0)
        {
          // Actually split the string in 2: replace ':' with 0
          *separator = 0;
          MotorDir = atoi(cmd);
          ++separator;
          MotorSpeed = atoi(separator);

        } else {
          MotorDir = atoi(cmd);
          MotorSpeed = 10;
        }
        setBoatMode('M');
        driveMotors(MotorDir, MotorSpeed);
        break;
      }
    case 'C':
      {
        setBoatMode('C');
        if (strlen(cmd) > 1) {
          cmd++;
          CalcHeading = atoi(cmd);
        }
        break;
      }
    case 'c':
      {
        setBoatMode('C');
        if (strlen(cmd) > 1) {
          cmd++;
          CalcHeading = CurrHeading + atoi(cmd);
        }
        break;
      }
    case 'K':
      {
        if (strstr(cmd, "KpH")) {
          cmd = cmd + 3;
          KpH = atof(cmd);
        } else if (strstr(cmd, "KiH")) {
          cmd = cmd + 3;
          KiH = atof(cmd);
        } else if (strstr(cmd, "KdH")) {
          cmd = cmd + 3;
          KdH = atof(cmd);
        } else if (strstr(cmd, "KpM")) {
          cmd = cmd + 3;
          KpM = atof(cmd);
        } else if (strstr(cmd, "KiM")) {
          cmd = cmd + 3;
          KiM = atof(cmd);
        } else if (strstr(cmd, "KdM")) {
          cmd = cmd + 3;
          KdM = atof(cmd);
        }
        char msg[100];
        snprintf(msg, 100, "new PID param: %s KiH:%i, KdH:%i, KpM:%i, _
        KiM:%i, KdM:%i", cmd, (int)KiH, (int)KdH, (int)KpM, (int)KiM, (int)KdM);
        log_print(msg);
        hPID.SetTunings(KpH, KiH, KdH);
        mPID.SetTunings(KpM, KiM, KdM);
        break;
      }
    case 'A':
      {
        setBoatMode('A');
        break;
      }
    case 'D':
      {
        setBoatMode('D');
        break;
      }
    case 'H':
      {
        setBoatMode('H');
        break;
      }
    case 'P':
      {
        setBoatMode('P');
        break;
      }
  }
  sendComm();
}
`}
      </pre>
    </div>
  );
};

export default Communications;
