import React from "react";
import breadboardImage from "../images/circuito_motore.png";

const Breadboard = () => {
  return (
    <section className="breadboard-container">
      <h3>2. schema breadboard</h3>
      <div>
        <img
          src={breadboardImage}
          alt="Breadboard"
          className="breadboard-img"
        />
      </div>
    </section>
  );
};

export default Breadboard;
