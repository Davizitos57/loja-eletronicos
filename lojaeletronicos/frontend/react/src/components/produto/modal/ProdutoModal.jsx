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
// import ProdutoEspecificacoes from 'ProdutoEspecificacoes';
import ProdutoAcoes from './ProdutoAcoes';

export default function ProdutoModal({
    produto,
    aberto,
    onFechar,
    onAdicionarCarrinho,
    onComprar
}) {
    if (!produto) return null;

    const handleAdicionarCarrinho = () => {
        onAdicionarCarrinho(produto);
    };

    const handleComprar = () => {
        onComprar(produto);
        onFechar();
    };

    return (
        <Dialog
            open={aberto}
            onClose={onFechar}
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
                onClick={onFechar}
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
                {/* Layout Flexbox lado a lado */}
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
       
                        },
                    }}>
                        {/* Informações básicas */}
                        <ProdutoInfo produto={produto} />

                        <Divider sx={{ my: 3, borderWidth: 2 }} />

                        {/* Descrição */}
                        <ProdutoDescricao produto={produto} />

                        {/* Especificações */}
                        {/* <ProdutoEspecificacoes especificacoes={produto.especificacoes} /> */}

                        {/* Espaço extra para scroll */}
                        <Box sx={{ height: 20 }} />
                    </Box>
                </Box>
            </DialogContent>

            {/* Ações do modal */}
            <ProdutoAcoes
                onAdicionarCarrinho={handleAdicionarCarrinho}
                onComprar={handleComprar}
            />
        </Dialog>
    );
}