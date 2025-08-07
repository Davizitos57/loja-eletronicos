import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Verifique se essa URL está correta
  timeout: 5000,
});

export default api;