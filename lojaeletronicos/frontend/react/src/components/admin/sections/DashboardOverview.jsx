import { 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Button,
    Chip,
    CircularProgress
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useDashboardStats } from '../../../hooks/useDashboardStats';

export default function DashboardOverview({ onNavegar }) {
    const { estatisticas, loading } = useDashboardStats();

    const estatisticasCards = [
        {
            titulo: 'Total de Clientes',
            valor: loading ? '...' : estatisticas.totalUsuarios.toLocaleString('pt-BR'),
            icone: <PeopleIcon sx={{ fontSize: 40 }} />,
            cor: '#1976d2',
            acao: 'clientes'
        },
        {
            titulo: 'Produtos Cadastrados',
            valor: loading ? '...' : estatisticas.totalProdutos.toLocaleString('pt-BR'),
            icone: <InventoryIcon sx={{ fontSize: 40 }} />,
            cor: '#2e7d32',
            acao: 'produtos'
        },
        {
            titulo: 'Vendas do Mês',
            valor: loading ? '...' : estatisticas.vendasMes.toLocaleString('pt-BR'),
            icone: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
            cor: '#ed6c02',
            acao: 'relatorios'
        },
        {
            titulo: 'Faturamento',
            valor: loading ? '...' : `R$ ${estatisticas.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            icone: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
            cor: '#9c27b0',
            acao: 'relatorios'
        }
    ];

    const acoesPrincipais = [
        {
            titulo: 'Criar Produto',
            descricao: 'Adicionar novo produto ao catálogo',
            acao: 'criar-produto',
            cor: 'primary'
        },
        {
            titulo: 'Gerenciar Usuários',
            descricao: 'Visualizar e editar usuários',
            acao: 'usuarios',
            cor: 'secondary'
        },
        {
            titulo: 'Ver Relatórios',
            descricao: 'Análises e estatísticas de vendas',
            acao: 'relatorios',
            cor: 'success'
        }
    ];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {/* Cards de Estatísticas */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                📊 Estatísticas Gerais
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {estatisticasCards.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }
                            }}
                            onClick={() => onNavegar(stat.acao)}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ color: stat.cor, mr: 2 }}>
                                        {stat.icone}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {stat.titulo}
                                    </Typography>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.cor }}>
                                    {stat.valor}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Ações Rápidas */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                ⚡ Ações Rápidas
            </Typography>
            
            <Grid container spacing={3}>
                {acoesPrincipais.map((acao, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {acao.titulo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    {acao.descricao}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color={acao.cor}
                                    fullWidth
                                    onClick={() => onNavegar(acao.acao)}
                                    sx={{ py: 1.5 }}
                                >
                                    Acessar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Status do Sistema */}
            <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    🔧 Status do Sistema
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label="Sistema Online" color="success" />
                    <Chip label="Banco de Dados OK" color="success" />
                    <Chip label="API Funcionando" color="success" />
                    <Chip label={`Última Atualização: ${new Date().toLocaleDateString('pt-BR')}`} color="info" />
                </Box>
            </Box>
        </Box>
    );
}