import React, { useEffect, useState } from 'react';
import './GalleryAI.css';

const GALLERY_JSON = '/images/gallery.json';

const GalleryAI: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(GALLERY_JSON)
      .then(res => res.json())
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  return (
    <section className="gallery-ai-section">
      <h2 className="gallery-ai-title">Gallery AI</h2>
      <div className="gallery-ai-grid">
        {images.map((src, i) => (
          <div className="gallery-ai-card" key={src}>
            <img src={src} alt={`Gallery AI ${i+1}`} className="gallery-ai-img" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryAI; 