import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Paper,
    TextField,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useCarrinho} from '../../context/CarrinhoContext';


export default function CarrinhoDrawer({ 
    aberto, 
    onFechar, 
    carrinho, 
    onRemoverItem,
    onFinalizarCompra 
}) {
    const { atualizarQuantidade, calcularTotal } = useCarrinho();
    
    const total = calcularTotal();

    const handleQuantidadeChange = (index, novaQuantidade) => {
        atualizarQuantidade(index, novaQuantidade);
    };

    return (
        <Drawer
            anchor="right"
            open={aberto}
            onClose={onFechar}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 400 },
                    maxWidth: '90vw'
                }
            }}
        >
            <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Cabeçalho */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingCartIcon />
                        Carrinho ({carrinho.length})
                    </Typography>
                    <IconButton onClick={onFechar}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Lista de produtos */}
                {carrinho.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            Seu carrinho está vazio
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Adicione produtos para começar suas compras!
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                            {carrinho.map((item, index) => {
                                const quantidade = item.quantidadeSelecionada || 1;
                                const subtotal = item.preco * quantidade;
                                
                                return (
                                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                        <Paper 
                                            elevation={2} 
                                            sx={{ 
                                                width: '100%', 
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 2
                                            }}
                                        >
                                            {/* Info do produto */}
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                    {item.nome}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    R$ {item.preco?.toFixed(2)} cada
                                                </Typography>
                                            </Box>

                                            {/* Controles de quantidade */}
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between' 
                                            }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <IconButton 
                                                        size="small"
                                                        onClick={() => handleQuantidadeChange(index, quantidade - 1)}
                                                        disabled={quantidade <= 1}
                                                        sx={{ 
                                                            bgcolor: 'grey.200',
                                                            color: 'white',
                                                            '&:hover': { bgcolor: 'grey.300' },
                                                            '&:disabled': { bgcolor: 'grey.300' }
                                                        }}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>

                                                    <TextField
                                                        value={quantidade}
                                                        onChange={(e) => {
                                                            const valor = parseInt(e.target.value) || 1;
                                                            handleQuantidadeChange(index, valor);
                                                        }}
                                                        type="number"
                                                        size="small"
                                                        inputProps={{ 
                                                            min: 1,
                                                            style: { textAlign: 'center', width: '50px' }
                                                        }}
                                                        sx={{ width: '70px' }}
                                                    />

                                                    <IconButton 
                                                        size="small"
                                                        onClick={() => handleQuantidadeChange(index, quantidade + 1)}
                                                        sx={{ 
                                                            bgcolor: 'grey.200',
                                                            color: 'white',
                                                            '&:hover': { bgcolor: 'grey.300' }
                                                        }}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>

                                                <IconButton 
                                                    onClick={() => onRemoverItem(index)}
                                                    color="error"
                                                    size="small"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>

                                            {/* Subtotal */}
                                            <Box sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                pt: 1,
                                                borderTop: '1px solid #e0e0e0'
                                            }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {quantidade} x R$ {item.preco?.toFixed(2)}
                                                </Typography>
                                                <Chip 
                                                    label={`R$ ${subtotal.toFixed(2)}`}
                                                    color="primary"
                                                    size="small"
                                                    sx={{ fontWeight: 'bold' }}
                                                />
                                            </Box>
                                        </Paper>
                                    </ListItem>
                                );
                            })}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        {/* Total */}
                        <Paper 
                            elevation={3}
                            sx={{ 
                                p: 2, 
                                bgcolor: 'primary.light',
                                color: 'primary.contrastText',
                                textAlign: 'center',
                                mb: 2
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Total: R$ {total.toFixed(2)}
                            </Typography>
                        </Paper>

                        {/* Botão finalizar */}
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={onFinalizarCompra}
                            sx={{ 
                                py: 1.5,
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                bgcolor: 'success.main',
                                '&:hover': { bgcolor: 'success.dark' }
                            }}
                        >
                            Finalizar Compra - R$ {total.toFixed(2)}
                        </Button>
                    </>
                )}
            </Box>
        </Drawer>
    );
}