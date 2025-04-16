import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL || 'https://api.escuelajs.co/api/v1',
});

export default api;
