import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ProdutoCard({ 
    produto, 
    onAdicionarCarrinho, 
    onComprar,
    onVerDetalhes // Nova prop
}) {
    return (
        <Card
            sx={{
                width: 260,
                height: 380,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                flexShrink: 0,
                cursor: 'pointer', // Indicar que é clicável
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                }
            }}
            onClick={() => onVerDetalhes(produto)} // Abrir modal ao clicar no card
        >
            <CardMedia
                component="img"
                height="180"
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
                        sx={{ mb: 1, py: 0.8 }}
                        onClick={(e) => {
                            e.stopPropagation(); // Evitar que abra o modal
                            onComprar(produto);
                        }}
                    >
                        Comprar Agora
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ py: 0.8 }}
                        onClick={(e) => {
                            e.stopPropagation(); // Evitar que abra o modal
                            onAdicionarCarrinho(produto);
                        }}
                        startIcon={<ShoppingCartIcon />}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}