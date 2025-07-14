import React, { RefObject } from 'react';

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  showFeaturesMenu: boolean;
  setShowFeaturesMenu: (show: boolean) => void;
  featuresMenuRef: RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ page, setPage, theme, toggleTheme, showFeaturesMenu, setShowFeaturesMenu, featuresMenuRef }) => {
  const goTo = (p: string) => setPage(p);
  return (
    <header className="app-header">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 60, zIndex: 0, pointerEvents: 'none', opacity: 0.18 }}>
        {/* SVG decorativo */}
        <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <polyline points="0,50 40,20 80,50 120,20 160,50 200,20 240,50 280,20 320,50 360,20 400,50" stroke="url(#headerLine)" strokeWidth="3" fill="none">
            <animate attributeName="points" dur="4s" repeatCount="indefinite"
              values="0,50 40,20 80,50 120,20 160,50 200,20 240,50 280,20 320,50 360,20 400,50;0,20 40,50 80,20 120,50 160,20 200,50 240,20 280,50 320,20 360,50 400,20;0,50 40,20 80,50 120,20 160,50 200,20 240,50 280,20 320,50 360,20 400,50" />
          </polyline>
          <circle cx="60" cy="35" r="3" fill="#60a5fa">
            <animate attributeName="cy" values="35;15;35" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="340" cy="25" r="2.5" fill="#a5b4fc">
            <animate attributeName="cy" values="25;45;25" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <defs>
            <linearGradient id="headerLine" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#646cff" />
              <stop offset="0.3" stopColor="#a5b4fc" />
              <stop offset="0.7" stopColor="#60a5fa" />
              <stop offset="1" stopColor="#232946" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="logo-title" style={{ cursor: 'pointer' }} onClick={() => goTo('home')}>
        <svg className="ai-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" stroke="#646cff" strokeWidth="3" fill="#181c24" />
          <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Segoe UI, Arial" dy=".3em">AI</text>
        </svg>
        <span className="app-title" data-shadow="AI News for My.se Students">AI News for My.se Students</span>
      </div>
      <nav className="nav-bar">
        <a href="#home" className={`has-tooltip${page === 'home' ? ' active' : ''}`} onClick={e => { e.preventDefault(); goTo('home'); }}>
          <svg className="menu-icon" viewBox="0 0 20 20"><path d="M3 9.5L10 4l7 5.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" strokeWidth="1.5"/></svg>
          Home
          <span className="tooltip">Go to Home</span>
        </a>
        <a href="#news" className={`has-tooltip${page === 'news' ? ' active' : ''}`} onClick={e => { e.preventDefault(); goTo('news'); }}>
          <svg className="menu-icon" viewBox="0 0 20 20"><rect x="3" y="6" width="14" height="10" rx="2" strokeWidth="1.5"/><rect x="6" y="9" width="8" height="2" rx="1"/><rect x="6" y="12" width="5" height="1.5" rx="0.75"/></svg>
          News
          <span className="tooltip">Latest AI News</span>
        </a>
        <div style={{ position: 'relative', display: 'inline-block' }} ref={featuresMenuRef}>
          <a href="#features" onClick={e => { e.preventDefault(); setShowFeaturesMenu(!showFeaturesMenu); }} className={`has-tooltip${page === 'ai-programs' || page === 'ai-art-blogs' ? ' active' : ''}`}>
            <svg className="menu-icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" strokeWidth="1.5"/><path d="M7 10h6M10 7v6" strokeWidth="1.5"/></svg>
            Features ▾
            <span className="tooltip">Explore Features</span>
          </a>
          {showFeaturesMenu && (
            <div style={{ position: 'absolute', top: '2.2rem', left: 0, background: '#232946', borderRadius: 8, boxShadow: '0 2px 12px #646cff22', zIndex: 10, minWidth: 160 }}>
              <a href="#ai-programs" onClick={e => { e.preventDefault(); goTo('ai-programs'); setShowFeaturesMenu(false); }} style={{ display: 'block', padding: '0.7rem 1.2rem', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }} className={`has-tooltip${page === 'ai-programs' ? ' active' : ''}`}>
                <svg className="menu-icon" viewBox="0 0 20 20"><rect x="4" y="7" width="12" height="7" rx="2" strokeWidth="1.5"/><circle cx="10" cy="10.5" r="1.5"/><rect x="9" y="5" width="2" height="2" rx="1"/></svg>
                AI Programs
                <span className="tooltip">Top AI Courses</span>
              </a>
              <a href="#ai-art-blogs" onClick={e => { e.preventDefault(); goTo('ai-art-blogs'); setShowFeaturesMenu(false); }} style={{ display: 'block', padding: '0.7rem 1.2rem', color: '#a5b4fc', textDecoration: 'none', fontWeight: 600 }} className={`has-tooltip${page === 'ai-art-blogs' ? ' active' : ''}`}>
                <svg className="menu-icon" viewBox="0 0 20 20"><rect x="4" y="7" width="12" height="7" rx="2" strokeWidth="1.5"/><circle cx="10" cy="10.5" r="1.5"/><rect x="7" y="5" width="6" height="2" rx="1"/></svg>
                AI Art Blogs
                <span className="tooltip">Best AI Art Blogs</span>
              </a>
            </div>
          )}
        </div>
        <a href="#about" className={`has-tooltip${page === 'about' ? ' active' : ''}`} onClick={e => { e.preventDefault(); goTo('about'); }}>
          <svg className="menu-icon" viewBox="0 0 20 20"><circle cx="10" cy="7" r="3" strokeWidth="1.5"/><path d="M5 16c0-2.5 2-4 5-4s5 1.5 5 4" strokeWidth="1.5"/></svg>
          About
          <span className="tooltip">About this project</span>
        </a>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s' }}>
              <circle cx="12" cy="12" r="5" fill="#FFD93B" stroke="#FFD93B" />
              <g stroke="#FFD93B">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s' }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="#232946" />
            </svg>
          )}
        </button>
      </nav>
      <div className="tech-banner">
        <svg viewBox="0 0 400 40" width="100%" height="40" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="bannerGradient" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#646cff" />
              <stop offset="0.3" stopColor="#a5b4fc" />
              <stop offset="0.7" stopColor="#60a5fa" />
              <stop offset="1" stopColor="#232946" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polyline
            points="0,30 40,10 80,30 120,10 160,30 200,10 240,30 280,10 320,30 360,10 400,30"
            fill="none"
            stroke="url(#bannerGradient)"
            strokeWidth="4"
            filter="url(#glow)"
          >
            <animate attributeName="points" dur="3s" repeatCount="indefinite"
              values="0,30 40,10 80,30 120,10 160,30 200,10 240,30 280,10 320,30 360,10 400,30;0,10 40,30 80,10 120,30 160,10 200,30 240,10 280,30 320,10 360,30 400,10;0,30 40,10 80,30 120,10 160,30 200,10 240,30 280,10 320,30 360,10 400,30" />
          </polyline>
        </svg>
        <div className="tech-banner-text">
          <span>Futuristic. Tech. Young. Modern.</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 