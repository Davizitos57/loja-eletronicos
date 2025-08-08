import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavegacao } from '../hooks/useNavegacao.js';
import { categoriasMock } from '../data/categoriasMock.js';
import CarrinhoFab from '../components/carrinho/CarrinhoFab.jsx';
import CarrinhoDrawer from '../components/carrinho/CarrinhoDrawer.jsx';
import AdminFab from '../components/admin/AdminFab.jsx';
import AdminDrawer from '../components/admin/AdminDrawer.jsx';
import CategoriaSection from '../components/CategoriaSection.jsx';
import Header from '../components/Header.jsx';
// import api from '../services/api'; // Comentado por enquanto


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState(categoriasMock);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    const [adminAberto, setAdminAberto] = useState(false);
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useCarrinho();
    const { isAdmin } = useAuth();
    const { scrollPositions, navegarHorizontal, podeNavegar } = useNavegacao(categorias);
    const navigate = useNavigate();

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

    const adicionarEAbrirCarrinho = (produto) => {
        adicionarAoCarrinho(produto);
        setCarrinhoAberto(true);
        console.log('Produto adicionado e carrinho aberto:', produto.nome);
    };

    const comprarProduto = (produto) => {
        alert(`Comprando: ${produto.nome}`);
    };

    const finalizarCompra = () => {
        alert('Finalizando compra... 🎉');
        setCarrinhoAberto(false);
    };

    const navegarAdmin = (secao) => {
        navigate(`/dashboard?secao=${secao}`);
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
            <Header />

            {/* Botões flutuantes */}
            <CarrinhoFab
                quantidadeItens={carrinho.length}
                onClick={() => setCarrinhoAberto(true)}
            />

            {/* Botão Admin - só aparece para admins */}
            <AdminFab
                onClick={() => setAdminAberto(true)}
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

            {/* Drawers */}
            <CarrinhoDrawer
                aberto={carrinhoAberto}
                onFechar={() => setCarrinhoAberto(false)}
                carrinho={carrinho}
                onRemoverItem={removerDoCarrinho}
                onFinalizarCompra={finalizarCompra}
            />

            {/* Drawer Admin - só renderiza para admins */}
            {isAdmin() && (
                <AdminDrawer
                    aberto={adminAberto}
                    onFechar={() => setAdminAberto(false)}
                    onNavegar={navegarAdmin}
                />
            )}
        </Box>
    );
}