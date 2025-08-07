import { Fab, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CarrinhoFab({ quantidadeItens, onClick }) {
    return (
        <Fab
            color="primary"
            sx={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1000,
                boxShadow: 4,
                '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s'
                }
            }}
            onClick={onClick}
        >
            <Badge badgeContent={quantidadeItens} color="error">
                <ShoppingCartIcon />
            </Badge>
        </Fab>
    );
}