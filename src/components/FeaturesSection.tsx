import React from 'react';

interface FeaturesSectionProps {
  goToNews: () => void;
  goToAIArtBlogs: () => void;
  goToAIPrograms: () => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ goToNews, goToAIArtBlogs, goToAIPrograms }) => (
  <section className="features-section features-gradient-border" id="features">
    <div className="feature-card ripple" style={{ cursor: 'pointer' }} onClick={goToNews}>
      <svg className="card-icon" viewBox="0 0 20 20"><polyline points="10 2 4 12 11 12 8 18 16 7 9 7 12 2" strokeWidth="1.5" fill="none"/></svg>
      <h3>Latest AI Trends</h3>
      <p>Get the most recent updates in artificial intelligence and technology.</p>
    </div>
    <div className="feature-card ripple">
      <a href="https://my.se/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        <svg className="card-icon" viewBox="0 0 20 20"><circle cx="10" cy="7" r="3" strokeWidth="1.5" fill="none"/><path d="M5 16c0-2.5 2-4 5-4s5 1.5 5 4" strokeWidth="1.5" fill="none"/></svg>
        <h3>Student Focused</h3>
        <p>Content curated especially for My.se students and their interests.</p>
        <span style={{ display: 'block', marginTop: '0.5rem', color: '#646cff', fontWeight: 600, textDecoration: 'underline' }}>
          Discover our news UTBILDNINGAR 2025
        </span>
      </a>
    </div>
    <div className="feature-card ripple" style={{ cursor: 'pointer' }} onClick={goToAIArtBlogs}>
      <svg className="card-icon" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2" strokeWidth="1.5" fill="none"/><circle cx="7" cy="9" r="1.2"/><path d="M3 15l4-4a2 2 0 0 1 2.8 0l4.2 4" strokeWidth="1.5" fill="none"/></svg>
      <h3>Best Blogs AI Art</h3>
      <p>Discover the best blogs for AI-generated art inspiration, prompts, and creative techniques.</p>
      <span style={{ display: 'block', marginTop: '0.5rem', color: '#a5b4fc', fontWeight: 600, textDecoration: 'underline' }}>
        View AI Art Blogs
      </span>
    </div>
    <div className="feature-card ripple" style={{ cursor: 'pointer' }} onClick={goToAIPrograms}>
      <svg className="card-icon" viewBox="0 0 20 20"><rect x="5" y="7" width="10" height="6" rx="2" strokeWidth="1.5" fill="none"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><rect x="9" y="5" width="2" height="2" rx="1"/></svg>
      <h3>AI Programs</h3>
      <p>Explore curated links to top AI courses and programs online.</p>
      <span style={{ display: 'block', marginTop: '0.5rem', color: '#60a5fa', fontWeight: 600, textDecoration: 'underline' }}>
        View AI Programs
      </span>
    </div>
  </section>
);

export default FeaturesSection; 