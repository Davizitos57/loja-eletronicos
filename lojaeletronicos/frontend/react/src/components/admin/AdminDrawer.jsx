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

    // Removido 'criar-produto' e 'configuracoes' e adicionado URLs diretas
    const menuItems = [
        {
            id: 'clientes',
            label: 'Gerenciar Clientes',
            icon: <PeopleIcon />,
            description: 'Listar, criar, editar e excluir clientes',
            url: '/cliente'  // URL direta
        },
        {
            id: 'produtos',
            label: 'Gerenciar Produtos',
            icon: <InventoryIcon />,
            description: 'Listar, criar, editar e excluir produtos',
            url: '/produto'  // URL direta
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
            // Navegar diretamente para a URL especificada
            navigate(item.url);
        } else {
            // Comportamento existente para abas internas do dashboard
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
                    boxShadow: 4
                }
            }}
        >
            <Box sx={{ 
                height: '100%', 
                bgcolor: '#fafafa', 
                display: 'flex', 
                flexDirection: 'column' 
            }}>
                {/* Cabeçalho */}
                <Box sx={{ 
                    p: 3, 
                    bgcolor: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                    color: 'white'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            🔧 Painel Admin
                        </Typography>
                        <IconButton 
                            onClick={onFechar}
                            sx={{ color: 'white' }}
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
                                        bgcolor: 'primary.light',
                                        color: 'white',
                                        '& .MuiListItemIcon-root': {
                                            color: 'white'
                                        }
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
                <Box sx={{ p: 2, bgcolor: 'grey.100', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        TecnoFácil Admin Panel v1.0
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
}