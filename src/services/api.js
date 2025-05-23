import axios from 'axios';
import * as mockApi from '../mocks/api';

let USE_MOCKS = true;
const API_URL = 'http://localhost:7070';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const realAuth = async (credentials) => {
  try {
    const response = await api.post('/auth', credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const realGetProfile = async (token) => {
  try {
    const response = await api.get('/private/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const realGetNews = async (token) => {
  try {
    const response = await api.get('/private/news', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      throw { response: { status: 401 } };
    }
    throw new Error(error.response.data.message || 'API request failed');
  } else if (error.request) {
    throw new Error('No response from server. Check your connection.');
  } else {
    throw new Error('Request failed to be created');
  }
};

export const auth = (credentials) => 
  USE_MOCKS ? mockApi.mockAuth(credentials) : realAuth(credentials);

export const getProfile = (token) => 
  USE_MOCKS ? mockApi.mockGetProfile(token) : realGetProfile(token);

export const getNews = (token) => 
  USE_MOCKS ? mockApi.mockGetNews(token) : realGetNews(token);

export const isUsingMocks = () => USE_MOCKS;
export const setUseMocks = (value) => {
  USE_MOCKS = value;
  console.log(`API mode switched to ${value ? 'MOCKS' : 'REAL API'}`);
};
