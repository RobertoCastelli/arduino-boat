import React from "react";
import "../styles/index.css";
import { FaGithub } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiNetlify } from "react-icons/si";
import { SiArduino } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2022 by Francesco C.</p>
      <div className="footer--icons">
        <div>
          <SiArduino size={30} color="cadetblue" />
        </div>
        <div>
          <SiNetlify size={30} color="cadetblue" />
        </div>
        <div>
          <FaReact size={30} color="cadetblue" />
        </div>
        <div>
          <FaGithub size={30} color="cadetblue" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
