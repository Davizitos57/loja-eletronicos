import { Box, Chip } from '@mui/material';
import api from '../../../services/api';

export default function ProdutoImagem({ produto }) {

    const isUploadedImage = produto.imagem && produto.imagem.startsWith('/uploads/');
    
    const imageUrl = isUploadedImage
        ? `${api.defaults.baseURL}${produto.imagem}` 
        : produto.imagem || `https://picsum.photos/800/600?random=${produto.id}`; 

    return (
        <Box
            sx={{
                width: '40%',
                minWidth: '400px',
                height: '100%',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                p: 2
            }}
        >
            {/* Badge da categoria no topo */}
            <Box sx={{ alignSelf: 'flex-start' }}>
                <Chip
                    label={produto.categoria || 'Eletrônicos'}
                    size="medium"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        backdropFilter: 'blur(5px)'
                    }}
                />
            </Box>
        </Box>
    );
}