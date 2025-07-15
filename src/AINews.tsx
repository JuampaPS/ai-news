import { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  
  author?: string;
  date?: string;
  likes?: number;
  comments?: number;
}

const SUPABASE_JSON_URL = 'https://ecrvpzlxargnrywftrwe.supabase.co/storage/v1/object/public/news//noticias_ai_diseno_sin_imagen.json';
const PLACEHOLDER_IMAGES = [
  '/images/ai1.jpg',
  '/images/ai2.jpg',
  '/images/ai3.jpg',
  '/images/ai4.jpg',
  '/images/ai5.jpg',
];

function getDomainFromUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace('www.', '');
  } catch {
    return 'source';
  }
}

function getCurrentDate(): string {
  const now = new Date();
  return now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }).toUpperCase();
}

export default function AINews() {
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<NewsItem[]>(SUPABASE_JSON_URL)
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(() => {
        setNews([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', margin: '2rem 0' }}><span className="gradient-loader" /></div>;
  }

  if (!news || news.length === 0) {
    return <div style={{ textAlign: 'center', margin: '2rem 0', color: '#888' }}>No hay noticias disponibles.</div>;
  }

  const newsWithImages = (news || []).map((n, idx) => ({
    ...n,
    image: PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length],
    author: getDomainFromUrl(n.source),
    date: getCurrentDate(),
    likes: n.likes ?? Math.floor(Math.random() * 10) + 1,
    comments: n.comments ?? Math.floor(Math.random() * 4),
  }));

  return (
    <div className="ain-news-list-modern">
      {newsWithImages.map((item, idx) => (
        <div key={idx} className="ain-news-card-modern" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', background: 'var(--color-card, #232946)', borderRadius: 18, boxShadow: '0 2px 16px #646cff22', padding: '1.5rem 1.2rem', margin: '1.2rem 0', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="ain-news-title-modern" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary, #646cff)', marginBottom: 6 }}>{item.title}</div>
          <div className="ain-news-summary-modern" style={{ fontSize: '1.08rem', color: 'var(--color-text, #f4f4f4)', marginBottom: 8 }}>{item.summary}</div>
          <div className="ain-news-meta-modern" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', alignItems: 'center', fontSize: '0.98rem', color: '#a5b4fc', marginBottom: 4 }}>
            <span className="ain-news-author-modern">{item.author}</span>
            <span className="ain-news-date-modern">{item.date}</span>
            <span className="ain-news-icons-modern" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 10c0-3.5 2.5-6 7-6s7 2.5 7 6c0 2.5-2 5-7 8-5-3-7-5.5-7-8z" stroke="#fff" strokeWidth="1.5" fill="none"/><text x="10" y="15" textAnchor="middle" fontSize="0.9rem" fill="#fff">{item.likes}</text></svg>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 16v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#fff" strokeWidth="1.5" fill="none"/><circle cx="10" cy="8" r="3" stroke="#fff" strokeWidth="1.5" fill="none"/><text x="10" y="15" textAnchor="middle" fontSize="0.9rem" fill="#fff">{item.comments}</text></svg>
            </span>
            <a href={item.source} target="_blank" rel="noopener noreferrer" className="ain-news-link-modern" style={{ background: 'linear-gradient(90deg, #646cff 0%, #60a5fa 100%)', color: '#fff', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 8px #646cff22', transition: 'background 0.2s', marginLeft: 'auto' }}>Read more</a>
          </div>
        </div>
      ))}
    </div>
  );
} 