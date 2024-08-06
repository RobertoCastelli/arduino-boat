import React from "react";

const SdCard = () => {
  return (
    <div className="code-sd">
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
      <h4>Codice Arduino</h4>
      <pre className="code-block">
        {`
void initSD() {
  if (!SD.begin(SDCARD_SS_PIN)) {
    Serial.println("SD initialization failed!");
    return;
  }

  Serial.println("SD initialization done.");
}

void gps_print() {
  File dataFile = SD.open("boat_gps.txt", FILE_WRITE);
  // if the file is available, write to it:
  if (dataFile) {
    dataFile.print(t_GPS);
    dataFile.print('\t');

    dataFile.print(gps.location.isValid());
    dataFile.print('\t');

    dataFile.print(gps.location.lat());
    dataFile.print('\t');
    dataFile.print(gps.location.lng());
    dataFile.print('\t');
    dataFile.print(gps.location.age());
    dataFile.print('\t');

    dataFile.print(gps.speed.kmph());
    dataFile.print('\t');

    dataFile.print(gps.course.deg());
    dataFile.print('\t');

    dataFile.print(gps.altitude.meters());
    dataFile.print('\t');

    dataFile.print(gps.satellites.value());
    dataFile.print('\t');

    dataFile.print(gps.date.year());
    dataFile.print('\t');
    dataFile.print(gps.date.month());
    dataFile.print('\t');
    dataFile.print(gps.date.day());
    dataFile.print('\t');

    dataFile.print(gps.time.hour());
    dataFile.print('\t');
    dataFile.print(gps.time.minute());
    dataFile.print('\t');
    dataFile.print(gps.time.second());
    dataFile.print('\t');



    dataFile.println();
    dataFile.close();
//    Serial.println("gps_print");
//    Serial.print(gps.location.lat());
//    Serial.print('\t');
//    Serial.print(gps.location.lng());
//    Serial.print('\t');
//    Serial.print(gps.location.age());
//    Serial.print('\t');
//
//    Serial.print(gps.speed.kmph());
//    Serial.print('\t');
//
//    Serial.print(gps.course.deg());
//    Serial.print('\t');
//
//    Serial.print(gps.altitude.meters());
//    Serial.print('\t');
//
//    Serial.println(gps.satellites.value());
  }
  else {
    Serial.println("error opening boat_gps.txt");
  }
}

void imu_print() {
  File dataFile = SD.open("boat_imu.txt", FILE_WRITE);
  // if the file is available, write to it:
  if (dataFile) {
    dataFile.print(t_IMU);
    dataFile.print('\t');

    dataFile.print(Accel_event.acceleration.x);
    dataFile.print('\t');
    dataFile.print(Accel_event.acceleration.y);
    dataFile.print('\t');
    dataFile.print(Accel_event.acceleration.z);
    dataFile.print('\t');

    dataFile.print(Mag_event.magnetic.x);
    dataFile.print('\t');
    dataFile.print(Mag_event.magnetic.y);
    dataFile.print('\t');
    dataFile.print(Mag_event.magnetic.z);
    dataFile.print('\t');

    dataFile.print(Gyro_event.gyro.x);
    dataFile.print('\t');
    dataFile.print(Gyro_event.gyro.y);
    dataFile.print('\t');
    dataFile.print(Gyro_event.gyro.z);
    dataFile.print('\t');

    dataFile.print(Fusion_orientation.pitch);
    dataFile.print('\t');
    dataFile.print(Fusion_orientation.roll);
    dataFile.print('\t');
    dataFile.print(Fusion_orientation.heading);
    dataFile.print('\t');

    dataFile.print(IMU_temp);
    dataFile.print('\t');

    dataFile.print(IMU_pressure);

    dataFile.println();
    dataFile.close();

//    Serial.print("imu_print: ");
//    Serial.print(Fusion_orientation.pitch);
//    Serial.print('\t');
//    Serial.print(Fusion_orientation.roll);
//    Serial.print('\t');
//    Serial.print(Fusion_orientation.heading);
//    Serial.print('\t');
//
//    Serial.println(IMU_temp);

  }
  else {
    Serial.println("error opening boat_imu.txt");
  }
}

void log_print(const char *dataString) {
  File dataFile = SD.open("boat_log.txt", FILE_WRITE);
  // if the file is available, write to it:
  if (dataFile) {
    dataFile.print(millis());
    dataFile.print(';');
    dataFile.print(dataString);
    //va_list argptr;
    //va_start( argptr, dataString );
    //const char *s;
    //for ( s = dataString; s != NULL; s = va_arg(argptr, const char *))  {
    //  Serial.print(s);
    //  Serial.print('\t');
    //  dataFile.print(s);
    //  dataFile.print('\t');
    //}
    //
    //va_end(argptr);
    dataFile.println();
    dataFile.close();
    // print to the serial port too:
    Serial.println(dataString);
    Serial1.println(dataString);
  }
  // if the file isn't open, pop up an error:
  else {
    Serial.println("error opening boat_log.txt");
  }
}

bool loadCheckpoints() {
  File myFile = SD.open("checkpts.txt");
  numCheckpoints = 0;
  
  if (myFile) {
    Serial.println("read checkpts.txt");
    char ch;
    char line[100];
    double Lat;
    double Lng;
    // read from the file until there's nothing else in it:
    while (myFile.available()) {
      ch = myFile.read();
      if (ch == '\n') {
        sscanf(line, "%f %f", &Lat, &Lng);
        checkpoints[numCheckpoints].Lat = Lat;
        checkpoints[numCheckpoints].Lng = Lng;
        checkpoints[numCheckpoints].valid = 1;
        numCheckpoints += 1;
        line[0] = '\0';
      } else {
        strcat(line, &ch);
      }
    }
    // close the file:
    myFile.close();
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening checkpts.txt");
    return 0;
  }

  currCheckpoint = 0;
  return 1;
}
        `}
      </pre>
    </div>
  );
};

export default SdCard;
