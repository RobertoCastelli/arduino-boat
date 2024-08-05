import React from "react";
import "../styles/index.css"; // Importa il tuo file CSS

const CodeSnippet = () => {
  const codeString = `#define GPSRxdPin 0
#define GPSTxdPin 1

#define HC12RxdPin 13    // "RXD" Pin su HC12
#define HC12TxdPin 14    // "TXD" Pin su HC12
#define HC12SetPin 6     // "SET" Pin su HC12

#define L_MOTOR_PIN 2
#define R_MOTOR_PIN 3

#define L_MOTOR_ENABLE_PIN 7
#define R_MOTOR_ENABLE_PIN 8

#define L_MOTOR_FLAG_PIN 5
#define R_MOTOR_FLAG_PIN 6

#define L_MOTOR_TEMP_PIN A4
#define R_MOTOR_TEMP_PIN A5

#define L_MOTOR_BATT_PIN A2
#define R_MOTOR_BATT_PIN A3`;

  return (
    <section className="project-container--snippet">
      <div className="code-snippet">
        <pre>
          <code>{codeString}</code>
        </pre>
      </div>
    </section>
  );
};

export default CodeSnippet;
