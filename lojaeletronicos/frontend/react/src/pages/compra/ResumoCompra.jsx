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
import { useCarrinho } from '../../context/CarrinhoContext.jsx';

export default function ResumoCompra() {
  const navigate = useNavigate();
  const location = useLocation();
  const { limparCarrinho } = useCarrinho();
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const [pagamentoSucesso, setPagamentoSucesso] = useState(false);
  
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

  const processarPagamento = async () => {
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
    navigate('/home');
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

      {/* Botão de pagamento */}
      <Button
        variant="contained"
        size="large"
        fullWidth
        startIcon={<PaymentIcon />}
        onClick={processarPagamento}
        disabled={processandoPagamento}
        sx={{ py: 2 }}
      >
        {processandoPagamento ? 'Processando...' : 'Efetuar Pagamento'}
      </Button>

      {/* Dialog de processamento */}
      <Dialog open={processandoPagamento}>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6">
            Processando pagamento...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aguarde enquanto processamos sua compra
          </Typography>
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
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            Total pago: R$ {total.toFixed(2)}
          </Typography>
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