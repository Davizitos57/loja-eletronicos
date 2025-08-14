import { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prev => {
      // Verificar se produto já existe no carrinho
      const produtoExistente = prev.find(item => item.id === produto.id);

      if (produtoExistente) {
        // Se existe, somar a quantidade
        return prev.map(item =>
          item.id === produto.id
            ? {
              ...item,
              quantidadeSelecionada: (item.quantidadeSelecionada || 1) + (produto.quantidadeSelecionada || 1)
            }
            : item
        );
      } else {
        // Se não existe, adicionar novo item
        return [...prev, {
          ...produto,
          quantidadeSelecionada: produto.quantidadeSelecionada || 1
        }];
      }
    });
  };

  const removerDoCarrinho = (index) => {
    setCarrinho((prev) => {
      const novoCarrinho = [...prev];
      novoCarrinho.splice(index, 1);
      return novoCarrinho;
    });
  };

  const atualizarQuantidade = (index, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(index);
      return;
    }

    setCarrinho(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantidadeSelecionada: novaQuantidade }
          : item
      )
    );
  };

const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      const quantidade = item.quantidadeSelecionada || item.quantidade || 1;
      const preco = item.preco || 0;
      return total + (preco * quantidade);
    }, 0);
  };

  const calcularQuantidadeTotal = () => {
    return carrinho.reduce((total, item) => {
      return total + (item.quantidadeSelecionada || 1);
    }, 0);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider value={{
      carrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      calcularTotal,
      calcularQuantidadeTotal,
      limparCarrinho
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  }
  return context;
}
