import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
    IconButton,
    alpha
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Payment as PaymentIcon,
    CheckCircle as CheckCircleIcon,
    PriceChange as PriceChangeIcon,
    LocalShipping as LocalShippingIcon,
    Inventory as InventoryIcon,
    PointOfSale as PointOfSaleIcon,
    Edit as EditIcon,
    Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useCarrinho } from '../../context/CarrinhoContext.jsx';
import SelecionarPagamento from './SelecionarPagamento.jsx';
import { useEndereco } from '../../hooks/useEndereco';
import { carrinhoService } from '../../services/carrinho';
import { useAuth } from '../../context/AuthContext';
import EnderecoEditModal from '../../components/endereco/EnderecoEditModal.jsx';


export default function ResumoCompra() {
    const navigate = useNavigate();
    const location = useLocation();
    const { limparCarrinho } = useCarrinho();
    const [processandoPagamento, setProcessandoPagamento] = useState(false);
    const [pagamentoSucesso, setPagamentoSucesso] = useState(false);
    const [pagamentoAberto, setPagamentoAberto] = useState(false);
    const [dadosPagamento, setDadosPagamento] = useState(null);
    const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);

    const { enderecoSelecionado, loading: enderecoLoading, atualizarEndereco } = useEndereco();
    const { usuario } = useAuth();
    
    const produtoCompra = location.state?.produto;
    const carrinhoCompra = location.state?.carrinho;
    const totalCompra = location.state?.total;

    const isCompraUnica = !!produtoCompra;
    const isCompraCarrinho = !!carrinhoCompra;

    let itensCompra = [];
    let total = 0;

    if (isCompraUnica) {
        itensCompra = [produtoCompra];
        const quantidade = produtoCompra.quantidade || produtoCompra.quantidadeSelecionada || 1;
        total = produtoCompra.preco * quantidade;
    } else if (isCompraCarrinho) {
        itensCompra = carrinhoCompra;
        total = totalCompra || 0;
    }

    const handleSalvarEndereco = async (dadosAtualizados) => {
        if (enderecoSelecionado) {
            await atualizarEndereco(enderecoSelecionado.id, dadosAtualizados);
            setModalEnderecoAberto(false); 
        }
    };

    const voltarParaHome = () => {
        navigate('/home');
    };

    const abrirSelecaoPagamento = () => {
        setPagamentoAberto(true);
    };

    const fecharSelecaoPagamento = () => {
        setPagamentoAberto(false);
    };

    const confirmarPagamento = (dadosPagamento) => {
        setDadosPagamento(dadosPagamento);
        setPagamentoAberto(false);
        processarPagamento(dadosPagamento);
    };

    const processarPagamento = async (dados) => {
        setProcessandoPagamento(true);

        setTimeout(() => {
            setProcessandoPagamento(false);
            setPagamentoSucesso(true);

            if (isCompraCarrinho) {
                limparCarrinho();
            }
        }, 2000);
    };

    const finalizarCompra = () => {
        setPagamentoSucesso(false);
        setDadosPagamento(null);
        navigate('/home');
    };

    const obterTextoFormaPagamento = (forma) => {
        switch (forma) {
            case 'pix': return 'PIX';
            case 'boleto': return 'Boleto Bancário';
            case 'cartao': return 'Cartão de Crédito';
            default: return forma;
        }
    };

    const formatarCEP = (cep) => {
        if (!cep) return '';
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const calcularPrazoEntrega = () => {
        if (!enderecoSelecionado?.cep) return 0;
        const cep = enderecoSelecionado.cep.replace(/\D/g, '');
        const prefixo = parseInt(cep.substring(0, 2));

        if (prefixo >= 30000 && prefixo <= 39999) return 2;
        if (prefixo >= 1000 && prefixo <= 19999) return 1;
        if (prefixo >= 20000 && prefixo <= 28999) return 3;
        return 5;
    };

    if (enderecoLoading) {
        return (
            <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography>Carregando dados da compra...</Typography>
            </Container>
        );
    }

    if (itensCompra.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="warning">
                    Nenhum item encontrado para compra.
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={voltarParaHome}
                    sx={{ mt: 2 }}
                >
                    Voltar para Home
                </Button>
            </Container>
        );
    }

    const prazoEntrega = calcularPrazoEntrega();

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={voltarParaHome}
                    sx={{ mb: 2 }}
                >
                    Voltar
                </Button>
                <Typography variant="h4" component="h1" gutterBottom>
                    Resumo da Compra
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {isCompraUnica ? 'Compra direta' : 'Itens do carrinho'}
                </Typography>
            </Box>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <InventoryIcon sx={{ mr: 1 }} />
                        Itens do Pedido
                    </Typography>
                    <List>
                        {itensCompra.map((item, index) => {
                            const quantidade = item.quantidade || item.quantidadeSelecionada || 1;
                            const precoUnitario = item.preco || 0;
                            const precoTotal = precoUnitario * quantidade;

                            return (
                                <ListItem key={item.id || index} divider={index < itensCompra.length - 1}>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={item.imagem}
                                            alt={item.nome}
                                            sx={{ width: 80, height: 70, marginRight: 3 }}
                                            variant="rounded"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6">
                                                {item.nome}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Quantidade: {quantidade} • {item.categoria}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Preço unitário: R$ {precoUnitario.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    <Typography variant="h6" color="primary" sx={{ ml: 2 }}>
                                        R$ {precoTotal.toFixed(2)}
                                    </Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>

            {/* Endereço de Entrega */}
            {enderecoSelecionado && (
                 <Card sx={{ mb: 3 }}>
                 <CardContent>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                         <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                             <LocalShippingIcon sx={{ mr: 1 }} />
                             Endereço de Entrega
                         </Typography>
                         <IconButton
                             size="small"
                             sx={{ color: 'primary.main' }}
                             onClick={() => setModalEnderecoAberto(true)}
                         >
                             <EditIcon />
                         </IconButton>
                     </Box>
 
                     <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                         <Typography variant="body2" color="text.primary" sx={{ mb: 1, fontWeight: 500 }}>
                             {enderecoSelecionado.rua}, {enderecoSelecionado.numero}
                             {enderecoSelecionado.complemento && `, ${enderecoSelecionado.complemento}`}
                         </Typography>
                         
                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                             {enderecoSelecionado.bairro} - {enderecoSelecionado.cidade}, {enderecoSelecionado.estado}
                         </Typography>
                         
                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                             CEP: {formatarCEP(enderecoSelecionado.cep)}
                         </Typography>
 
                         <Box sx={{
                             p: 1.5,
                             bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                             borderRadius: 1,
                             border: '1px solid',
                             borderColor: (theme) => alpha(theme.palette.success.main, 0.3)
                         }}>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                 <ScheduleIcon sx={{ fontSize: 20, color: 'success.main' }} />
                                 <Typography variant="body2" fontWeight="bold" color="success.main">
                                     Entrega prevista: {prazoEntrega} dia{prazoEntrega > 1 ? 's' : ''} út{prazoEntrega > 1 ? 'eis' : 'il'}
                                 </Typography>
                             </Box>
                             <Typography variant="caption" color="success.dark">
                                 {new Date(Date.now() + prazoEntrega * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', {
                                     weekday: 'long',
                                     year: 'numeric',
                                     month: 'long',
                                     day: 'numeric'
                                 })}
                             </Typography>
                         </Box>
                     </Box>
                 </CardContent>
             </Card>
            )}

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <PointOfSaleIcon sx={{ mr: 1 }} />
                        Resumo da Compra
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Subtotal:</Typography>
                        <Typography>R$ {total.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Frete:</Typography>
                        <Typography color="success.main">Grátis</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6" color="primary">
                            R$ {total.toFixed(2)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PriceChangeIcon sx={{ height: 35 }} />}
                onClick={abrirSelecaoPagamento}
                sx={{ py: 2, fontSize: '1.2rem', fontWeight: 'bold' }}
            >
                Escolher Forma de Pagamento
            </Button>

            <SelecionarPagamento
                aberto={pagamentoAberto}
                onFechar={fecharSelecaoPagamento}
                total={total}
                onConfirmarPagamento={confirmarPagamento}
            />

            <Dialog open={processandoPagamento}>
                <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress size={60} sx={{ mb: 2 }} />
                    <Typography variant="h6">
                        Processando pagamento...
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Aguarde enquanto processamos sua compra
                    </Typography>
                    {dadosPagamento && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Forma de pagamento: {obterTextoFormaPagamento(dadosPagamento.forma)}
                            </Typography>
                            {dadosPagamento.forma === 'cartao' && dadosPagamento.parcelas > 1 && (
                                <Typography variant="body2" color="text.secondary">
                                    Parcelamento: {dadosPagamento.parcelas}x
                                </Typography>
                            )}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={pagamentoSucesso} onClose={finalizarCompra}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 1 }} />
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Pagamento Realizado com Sucesso!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Sua compra foi processada e você receberá um e-mail de confirmação em breve.
                    </Typography>

                    {dadosPagamento && (
                        <Card sx={{ mt: 2, bgcolor: (theme) => alpha(theme.palette.success.main, 0.1) }}>
                            <CardContent sx={{ py: 2 }}>
                                <Typography variant="h6" color="success.main" gutterBottom>
                                    Detalhes do Pagamento
                                </Typography>
                                <Typography variant="body2">
                                    Forma: {obterTextoFormaPagamento(dadosPagamento.forma)}
                                </Typography>
                                {dadosPagamento.forma === 'cartao' && dadosPagamento.parcelas > 1 && (
                                    <Typography variant="body2">
                                        Parcelamento: {dadosPagamento.parcelas}x de R$ {(dadosPagamento.valorFinal / dadosPagamento.parcelas).toFixed(2)}
                                    </Typography>
                                )}
                                {dadosPagamento.juros > 0 && (
                                    <Typography variant="body2" color="warning.main">
                                        Juros aplicados: {dadosPagamento.juros}%
                                    </Typography>
                                )}
                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                    Total pago: R$ {dadosPagamento.valorFinal.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}

                    {enderecoSelecionado && (
                        <Card sx={{ mt: 2, bgcolor: (theme) => alpha(theme.palette.info.main, 0.1) }}>
                            <CardContent sx={{ py: 2 }}>
                                <Typography variant="h6" color="info.main" gutterBottom>
                                    📦 Informações de Entrega
                                </Typography>
                                <Typography variant="body2">
                                    Será entregue em: {enderecoSelecionado.rua}, {enderecoSelecionado.numero}
                                </Typography>
                                <Typography variant="body2">
                                    {enderecoSelecionado.bairro} - {enderecoSelecionado.cidade}, {enderecoSelecionado.estado}
                                </Typography>
                                <Typography variant="body2" color="info.main" fontWeight="bold">
                                    Prazo: {prazoEntrega} dia{prazoEntrega > 1 ? 's' : ''} útil{prazoEntrega > 1 ? 'is' : ''}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        variant="contained"
                        onClick={finalizarCompra}
                        size="large"
                    >
                        Continuar Comprando
                    </Button>
                </DialogActions>
            </Dialog>

            {enderecoSelecionado && (
                <EnderecoEditModal
                    open={modalEnderecoAberto}
                    onClose={() => setModalEnderecoAberto(false)}
                    endereco={enderecoSelecionado}
                    onSave={handleSalvarEndereco}
                />
            )}
        </Container>
    );
}