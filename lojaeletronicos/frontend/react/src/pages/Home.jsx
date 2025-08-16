import { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavegacao } from '../hooks/useNavegacao.js';
import { categoriasMock } from '../data/categoriasMock.js';
import CarrinhoFab from '../components/carrinho/CarrinhoFab.jsx';
import CarrinhoDrawer from '../components/carrinho/CarrinhoDrawer.jsx';
import AdminFab from '../components/admin/AdminFab.jsx';
import AdminDrawer from '../components/admin/AdminDrawer.jsx';
import FiltroFab from '../components/filtros/FiltroFab.jsx';
import FiltroDrawer from '../components/filtros/FiltroDrawer.jsx';
import CategoriaSection from '../components/CategoriaSection.jsx';
import Header from '../components/Header.jsx';
import ProdutoModal from '../components/produto/modal/ProdutoModal.jsx';
// import api from '../services/api'; // Comentado por enquanto


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState(categoriasMock);
    const [categoriasFiltradas, setCategoriasFiltradas] = useState(categoriasMock);
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    const [adminAberto, setAdminAberto] = useState(false);
    const [produtoModalAberto, setProdutoModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
    const [filtroAtivo, setFiltroAtivo] = useState(false);
    const [filtroAberto, setFiltroAberto] = useState(false);
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho, calcularTotal } = useCarrinho();
    const { isAdmin } = useAuth();
    const { scrollPositions, navegarHorizontal, podeNavegar } = useNavegacao(categoriasFiltradas);
    const navigate = useNavigate();
    const total = calcularTotal();

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

    // Efeito para aplicar filtros quando categorias selecionadas ou termo de pesquisa mudam
    useEffect(() => {
        aplicarFiltros();
    }, [categoriasSelecionadas, termoPesquisa, categorias]);

    const aplicarFiltros = () => {
        let categoriasFiltradas = [...categorias];

        // Filtro por categorias selecionadas
        if (categoriasSelecionadas.length > 0) {
            categoriasFiltradas = categoriasFiltradas.filter(categoria =>
                categoriasSelecionadas.includes(categoria.id)
            );
        }

        // Filtro por pesquisa
        if (termoPesquisa.trim()) {
            const termoLower = termoPesquisa.toLowerCase();
            categoriasFiltradas = categoriasFiltradas.map(categoria => ({
                ...categoria,
                produtos: categoria.produtos.filter(produto =>
                    produto.nome.toLowerCase().includes(termoLower) ||
                    produto.marca.toLowerCase().includes(termoLower) ||
                    produto.categoria.toLowerCase().includes(termoLower)
                )
            })).filter(categoria => categoria.produtos.length > 0);
        }

        setCategoriasFiltradas(categoriasFiltradas);
    };

    const adicionarEAbrirCarrinho = (produto) => {
        adicionarAoCarrinho(produto);
        setCarrinhoAberto(true);
        console.log('Produto adicionado e carrinho aberto:', produto.nome);
    };

    const comprarProduto = (produto) => {
        console.log('Comprando produto:', produto); // Debug
        navigate('/resumo-compra', {
            state: {
                produto: {
                    ...produto,
                    quantidade: produto.quantidade || produto.quantidadeSelecionada || 1
                }
            }
        });
    };

    const finalizarCompra = () => {
        navigate('/resumo-compra', {
            state: {
                carrinho: [...carrinho], 
                total: calcularTotal()
            }
        });
        setCarrinhoAberto(false);
    };

    const navegarAdmin = (secao) => {
        navigate(`/dashboard?secao=${secao}`);
    };

    const verDetalhesproduto = (produto) => {
        setProdutoSelecionado(produto);
        setProdutoModalAberto(true);
    };

    const fecharModalProduto = () => {
        setProdutoModalAberto(false);
        setProdutoSelecionado(null);
    };

    const handlePesquisa = (termo) => {
        setTermoPesquisa(termo);

        if (!termo.trim()) {
            setCategoriasFiltradas(categorias);
            return;
        }

        const termoLower = termo.toLowerCase();
        const categoriasFiltradas = categorias.map(categoria => ({
            ...categoria,
            produtos: categoria.produtos.filter(produto =>
                produto.nome.toLowerCase().includes(termoLower) ||
                produto.marca.toLowerCase().includes(termoLower) ||
                produto.categoria.toLowerCase().includes(termoLower)
            )
        })).filter(categoria => categoria.produtos.length > 0);

        setCategoriasFiltradas(categoriasFiltradas);
    };

    // Funções para filtros de categoria
    const handleToggleCategoria = (novaSelecao) => {
        setCategoriasSelecionadas(novaSelecao);
    };

    const handleAplicarFiltro = (categoriasSelecionadas) => {
        setFiltroAtivo(categoriasSelecionadas.length > 0);
        console.log('Filtro aplicado para categorias:', categoriasSelecionadas);
    };

    const handleLimparFiltros = () => {
        setCategoriasSelecionadas([]);
        setFiltroAtivo(false);
        console.log('Filtros limpos');
    };



    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Empilhar verticalmente
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    gap: 3
                }}
            >
                <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{ color: 'primary.main' }}
                />
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        textAlign: 'center',
                        fontSize: { xs: '1.5rem', md: '2.125rem' }
                    }}
                >
                    Seja Bem-vindo à Plataforma!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        textAlign: 'center'
                    }}
                >
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header onPesquisar={handlePesquisa} />

            {/* Botões flutuantes */}
            <CarrinhoFab
                onClick={() => setCarrinhoAberto(true)}
            />

            {/* Botão de Filtros */}
            <FiltroFab
                onClick={() => setFiltroAberto(true)}
                categoriasAtivaCount={categoriasSelecionadas.length}
            />

            {/* Botão Admin - só aparece para admins */}
            <AdminFab
                onClick={() => setAdminAberto(true)}
            />

            {/* Conteúdo principal */}
            <Container
                maxWidth={false}
                sx={{
                    py: 12, // Aumentado para acomodar o header maior
                    px: 2,
                    width: '100%',
                    maxWidth: '100vw'
                }}
            >
                {/* Indicadores de filtros ativos */}
                {(termoPesquisa || filtroAtivo) && (
                    <Box sx={{ mb: 3 }}>
                        {termoPesquisa && (
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Resultados para "{termoPesquisa}"
                            </Typography>
                        )}
                        {filtroAtivo && (
                            <Typography variant="body1" color="secondary" sx={{ fontWeight: 'bold', mb: 1 }}>
                                📂 Filtrado por {categoriasSelecionadas.length} categoria(s)
                            </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">
                            {categoriasFiltradas.reduce((total, cat) => total + cat.produtos.length, 0)} produtos encontrados
                        </Typography>
                    </Box>
                )}

                {categoriasFiltradas.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {termoPesquisa || filtroAtivo ? 'Nenhum produto encontrado' : 'Nenhuma categoria disponível'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {termoPesquisa || filtroAtivo ? 'Tente pesquisar com outros termos ou ajustar os filtros' : 'Verifique a conexão ou tente novamente mais tarde'}
                        </Typography>
                    </Box>
                ) : (
                    categoriasFiltradas.map((categoria) => (
                        <CategoriaSection
                            key={categoria.id}
                            categoria={categoria}
                            scrollPosition={scrollPositions[categoria.id]}
                            onNavigate={navegarHorizontal}
                            podeNavegar={podeNavegar}
                            onAdicionarCarrinho={adicionarEAbrirCarrinho}
                            onComprar={comprarProduto}
                            onVerDetalhes={verDetalhesproduto}
                        />
                    ))
                )}
            </Container>

            {/* Drawers e Modals */}
            <CarrinhoDrawer
                aberto={carrinhoAberto}
                onFechar={() => setCarrinhoAberto(false)}
                carrinho={carrinho}
                onRemoverItem={removerDoCarrinho}
                onFinalizarCompra={finalizarCompra}
            />

            <FiltroDrawer
                aberto={filtroAberto}
                onFechar={() => setFiltroAberto(false)}
                categorias={categorias}
                categoriasSelecionadas={categoriasSelecionadas}
                onToggleCategoria={handleToggleCategoria}
                onAplicarFiltro={handleAplicarFiltro}
                onLimparFiltros={handleLimparFiltros}
            />

            {isAdmin() && (
                <AdminDrawer
                    aberto={adminAberto}
                    onFechar={() => setAdminAberto(false)}
                    onNavegar={navegarAdmin}
                />
            )}

            {/* Modal de detalhes do produto */}
            <ProdutoModal
                produto={produtoSelecionado}
                aberto={produtoModalAberto}
                onFechar={fecharModalProduto}
                onAdicionarCarrinho={adicionarEAbrirCarrinho}
                onComprar={comprarProduto}
            />
        </Box>
    );
}