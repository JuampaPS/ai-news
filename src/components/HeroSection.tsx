import React from 'react';
import ImageCarousel from './ImageCarousel';

interface HeroSectionProps {
  aiAnimStep: number;
  goToAbout: () => void;
  goToNews: () => void;
  goToAIArtBlogs: () => void;
  goToAIPrograms: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ goToAbout, goToNews, goToAIArtBlogs, goToAIPrograms }) => (
  <section className="hero-section">
    <h1>Stay Ahead with <span className="highlight">AI News</span></h1>
    <p className="subtitle">Curated tech news and AI trends for My.se students. Fast. Reliable. High-tech.</p>
    <button className="about-glow-btn" onClick={goToAbout}>About AI News</button>
    <ImageCarousel />
    <div className="features-section features-gradient-border features-grid" id="features" style={{ marginTop: 32 }}>
      <div className="feature-card ripple" style={{ cursor: 'pointer' }} onClick={goToNews}>
        <svg className="card-icon" viewBox="0 0 20 20"><polyline points="10 2 4 12 11 12 8 18 16 7 9 7 12 2" strokeWidth="1.5" fill="none"/></svg>
        <h3>Latest AI Trends</h3>
        <p>Get the most recent updates in artificial intelligence and technology.</p>
      </div>
      <div className="feature-card ripple" style={{ cursor: 'pointer' }} onClick={goToAIArtBlogs}>
        <svg className="card-icon" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2" strokeWidth="1.5" fill="none"/><circle cx="7" cy="9" r="1.2"/><path d="M3 15l4-4a2 2 0 0 1 2.8 0l4.2 4" strokeWidth="1.5" fill="none"/></svg>
        <h3>Best Blogs AI Art</h3>
        <p>Discover the best blogs for AI-generated art inspiration, prompts, and creative techniques.</p>
      </div>
      <div className="feature-card ripple" style={{ cursor: 'pointer' }} onClick={goToAIPrograms}>
        <svg className="card-icon" viewBox="0 0 20 20"><rect x="5" y="7" width="10" height="6" rx="2" strokeWidth="1.5" fill="none"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><rect x="9" y="5" width="2" height="2" rx="1"/></svg>
        <h3>AI Programs</h3>
        <p>Explore curated links to top AI courses and programs online.</p>
      </div>
      <a className="feature-card ripple" style={{ cursor: 'pointer', textDecoration: 'none' }} href="https://my.se/" target="_blank" rel="noopener noreferrer">
        <svg className="card-icon" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="3" strokeWidth="1.5" fill="none"/><path d="M4 8h12M4 12h12" strokeWidth="1.2"/></svg>
        <h3>VÄLKOMMEN TILL VÅRA UTBILDNINGAR 2025</h3>
        <p>For current and future MY.se students. Discover available programs and courses.</p>
      </a>
    </div>
  </section>
);

export default HeroSection; 