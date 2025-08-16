import { Box, Typography, IconButton, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProdutoCard from './produto/ProdutoCard';

export default function CategoriaSection({ 
    categoria, 
    scrollPosition, 
    onNavigate, 
    podeNavegar,
    onAdicionarCarrinho,
    onComprar,
    onVerDetalhes 
}) {
    return (
        <Box sx={{ mb: 3 }}>
            {/* Cabeçalho da categoria */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main',
                        fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                >
                    {categoria.nome} ({categoria.produtos.length})
                </Typography>
                
                {/* Botões de navegação */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                        onClick={() => onNavigate(categoria.id, 'left')}
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
                        onClick={() => onNavigate(categoria.id, 'right')}
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

            {/* Container de produtos */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    p: 1.5
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        transition: 'transform 0.3s ease-in-out',
                        transform: `translateX(-${scrollPosition || 0}px)`,
                        width: 'max-content'
                    }}
                >
                    {categoria.produtos.map((produto) => (
                        <ProdutoCard
                            key={produto.id}
                            produto={produto}
                            onAdicionarCarrinho={onAdicionarCarrinho}
                            onComprar={onComprar}
                            onVerDetalhes={onVerDetalhes}
                        />
                    ))}
                </Box>
            </Box>

            <Divider sx={{ mt: 2 }} />
        </Box>
    );
}