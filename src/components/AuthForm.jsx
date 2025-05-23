import { useState } from 'react';
import '../styles/AuthForm.css';

function AuthForm({ onLogin }) {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await onLogin(formData);
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Neto Social</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Username"
          value={formData.login}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {error && <div className="auth-error">{error}</div>}
      <p className="auth-subtitle">Neto Social</p>
      <p className="auth-description">Facebook and VK killer.</p>
    </div>
  );
}

export default AuthForm;
