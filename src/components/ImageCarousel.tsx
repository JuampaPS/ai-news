import React, { useEffect, useRef } from 'react';
import './ImageCarousel.css';

const images = [
  '/images/carrusel1.webp',
  '/images/carrusel2.webp',
  '/images/carrusel3.webp',
  '/images/carrusel4.webp',
  '/images/carrusel5.webp',
  '/images/carrusel6.webp',
  '/images/carrusel7.webp',
  '/images/carrusel8.webp',
  '/images/carrusel9.webp',
  '/images/carrusel10.webp',
];

const ImageCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let scrollAmount = 0;
    const scrollStep = 1; // px per frame
    let req: number;
    function autoScroll() {
      if (!carousel) return;
      carousel.scrollLeft += scrollStep;
      scrollAmount += scrollStep;
      // Si llega al final, vuelve al inicio (loop infinito)
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
        carousel.scrollLeft = 0;
        scrollAmount = 0;
      }
      req = requestAnimationFrame(autoScroll);
    }
    req = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(req);
  }, []);

  return (
    <div className="image-carousel-container">
      <div className="image-carousel" ref={carouselRef}>
        {images.map((src, i) => (
          <img src={src} alt={`Carrusel ${i+1}`} key={src} className="carousel-img" loading="lazy" />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 