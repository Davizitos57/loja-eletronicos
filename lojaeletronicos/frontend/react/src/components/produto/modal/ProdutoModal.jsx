import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    IconButton,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Componentes modulares
import ProdutoImagem from './ProdutoImagem.jsx';
import ProdutoInfo from './ProdutoInfo';
import ProdutoDescricao from './ProdutoDescricao';
import ProdutoAcoes from './ProdutoAcoes';
import ProdutoQuantidade from './ProdutoQuantidade';
import { useEstoque } from '../../../hooks/useEstoque';

export default function ProdutoModal({
    produto,
    aberto,
    onFechar,
    onAdicionarCarrinho,
    onComprar
}) {
    const [quantidade, setQuantidade] = useState(1);
    const {
        reservarQuantidade,
        liberarReserva,
        confirmarCompra,
        obterEstoqueDisponivel
    } = useEstoque();

    if (!produto) return null;

    const estoqueDisponivel = obterEstoqueDisponivel(produto);

    const handleFechar = () => {
        // Liberar qualquer reserva ao fechar modal
        liberarReserva(produto.id);
        setQuantidade(1);
        onFechar();
    };

    const handleAdicionarCarrinho = () => {
        // Reservar quantidade ao adicionar no carrinho
        reservarQuantidade(produto.id, quantidade);

        // Passar produto com quantidade para o carrinho
        const produtoComQuantidade = {
            ...produto,
            quantidadeSelecionada: quantidade
        };

        onAdicionarCarrinho(produtoComQuantidade);

        // Não fechar modal, permitir adicionar mais
    };

    const handleComprar = () => {
        // Confirmar compra (finaliza reserva)
        confirmarCompra(produto.id);

        // Criar objeto de compra com quantidade selecionada
        const produtoParaCompra = {
            ...produto,
            quantidade: quantidade,
            quantidadeSelecionada: quantidade
        };

        // Chamar função de compra do componente pai
        onComprar(produtoParaCompra);
        setQuantidade(1);
        onFechar();
    };

    const handleQuantidadeChange = (novaQuantidade) => {
        setQuantidade(novaQuantidade);
        // Atualizar reserva em tempo real
        if (novaQuantidade > 0) {
            reservarQuantidade(produto.id, novaQuantidade);
        }
    };

    return (
        <Dialog
            open={aberto}
            onClose={handleFechar}
            maxWidth="xl"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    boxShadow: 6,
                    maxHeight: '95vh',
                    height: '85vh',
                    width: '90vw',
                    maxWidth: '1400px',
                    overflow: 'hidden'
                }
            }}
        >
            {/* Botão de fechar */}
            <IconButton
                onClick={handleFechar}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    zIndex: 10,
                    bgcolor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'rgba(0,0,0,1)',
                        transform: 'scale(1.1)'
                    }
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: 0, height: 'calc(100% - 80px)', overflow: 'hidden' }}>
                <Box sx={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'row'
                }}>
                    {/* Coluna da imagem */}
                    <ProdutoImagem produto={produto} />

                    {/* Coluna das informações com scroll */}
                    <Box sx={{
                        width: '60%',
                        height: '100%',
                        overflow: 'auto',
                        p: 3,
                        bgcolor: '#ffffff',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#1976d2',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#1565c0',
                        },
                    }}>
                        {/* Informações básicas */}
                        <ProdutoInfo produto={produto} />

                        <Divider sx={{ my: 3, borderWidth: 2 }} />

                        {/* Seletor de quantidade */}
                        <ProdutoQuantidade
                            produto={produto}
                            quantidade={quantidade}
                            onQuantidadeChange={handleQuantidadeChange}
                            estoqueDisponivel={estoqueDisponivel}
                        />

                        <Divider sx={{ my: 3, borderWidth: 2 }} />

                        {/* Descrição */}
                        <ProdutoDescricao produto={produto} />

                        {/* Espaço extra para scroll */}
                        <Box sx={{ height: 20 }} />
                    </Box>
                </Box>
            </DialogContent>

            {/* Ações do modal */}
            <ProdutoAcoes
                onAdicionarCarrinho={handleAdicionarCarrinho}
                onComprar={handleComprar}
                quantidade={quantidade}
                valorTotal={produto.preco * quantidade}
                estoqueDisponivel={estoqueDisponivel}
            />
        </Dialog>
    );
}