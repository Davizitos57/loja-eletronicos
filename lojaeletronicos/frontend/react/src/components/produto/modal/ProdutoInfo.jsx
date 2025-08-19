import { Box, Typography, Chip, Grid, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function ProdutoInfo({ produto }) {
    return (
        <Box>
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

                <Chip 
                    icon={<InventoryIcon />}
                    label={`${produto.quantidadeEstoque || 0} em estoque`}
                    color={
                        produto.quantidadeEstoque > 20 ? "success" : 
                        produto.quantidadeEstoque > 5 ? "warning" : 
                        produto.quantidadeEstoque > 0 ? "error" : "default"
                    }
                    variant="filled"
                    size="medium"
                    sx={{ fontSize: '1rem', height: '40px' }}
                />
            </Box>

            {/* Informações básicas em card */}
            <Paper
                elevation={3}
                sx={{ 
                    bgcolor: 'action.hover',
                    p: 3, 
                    borderRadius: 3, 
                    border: '2px solid #000000ff',
                    mb: 3 
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                    Informações do Produto
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                            <strong>Categoria:</strong> {produto.categoria || 'Eletrônicos'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                            <strong>Estoque:</strong> {produto.quantidadeEstoque || 'Disponível'} unidades
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}