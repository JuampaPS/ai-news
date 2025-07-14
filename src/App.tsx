import { useEffect, useState, useRef } from 'react';
import './App.css';
import './components/ImageCarousel.css';
import AINews from './AINews';
import HeroSection from './components/HeroSection';

function useScrollReveal(selector: string) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const obs = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => {
      el.classList.add('reveal');
      obs.observe(el);
    });
    return () => {
      els.forEach(el => obs.unobserve(el));
    };
  }, [selector]);
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [page, setPage] = useState<'home' | 'news' | 'about' | 'ai-programs' | 'ai-art-blogs'>('home');
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const featuresMenuRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [aiAnimStep, setAiAnimStep] = useState(0);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light' : '';
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 180);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAiAnimStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const goToNews = () => setPage('news');
  const goToHome = () => setPage('home');
  const goToAbout = () => setPage('about');

  // Cierra el submenú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (featuresMenuRef.current && !featuresMenuRef.current.contains(event.target as Node)) {
        setShowFeaturesMenu(false);
      }
    }
    if (showFeaturesMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFeaturesMenu]);

  useScrollReveal('.feature-card, .ain-news-card, .about-section, .features-section');

  return (
    <div className="app-container">
      <header className="app-header">
        {/* SVG decorativo futurista en el fondo del header */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 60, zIndex: 0, pointerEvents: 'none', opacity: 0.18 }}>
          <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <polyline points="0,50 40,20 80,50 120,20 160,50 200,20 240,50 280,20 320,50 360,20 400,50" stroke="url(#headerLine)" strokeWidth="3" fill="none">
              <animate attributeName="points" dur="4s" repeatCount="indefinite"
                values="0,50 40,20 80,50 120,20 160,50 200,20 240,50 280,20 320,50 360,20 400,50;
                        0,20 40,50 80,20 120,50 160,20 200,50 240,20 280,50 320,20 360,50 400,20;
                        0,50 40,20 80,50 120,20 160,50 200,20 240,50 280,20 320,50 360,20 400,50" />
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
        <div className="logo-title" style={{ cursor: 'pointer' }} onClick={goToHome}>
          <svg className="ai-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#646cff" strokeWidth="3" fill="#181c24" />
            <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Segoe UI, Arial" dy=".3em">AI</text>
          </svg>
          <span className="app-title" data-shadow="AI News for My.se Students">AI News for My.se Students</span>
        </div>
        <nav className="nav-bar">
          <a href="#home" className={`has-tooltip${page === 'home' ? ' active' : ''}`} onClick={e => { e.preventDefault(); goToHome(); }}>
            <svg className="menu-icon" viewBox="0 0 20 20"><path d="M3 9.5L10 4l7 5.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" strokeWidth="1.5"/></svg>
            Home
            <span className="tooltip">Go to Home</span>
          </a>
          <a href="#news" className={`has-tooltip${page === 'news' ? ' active' : ''}`} onClick={e => { e.preventDefault(); goToNews(); }}>
            <svg className="menu-icon" viewBox="0 0 20 20"><rect x="3" y="6" width="14" height="10" rx="2" strokeWidth="1.5"/><rect x="6" y="9" width="8" height="2" rx="1"/><rect x="6" y="12" width="5" height="1.5" rx="0.75"/></svg>
            News
            <span className="tooltip">Latest AI News</span>
          </a>
          <div style={{ position: 'relative', display: 'inline-block' }} ref={featuresMenuRef}>
            <a href="#features" onClick={e => { e.preventDefault(); setShowFeaturesMenu(v => !v); }} className={`has-tooltip${page === 'ai-programs' || page === 'ai-art-blogs' ? ' active' : ''}`}>
              <svg className="menu-icon" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" strokeWidth="1.5"/><path d="M7 10h6M10 7v6" strokeWidth="1.5"/></svg>
              Features ▾
              <span className="tooltip">Explore Features</span>
            </a>
            {showFeaturesMenu && (
              <div style={{ position: 'absolute', top: '2.2rem', left: 0, background: '#232946', borderRadius: 8, boxShadow: '0 2px 12px #646cff22', zIndex: 10, minWidth: 160 }}>
                <a href="#ai-programs" onClick={e => { e.preventDefault(); setPage('ai-programs'); setShowFeaturesMenu(false); }} style={{ display: 'block', padding: '0.7rem 1.2rem', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }} className={`has-tooltip${page === 'ai-programs' ? ' active' : ''}`}>
                  <svg className="menu-icon" viewBox="0 0 20 20"><rect x="4" y="7" width="12" height="7" rx="2" strokeWidth="1.5"/><circle cx="10" cy="10.5" r="1.5"/><rect x="9" y="5" width="2" height="2" rx="1"/></svg>
                  AI Programs
                  <span className="tooltip">Top AI Courses</span>
                </a>
                <a href="#ai-art-blogs" onClick={e => { e.preventDefault(); setPage('ai-art-blogs'); setShowFeaturesMenu(false); }} style={{ display: 'block', padding: '0.7rem 1.2rem', color: '#a5b4fc', textDecoration: 'none', fontWeight: 600 }} className={`has-tooltip${page === 'ai-art-blogs' ? ' active' : ''}`}>
                  <svg className="menu-icon" viewBox="0 0 20 20"><rect x="4" y="7" width="12" height="7" rx="2" strokeWidth="1.5"/><circle cx="10" cy="10.5" r="1.5"/><rect x="7" y="5" width="6" height="2" rx="1"/></svg>
                  AI Art Blogs
                  <span className="tooltip">Best AI Art Blogs</span>
                </a>
              </div>
            )}
          </div>
          <a href="#about" className={`has-tooltip${page === 'about' ? ' active' : ''}`} onClick={e => { e.preventDefault(); goToAbout(); }}>
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
        {/* Futuristic Tech Banner */}
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
                values="0,30 40,10 80,30 120,10 160,30 200,10 240,30 280,10 320,30 360,10 400,30;
                        0,10 40,30 80,10 120,30 160,10 200,30 240,10 280,30 320,10 360,30 400,10;
                        0,30 40,10 80,30 120,10 160,30 200,10 240,30 280,10 320,30 360,10 400,30" />
            </polyline>
          </svg>
          <div className="tech-banner-text">
            <span>Futuristic. Tech. Young. Modern.</span>
          </div>
        </div>
      </header>
      <main>
        {page === 'home' && (
          <HeroSection
            aiAnimStep={aiAnimStep}
            goToAbout={goToAbout}
            goToNews={goToNews}
            goToAIArtBlogs={() => setPage('ai-art-blogs')}
            goToAIPrograms={() => setPage('ai-programs')}
          />
        )}
        {page === 'news' && <AINews />}
        {page === 'ai-programs' && (
          <section className="about-section" id="ai-programs">
            <h2>🎨 🧠 Best AI Tools for Design & Content Creation</h2>
            <p style={{ color: '#b8b8ff', fontSize: '1.08rem', marginBottom: 18 }}>
              Discover a curated list of the most powerful and user-friendly AI tools for designers, creators, marketers, and students. These platforms help you generate images, videos, text, and more—faster and smarter. Whether you want to create stunning graphics, automate writing, or prototype apps, these tools will boost your creativity and productivity.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'var(--color-bg)', color: 'var(--color-text)', borderRadius: 16, boxShadow: '0 2px 16px #646cff22', fontSize: '1.05rem', minWidth: 320, maxWidth: 700, margin: '0 auto' }}>
                <thead>
                  <tr style={{ background: '#232946', color: '#60a5fa', borderRadius: 16 }}>
                    <th style={{ padding: '16px 10px', border: 'none', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.02em', borderTopLeftRadius: 16 }}>Tool</th>
                    <th style={{ padding: '16px 10px', border: 'none', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.02em' }}>What does it do?</th>
                    <th style={{ padding: '16px 10px', border: 'none', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.02em', borderTopRightRadius: 16 }}>Ideal for…</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Canva Magic Studio", "Generate images, text, video, and presentations from prompts.", "Quick designs, social media", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#00C4CC"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">C</text></svg>],
                    ["Adobe Firefly", "Generative AI for images, backgrounds, text, and illustrations. Integrated in Photoshop and Express.", "Professional graphic design", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#FF6163"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">A</text></svg>],
                    ["Runway ML", "Generate and edit video with AI, remove backgrounds, upscale.", "Social videos, reels, motion", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#6EE7B7"/><polygon points="12,10 24,16 12,22" fill="#232946"/></svg>],
                    ["Descript", "Video editor + auto transcription + overdub (AI voice).", "Podcasts, reels, audiovisual content", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#2563EB"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">D</text></svg>],
                    ["Notion AI", "Assisted writing inside Notion: summaries, ideas, structure.", "Blog, organization, education", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#fff" stroke="#232946" strokeWidth="2"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#232946">N</text></svg>],
                    ["Jasper AI", "Long-form content writing with adjustable tone (blogs, ads, etc).", "Copywriting, marketing, SEO", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#A78BFA"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">J</text></svg>],
                    ["Kittl", "Graphic design platform with text-to-graphic styles.", "Logos, posters, branding", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#FBBF24"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#232946">K</text></svg>],
                    ["Uizard", "Turn sketches or prompts into UI prototypes in seconds.", "Apps, websites, wireframes", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#60A5FA"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">U</text></svg>],
                    ["Looka", "Automatic logo generator with AI and branding kit.", "Quick branding", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#F472B6"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">L</text></svg>],
                    ["Lex Page / Anyword", "Predictive writing for ads, landing pages, headlines.", "Marketing, ecommerce, UX writing", <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#232946"/><text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">A</text></svg>],
                  ].map((row, idx) => (
                    <tr key={String(row[0])} style={{ background: idx % 2 === 0 ? '#23294611' : 'transparent' }}>
                      <td style={{ padding: '14px 10px', border: 'none', fontWeight: 700, color: '#646cff', fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                        {row[3]} <span>{row[0]}</span>
                      </td>
                      <td style={{ padding: '14px 10px', border: 'none', color: '#b8b8ff', fontWeight: 400 }}>{row[1]}</td>
                      <td style={{ padding: '14px 10px', border: 'none', color: '#60a5fa', fontWeight: 500 }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 style={{ color: '#60a5fa', marginTop: 18 }}>🔗 Useful Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7rem', marginBottom: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              <a href="https://www.canva.com/magic/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Canva Magic Studio</a>
              <a href="https://firefly.adobe.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Adobe Firefly</a>
              <a href="https://runwayml.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Runway</a>
              <a href="https://www.descript.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Descript</a>
              <a href="https://www.jasper.ai/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Jasper</a>
              <a href="https://www.uizard.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Uizard</a>
              <a href="https://www.kittl.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Kittl</a>
              <a href="https://looka.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Looka</a>
            </div>
            <button className="cta-btn" style={{ marginTop: 10 }} onClick={() => setPage('home')}>Back to Home</button>
          </section>
        )}
        {page === 'ai-art-blogs' && (
          <section className="about-section" id="ai-art-blogs">
            <h2>Best Blogs AI Art</h2>
            <p style={{ color: '#b8b8ff', fontSize: '1.08rem', marginBottom: 18 }}>
              Discover the best blogs for AI-generated art: inspiration, prompts, and creative techniques for 2025.
            </p>
            <h3 style={{ color: '#a5b4fc', marginTop: 18 }}>Top blogs and resources</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.7rem', marginBottom: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              <a href="https://runwayml.com/news" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Runway News</a>
              <a href="https://starryai.com/app/explore" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Starryai Gallery</a>
              <a href="https://create.playform.io/explore" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Playform ArtMine</a>
              <a href="https://www.pica-ai.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Pica AI</a>
              <a href="https://creator.nightcafe.studio/explore" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>NightCafe Creator</a>
              <a href="https://zapier.com/blog/best-ai-image-generator/" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', background: '#232946', borderRadius: 8, padding: '0.7rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px #646cff22' }}>Zapier: Best AI Image Generators</a>
            </div>
            <h3 style={{ color: '#a5b4fc', marginTop: 18 }}>📌 Other recommended sources</h3>
            <ul style={{ color: '#b8b8ff', fontSize: '1.05rem', marginBottom: 18, lineHeight: 1.7 }}>
              <li><b>Zapier</b> – Comparisons of the best AI image generators in 2025, with examples and analysis</li>
              <li><b>UXMag</b> – Analysis of tools like Canva, Craiyon, and DeepAI</li>
              <li><b>eWEEK</b> – Ranking of generators like Midjourney, Adobe Firefly, and Leonardo</li>
            </ul>
            <button className="cta-btn" style={{ marginTop: 10 }} onClick={() => setPage('home')}>Back to Home</button>
          </section>
        )}
        {page === 'about' && (
          <section className="about-section" id="about">
            <h2>About this project</h2>
            <p>
              <b>AI News for My.se Students</b> is a web platform designed to provide Malmö Yrkeshögskola (My.se) students with fast, modern access to the latest news and trends in artificial intelligence and technology.
            </p>
            <h3>Tools used</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
              maxWidth: 700,
              margin: '1.5rem auto',
              padding: 0
            }}>
              {/* Vite */}
              <div style={{
                background: '#232946',
                borderRadius: 14,
                boxShadow: '0 2px 12px #646cff22',
                padding: '1.2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 140
              }}>
                <svg width="38" height="38" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="vite1" x1="6" y1="-2" x2="30" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#41D1FF"/><stop offset="1" stopColor="#BD34FE"/></linearGradient><linearGradient id="vite2" x1="18" y1="4" x2="25" y2="25" gradientUnits="userSpaceOnUse"><stop stopColor="#FFEA83"/><stop offset="0.083" stopColor="#FFDD35"/><stop offset="1" stopColor="#FFA800"/></linearGradient></defs><path d="M30 6L16 29 2 6l14-4 14 4z" fill="url(#vite1)"/><path d="M16 29L2 6l14-4v27z" fill="#FFF" fillOpacity=".1"/><path d="M16 29L30 6l-14-4v27z" fill="#FFF" fillOpacity=".2"/><path d="M16 6.5l7.5 13h-15L16 6.5z" fill="url(#vite2)"/></svg>
                <div style={{ fontWeight: 700, color: '#646cff', fontSize: '1.08rem', marginTop: 10 }}>Vite + React + TS</div>
                <div style={{ color: '#b8b8ff', fontSize: '0.98rem', marginTop: 4, textAlign: 'center' }}>Fast, modern UI development</div>
              </div>
              {/* Supabase */}
              <div style={{ background: '#232946', borderRadius: 14, boxShadow: '0 2px 12px #646cff22', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 140 }}>
                <svg width="38" height="38" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#3ECF8E"/></svg>
                <div style={{ fontWeight: 700, color: '#3ECF8E', fontSize: '1.08rem', marginTop: 10 }}>Supabase Storage</div>
                <div style={{ color: '#b8b8ff', fontSize: '0.98rem', marginTop: 4, textAlign: 'center' }}>Secure, scalable file hosting</div>
              </div>
              {/* Axios */}
              <div style={{ background: '#232946', borderRadius: 14, boxShadow: '0 2px 12px #646cff22', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 140 }}>
                <svg width="38" height="38" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#5A29E4"/><path d="M10.5 21.5l5-11 5 11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="21.5" r="1.5" fill="#fff"/></svg>
                <div style={{ fontWeight: 700, color: '#5A29E4', fontSize: '1.08rem', marginTop: 10 }}>Axios</div>
                <div style={{ color: '#b8b8ff', fontSize: '0.98rem', marginTop: 4, textAlign: 'center' }}>HTTP requests for news data</div>
              </div>
              {/* CSS */}
              <div style={{ background: '#232946', borderRadius: 14, boxShadow: '0 2px 12px #646cff22', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 140 }}>
                <svg width="38" height="38" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#264DE4"/><path d="M8 6h16l-1.5 17.5L16 26l-6.5-2.5L8 6z" fill="#2965F1"/><path d="M16 24.5l5.5-2.1L22.5 8h-11l1 14.4 5.5 2.1z" fill="#fff"/><path d="M16 13.5h-3l-.2-2h3.2V9.5h-5l.5 6h4.5v-2zm0 4.5h-2.5l-.2-2h2.7v-2h-5l.5 6h4.5v-2z" fill="#EBEBEB"/></svg>
                <div style={{ fontWeight: 700, color: '#264DE4', fontSize: '1.08rem', marginTop: 10 }}>Modern CSS</div>
                <div style={{ color: '#b8b8ff', fontSize: '0.98rem', marginTop: 4, textAlign: 'center' }}>Responsive, attractive UI</div>
              </div>
              {/* ChatGPT */}
              <div style={{ background: '#232946', borderRadius: 14, boxShadow: '0 2px 12px #646cff22', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 140 }}>
                <svg width="38" height="38" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#10A37F"/><path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1116 9.5a6.5 6.5 0 010 13z" fill="#fff"/><path d="M16 11.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.5a3 3 0 110-6 3 3 0 010 6z" fill="#fff"/></svg>
                <div style={{ fontWeight: 700, color: '#10A37F', fontSize: '1.08rem', marginTop: 10 }}>ChatGPT</div>
                <div style={{ color: '#b8b8ff', fontSize: '0.98rem', marginTop: 4, textAlign: 'center' }}>Code, design & content ideas</div>
              </div>
              {/* n8n */}
              <div style={{ background: '#232946', borderRadius: 14, boxShadow: '0 2px 12px #646cff22', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 140 }}>
                <svg width="38" height="38" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#4E9A06"/><circle cx="16" cy="16" r="8" fill="#fff"/><path d="M16 12v8M12 16h8" stroke="#4E9A06" strokeWidth="2" strokeLinecap="round"/></svg>
                <div style={{ fontWeight: 700, color: '#4E9A06', fontSize: '1.08rem', marginTop: 10 }}>n8n (soon)</div>
                <div style={{ color: '#b8b8ff', fontSize: '0.98rem', marginTop: 4, textAlign: 'center' }}>Automated news ingestion</div>
              </div>
            </div>
            <h3>Purpose</h3>
            <p>
              The goal of this project is to bring relevant AI and technology information closer to students, with an intuitive, modern user experience accessible from any device. It also serves as a practical example of integrating current web technologies and frontend best practices, leveraging AI tools and soon, automation workflows.
            </p>
          </section>
        )}
      </main>
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
      {showScrollTop && (
        <button className="scroll-to-top visible" onClick={scrollToTop} aria-label="Scroll to top">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 15 12 9 18 15"/></svg>
        </button>
      )}
      </div>
  );
}

export default App;
