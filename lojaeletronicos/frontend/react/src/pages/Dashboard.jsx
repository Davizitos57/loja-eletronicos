import { useState, useEffect } from 'react';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../context/AuthContext';

// Componentes das seções admin
import DashboardOverview from '../components/admin/sections/DashboardOverview';
// import GerenciarUsuarios from '../components/admin/sections/GerenciarUsuarios';
// import GerenciarProdutos from '../components/admin/sections/GerenciarProdutos';
// import CriarProduto from '../components/admin/sections/CriarProduto';
// import Relatorios from '../components/admin/sections/Relatorios';
// import Configuracoes from '../components/admin/sections/Configuracoes';


export default function Dashboard() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isAdmin, usuario } = useAuth();
    
    const secaoParam = searchParams.get('secao');
    const [secaoAtiva, setSecaoAtiva] = useState(secaoParam || 'overview');

    // Atualizar seção quando o parâmetro da URL mudar
    useEffect(() => {
        if (secaoParam) {
            setSecaoAtiva(secaoParam);
        }
    }, [secaoParam]);

    // Proteção de rota - só admins podem acessar
    if (!isAdmin()) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <Typography variant="h4" color="error" gutterBottom>
                    ⛔ Acesso Negado
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Você não tem permissão para acessar esta área.
                </Typography>
            </Box>
        );
    }

    const renderSecao = () => {
        switch (secaoAtiva) {
            // case 'usuarios':
            //     return <GerenciarUsuarios />;
            // case 'produtos':
            //     return <GerenciarProdutos />;
            // case 'criar-produto':
            //     return <CriarProduto />;
            // case 'relatorios':
            //     return <Relatorios />;
            // case 'configuracoes':
            //     return <Configuracoes />;
            default:
                return <DashboardOverview onNavegar={setSecaoAtiva} />;
        }
    };

    const getTituloSecao = () => {
        const titulos = {
            overview: 'Visão Geral',
            usuarios: 'Gerenciar Usuários',
            produtos: 'Gerenciar Produtos',
            'criar-produto': 'Criar Produto',
            relatorios: 'Relatórios',
            configuracoes: 'Configurações'
        };
        return titulos[secaoAtiva] || 'Dashboard';
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            {/* Header do Dashboard */}
            <Box sx={{
                bgcolor: 'white',
                boxShadow: 1,
                py: 3,
                px: 3,
                borderBottom: '3px solid',
                borderColor: 'primary.main'
            }}>
                <Container maxWidth="xl">
                    {/* Breadcrumb */}
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                        <Link
                            color="inherit"
                            href="#"
                            onClick={() => navigate('/home')}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Home
                        </Link>
                        <Typography
                            color="text.primary"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <AdminPanelSettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {getTituloSecao()}
                        </Typography>
                    </Breadcrumbs>

                    {/* Título e Info do Admin */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                {getTituloSecao()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Painel administrativo do TecnoFácil
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {usuario?.nome || 'Admin'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Administrador
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Conteúdo da seção ativa */}
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {renderSecao()}
            </Container>
        </Box>
    );
}