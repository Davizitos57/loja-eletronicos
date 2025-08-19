import { Box, Typography, IconButton, TextField, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WarningIcon from '@mui/icons-material/Warning';

export default function ProdutoQuantidade({
    produto,
    quantidade,
    onQuantidadeChange,
    estoqueDisponivel
}) {

    const handleIncrement = () => {
        // Permite incrementar até incluir o limite do estoque disponível
        if (quantidade <= produto.quantidadeEstoque - 1) {
            onQuantidadeChange(quantidade + 1);
        }
    };

    const handleDecrement = () => {
        if (quantidade > 1) {
            onQuantidadeChange(quantidade - 1);
        }
    };

    const handleInputChange = (event) => {
        const valor = parseInt(event.target.value) || 1;
        // Limita o valor entre 1 e o total em estoque
        const valorLimitado = Math.min(Math.max(valor, 1), produto.quantidadeEstoque);
        onQuantidadeChange(valorLimitado);
    };

    const valorTotal = (produto.preco * quantidade).toFixed(2);

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                🛒 Selecionar Quantidade
            </Typography>

            {/* Controles de quantidade */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px solid'
            }}>
                <IconButton
                    onClick={handleDecrement}
                    disabled={quantidade <= 1}
                    sx={{
                        bgcolor: quantidade <= 1 ? '#e0e0e0' : 'primary.main',
                        color: quantidade <= 1 ? '#757575' : 'white',
                        '&:hover': {
                            bgcolor: quantidade <= 1 ? '#e0e0e0' : 'primary.dark'
                        }
                    }}
                >
                    <RemoveIcon />
                </IconButton>

                <TextField
                    value={quantidade}
                    onChange={handleInputChange}
                    type="number"
                    inputProps={{
                        min: 1,
                        max: produto.quantidadeEstoque,
                        style: { textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }
                    }}
                    sx={{
                        width: '80px',
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.default'
                        }
                    }}
                />

                <IconButton
                    onClick={handleIncrement}
                    disabled={quantidade > produto.quantidadeEstoque}
                    sx={{
                        bgcolor: quantidade > produto.quantidadeEstoque ? '#e0e0e0' : 'primary.main',
                        color: quantidade > produto.quantidadeEstoque ? '#757575' : 'white',
                        '&:hover': {
                            bgcolor: quantidade > produto.quantidadeEstoque ? '#e0e0e0' : 'primary.dark'
                        }
                    }}
                >
                    <AddIcon />
                </IconButton>

                <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Disponível: {produto.quantidadeEstoque}
                    </Typography>
                    {produto.quantidadeEstoque <= 5 && (
                        <Chip
                            icon={<WarningIcon />}
                            label="Estoque baixo!"
                            color="warning"
                            size="small"
                            sx={{ mt: 0.5 }}
                        />
                    )}
                </Box>
            </Box>

            {/* Valor total */}
            <Box sx={{
                p: 2,
                bgcolor: 'success.light',
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'success.main'
            }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                    💰 Total: R$ {valorTotal}
                </Typography>
                <Typography variant="body2" color="success.dark">
                    {quantidade} x R$ {produto.preco?.toFixed(2)} = R$ {valorTotal}
                </Typography>
            </Box>
        </Box>
    );
}