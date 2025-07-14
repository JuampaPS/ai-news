import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer">
    <span>© {new Date().getFullYear()} AI News for My.se Students</span>
    <div className="footer-bio">
      <b>JP Palacio Soler</b> is a creative developer and AI enthusiast passionate about building modern, user-friendly web experiences. He enjoys blending technology, design, and education to empower others.
    </div>
    <div className="footer-socials">
      <a href="https://www.linkedin.com/in/juan-pablo-ps" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#0A66C2"/><path d="M10.5 13.5h3v8h-3v-8zm1.5-2.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 2.5h2.8v1.1h.04c.39-.74 1.34-1.52 2.76-1.52 2.95 0 3.5 1.94 3.5 4.47v5.95h-3v-5.28c0-1.26-.02-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.78v5.38h-3v-8z" fill="#fff"/></svg>
      </a>
      <a href="https://portafolio-jpps.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#232946"/><path d="M10 10h12v12H10z" fill="#fff"/><path d="M13 13h6v6h-6z" fill="#646cff"/></svg>
      </a>
    </div>
  </footer>
);

export default Footer; 