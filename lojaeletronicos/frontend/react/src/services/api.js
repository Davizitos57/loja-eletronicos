import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
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

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta recebida de: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });

    // Tratamento de erros específicos
    if (error.response?.status === 404) {
      console.warn('Recurso não encontrado');
    } else if (error.response?.status === 500) {
      console.error('Erro interno do servidor');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Servidor indisponível');
    }

    return Promise.reject(error);
  }
);

export default api;