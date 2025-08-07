import { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Container,
    Divider,
    Fab,
    Badge
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
// import api from '../services/api'; // Comentado temporariamente
import { useCarrinho } from '../context/CarrinhoContext.jsx';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useCarrinho();
    
    // Controle de scroll para cada categoria
    const [scrollPositions, setScrollPositions] = useState({});
    
    // Estado para controlar se o carrinho está aberto
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    // Estrutura de dados das categorias com produtos
    const [categorias, setCategorias] = useState([
        {
            id: 1,
            nome: 'Smartphones e Telefonia',
            produtos: [
                { id: 1, nome: 'iPhone 15 Pro Max', preco: 9999.99, imagem: null },
                { id: 2, nome: 'Samsung Galaxy S24 Ultra', preco: 7999.99, imagem: null },
                { id: 3, nome: 'Xiaomi Redmi Note 13', preco: 1299.99, imagem: null },
                { id: 4, nome: 'Google Pixel 8 Pro', preco: 6499.99, imagem: null },
                { id: 5, nome: 'OnePlus 12', preco: 4999.99, imagem: null },
                { id: 6, nome: 'Motorola Edge 40', preco: 2799.99, imagem: null }
            ]
        },
        {
            id: 2,
            nome: 'Notebooks e Computadores',
            produtos: [
                { id: 7, nome: 'MacBook Pro M3', preco: 15999.99, imagem: null },
                { id: 8, nome: 'Dell XPS 13', preco: 8999.99, imagem: null },
                { id: 9, nome: 'Lenovo ThinkPad X1', preco: 12999.99, imagem: null },
                { id: 10, nome: 'ASUS ROG Strix', preco: 7499.99, imagem: null },
                { id: 11, nome: 'HP Pavilion', preco: 3499.99, imagem: null },
                { id: 12, nome: 'Acer Nitro 5', preco: 4299.99, imagem: null }
            ]
        },
        {
            id: 3,
            nome: 'Tablets e E-readers',
            produtos: [
                { id: 13, nome: 'iPad Pro 12.9"', preco: 8999.99, imagem: null },
                { id: 14, nome: 'Samsung Galaxy Tab S9', preco: 4999.99, imagem: null },
                { id: 15, nome: 'Microsoft Surface Pro', preco: 6999.99, imagem: null },
                { id: 16, nome: 'Kindle Paperwhite', preco: 599.99, imagem: null },
                { id: 17, nome: 'Xiaomi Pad 6', preco: 1899.99, imagem: null }
            ]
        },
        {
            id: 4,
            nome: 'Áudio e Som',
            produtos: [
                { id: 18, nome: 'AirPods Pro 2', preco: 2299.99, imagem: null },
                { id: 19, nome: 'Sony WH-1000XM5', preco: 1999.99, imagem: null },
                { id: 20, nome: 'JBL Flip 6', preco: 699.99, imagem: null },
                { id: 21, nome: 'Bose QuietComfort', preco: 2799.99, imagem: null },
                { id: 22, nome: 'Marshall Acton III', preco: 1599.99, imagem: null }
            ]
        },
        {
            id: 5,
            nome: 'Games e Consoles',
            produtos: [
                { id: 23, nome: 'PlayStation 5', preco: 4999.99, imagem: null },
                { id: 24, nome: 'Xbox Series X', preco: 4699.99, imagem: null },
                { id: 25, nome: 'Nintendo Switch OLED', preco: 2299.99, imagem: null },
                { id: 26, nome: 'Steam Deck', preco: 3299.99, imagem: null }
            ]
        }
    ]);

    useEffect(() => {
        setLoading(true);
        
        // Simular carregamento sem API por enquanto
        setTimeout(() => {
            console.log('Dados carregados:', categorias);
            setLoading(false);
        }, 1000);

        // Quando tiver a API funcionando, use:
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

    // Função para navegar horizontalmente por categoria
    const navegarHorizontal = (categoriaId, direcao) => {
        console.log(`Navegando categoria ${categoriaId} para ${direcao}`); // Debug
        
        const categoria = categorias.find(cat => cat.id === categoriaId);
        if (!categoria) return;

        const cardWidth = 300; // Largura do card + gap
        const currentScroll = scrollPositions[categoriaId] || 0;
        const containerWidth = window.innerWidth - 100; // Agora sem o carrinho fixo
        const maxScroll = Math.max(0, (categoria.produtos.length * cardWidth) - containerWidth);
        
        let newScroll;
        if (direcao === 'left') {
            newScroll = Math.max(0, currentScroll - cardWidth * 2);
        } else {
            newScroll = Math.min(maxScroll, currentScroll + cardWidth * 2);
        }
        
        console.log(`Scroll atual: ${currentScroll}, Novo scroll: ${newScroll}, Max: ${maxScroll}`); // Debug
        
        setScrollPositions(prev => ({
            ...prev,
            [categoriaId]: newScroll
        }));
    };

    // Verificar se pode navegar
    const podeNavegar = (categoriaId, direcao) => {
        const categoria = categorias.find(cat => cat.id === categoriaId);
        if (!categoria) return false;

        const cardWidth = 300;
        const currentScroll = scrollPositions[categoriaId] || 0;
        const containerWidth = window.innerWidth - 100;
        const maxScroll = Math.max(0, (categoria.produtos.length * cardWidth) - containerWidth);

        if (direcao === 'left') {
            return currentScroll > 0;
        } else {
            return currentScroll < maxScroll;
        }
    };

    // Função para abrir o carrinho e adicionar produto
    const adicionarEAbrirCarrinho = (produto) => {
        adicionarAoCarrinho(produto);
        setCarrinhoAberto(true);
        console.log('Produto adicionado e carrinho aberto:', produto.nome);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h4">Seja Bem-vinde à Nossa Loja</Typography>
            </Box>
        );
    }

    return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', position: 'relative' }}>
        {/* Botão flutuante do carrinho */}
        <Fab
            color="primary"
            sx={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1000,
                boxShadow: 4,
                '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s'
                }
            }}
            onClick={() => setCarrinhoAberto(true)}
        >
            <Badge badgeContent={carrinho.length} color="error">
                <ShoppingCartIcon />
            </Badge>
        </Fab>

        {/* Conteúdo principal - AJUSTE AQUI PARA MÁXIMO APROVEITAMENTO */}
        <Container 
            maxWidth={false} // Remove limitação de largura
            sx={{ 
                py: 2, // Reduzir padding vertical de 4 para 2
                px: 2, // Padding horizontal menor
                width: '100%', // Usar largura total
                maxWidth: '100vw' // Máximo da viewport
            }}
        >
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 3, color: 'primary.main', fontWeight: 'bold', padding: 2 }}>
                TecnoFácil
            </Typography>

            {/* Seções de categorias */}
            {categorias.map((categoria) => (
                <Box key={categoria.id} sx={{ mb: 4 }}> {/* Reduzir espaçamento de 6 para 4 */}
                    {/* Cabeçalho da categoria */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {categoria.nome} ({categoria.produtos.length})
                        </Typography>
                        
                        {/* Botões de navegação */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                onClick={() => {
                                    console.log('Clicou em voltar para categoria:', categoria.id);
                                    navegarHorizontal(categoria.id, 'left');
                                }}
                                sx={{ 
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    boxShadow: 2,
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    '&:disabled': { bgcolor: 'grey.300', color: 'grey.500' }
                                }}
                                disabled={!podeNavegar(categoria.id, 'left')}
                                size="large"
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    console.log('Clicou em avançar para categoria:', categoria.id);
                                    navegarHorizontal(categoria.id, 'right');
                                }}
                                sx={{ 
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    boxShadow: 2,
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    '&:disabled': { bgcolor: 'grey.300', color: 'grey.500' }
                                }}
                                disabled={!podeNavegar(categoria.id, 'right')}
                                size="large"
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* REMOVER OU COMENTAR ESSA LINHA DE DEBUG */}
                    {/* <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'grey.600' }}>
                        Scroll atual: {scrollPositions[categoria.id] || 0}px | 
                        Pode voltar: {podeNavegar(categoria.id, 'left') ? 'Sim' : 'Não'} | 
                        Pode avançar: {podeNavegar(categoria.id, 'right') ? 'Sim' : 'Não'}
                    </Typography> */}

                    {/* Container de produtos com scroll horizontal */}
                    <Box
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: 1,
                            p: 1.5 // Reduzir padding interno de 2 para 1.5
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2, // Reduzir gap entre cards de 3 para 2
                                transition: 'transform 0.3s ease-in-out',
                                transform: `translateX(-${scrollPositions[categoria.id] || 0}px)`,
                                width: 'max-content'
                            }}
                        >
                            {categoria.produtos.map((produto) => (
                                <Card
                                    key={produto.id}
                                    sx={{
                                        width: 260, // Reduzir largura de 280 para 260
                                        height: 380, // Reduzir altura de 400 para 380
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        flexShrink: 0,
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="180" // Reduzir altura da imagem de 200 para 180
                                        image={produto.imagem || `https://picsum.photos/260/180?random=${produto.id}`}
                                        alt={produto.nome}
                                    />
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 1.5 }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                            {produto.nome}
                                        </Typography>
                                        <Typography 
                                            variant="h5" 
                                            color="primary" 
                                            sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.3rem' }}
                                        >
                                            R$ {produto.preco?.toFixed(2)}
                                        </Typography>
                                        
                                        <Box sx={{ mt: 'auto' }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                sx={{ mb: 1, py: 0.8 }} // Reduzir padding vertical
                                                onClick={() => alert(`Comprando: ${produto.nome}`)}
                                            >
                                                Comprar Agora
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                sx={{ py: 0.8 }} // Reduzir padding vertical
                                                onClick={() => adicionarEAbrirCarrinho(produto)}
                                                startIcon={<ShoppingCartIcon />}
                                            >
                                                Adicionar ao Carrinho
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>

                    {/* Indicador de posição - PODE REMOVER PARA GANHAR ESPAÇO */}
                    {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                            Use as setas acima para navegar →
                        </Typography>
                    </Box> */}

                    <Divider sx={{ mt: 3 }} /> {/* Reduzir margem de 4 para 3 */}
                </Box>
            ))}
        </Container>

            {/* Drawer do carrinho (lateral) */}
            <Drawer
                anchor="right"
                open={carrinhoAberto}
                onClose={() => setCarrinhoAberto(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 350,
                        boxShadow: 4
                    }
                }}
            >
                <Box sx={{ p: 2, height: '100%', bgcolor: '#fafafa', display: 'flex', flexDirection: 'column' }}>
                    {/* Cabeçalho do carrinho */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            🛒 Carrinho ({carrinho.length})
                        </Typography>
                        <IconButton 
                            onClick={() => setCarrinhoAberto(false)}
                            sx={{ color: 'grey.600' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    {/* Lista de produtos no carrinho */}
                    <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                        {carrinho.map((item, index) => (
                            <ListItem
                                key={index}
                                sx={{ 
                                    mb: 1, 
                                    bgcolor: 'white',
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    p: 2
                                }}
                                secondaryAction={
                                    <IconButton 
                                        onClick={() => removerDoCarrinho(index)}
                                        color="error"
                                        size="small"
                                        sx={{ 
                                            '&:hover': { 
                                                backgroundColor: 'error.light',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={item.nome}
                                    secondary={`R$ ${item.preco?.toFixed(2) || '0.00'}`}
                                    primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }}
                                    secondaryTypographyProps={{ fontSize: '1.1rem', color: 'primary.main', fontWeight: 'bold' }}
                                />
                            </ListItem>
                        ))}
                        
                        {carrinho.length === 0 && (
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <ShoppingCartIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Seu carrinho está vazio
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Adicione produtos para começar suas compras!
                                </Typography>
                            </Box>
                        )}
                    </List>

                    {/* Rodapé com total e botão de finalizar */}
                    {carrinho.length > 0 && (
                        <Box sx={{ 
                            mt: 2, 
                            pt: 2, 
                            borderTop: '2px solid #e0e0e0',
                            bgcolor: 'white',
                            borderRadius: 2,
                            p: 2,
                            boxShadow: 1
                        }}>
                            <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
                                Total: R$ {carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2)}
                            </Typography>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                size="large"
                                onClick={() => {
                                    alert('Finalizando compra... 🎉');
                                    setCarrinhoAberto(false);
                                }}
                                sx={{ 
                                    fontWeight: 'bold',
                                    py: 1.5,
                                    fontSize: '1.1rem'
                                }}
                            >
                                Finalizar Compra
                            </Button>
                            <Button
                                variant="text"
                                fullWidth
                                onClick={() => setCarrinhoAberto(false)}
                                sx={{ mt: 1, color: 'grey.600' }}
                            >
                                Continuar Comprando
                            </Button>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
}