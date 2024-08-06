import React from "react";

const Boat = () => {
  return (
    <div className="code-boat">
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
            <code>boatNav_GPS_update()</code> e{" "}
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
      <h4>Codice Arduino</h4>
      <pre className="code-block">
        {`
#include <stdarg.h>

#include <PID_v1.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LSM303_U.h>
#include <Adafruit_BMP085_U.h>
#include <Adafruit_L3GD20_U.h>
#include <Adafruit_10DOF.h>

#include <TinyGPS++.h>
#include <SPI.h>
#include <SD.h>

#include "RunningAverage.h"

// includes needed to add a serial port on SAMD board
#include <Arduino.h>
#include "wiring_private.h"

#define CMDLEN 100
#define CHKPTLEN 100

#define GPSRxdPin 0
#define GPSTxdPin 1

#define HC12RxdPin 13                      // "RXD" Pin on HC12
#define HC12TxdPin 14                      // "TXD" Pin on HC12
#define HC12SetPin 8                      // "SET" Pin on HC12

#define R_MOTOR_PIN 2
#define L_MOTOR_PIN 3

#define R_MOTOR_TEMP_PIN A1
#define L_MOTOR_TEMP_PIN A2

#define L_MOTOR_ENABLE_PIN 6
#define R_MOTOR_ENABLE_PIN 9

#define L_MOTOR_FLAG_PIN 7
#define R_MOTOR_FLAG_PIN 10

#define L_MOTOR_BATT_PIN A3
#define R_MOTOR_BATT_PIN A4

/* Assign a unique ID to the sensors */
Adafruit_10DOF                dof   = Adafruit_10DOF();
Adafruit_LSM303_Accel_Unified accel = Adafruit_LSM303_Accel_Unified(30301);
Adafruit_LSM303_Mag_Unified   mag   = Adafruit_LSM303_Mag_Unified(30302);
Adafruit_BMP085_Unified       bmp   = Adafruit_BMP085_Unified(18001);
Adafruit_L3GD20_Unified       gyro  = Adafruit_L3GD20_Unified(20);

// Create the new UART instance assigning it to pin 0 and 1
Uart gpsSerial (&sercom3, 0, 1, SERCOM_RX_PAD_1, UART_TX_PAD_0); 

static const double CHECKPOINT_INNER_RADIUS = 3;
static const double CHECKPOINT_OUTER_RADIUS = 6;

static const uint32_t GPSBaud = 9600;
// The TinyGPS++ object
TinyGPSPlus gps;

sensors_event_t Accel_event;
sensors_event_t Mag_event;
sensors_event_t Gyro_event;
sensors_event_t Bmp_event;
sensors_vec_t Fusion_orientation;

int L_motor_PWM = 0, R_motor_PWM = 0;
int L_motor_Enable = 0, R_motor_Enable = 0;
int L_motor_Flag, R_motor_Flag;
float L_motor_temp, R_motor_temp, IMU_temp, IMU_pressure;
double L_batt_V, R_batt_V, A_batt_V;

char serialCmd[CMDLEN] = "";

char boatMode;
// D demo
// M manual
// C course (mantain defined magnetic course)
// A auto (follow shortest path to GPS checkpoints)
// P hold current position
// H go home (emergency)

char boatStatus;

// MODE M manual
// S stop
// G go

// MODE C magnetic direction
// S stop
// s stop for configuring
// C go auto keeping magnetic direction

// MODE A auto
// S stop
// A go auto

// MODE D demo
// S stop
// A go auto

// MODE H go home (emergency)
// S stop
// A go auto

// P hold current position
// S stop
// A go auto

const int GPS_STEP = 1000;
const int IMU_STEP = 100;
bool GPS_lost = 0;

unsigned long t_GPS;
unsigned long t_IMU;
unsigned long t_s_statusTimer = 0;
unsigned long t_C_statusTimer = 0;

typedef struct {
  double Lat;
  double Lng;
  bool valid;
} coord;

void coordcpy(coord *dest, coord *src) {
  dest->Lat = src->Lat;
  dest->Lng = src->Lng;
  dest->valid = src->valid;
}

coord checkpoints[CHKPTLEN];
int currCheckpoint = 0;
int numCheckpoints = 0;

coord C_Target = {0, 0, 0};
coord C_Start = {0, 0, 0};
coord C_Curr = {0, 0, 0};
coord C_Home = {0, 0, 0};

double DistanceFromPath = 0, CurrPitch = 0;
double CalcHeading = 0, PathHeading = 0, CurrHeading = 0; // magnetic heading 0-360
double DeltaHeading = 0, ErrHeading = 0; // relative heading -180 +180
double MotorCmd = 0;

int CurrPitchCounter = 0;

RunningAverage CurrHeadingRA(10);

double KpH = 1, KiH = 2, KdH = 4;
double KpM = 0.1, KiM = 0.2, KdM = 0.2;

PID hPID(&DistanceFromPath, &DeltaHeading, 0, KpH, KiH, KdH, P_ON_E, DIRECT);
PID mPID(&ErrHeading, &MotorCmd, 0, KpM, KiM, KdM, P_ON_E, DIRECT);

void setup(void)
{

  Serial.begin(9600);
  //  while (!Serial) {
  //    ; // wait for serial port to connect. Needed for native USB
  //  }

  pinMode(HC12SetPin, OUTPUT);                  // Output High for Transparent / Low for Command
  digitalWrite(HC12SetPin, HIGH);               // Enter Transparent mode
  delay(80);                                    // 80 ms delay before operation per datasheet

  Serial1.begin(9600);
  // set second serial on SAMD board
  pinPeripheral(0, PIO_SERCOM); //Assign RX function to pin 0
  pinPeripheral(1, PIO_SERCOM); //Assign TX function to pin 1

  CurrHeadingRA.clear();
  /* Initialise the sensors */
  initSD();
  initMotors();
  initSensors();

  //setBoatMode('P');
  //setBoatStatus('S');
  setBoatMode('C');
  setBoatStatus('s');

  hPID.SetMode(MANUAL);
  hPID.SetSampleTime(GPS_STEP);
  hPID.SetOutputLimits(-90, 90);

  mPID.SetMode(MANUAL);
  mPID.SetSampleTime(IMU_STEP);
  mPID.SetOutputLimits(-200, 200);

  loadCheckpoints();

  //DEBUG DATA
  //C_Target.Lat = 45.463617;
  //C_Target.Lng = 9.188485;

  //C_Start.Lat = 45.467988;
  //C_Start.Lng = 9.182542;

  //C_Curr.Lat = 45.465653;
  //C_Curr.Lng = 9.186574;
}

void loop() {
  //Serial.println("radioComm");
  radioReceive();
  //Serial.println("serialComm");
  serialReceive();

  if ((millis() - t_GPS) >= GPS_STEP) {
    if (checkMotorsTemp()) {
      // motor high temperature
    }
    if (checkBattery()) {
      // low battery
    }
    //Serial.println("readGPS");
    if (readGPS()) {
      // GPS ok
      boatNav_GPS_update();
      if (gps.location.age() > (GPS_STEP * 30)) {
        gpsLostSignal();
      } else  if (GPS_lost == 1) {
        gpsFoundSignal();
      }
    } else {
      // no GPS
      gpsLostSignal();
    }
    sendComm();
    t_GPS += GPS_STEP;
  }

  if ((millis() - t_IMU) >= IMU_STEP) {
    //Serial.println("readIMU");
    readIMU();
    //Serial.println("updateErrHeading");
    boatNav_IMU_update();

    //if (checkMotorsOverload()) {
    // motor overload
    //}
    t_IMU += IMU_STEP;
  }

  boatNav_loop();
}

void SERCOM3_Handler()
{
  gpsSerial.IrqHandler();
}
`}
      </pre>
    </div>
  );
};

export default Boat;
