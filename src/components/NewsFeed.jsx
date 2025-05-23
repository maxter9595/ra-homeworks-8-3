import { useState, useEffect } from 'react';
import { getNews } from '../services/api';

function NewsFeed({ token, onLogout, user }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNews(token);
        setNews(newsData);
      } catch (err) {
        if (err.response?.status === 401) {
          onLogout();
        } else {
          setError('Failed to load news');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, onLogout]);

  return (
    <div className="news-container">
      <div className="news-header">
        <h1 className="news-title">Neto Social</h1>
        <div className="news-user">
          <div className="user-profile">
            <img 
              src={user?.avatar || 'https://i.pravatar.cc/40'} 
              alt="User Avatar" 
              className="user-avatar" 
            />
            <div className="user-info">
              <span className="user-greeting">Hello,</span>
              <span className="user-name">{user?.name || 'User'}</span>
            </div>
          </div>
          <button onClick={onLogout} className="logout-button">
            <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="news-content">
        {loading ? (
          <div className="news-loading">
            <div className="loading-spinner"></div>
            Loading news...
          </div>
        ) : error ? (
          <div className="news-error">{error}</div>
        ) : (
          <div className="news-list">
            {news.map((item) => (
              <div key={item.id} className="news-item">
                {item.image && (
                  <img src={item.image} alt={item.title} className="news-image" />
                )}
                <div className="news-body">
                  <h2 className="news-item-title">{item.title}</h2>
                  <p className="news-item-content">{item.content}</p>
                  <div className="news-meta">
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>• 3 min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsFeed;
