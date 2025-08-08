import { Fab, Tooltip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../../context/AuthContext';

export default function AdminFab({ onClick }) {
    const { isAdmin } = useAuth();

    // Só renderiza se o usuário for admin
    if (!isAdmin()) {
        return null;
    }

    return (
        <Tooltip title="Painel Administrativo" placement="left">
            <Fab
                color="secondary"
                sx={{
                    position: 'fixed',
                    top: 20,
                    left: 20,
                    zIndex: 1000,
                    boxShadow: 4,
                    bgcolor: '#f44336',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        transition: 'transform 0.2s',
                        bgcolor: '#d32f2f'
                    }
                }}
                onClick={onClick}
            >
                <AdminPanelSettingsIcon sx={{ color: 'white' }} />
            </Fab>
        </Tooltip>
    );
}