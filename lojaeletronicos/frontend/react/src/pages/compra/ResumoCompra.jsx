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
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useCarrinho } from '../../context/CarrinhoContext.jsx';
import SelecionarPagamento from './SelecionarPagamento.jsx';

export default function ResumoCompra() {
  const navigate = useNavigate();
  const location = useLocation();
  const { limparCarrinho } = useCarrinho();
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const [pagamentoSucesso, setPagamentoSucesso] = useState(false);
  const [pagamentoAberto, setPagamentoAberto] = useState(false);
  const [dadosPagamento, setDadosPagamento] = useState(null);
  
  // Pega os dados vindos da navegação
  const produtoCompra = location.state?.produto;
  const carrinhoCompra = location.state?.carrinho;
  const totalCompra = location.state?.total;
  
  // Determina se é compra única ou do carrinho
  const isCompraUnica = !!produtoCompra;
  const isCompraCarrinho = !!carrinhoCompra;
  
  // Define os itens para exibir e o total
  let itensCompra = [];
  let total = 0;

  if (isCompraUnica) {
    // Compra direta de um produto
    itensCompra = [produtoCompra];
    const quantidade = produtoCompra.quantidade || produtoCompra.quantidadeSelecionada || 1;
    total = produtoCompra.preco * quantidade;
  } else if (isCompraCarrinho) {
    // Compra do carrinho
    itensCompra = carrinhoCompra;
    total = totalCompra || 0;
  }

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
    
    // Simula processamento do pagamento
    setTimeout(() => {
      setProcessandoPagamento(false);
      setPagamentoSucesso(true);
      
      // Se for compra do carrinho, limpa o carrinho
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

  // Debug - vamos ver o que está chegando
  console.log('Estado do location:', location.state);
  console.log('Produto da compra:', produtoCompra);
  console.log('Carrinho da compra:', carrinhoCompra);
  console.log('Total da compra:', totalCompra);
  console.log('Itens para compra:', itensCompra);
  console.log('É compra única?', isCompraUnica);
  console.log('É compra do carrinho?', isCompraCarrinho);

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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
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

      {/* Lista de itens */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
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
                          {item.marca} • {item.categoria}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantidade: {quantidade}
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

      {/* Resumo financeiro */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Resumo Financeiro
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

      {/* Botão de escolher pagamento */}
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

      {/* Modal de seleção de pagamento */}
      <SelecionarPagamento
        aberto={pagamentoAberto}
        onFechar={fecharSelecaoPagamento}
        total={total}
        onConfirmarPagamento={confirmarPagamento}
      />

      {/* Dialog de processamento */}
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

      {/* Dialog de sucesso */}
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
            <Card sx={{ mt: 2, bgcolor: 'success.50' }}>
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
    </Container>
  );
}