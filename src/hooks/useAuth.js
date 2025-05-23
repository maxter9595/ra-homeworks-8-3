import { useState, useEffect } from 'react';
import { auth, getProfile } from '../services/api';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getProfile(token);
          setUser(userData);
          setError('');
        } catch (err) {
          if (err.response?.status === 401) {
            logout();
          } else {
            setError('Failed to load user data');
          }
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    try {
      const { token: newToken } = await auth(credentials);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      const userData = await getProfile(newToken);
      setUser(userData);
      setError('');
      return true;
    } catch (err) {
      setError(err.message);
      logout();
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return { token, user, login, logout, loading, error };
}

export default useAuth;
