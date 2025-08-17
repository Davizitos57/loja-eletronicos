import { 
    Grid, 
    Box, 
    Typography,
    Chip,
    Divider
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Inventory as InventoryIcon,
    ShoppingCart as ShoppingCartIcon,
    AttachMoney as AttachMoneyIcon,
    Warning as WarningIcon,
    PeopleAlt as PeopleIcon,
    Analytics as AnalyticsIcon,
    ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';

import MetricCard from './MetricCard';
import TableCard from './TableCard';
import { mockDataRelatorios } from './mockData';


export default function Relatorios() {
    const { 
        metricas, 
        produtosBaixoEstoque, 
        produtosEsgotados, 
        vendasPorProduto, 
        clientesMaisAtivos, 
        clientesQueMaisGastam 
    } = mockDataRelatorios;

    const colunasProdutosBaixoEstoque = [
        { field: 'nome', label: 'Produto' },
        { field: 'categoria', label: 'Categoria' },
        { 
            field: 'estoque', 
            label: 'Estoque Atual',
            render: (valor, linha) => (
                <Chip 
                    label={`${valor} unidades`}
                    color={valor <= 2 ? 'error' : 'warning'}
                    size="small"
                />
            )
        },
        { field: 'minimo', label: 'Estoque Mínimo' }
    ];

    const colunasProdutosEsgotados = [
        { field: 'nome', label: 'Produto' },
        { field: 'categoria', label: 'Categoria' },
        { 
            field: 'ultimaVenda', 
            label: 'Última Venda',
            render: (valor) => new Date(valor).toLocaleDateString('pt-BR')
        }
    ];

    const colunasVendasPorProduto = [
        { field: 'nome', label: 'Produto' },
        { field: 'categoria', label: 'Categoria' },
        { field: 'vendas', label: 'Vendas', render: (valor) => `${valor} unid.` },
        { 
            field: 'receita', 
            label: 'Receita',
            render: (valor) => `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
    ];

    const colunasClientesAtivos = [
        { field: 'nome', label: 'Cliente' },
        { field: 'email', label: 'Email' },
        { field: 'totalPedidos', label: 'Total Pedidos' },
        { 
            field: 'ultimoPedido', 
            label: 'Último Pedido',
            render: (valor) => new Date(valor).toLocaleDateString('pt-BR')
        }
    ];

    const colunasClientesGastam = [
        { field: 'nome', label: 'Cliente' },
        { field: 'email', label: 'Email' },
        { field: 'pedidos', label: 'Pedidos' },
        { 
            field: 'totalGasto', 
            label: 'Total Gasto',
            render: (valor) => `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
    ];

    return (
        <Box>
            {/* Métricas Principais */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                📊 Métricas Principais
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <MetricCard
                        titulo="Receita Total"
                        valor={metricas.receitaTotal}
                        formato="currency"
                        icone={<AttachMoneyIcon sx={{ fontSize: 40 }} />}
                        cor="#2e7d32"
                        subtitulo="Últimos 30 dias"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <MetricCard
                        titulo="Valor Médio por Pedido"
                        valor={metricas.valorMedioPedido}
                        formato="currency"
                        icone={<AnalyticsIcon sx={{ fontSize: 40 }} />}
                        cor="#1976d2"
                        subtitulo={`${metricas.totalPedidos} pedidos`}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <MetricCard
                        titulo="Produtos - Baixo Estoque"
                        valor={metricas.produtosBaixoEstoque}
                        formato="number"
                        icone={<WarningIcon sx={{ fontSize: 40 }} />}
                        cor="#ed6c02"
                        subtitulo="Necessita reposição"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <MetricCard
                        titulo="Produtos Esgotados"
                        valor={metricas.produtosEsgotados}
                        formato="number"
                        icone={<InventoryIcon sx={{ fontSize: 40 }} />}
                        cor="#d32f2f"
                        subtitulo="Sem estoque"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Gestão de Estoque */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                📦 Gestão de Estoque
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} lg={6}>
                    <TableCard
                        titulo="Produtos com Baixo Estoque"
                        dados={produtosBaixoEstoque}
                        colunas={colunasProdutosBaixoEstoque}
                        icone={<WarningIcon sx={{ fontSize: 24 }} />}
                        cor="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TableCard
                        titulo="Produtos Esgotados"
                        dados={produtosEsgotados}
                        colunas={colunasProdutosEsgotados}
                        icone={<InventoryIcon sx={{ fontSize: 24 }} />}
                        cor="#d32f2f"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Análise de Vendas */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                💰 Análise de Vendas
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <TableCard
                        titulo="Vendas por Produto"
                        dados={vendasPorProduto}
                        colunas={colunasVendasPorProduto}
                        icone={<ShoppingBagIcon sx={{ fontSize: 24 }} />}
                        cor="#2e7d32"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Análise de Clientes */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                👥 Análise de Clientes
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <TableCard
                        titulo="Clientes Mais Ativos"
                        dados={clientesMaisAtivos}
                        colunas={colunasClientesAtivos}
                        icone={<PeopleIcon sx={{ fontSize: 24 }} />}
                        cor="#1976d2"
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TableCard
                        titulo="Clientes que Mais Gastam"
                        dados={clientesQueMaisGastam}
                        colunas={colunasClientesGastam}
                        icone={<TrendingUpIcon sx={{ fontSize: 24 }} />}
                        cor="#9c27b0"
                    />
                </Grid>
            </Grid>

            {/* Informações Adicionais */}
            <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    📈 Informações dos Relatórios
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label="Dados atualizados em tempo real" color="success" />
                    <Chip label="Período: Últimos 30 dias" color="info" />
                    <Chip label="Última atualização: Agora" color="primary" />
                </Box>
            </Box>
        </Box>
    );
}