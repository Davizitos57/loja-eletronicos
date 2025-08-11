import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // (esta 8081 para conectar com a porta do backend)Verifique se essa URL está correta
  timeout: 5000,
});

export default api;