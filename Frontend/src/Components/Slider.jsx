import React, { useEffect, useState } from 'react';
import pic1 from '/images/us women.jpg';
import pic2 from '/images/scotch.jpg';
import pic3 from '/images/asocs.jpg';
import pic4 from '/images/andamen.png';
import pic5 from '/images/snitch.jpg';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [pic1, pic2, pic3, pic4, pic5];
  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000); 

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative w-full h-40 md:h-[500px] overflow-hidden z-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={image}
            className="w-full h-full object-contain"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
