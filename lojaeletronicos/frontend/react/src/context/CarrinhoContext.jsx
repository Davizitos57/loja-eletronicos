import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { carrinhoService } from '../services/carrinho';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);
    const [loading, setLoading] = useState(false);
    const { usuario } = useAuth();

    // Carregar carrinho do backend quando o usuário estiver logado
    useEffect(() => {
        if (usuario?.id) {
            carregarCarrinho();
        }
    }, [usuario]);


    const carregarCarrinho = async () => {
        if (!usuario?.id) return;

        try {
            setLoading(true);
            const itens = await carrinhoService.listarItens(usuario.id);
            setCarrinho(itens || []); // Garante que sempre será um array, mesmo que vazio
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            setCarrinho([]); // Em caso de erro, inicializa com array vazio
        } finally {
            setLoading(false);
        }
    };

    const adicionarAoCarrinho = async (produto, quantidade = 1) => {
        if (!usuario?.id) {
            alert('Faça login para adicionar produtos ao carrinho');
            return;
        }

        try {
            setLoading(true);
            await carrinhoService.adicionarItem(usuario.id, produto.idProduto || produto.id, quantidade);
            await carregarCarrinho();
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error.response?.data || error);
            const errorMsg = error.response?.data?.message || 'Erro ao adicionar produto ao carrinho. Tente novamente.';
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const calcularTotal = () => {
        return carrinho.reduce((total, item) => {
            const quantidade = item.quantidade || 1;
            return total + (item.preco * quantidade);
        }, 0);
    };

const removerDoCarrinho = async (produtoId) => {
    if (!usuario?.id) return;

    try {
        setLoading(true);
        await carrinhoService.removerItem(usuario.id, produtoId);
        // Ao invés de atualizar o estado local, recarrega o carrinho do backend
        await carregarCarrinho();
    } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        alert('Erro ao remover produto do carrinho');
    } finally {
        setLoading(false);
    }
};

    const limparCarrinho = () => {
        setCarrinho([]);
    };

    const atualizarQuantidade = async (index, novaQuantidade) => {
        if (!usuario?.id) return;

        const item = carrinho[index];
        if (!item) return;

        try {
            setLoading(true);
            // Garantir que a quantidade não seja menor que 1
            const quantidadeFinal = Math.max(1, novaQuantidade);

            // Atualizar no backend
            await carrinhoService.adicionarItem(
                usuario.id,
                item.produtoId,
                quantidadeFinal
            );

            // Atualizar o estado local com a nova quantidade
            const novoCarrinho = carrinho.map((item, idx) =>
                idx === index
                    ? { ...item, quantidade: quantidadeFinal }
                    : item
            );
            setCarrinho(novoCarrinho);
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            alert('Erro ao atualizar quantidade do produto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CarrinhoContext.Provider value={{
            carrinho,
            loading,
            adicionarAoCarrinho,
            removerDoCarrinho,
            calcularTotal,
            limparCarrinho,
            carregarCarrinho,
            atualizarQuantidade
        }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    }
    return context;
};