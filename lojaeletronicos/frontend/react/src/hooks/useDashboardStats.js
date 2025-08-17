import { useState, useEffect } from 'react';
import api from '../services/api';
import { relatorioService } from '../services/relatorio';

export const useDashboardStats = () => {
  const [loading, setLoading] = useState(true);
  const [estatisticas, setEstatisticas] = useState({
    totalUsuarios: 0,
    totalProdutos: 0,
    vendasMes: 0,
    faturamento: 0
  });

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        setLoading(true);
        
        // Buscar dados em paralelo
        const [usuarios, produtos, valorMedio] = await Promise.all([
          api.get('/usuarios'),
          api.get('/loja/produtos'),
          relatorioService.getValorMedioPorPedido()
        ]);

        // Calcular estatísticas
        const totalUsuarios = usuarios.data.length;
        const totalProdutos = produtos.data.length;
        const clientesAtivos = usuarios.data.filter(u => u.tipoUsuario === 'BASIC').length;
        
        // Para vendas do mês, você pode implementar um endpoint específico
        // ou usar dados existentes
        const vendasMes = Math.floor(Math.random() * 100); // Temporário
        const faturamento = valorMedio * vendasMes;

        setEstatisticas({
          totalUsuarios: clientesAtivos,
          totalProdutos,
          vendasMes,
          faturamento: faturamento || 0
        });

      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarEstatisticas();
  }, []);

  return { estatisticas, loading };
};