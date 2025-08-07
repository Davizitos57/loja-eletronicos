import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CarrinhoDrawer({ 
    aberto, 
    onFechar, 
    carrinho, 
    onRemoverItem,
    onFinalizarCompra 
}) {
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);

    return (
        <Drawer
            anchor="right"
            open={aberto}
            onClose={onFechar}
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
                        onClick={onFechar}
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
                                    onClick={() => onRemoverItem(index)}
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
                            Total: R$ {total.toFixed(2)}
                        </Typography>
                        <Button 
                            variant="contained" 
                            fullWidth 
                            size="large"
                            onClick={onFinalizarCompra}
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
                            onClick={onFechar}
                            sx={{ mt: 1, color: 'grey.600' }}
                        >
                            Continuar Comprando
                        </Button>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}