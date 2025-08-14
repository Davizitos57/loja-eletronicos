import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCompra = () => {
  const [processandoCompra, setProcessandoCompra] = useState(false);
  const navigate = useNavigate();

  const irParaResumo = (produto = null) => {
    if (produto) {
      // Compra direta de um produto
      navigate('/resumo-compra', { state: { produto } });
    } else {
      // Compra do carrinho
      navigate('/resumo-compra');
    }
  };

  const simularPagamento = async () => {
    setProcessandoCompra(true);
    
    // Simula delay do pagamento
    return new Promise((resolve) => {
      setTimeout(() => {
        setProcessandoCompra(false);
        resolve({ sucesso: true, transacaoId: Date.now() });
      }, 2000);
    });
  };

  return {
    processandoCompra,
    irParaResumo,
    simularPagamento
  };
};