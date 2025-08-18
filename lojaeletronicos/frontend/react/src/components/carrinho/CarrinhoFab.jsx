import { Fab, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrinho } from '../../context/CarrinhoContext';

export default function CarrinhoFab({ onClick }) {
    const { carrinho } = useCarrinho();
    
    const quantidadeTotal = carrinho.reduce((total, item) => {
        return total + (item.quantidade || 1);
    }, 0);

    return (
        <Fab
            color="primary"
            onClick={onClick}
            sx={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1000,
                boxShadow: 4,
                '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: 6
                }
            }}
        >
            <Badge 
                badgeContent={quantidadeTotal} 
                color="error"
                max={99}
                sx={{
                    '& .MuiBadge-badge': {
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }
                }}
            >
                <ShoppingCartIcon sx={{ fontSize: 28 }} />
            </Badge>
        </Fab>
    );
}