import api from './api';

export const relatorioService = {
  // Produtos
  async getProdutosBaixoEstoque(limite = 5) {
    const response = await api.get(`/relatorios/produtos/baixo-estoque?limite=${limite}`);
    return response.data;
  },

  async getProdutosEsgotados() {
    const response = await api.get('/relatorios/produtos/esgotados');
    return response.data;
  },

  // Vendas
  async getVendasPorProduto() {
    const response = await api.get('/relatorios/vendas/produto');
    return response.data;
  },

  async getReceitaTotal(inicio, fim) {
    const response = await api.get(`/relatorios/receita-total?inicio=${inicio}&fim=${fim}`);
    return response.data;
  },

  async getValorMedioPorPedido() {
    const response = await api.get('/relatorios/valor-medio-pedido');
    return response.data;
  },

  // Clientes
  async getClientesMaisAtivos() {
    const response = await api.get('/relatorios/mais-ativos');
    return response.data;
  },

  async getClientesQueMaisGastam() {
    const response = await api.get('/relatorios/mais-gastam');
    return response.data;
  }
};