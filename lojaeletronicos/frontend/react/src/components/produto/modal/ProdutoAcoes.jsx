import { DialogActions, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProdutoAcoes({ onAdicionarCarrinho, onComprar }) {
    return (
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
                onClick={onAdicionarCarrinho}
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
                onClick={onComprar}
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
    );
}