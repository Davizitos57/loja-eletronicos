import { useState, useEffect } from 'react';
import api from '../services/api';
import { relatorioService } from '../services/relatorio';
import dayjs from 'dayjs';

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
        
        const dataInicio = dayjs().startOf('month').format('YYYY-MM-DD');
        const dataFim = dayjs().endOf('month').format('YYYY-MM-DD');

        // Buscar dados em paralelo
        const [
          usuariosResponse,
          produtosResponse,
          valorMedioResponse,
          receitaTotalResponse,
          vendasPorProdutoResponse 
        ] = await Promise.all([
          api.get('/usuarios'),
          api.get('/loja/produtos'),
          relatorioService.getValorMedioPorPedido(),
          relatorioService.getReceitaTotal(dataInicio, dataFim),
          relatorioService.getVendasPorProduto()
        ]);

        // Calcular estatísticas
        const clientesAtivos = usuariosResponse.data.filter(u => u.tipoUsuario === 'BASIC').length;
        const totalProdutos = produtosResponse.data.length;
        
        // As vendas do mês serão a soma de todos os produtos vendidos no período
        const vendasMes = vendasPorProdutoResponse.reduce((acc, produto) => acc + (produto.total_vendido || 0), 0);

        setEstatisticas({
          totalUsuarios: clientesAtivos,
          totalProdutos,
          vendasMes: vendasMes,
          faturamento: receitaTotalResponse || 0,
          valorMedioPedido: valorMedioResponse || 0
        });

      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarEstatisticas();
  }, []); // O array vazio garante que os dados sejam recarregados sempre que o dashboard for montado

  return { estatisticas, loading };
};