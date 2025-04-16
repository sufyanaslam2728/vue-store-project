import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1',
});

export default api;
