import { Box, Typography, Container } from '@mui/material';

export default function Header() {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                py: 8,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=400&fit=crop&opacity=0.1)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.1,
                }
            }}
        >
            <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <Box
                    component="img"
                    src="/images/logo-tecnofacil.jpg"
                    alt="TecnoFácil Logo"
                    sx={{
                        height: { xs: '80px', md: '250px' }, 
                        width: '700px', 
                        maxWidth: '300px',
                        margin: '0 auto 2rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))', 
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)' 
                        }
                    }}
                />

                <Typography
                    variant="h2"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 2,
                        fontSize: { xs: '2rem', md: '3rem' }, 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                >
                    TecnoFácil
                </Typography>
                
                <Typography
                    variant="h5"
                    sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: { xs: '1rem', md: '1.5rem' }, 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                >
                    Sua loja on-line de eletrônicos com as melhores ofertas!
                </Typography>
            </Container>
        </Box>
    );
}