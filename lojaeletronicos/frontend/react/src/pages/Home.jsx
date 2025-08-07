import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useCarrinho } from '../context/CarrinhoContext.jsx';
import { useNavegacao } from '../hooks/useNavegacao.js';
import { categoriasMock } from '../data/categoriasMock.js';
import CarrinhoFab from '../components/carrinho/CarrinhoFab.jsx';
import CarrinhoDrawer from '../components/carrinho/CarrinhoDrawer.jsx';
import CategoriaSection from '../components/CategoriaSection.jsx';
import Header from '../components/Header.jsx';
// import api from '../services/api'; // Comentado por enquanto


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState(categoriasMock);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useCarrinho();
    const { scrollPositions, navegarHorizontal, podeNavegar } = useNavegacao(categorias);

    useEffect(() => {
        setLoading(true);
        
        // Simular carregamento sem API por enquanto
        setTimeout(() => {
            console.log('Dados carregados:', categorias);
            setLoading(false);
        }, 1000);

        // Quando estiver consumindo a API:
        /*
        api.get('/produtos')
            .then(res => {
                console.log('Dados da API:', res.data);
                setCategorias(res.data);
            })
            .catch(err => {
                console.error('Erro na API:', err);
            })
            .finally(() => {
                setLoading(false);
            });
        */
    }, []);

    // Função para abrir o carrinho e adicionar produto
    const adicionarEAbrirCarrinho = (produto) => {
        adicionarAoCarrinho(produto);
        setCarrinhoAberto(true);
        console.log('Produto adicionado e carrinho aberto:', produto.nome);
    };

    // Função para comprar produto
    const comprarProduto = (produto) => {
        alert(`Comprando: ${produto.nome}`);
    };

    // Função para finalizar compra
    const finalizarCompra = () => {
        alert('Finalizando compra... 🎉');
        setCarrinhoAberto(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h4">Seja Bem-vinde à Nossa Loja</Typography>
            </Box>
        );
    }

return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            {/* Header com Logo e Capa */}
            <Header />

            {/* Botão flutuante do carrinho */}
            <CarrinhoFab 
                quantidadeItens={carrinho.length}
                onClick={() => setCarrinhoAberto(true)}
            />

            {/* Conteúdo principal */}
            <Container 
                maxWidth={false}
                sx={{ 
                    py: 10, 
                    px: 2,
                    width: '100%',
                    maxWidth: '100vw'
                }}
            >
                {/* Seções de categorias */}
                {categorias.map((categoria) => (
                    <CategoriaSection
                        key={categoria.id}
                        categoria={categoria}
                        scrollPosition={scrollPositions[categoria.id]}
                        onNavigate={navegarHorizontal}
                        podeNavegar={podeNavegar}
                        onAdicionarCarrinho={adicionarEAbrirCarrinho}
                        onComprar={comprarProduto}
                    />
                ))}
            </Container>

            {/* Drawer do carrinho */}
            <CarrinhoDrawer
                aberto={carrinhoAberto}
                onFechar={() => setCarrinhoAberto(false)}
                carrinho={carrinho}
                onRemoverItem={removerDoCarrinho}
                onFinalizarCompra={finalizarCompra}
            />
        </Box>
    );
}