import React from "react";

const Sensors = () => {
  return (
    <div className="code-sensors">
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
      <h4>Codice Arduino</h4>
      <pre className="code-block">
        {`
void initSensors() {
  Serial.println("accel.begin");
  if (!accel.begin())
  {
    /* There was a problem detecting the LSM303 ... check your connections */
    Serial.println(F("Ooops, no LSM303 detected ... Check your wiring!"));
    while (1);
  }
  Serial.println("mag.begin");

  if (!mag.begin())
  {
    /* There was a problem detecting the LSM303 ... check your connections */
    Serial.println("Ooops, no LSM303 detected ... Check your wiring!");
    while (1);
  }
  Serial.println("gyro.begin");

  gyro.enableAutoRange(true);
  /* Initialise the sensor */
  if (!gyro.begin())
  {
    /* There was a problem detecting the L3GD20 ... check your connections */
    Serial.println("Ooops, no L3GD20 detected ... Check your wiring!");
    while (1);
  }
  Serial.println("bmp.begin");
  if (!bmp.begin())
  {
    /* There was a problem detecting the BMP180 ... check your connections */
    Serial.println("Ooops, no BMP180 detected ... Check your wiring!");
    while (1);
  }
  Serial.println("gpsSerial.begin");
  gpsSerial.begin(GPSBaud);
}

/**************************************************************************/
/*!

*/
/**************************************************************************/


double courseGPS() {
  return gps.course.deg();
}

double courseToTarget() {
  return TinyGPSPlus::courseTo(
           C_Curr.Lat,
           C_Curr.Lng,
           C_Target.Lat,
           C_Target.Lng);
}

double distanceToTarget() {
  return TinyGPSPlus::distanceBetween(
           C_Curr.Lat,
           C_Curr.Lng,
           C_Target.Lat,
           C_Target.Lng);
}

double distanceFromHome() {
  return TinyGPSPlus::distanceBetween(
           C_Curr.Lat,
           C_Curr.Lng,
           C_Home.Lat,
           C_Home.Lng);
}

void updateDistanceFromPath() {
  if ((C_Start.valid + C_Target.valid + C_Curr.valid) != 3) {
    log_print("updateDistanceFromPathErr;no valid checkpoints");
    DistanceFromPath = 0;
    return;
  }
  double xs = C_Start.Lng;
  double xt = C_Target.Lng;
  double ys = C_Start.Lat;
  double yt = C_Target.Lat ;
  double xc = C_Curr.Lng;
  double yc = C_Curr.Lat;

  double x = (xc * pow(xs, 2) - 2 * xc * xs * xt - xs * ys * yt + yc * xs * ys + xs * pow(yt, 2) - yc * xs * yt + xc * pow(xt, 2) + xt * pow(ys, 2) - xt * ys * yt - yc * xt * ys + yc * xt * yt) / (pow(xs, 2) - 2 * xs * xt + pow(xt, 2) + pow(ys, 2) - 2 * ys * yt + pow(yt, 2));
  double y = (pow(xs, 2) * yt - xs * xt * ys - xs * xt * yt + xc * xs * ys - xc * xs * yt + pow(xt, 2) * ys - xc * xt * ys + xc * xt * yt + yc * pow(ys, 2) - 2 * yc * ys * yt + yc * pow(yt, 2)) / (pow(xs, 2) - 2 * xs * xt + pow(xt, 2) + pow(ys, 2) - 2 * ys * yt + pow(yt, 2));

  DistanceFromPath = TinyGPSPlus::distanceBetween(C_Curr.Lat, C_Curr.Lng, y, x);

  char msg[100];
  snprintf(msg, 100, "updateDistanceFromPath;%s", DistanceFromPath);
  log_print(msg);
}


bool readGPS() {
  while (gpsSerial.available() > 0)
    gps.encode(gpsSerial.read());
  if (gps.location.isValid())
  {
    C_Curr.Lat = gps.location.lat();
    C_Curr.Lng = gps.location.lng();
    C_Curr.valid = 1;
  }
  gps_print();

  return gps.location.isValid();
}

bool readIMU() {
  /* Read the accelerometer and magnetometer */
  accel.getEvent(&Accel_event);
  mag.getEvent(&Mag_event);
  gyro.getEvent(&Gyro_event);

  bmp.getEvent(&Bmp_event);
  bmp.getTemperature(&IMU_temp);
  bmp.getPressure(&IMU_pressure);

  dof.fusionGetOrientation ( &Accel_event, &Mag_event, &Fusion_orientation);
  Fusion_orientation.pitch = Fusion_orientation.pitch * -1;
  CurrPitch = Fusion_orientation.pitch;
  /* Normalize to 0-359° */
  Fusion_orientation.heading = Fusion_orientation.heading * -1;
  if (Fusion_orientation.heading < 0)
  {
    Fusion_orientation.heading = 360 + Fusion_orientation.heading;
  }
  imu_print();
  CurrHeadingRA.addValue(Fusion_orientation.heading);
  CurrHeading = CurrHeadingRA.getAverage();
}

void updateErrHeading() {
  ErrHeading = CurrHeading - CalcHeading;
  if (ErrHeading > 180) {
    ErrHeading = ErrHeading - 360;
  }
  if (ErrHeading < -180) {
    ErrHeading =  ErrHeading + 360;
  }

  char msg[100];
  snprintf(msg, 100, "updateErrHeading;%i,%i,%i", (int)ErrHeading, (int)CalcHeading, (int)CurrHeading);
  log_print(msg);
}

void updateCalcHeading() {
  CalcHeading = PathHeading + DeltaHeading;

  char msg[100];
  snprintf(msg, 100, "updateCalcHeading;%i;%i;%i", CalcHeading, PathHeading, DeltaHeading);
  log_print(msg);
}        `}
      </pre>
    </div>
  );
};

export default Sensors;
