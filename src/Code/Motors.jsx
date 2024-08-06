import React from "react";

const Motors = () => {
  return (
    <div className="code-motors">
      <ul>
        <li>
          <strong>
            <code>initMotors()</code>
          </strong>
          :<br />
          Inizializza i pin dei motori e configura i pin di abilitazione e flag.
          Imposta i valori iniziali dei PWM dei motori e abilita i motori.
        </li>
        <li>
          <strong>
            <code>checkMotorsOverload()</code>
          </strong>
          :<br />
          Controlla i pin di flag dei motori per verificare sovraccarichi.
          Disabilita i motori se viene rilevato un sovraccarico.
        </li>
        <li>
          <strong>
            <code>checkMotorsTemp()</code>
          </strong>
          :<br />
          Legge e calcola la temperatura dei motori dai pin analogici.
          Restituisce <code>true</code> se la temperatura di uno dei motori
          supera i 45°C.
        </li>
        <li>
          <strong>
            <code>enableMotors()</code>
          </strong>
          :<br />
          Abilita i motori impostando i pin di abilitazione ai valori
          specificati.
        </li>
        <li>
          <strong>
            <code>driveMotors(int MotorDir, int MotorSpeed)</code>
          </strong>
          :<br />
          Calcola e imposta i valori di PWM per i motori in base alla direzione
          e alla velocità desiderate. Regola la velocità dei motori e logga le
          informazioni di controllo.
        </li>
        <li>
          <strong>
            <code>checkBattery()</code>
          </strong>
          :<br />
          Legge le tensioni delle batterie dei motori e della scheda Arduino.
          Restituisce <code>true</code> se una delle tensioni è inferiore a
          3.8V.
        </li>
        <li>
          <strong>
            <code>readMotorBattery(int btPin)</code>
          </strong>{" "}
          e{" "}
          <strong>
            <code>readArduinoBattery()</code>
          </strong>
          :<br />
          Leggono il valore della tensione della batteria dai pin analogici e lo
          convertono in una misura di voltaggio.
        </li>
      </ul>
      <h4>Codice Arduino</h4>
      <pre className="code-block">
        {`
void initMotors() {
  R_motor_PWM = 0;
  L_motor_PWM = 0;
  L_motor_Enable = 0;
  R_motor_Enable = 0;

  pinMode(L_MOTOR_PIN, OUTPUT);
  pinMode(R_MOTOR_PIN, OUTPUT);

  pinMode(L_MOTOR_ENABLE_PIN, OUTPUT);
  pinMode(R_MOTOR_ENABLE_PIN, OUTPUT);

  pinMode(L_MOTOR_FLAG_PIN, INPUT);
  pinMode(R_MOTOR_FLAG_PIN, INPUT);

  enableMotors();

  analogWrite(L_MOTOR_PIN, L_motor_PWM);
  analogWrite(R_MOTOR_PIN, R_motor_PWM);

}

bool checkMotorsOverload() {
  //Serial.print("Flag L: ");
  L_motor_Flag = digitalRead(L_MOTOR_FLAG_PIN);
  //Serial.println(L_motor_Flag);

  //Serial.print("Flag R: ");
  R_motor_Flag = digitalRead(R_MOTOR_FLAG_PIN);
  //Serial.println(R_motor_Flag);

  if ((L_motor_Enable==1) && (L_motor_Flag == 0)) {
    Serial.println("Overcurrent: disable L motor");
    L_motor_Enable = 0;
    enableMotors();
  }

  if ((R_motor_Enable==1) && (R_motor_Flag == 0)) {
    Serial.println("Overcurrent: disable R motor");
    R_motor_Enable = 0;
    enableMotors();
  }
  return ((R_motor_Flag + L_motor_Flag) == 2);
}

bool checkMotorsTemp() {

  //Serial.print("Temp L: ");
  double temp = analogRead(L_MOTOR_TEMP_PIN);
  //Serial.print(temp);
  L_motor_temp = (temp * 3.22265625 - 424) / 6.25; // 3.222 is multiplier for 3.3v board. 4.8828125 for 5v board
  //Serial.print(" - C ");
  //Serial.println(L_motor_temp);

  //Serial.print("Temp R: ");
  temp = analogRead(R_MOTOR_TEMP_PIN);
  //Serial.print(temp);
  R_motor_temp = (temp * 3.22265625 - 424) / 6.25;
  //Serial.print(" - C ");
  //Serial.println(R_motor_temp);

  if ((L_motor_temp > 45) || (R_motor_temp > 45)) {
    return 1;
  }
  else {
    return 0;
  }

}

void enableMotors() {
  digitalWrite(L_MOTOR_ENABLE_PIN, L_motor_Enable);
  digitalWrite(R_MOTOR_ENABLE_PIN, R_motor_Enable);
}

void driveMotors(int MotorDir, int MotorSpeed) {
  // MotorDir -255 all left, 255 all right
  // MotorSpeed 0-10
  int l_pwm, r_pwm;
  if (MotorDir == 0) {
    l_pwm = 255;
    r_pwm = 255;
  } else if (MotorDir > 0) { //turn right
    if (MotorDir > 180) MotorDir = 255; // too low pwm stall the motor, under a minimum value turn off
    l_pwm = 255;
    r_pwm = 255 - MotorDir;
  } else { // MotorCmd < 0 turn left
    if (MotorDir < -180) MotorDir = -255;
    l_pwm = 255 + MotorDir;
    r_pwm = 255;
  }
  float multi = MotorSpeed / 10.0;
  L_motor_PWM = l_pwm * multi;
  R_motor_PWM = r_pwm * multi;
  analogWrite(L_MOTOR_PIN, L_motor_PWM);
  analogWrite(R_MOTOR_PIN, R_motor_PWM);

  char msg[100];
  snprintf(msg, 100, "driveMotors;%i;%i;%i;%i", MotorDir, MotorSpeed, L_motor_PWM, R_motor_PWM);
  log_print(msg);
}

bool checkBattery() {
  L_batt_V = readMotorBattery(L_MOTOR_BATT_PIN);
  R_batt_V = readMotorBattery(R_MOTOR_BATT_PIN);
  A_batt_V = readArduinoBattery();

  if ((L_batt_V < 3.8) || (R_batt_V < 3.8) || (A_batt_V < 3.8)) {
    return 1;
  }
  else {
    return 0;
  }
}

double readMotorBattery(int btPin) {
  int sensorValue = analogRead(btPin);
  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 4.3V):
  double voltage = sensorValue * (4.3 / 1023.0);
  // print out the value you read:
//  Serial.print("Motor battery ");
//  Serial.print(btPin);
//  Serial.print(": ");
//  Serial.print(voltage);
//  Serial.println("V");
  return voltage;
}

double readArduinoBattery() {
  int sensorValue = analogRead(ADC_BATTERY);
  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 4.3V):
  double voltage = sensorValue * (4.3 / 1023.0);
  // print out the value you read:
//  Serial.print("Arduino battery: ");
//  Serial.print(voltage);
//  Serial.println("V");
  return voltage;
}
        `}
      </pre>
    </div>
  );
};

export default Motors;
