import { Box, Typography, Divider } from '@mui/material';

export default function ProdutoDescricao({ produto }) {
    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                📝 Descrição do Produto
            </Typography>
            <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                    mb: 3,
                    lineHeight: 1.8,
                    textAlign: 'justify',
                    fontSize: '1.1rem'
                }}
            >
                {produto.descricao || `${produto.nome} com excelente qualidade e garantia. Produto ideal para suas necessidades tecnológicas com as melhores especificações do mercado.`}
            </Typography>
            <Divider sx={{ my: 3, borderWidth: 2 }} />
        </Box>
    );
}