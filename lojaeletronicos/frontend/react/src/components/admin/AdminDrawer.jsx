import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDrawer({ aberto, onFechar, onNavegar }) {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        {
            id: 'clientes',
            label: 'Gerenciar Clientes',
            icon: <PeopleIcon />,
            description: 'Listar, criar, editar e excluir clientes',
            url: '/cliente'
        },
        {
            id: 'produtos',
            label: 'Gerenciar Produtos',
            icon: <InventoryIcon />,
            description: 'Listar, criar, editar e excluir produtos',
            url: '/produto'
        },
        {
            id: 'relatorios',
            label: 'Relatórios',
            icon: <AnalyticsIcon />,
            description: 'Vendas, estatísticas e métricas'
        }
    ];

    const handleItemClick = (item) => {
        if (item.url) {
            navigate(item.url);
        } else {
            onNavegar(item.id);
        }
        onFechar();
    };

    return (
        <Drawer
            anchor="left"
            open={aberto}
            onClose={onFechar}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 380,
                    boxShadow: 4,
                    // Usa a cor de papel do tema, que é escura
                    bgcolor: 'background.paper' 
                }
            }}
        >
            <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column' 
            }}>
                {/* Cabeçalho */}
                <Box sx={{ 
                    p: 3, 
                    // Usa o gradiente da cor primária do tema
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    color: 'primary.contrastText' // Garante que o texto seja legível
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            🔧 Painel Admin
                        </Typography>
                        <IconButton 
                            onClick={onFechar}
                            sx={{ color: 'primary.contrastText' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Bem-vindo, {usuario?.nome}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Administrador do Sistema
                    </Typography>
                </Box>
                
                <Divider />
                
                {/* Menu de navegação */}
                <List sx={{ flexGrow: 1, p: 2 }}>
                    {menuItems.map((item) => (
                        <ListItem 
                            key={item.id} 
                            disablePadding 
                            sx={{ mb: 1 }}
                        >
                            <ListItemButton
                                onClick={() => handleItemClick(item)}
                                sx={{
                                    borderRadius: 2,
                                    '&:hover': {
                                        // Usa a cor de 'hover' do tema
                                        bgcolor: 'action.hover',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.label}
                                    secondary={item.description}
                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* Rodapé */}
                <Box sx={{ p: 2, bgcolor: 'background.default', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        TecnoFácil Admin Panel v1.0
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
}