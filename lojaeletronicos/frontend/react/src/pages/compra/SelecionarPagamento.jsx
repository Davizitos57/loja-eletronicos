import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  Pix as PixIcon,
  Receipt as BoletoIcon,
  CreditCard as CartaoIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';



export default function SelecionarPagamento({ 
  aberto, 
  onFechar, 
  total, 
  onConfirmarPagamento 
}) {
  const [formaPagamento, setFormaPagamento] = useState('');
  const [parcelas, setParcelas] = useState(1);

  const opcoesParcelas = [
    { value: 1, label: '1x de R$ ' + total.toFixed(2), juros: 0 },
    { value: 2, label: '2x de R$ ' + (total / 2).toFixed(2), juros: 0 },
    { value: 3, label: '3x de R$ ' + (total / 3).toFixed(2), juros: 0 },
    { value: 4, label: '4x de R$ ' + (total / 4).toFixed(2), juros: 2.5 },
    { value: 5, label: '5x de R$ ' + (total * 1.05 / 5).toFixed(2), juros: 5 },
    { value: 6, label: '6x de R$ ' + (total * 1.075 / 6).toFixed(2), juros: 7.5 },
    { value: 7, label: '7x de R$ ' + (total * 1.1 / 7).toFixed(2), juros: 10 },
    { value: 8, label: '8x de R$ ' + (total * 1.125 / 8).toFixed(2), juros: 12.5 },
    { value: 9, label: '9x de R$ ' + (total * 1.15 / 9).toFixed(2), juros: 15 },
    { value: 10, label: '10x de R$ ' + (total * 1.175 / 10).toFixed(2), juros: 17.5 }
  ];

  const calcularValorFinal = () => {
    if (formaPagamento === 'cartao' && parcelas > 3) {
      const porcentagemJuros = opcoesParcelas.find(p => p.value === parcelas)?.juros || 0;
      return total * (1 + porcentagemJuros / 100);
    }
    return total;
  };

  const handleConfirmar = () => {
    const dadosPagamento = {
      forma: formaPagamento,
      parcelas: formaPagamento === 'cartao' ? parcelas : 1,
      valorOriginal: total,
      valorFinal: calcularValorFinal(),
      juros: formaPagamento === 'cartao' && parcelas > 3 ? 
        opcoesParcelas.find(p => p.value === parcelas)?.juros || 0 : 0
    };
    
    onConfirmarPagamento(dadosPagamento);
  };

  const isValid = formaPagamento !== '';

  return (
    <Dialog 
      open={aberto} 
      onClose={onFechar}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          boxShadow: 6
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PaymentIcon color="primary" />
          <Typography variant="h5" component="div">
            Forma de Pagamento
          </Typography>
        </Box>
        <IconButton onClick={onFechar} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Escolha como deseja pagar sua compra:
        </Typography>

        <RadioGroup
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          {/* PIX */}
          <Card 
            sx={{ 
              mb: 2, 
              border: formaPagamento === 'pix' ? '2px solid' : '1px solid',
              borderColor: formaPagamento === 'pix' ? 'primary.main' : 'divider',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setFormaPagamento('pix')}
          >
            <CardContent sx={{ py: 2 }}>
              <FormControlLabel
                value="pix"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <PixIcon sx={{ fontSize: 30, color: '#32BCAD' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">PIX</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pagamento instantâneo
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" color="success.main">
                        R$ {total.toFixed(2)}
                      </Typography>
                      <Chip 
                        label="Sem juros" 
                        size="small" 
                        color="success" 
                        variant="outlined" 
                      />
                    </Box>
                  </Box>
                }
                sx={{ margin: 0, width: '100%' }}
              />
            </CardContent>
          </Card>

          {/* Boleto */}
          <Card 
            sx={{ 
              mb: 2, 
              border: formaPagamento === 'boleto' ? '2px solid' : '1px solid',
              borderColor: formaPagamento === 'boleto' ? 'primary.main' : 'divider',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setFormaPagamento('boleto')}
          >
            <CardContent sx={{ py: 2 }}>
              <FormControlLabel
                value="boleto"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <BoletoIcon sx={{ fontSize: 30, color: '#FF6B35' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">Boleto Bancário</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Vencimento em 3 dias úteis
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" color="primary.main">
                        R$ {total.toFixed(2)}
                      </Typography>
                      <Chip 
                        label="Sem juros" 
                        size="small" 
                        color="success" 
                        variant="outlined" 
                      />
                    </Box>
                  </Box>
                }
                sx={{ margin: 0, width: '100%' }}
              />
            </CardContent>
          </Card>

          {/* Cartão de Crédito */}
          <Card 
            sx={{ 
              mb: 2, 
              border: formaPagamento === 'cartao' ? '2px solid' : '1px solid',
              borderColor: formaPagamento === 'cartao' ? 'primary.main' : 'divider',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setFormaPagamento('cartao')}
          >
            <CardContent sx={{ py: 2 }}>
              <FormControlLabel
                value="cartao"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <CartaoIcon sx={{ fontSize: 30, color: '#4CAF50' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">Cartão de Crédito</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Parcelamento em até 10x
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" color="primary.main">
                        R$ {calcularValorFinal().toFixed(2)}
                      </Typography>
                      {parcelas > 3 && (
                        <Chip 
                          label={`+${opcoesParcelas.find(p => p.value === parcelas)?.juros}% juros`}
                          size="small" 
                          color="warning" 
                          variant="outlined" 
                        />
                      )}
                    </Box>
                  </Box>
                }
                sx={{ margin: 0, width: '100%' }}
              />
              
              {/* Opções de parcelamento */}
              {formaPagamento === 'cartao' && (
                <Box sx={{ mt: 2, pl: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel>Número de parcelas</InputLabel>
                    <Select
                      value={parcelas}
                      label="Número de parcelas"
                      onChange={(e) => setParcelas(e.target.value)}
                    >
                      {opcoesParcelas.map((opcao) => (
                        <MenuItem key={opcao.value} value={opcao.value}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span>{opcao.label}</span>
                            {opcao.juros > 0 && (
                              <Chip 
                                label={`+${opcao.juros}%`} 
                                size="small" 
                                color="warning" 
                                variant="outlined"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
            </CardContent>
          </Card>
        </RadioGroup>

        {/* Resumo do pagamento */}
        {formaPagamento && (
          <Card sx={{ bgcolor: 'grey.50', mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumo do Pagamento
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>R$ {total.toFixed(2)}</Typography>
              </Box>
              
              {formaPagamento === 'cartao' && parcelas > 3 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="warning.main">
                    Juros ({opcoesParcelas.find(p => p.value === parcelas)?.juros}%):
                  </Typography>
                  <Typography color="warning.main">
                    R$ {(calcularValorFinal() - total).toFixed(2)}
                  </Typography>
                </Box>
              )}
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary.main">
                  R$ {calcularValorFinal().toFixed(2)}
                </Typography>
              </Box>
              
              {formaPagamento === 'cartao' && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                  {opcoesParcelas.find(p => p.value === parcelas)?.label}
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          onClick={onFechar} 
          variant="outlined"
          size="large"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleConfirmar}
          variant="contained"
          disabled={!isValid}
          size="large"
          sx={{ minWidth: 150 }}
        >
          Confirmar Pagamento
        </Button>
      </DialogActions>
    </Dialog>
  );
}