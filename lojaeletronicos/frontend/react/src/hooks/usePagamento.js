import { useState } from 'react';

export const usePagamento = () => {
  const [dadosPagamento, setDadosPagamento] = useState(null);
  const [processando, setProcessando] = useState(false);

  const processarPagamento = async (dados) => {
    setProcessando(true);
    setDadosPagamento(dados);

    // Simular diferentes tempos de processamento baseado na forma de pagamento
    const tempoProcessamento = {
      pix: 1500,        // PIX é mais rápido
      cartao: 2500,     // Cartão demora um pouco mais
      boleto: 2000      // Boleto tempo médio
    };

    const tempo = tempoProcessamento[dados.forma] || 2000;

    return new Promise((resolve) => {
      setTimeout(() => {
        setProcessando(false);
        resolve({
          sucesso: true,
          transacaoId: `${dados.forma.toUpperCase()}-${Date.now()}`,
          dadosPagamento: dados
        });
      }, tempo);
    });
  };

  const resetar = () => {
    setDadosPagamento(null);
    setProcessando(false);
  };

  return {
    dadosPagamento,
    processando,
    processarPagamento,
    resetar
  };
};