import { Fab, Badge } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FiltroFab({ onClick, categoriasAtivaCount = 0 }) {
    return (
        <Fab
            color="primary"
            onClick={onClick}
            sx={{
                position: 'fixed',
                top: 20,
                left: 16,
                zIndex: 1000,
                boxShadow: 3,
                '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: 6,
                },
                transition: 'all 0.3s ease',
            }}
        >
            <Badge 
                badgeContent={categoriasAtivaCount} 
                color="error"
                sx={{
                    '& .MuiBadge-badge': {
                        fontSize: '0.75rem',
                        minWidth: '18px',
                        height: '18px'
                    }
                }}
            >
                <FilterListIcon />
            </Badge>
        </Fab>
    );
}