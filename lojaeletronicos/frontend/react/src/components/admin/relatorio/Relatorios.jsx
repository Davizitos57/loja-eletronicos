import { useState, useEffect } from 'react';
import {
    Box, Grid, Card, CardContent, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    CircularProgress, Alert, Button, TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { relatorioService } from '../../../services/relatorio';

export default function Relatorios() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dados, setDados] = useState({
        produtosBaixoEstoque: [],
        produtosEsgotados: [],
        vendasPorProduto: [],
        clientesMaisAtivos: [],
        clientesQueMaisGastam: [],
        valorMedioPedido: 0,
        receitaTotal: 0
    });
    
    const [dataInicio, setDataInicio] = useState(dayjs().subtract(30, 'day'));
    const [dataFim, setDataFim] = useState(dayjs());

    const carregarDados = async () => {
        try {
            setLoading(true);
            setError(null);

            const [
                produtosBaixoEstoque,
                produtosEsgotados,
                vendasPorProduto,
                clientesMaisAtivos,
                clientesQueMaisGastam,
                valorMedioPedido,
                receitaTotal
            ] = await Promise.all([
                relatorioService.getProdutosBaixoEstoque(10),
                relatorioService.getProdutosEsgotados(),
                relatorioService.getVendasPorProduto(),
                relatorioService.getClientesMaisAtivos(),
                relatorioService.getClientesQueMaisGastam(),
                relatorioService.getValorMedioPorPedido(),
                relatorioService.getReceitaTotal(
                    dataInicio.format('YYYY-MM-DD'),
                    dataFim.format('YYYY-MM-DD')
                )
            ]);

            setDados({
                produtosBaixoEstoque,
                produtosEsgotados,
                vendasPorProduto,
                clientesMaisAtivos,
                clientesQueMaisGastam,
                valorMedioPedido,
                receitaTotal
            });

        } catch (err) {
            console.error('Erro ao carregar relatórios:', err);
            setError(err.message || 'Erro ao carregar dados dos relatórios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const handleBuscarReceita = () => {
        carregarDados();
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
                <Button onClick={carregarDados} sx={{ ml: 2 }}>
                    Tentar Novamente
                </Button>
            </Alert>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    📊 Relatórios e Análises
                </Typography>

                {/* Cards de resumo */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    💰 Valor Médio por Pedido
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    R$ {dados.valorMedioPedido?.toFixed(2) || '0,00'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="success.main" gutterBottom>
                                    📈 Receita Total
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    R$ {dados.receitaTotal?.toFixed(2) || '0,00'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {dataInicio.format('DD/MM/YYYY')} - {dataFim.format('DD/MM/YYYY')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="warning.main" gutterBottom>
                                    📦 Produtos Esgotados
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    {dados.produtosEsgotados?.length || 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filtro de período para receita */}
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            🗓️ Filtrar Receita por Período
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <DatePicker
                                    label="Data Início"
                                    value={dataInicio}
                                    onChange={setDataInicio}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <DatePicker
                                    label="Data Fim"
                                    value={dataFim}
                                    onChange={setDataFim}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Button
                                    variant="contained"
                                    onClick={handleBuscarReceita}
                                    fullWidth
                                    sx={{ py: 1.8 }}
                                >
                                    Buscar
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Tabelas de relatórios */}
                <Grid container spacing={3}>
                    {/* Produtos com baixo estoque */}
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="warning.main">
                                    ⚠️ Produtos com Baixo Estoque
                                </Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Produto</TableCell>
                                                <TableCell align="right">Estoque</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dados.produtosBaixoEstoque?.map((produto) => (
                                                <TableRow key={produto.id}>
                                                    <TableCell>{produto.nome}</TableCell>
                                                    <TableCell align="right">
                                                        {produto.quantidade_estoque}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Vendas por produto */}
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary">
                                    🏆 Produtos Mais Vendidos
                                </Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Produto</TableCell>
                                                <TableCell align="right">Vendidos</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dados.vendasPorProduto?.slice(0, 10).map((produto) => (
                                                <TableRow key={produto.id}>
                                                    <TableCell>{produto.nome}</TableCell>
                                                    <TableCell align="right">
                                                        {produto.total_vendido}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Clientes mais ativos */}
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="info.main">
                                    👥 Clientes Mais Ativos
                                </Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Cliente</TableCell>
                                                <TableCell align="right">Pedidos</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dados.clientesMaisAtivos?.map((cliente) => (
                                                <TableRow key={cliente.idUsuario}>
                                                    <TableCell>{cliente.nome}</TableCell>
                                                    <TableCell align="right">
                                                        {cliente.totalPedidos}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Clientes que mais gastam */}
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="success.main">
                                    💎 Clientes que Mais Gastam
                                </Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Cliente</TableCell>
                                                <TableCell align="right">Total Gasto</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dados.clientesQueMaisGastam?.map((cliente) => (
                                                <TableRow key={cliente.idUsuario}>
                                                    <TableCell>{cliente.nome}</TableCell>
                                                    <TableCell align="right">
                                                        R$ {cliente.totalGasto?.toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}