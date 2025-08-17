import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 30000, // Aumentar para 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar interceptor para logs de debug
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Fazendo requisição para: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta recebida de: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;