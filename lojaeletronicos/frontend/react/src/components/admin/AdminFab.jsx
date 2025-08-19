import { Fab } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../../context/AuthContext';

export default function AdminFab({ onClick }) {
    const { isAdmin } = useAuth();

    if (!isAdmin()) {
        return null;
    }

    return (
        <Fab
        color='secondary'
            onClick={onClick}
            sx={{
                position: 'fixed',
                top: 100,
                left: 16,
                zIndex: 1000,
                boxShadow: 4,
                bgcolor: '#f44336',
                '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: 6,
                },
                transition: 'all 0.3s ease',
            }}
        >
            <AdminPanelSettingsIcon />
        </Fab>
    );
}