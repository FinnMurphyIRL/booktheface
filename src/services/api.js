import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://booktheface-backend.replit.app/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const getPosts = async (userId) => {
  const response = await api.get(`/posts?userId=${userId}`);
  return response.data;
};

export const createPost = async (userId, content) => {
  const response = await api.post("/posts", { userId, content });
  return response.data;
};

export const getFriendSuggestions = async (userId) => {
  const response = await api.get(`/users/${userId}/friend-suggestions`);
  return response.data;
};

export const addFriend = async (userId, friendId) => {
  const response = await api.post(`/users/${userId}/friends`, { friendId });
  return response.data;
};

export default api;