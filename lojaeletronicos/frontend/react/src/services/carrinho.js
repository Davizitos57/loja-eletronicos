import api from './api';

export const carrinhoService = {
  async adicionarItem(clienteId, produtoId, quantidade) {
    const response = await api.post('/itens', null, {
      params: { clienteId, produtoId, quantidade }
    });
    return response.data;
  },

  async removerItem(clienteId, produtoId) {
    const response = await api.delete('/itens', {
      params: { clienteId, produtoId }
    });
    return response.data;
  },

  async listarItens(clienteId) {
    const response = await api.get('/itens', {
      params: { clienteId }
    });
    return response.data;
  },

  async finalizarCarrinho(pedidoId) {
    const response = await api.post('/pedidos/finalizar', null, {
      params: { pedidoId }
    });
    return response.data;
  },

  async concluirPedido(pedidoId, formaPagamento, quantidadeParcelas = 1) {
    const response = await api.post('/pedidos/concluir', null, {
      params: { 
        pedidoId, 
        forma_pagamento: formaPagamento, 
        quantidade_parcelas: quantidadeParcelas 
      }
    });
    return response.data;
  },

  async comprarDireto(clienteId, produtoId, quantidade) {
    const response = await api.post('/pedidos/comprar-direto', null, {
      params: { clienteId, produtoId, quantidade }
    });
    return response.data;
  }
};