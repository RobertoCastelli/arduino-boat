import React, { useState, useEffect } from "react";
import foto1 from "../images/foto1.jpg";
import foto2 from "../images/foto2.jpg";
import foto3 from "../images/foto3.jpg";

const Photos = () => {
  // Stato per mantenere traccia dell'indice dell'immagine corrente
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array contenente le immagini da mostrare nel carosello
  const images = [foto1, foto2, foto3];

  // Effetto per cambiare immagine automaticamente ogni 3 secondi
  useEffect(() => {
    // Funzione che cambia l'indice dell'immagine corrente
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia immagine ogni 3 secondi

    // Pulizia dell'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, [images.length]);

  // Funzione per andare all'immagine precedente
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Funzione per andare all'immagine successiva
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="photo-container">
      <h3>
        4. foto {currentIndex + 1}/{images.length}
      </h3>
      <div className="carousel">
        {/* Pulsante per andare all'immagine precedente */}
        <button className="carousel-control prev" onClick={goToPrevious}>
          {"<"}
        </button>
        {/* Immagine corrente */}
        <img
          src={images[currentIndex]}
          alt={`foto${currentIndex + 1}`}
          className="foto"
        />
        {/* Pulsante per andare all'immagine successiva */}
        <button className="carousel-control next" onClick={goToNext}>
          {">"}
        </button>
      </div>
    </section>
  );
};

export default Photos;
