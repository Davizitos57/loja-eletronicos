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
    Grid,
    Paper,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';

export default function ProdutoModal({ 
    produto, 
    aberto, 
    onFechar, 
    onAdicionarCarrinho, 
    onComprar 
}) {
    if (!produto) return null;

    console.log('Produto no modal:', produto); // Debug

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
            maxWidth="xl" // Aumentar o tamanho máximo
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    boxShadow: 6,
                    maxHeight: '95vh',
                    height: '85vh', // Altura fixa
                    width: '90vw', // Largura fixa
                    maxWidth: '1400px', // Largura máxima
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
                    zIndex: 10,
                    bgcolor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    '&:hover': { 
                        bgcolor: 'rgba(0,0,0,1)',
                        transform: 'scale(1.1)'
                    }
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: 0, height: 'calc(100% - 80px)', overflow: 'hidden' }}>
                {/* Layout Flexbox lado a lado - SEMPRE */}
                <Box sx={{ 
                    display: 'flex', 
                    height: '100%',
                    flexDirection: 'row' // Forçar layout horizontal
                }}>
                    {/* Coluna da imagem - 40% da largura */}
                    <Box
                        sx={{
                            width: '40%', // Largura fixa
                            minWidth: '400px', // Largura mínima
                            height: '100%',
                            backgroundImage: `url(${produto.imagem || `https://picsum.photos/800/600?random=${produto.id}`})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 2
                        }}
                    >
                        {/* Badge da categoria no topo */}
                        <Box sx={{ alignSelf: 'flex-start' }}>
                            <Chip
                                label={produto.categoria || 'Eletrônicos'}
                                size="small"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </Box>

                        {/* Informações na parte inferior */}
                        {/* <Paper
                            elevation={4}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.95)',
                                p: 2,
                                borderRadius: 2,
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <LocalOfferIcon fontSize="small" color="primary" />
                                <strong>{produto.marca || 'TecnoFácil'}</strong>
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarIcon sx={{ color: '#ffc107', fontSize: 18 }} />
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {produto.avaliacoes || '4.5'} estrelas
                                </Typography>
                            </Box>
                        </Paper> */}
                    </Box>

                    {/* Coluna das informações - 60% da largura com scroll */}
                    <Box sx={{ 
                        width: '60%', // Largura fixa
                        height: '100%', 
                        overflow: 'auto',
                        p: 3,
                        bgcolor: '#ffffff',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#1976d2',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#1565c0',
                        },
                    }}>
                        {/* Título e preço */}
                        <Typography 
                            variant="h3" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 'bold',
                                color: 'text.primary',
                                lineHeight: 1.2,
                                mb: 2,
                                fontSize: '2.5rem'
                            }}
                        >
                            {produto.nome}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Typography 
                                variant="h2" 
                                color="primary" 
                                sx={{ 
                                    fontWeight: 'bold', 
                                    fontSize: '3rem'
                                }}
                            >
                                R$ {produto.preco?.toFixed(2)}
                            </Typography>

                            {/* Status do estoque */}
                            <Chip 
                                icon={<InventoryIcon />}
                                label={`${produto.estoque || 'Disponível'} em estoque`}
                                color={
                                    produto.estoque > 20 ? "success" : 
                                    produto.estoque > 5 ? "warning" : 
                                    produto.estoque > 0 ? "error" : "default"
                                }
                                variant="filled"
                                size="medium"
                                sx={{ fontSize: '1rem', height: '40px' }}
                            />
                        </Box>

                        <Divider sx={{ my: 3, borderWidth: 2 }} />

                        {/* Descrição */}
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                            📝 Descrição do Produto
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ 
                                mb: 3,
                                lineHeight: 1.8,
                                textAlign: 'justify',
                                fontSize: '1.1rem'
                            }}
                        >
                            {produto.descricao || `${produto.nome} com excelente qualidade e garantia. Produto ideal para suas necessidades tecnológicas com as melhores especificações do mercado.`}
                        </Typography>

                        <Divider sx={{ my: 3, borderWidth: 2 }} />

                        {/* Especificações */}
                        {produto.especificacoes && produto.especificacoes.length > 0 && (
                            <>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                                    ⚡ Especificações Técnicas
                                </Typography>
                                <Stack spacing={1.5} sx={{ mb: 3 }}>
                                    {produto.especificacoes.map((spec, index) => (
                                        <Paper 
                                            key={index}
                                            elevation={2}
                                            sx={{ 
                                                p: 2, 
                                                bgcolor: '#f8f9fa',
                                                border: '1px solid #e9ecef',
                                                borderRadius: 2,
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    bgcolor: '#e3f2fd',
                                                    borderColor: '#1976d2'
                                                }
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                fontSize: '1rem',
                                                fontWeight: 500
                                            }}>
                                                <Box 
                                                    sx={{ 
                                                        width: 8, 
                                                        height: 8, 
                                                        bgcolor: 'primary.main', 
                                                        borderRadius: '50%', 
                                                        mr: 2 
                                                    }} 
                                                />
                                                {spec}
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Stack>
                            </>
                        )}

                        {/* Informações adicionais */}
                        <Paper
                            elevation={3}
                            sx={{ 
                                bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                                background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                                p: 3, 
                                borderRadius: 3, 
                                border: '2px solid #e1bee7',
                                mb: 2 
                            }}
                        >
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                                📋 Informações do Produto
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" sx={{ mb: 1.5, fontSize: '1rem' }}>
                                        <strong>Marca:</strong> {produto.marca || 'TecnoFácil'}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                        <strong>Categoria:</strong> {produto.categoria || 'Eletrônicos'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" sx={{ mb: 1.5, fontSize: '1rem' }}>
                                        <strong>Avaliação:</strong> ⭐ {produto.avaliacoes || '4.5'} / 5.0
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                        <strong>Estoque:</strong> {produto.estoque || 'Disponível'} unidades
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Espaço extra para garantir scroll */}
                        <Box sx={{ height: 20 }} />
                    </Box>
                </Box>
            </DialogContent>

            {/* Ações do modal - Fixas na parte inferior */}
            <DialogActions 
                sx={{ 
                    p: 3, 
                    bgcolor: '#f8f9fa',
                    borderTop: '3px solid #e9ecef',
                    gap: 3,
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 1
                }}
            >
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAdicionarCarrinho}
                    sx={{ 
                        flex: 1,
                        py: 2,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        borderWidth: 2,
                        '&:hover': { borderWidth: 2 }
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
                        py: 2,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        bgcolor: 'success.main',
                        '&:hover': { bgcolor: 'success.dark' }
                    }}
                >
                    Comprar Agora
                </Button>
            </DialogActions>
        </Dialog>
    );
}