import { DialogActions, Button, Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';

export default function ProdutoAcoes({ 
    onAdicionarCarrinho, 
    onComprar, 
    quantidade, 
    valorTotal,
    estoqueDisponivel 
}) {
    const desabilitado = estoqueDisponivel <= 0;

    return (
        <DialogActions 
            sx={{ 
                p: 3, 
                bgcolor: 'background.paper',
                borderTop: '3px solid',
                gap: 3,
                position: 'sticky',
                bottom: 0,
                zIndex: 1,
                flexDirection: 'column'
            }}
        >
            {/* Botões de ação */}
            <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={onAdicionarCarrinho}
                    disabled={desabilitado}
                    sx={{ 
                        flex: 1,
                        py: 2,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        borderWidth: 2,
                        '&:hover': { borderWidth: 2 }
                    }}
                >
                    {desabilitado ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<LocalMallIcon />}
                    onClick={onComprar}
                    disabled={desabilitado}
                    sx={{ 
                        flex: 1,
                        py: 2,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        bgcolor: 'success.main',
                        '&:hover': { bgcolor: 'success.dark' }
                    }}
                >
                    {desabilitado ? 'Indisponível' : 'Comprar Agora'}
                </Button>
            </Box>
        </DialogActions>
    );
}