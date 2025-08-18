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
            await carrinhoService.adicionarItem(usuario.id, produto.id, quantidade);
            await carregarCarrinho();

        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            const errorMsg = error.response?.data?.message || 'Erro ao adicionar produto ao carrinho. Tente novamente.';
            alert(errorMsg);
        }
    };

    const removerDoCarrinho = async (produtoId) => {
        if (!usuario?.id) return;

        try {
            await carrinhoService.removerItem(usuario.id, produtoId);
            await carregarCarrinho();
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
            alert('Erro ao remover produto do carrinho');
        }
    };

    const calcularTotal = () => {
        return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    };

    const limparCarrinho = () => {
        setCarrinho([]);
    };

    return (
        <CarrinhoContext.Provider value={{
            carrinho,
            loading,
            adicionarAoCarrinho,
            removerDoCarrinho,
            calcularTotal,
            limparCarrinho,
            carregarCarrinho
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