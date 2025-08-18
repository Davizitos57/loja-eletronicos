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
import api from '../../services/api'; 

export default function ProdutoCard({ 
    produto, 
    onAdicionarCarrinho, 
    onComprar,
    onVerDetalhes
}) {

    const isUploadedImage = produto.imagem && produto.imagem.startsWith('/uploads/');
    
    const imageUrl = isUploadedImage
        ? `${api.defaults.baseURL}${produto.imagem}` 
        : produto.imagem || `https://picsum.photos/260/180?random=${produto.id}`;

    return (
        <Card
            sx={{
                width: 260,
                height: 380,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                flexShrink: 0,
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                }
            }}
            onClick={() => onVerDetalhes(produto)}
        >
            <CardMedia
                component="img"
                height="180"
                image={imageUrl}
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
                            e.stopPropagation(); 
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
                            e.stopPropagation();
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