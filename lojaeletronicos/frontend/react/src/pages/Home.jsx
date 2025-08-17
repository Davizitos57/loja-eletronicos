import { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavegacao } from '../hooks/useNavegacao.js';
import CarrinhoFab from '../components/carrinho/CarrinhoFab.jsx';
import CarrinhoDrawer from '../components/carrinho/CarrinhoDrawer.jsx';
import AdminFab from '../components/admin/AdminFab.jsx';
import AdminDrawer from '../components/admin/AdminDrawer.jsx';
import FiltroFab from '../components/filtros/FiltroFab.jsx';
import FiltroDrawer from '../components/filtros/FiltroDrawer.jsx';
import CategoriaSection from '../components/CategoriaSection.jsx';
import Header from '../components/Header.jsx';
import ProdutoModal from '../components/produto/modal/ProdutoModal.jsx';
import { getTodosProdutos, getCategorias } from '../components/produto/produtos.jsx';
import { agruparProdutosPorCategoria } from '../components/produto/utils/produtoUtils.js';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    const [adminAberto, setAdminAberto] = useState(false);
    const [produtoModalAberto, setProdutoModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
    const [filtroAtivo, setFiltroAtivo] = useState(false);
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [error, setError] = useState(null);
    
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho, calcularTotal } = useCarrinho();
    const { isAdmin } = useAuth();
    const { scrollPositions, navegarHorizontal, podeNavegar } = useNavegacao(categoriasFiltradas);
    const navigate = useNavigate();
    const total = calcularTotal();

    // Carregar dados do backend
    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Carregar produtos e categorias em paralelo
                const [produtosData, categoriasData] = await Promise.all([
                    getTodosProdutos(),
                    getCategorias()
                ]);

                setProdutos(produtosData);
                
                // Agrupar produtos por categoria
                const categoriasComProdutos = agruparProdutosPorCategoria(produtosData, categoriasData);
                
                setCategorias(categoriasComProdutos);
                setCategoriasFiltradas(categoriasComProdutos);
                
                console.log('Dados carregados:', {
                    produtos: produtosData.length,
                    categorias: categoriasComProdutos.length
                });
                
            } catch (err) {
                console.error('Erro ao carregar dados:', err);
                setError(err.message || 'Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
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
                    produto.categoria.toLowerCase().includes(termoLower) ||
                    produto.descricao.toLowerCase().includes(termoLower)
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
        console.log('Comprando produto:', produto);
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

    // Loading state
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
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
                </Typography>
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    gap: 3
                }}
            >
                <Typography
                    variant="h5"
                    color="error"
                    sx={{ textAlign: 'center' }}
                >
                    Erro ao carregar dados
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {error}
                </Typography>
                <button onClick={() => window.location.reload()}>
                    Tentar novamente
                </button>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header onPesquisar={handlePesquisa} />

            {/* Botões flutuantes */}
            <CarrinhoFab onClick={() => setCarrinhoAberto(true)} />
            <FiltroFab
                onClick={() => setFiltroAberto(true)}
                categoriasAtivaCount={categoriasSelecionadas.length}
            />
            <AdminFab onClick={() => setAdminAberto(true)} />

            {/* Conteúdo principal */}
            <Container
                maxWidth={false}
                sx={{
                    py: 12,
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