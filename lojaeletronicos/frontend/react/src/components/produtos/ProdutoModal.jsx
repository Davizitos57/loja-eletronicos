import {
    Dialog,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    IconButton,
    Chip,
    Divider,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function ProdutoModal({ 
    produto, 
    aberto, 
    onFechar, 
    onAdicionarCarrinho, 
    onComprar 
}) {
    if (!produto) return null;

    // Mock de dados extras para o produto (você pode expandir isso)
    const produtoDetalhado = {
        ...produto,
        descricao: produto.descricao || `${produto.nome} com excelente qualidade e garantia. Produto ideal para suas necessidades tecnológicas com as melhores especificações do mercado.`,
        estoque: produto.estoque || Math.floor(Math.random() * 50) + 5,
        categoria: produto.categoria || 'Eletrônicos',
        marca: produto.marca || 'TecnoFácil',
        avaliacoes: produto.avaliacoes || (Math.random() * 2 + 3).toFixed(1),
        especificacoes: produto.especificacoes || [
            'Garantia de 12 meses',
            'Entrega rápida',
            'Suporte técnico',
            'Produto original'
        ]
    };

    const handleAdicionarCarrinho = () => {
        onAdicionarCarrinho(produto);
    };

    const handleComprar = () => {
        onComprar(produto);
        onFechar(); 
    };

    return (
        <Dialog
            open={aberto}
            onClose={onFechar}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    boxShadow: 4,
                    maxHeight: '90vh',
                    overflow: 'hidden'
                }
            }}
        >
            {/* Botão de fechar */}
            <IconButton
                onClick={onFechar}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    zIndex: 1,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                <Grid container sx={{ height: '100%' }}>
                    {/* Coluna da imagem */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: { xs: 300, md: 500 },
                                backgroundImage: `url(${produtoDetalhado.imagem || `https://picsum.photos/600/500?random=${produtoDetalhado.id}`})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'flex-end',
                                p: 2
                            }}
                        >
                            {/* Overlay com informações rápidas */}
                            <Box
                                sx={{
                                    bgcolor: 'rgba(0,0,0,0.7)',
                                    color: 'white',
                                    p: 2,
                                    borderRadius: 2,
                                    backdropFilter: 'blur(5px)'
                                }}
                            >
                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocalOfferIcon fontSize="small" />
                                    {produtoDetalhado.categoria}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    ⭐ {produtoDetalhado.avaliacoes} • {produtoDetalhado.marca}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Coluna das informações */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
                            {/* Título e preço */}
                            <Typography 
                                variant="h4" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                    lineHeight: 1.2,
                                    mb: 2
                                }}
                            >
                                {produtoDetalhado.nome}
                            </Typography>

                            <Typography 
                                variant="h3" 
                                color="primary" 
                                sx={{ 
                                    fontWeight: 'bold', 
                                    mb: 2,
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                R$ {produtoDetalhado.preco?.toFixed(2)}
                            </Typography>

                            {/* Status do estoque */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <InventoryIcon color="success" />
                                <Chip 
                                    label={`${produtoDetalhado.estoque} em estoque`}
                                    color={produtoDetalhado.estoque > 10 ? "success" : "warning"}
                                    variant="outlined"
                                />
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Descrição */}
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                📝 Descrição
                            </Typography>
                            <Typography 
                                variant="body1" 
                                color="text.secondary"
                                sx={{ 
                                    mb: 3,
                                    lineHeight: 1.6,
                                    textAlign: 'justify'
                                }}
                            >
                                {produtoDetalhado.descricao}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            {/* Especificações */}
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                ✨ Destaques
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                                {produtoDetalhado.especificacoes.map((spec, index) => (
                                    <Chip
                                        key={index}
                                        label={spec}
                                        variant="outlined"
                                        size="small"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            {/* Ações do modal */}
            <DialogActions 
                sx={{ 
                    p: 3, 
                    bgcolor: '#f8f9fa',
                    borderTop: '1px solid #e9ecef',
                    gap: 2
                }}
            >
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAdicionarCarrinho}
                    sx={{ 
                        flex: 1,
                        py: 1.5,
                        fontWeight: 'bold'
                    }}
                >
                    Adicionar ao Carrinho
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleComprar}
                    sx={{ 
                        flex: 1,
                        py: 1.5,
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                    }}
                >
                    Comprar Agora
                </Button>
            </DialogActions>
        </Dialog>
    );
}