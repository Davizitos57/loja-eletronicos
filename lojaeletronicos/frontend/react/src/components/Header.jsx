import { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    TextField,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

export default function Header({ onPesquisar }) {
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const navigate = useNavigate();
    const { usuario, isLoggedIn } = useAuth();

    const handlePesquisar = () => {
        if (termoPesquisa.trim() && onPesquisar) {
            onPesquisar(termoPesquisa.trim());
        }
    };

    const handleLimpar = () => {
        setTermoPesquisa('');
        if (onPesquisar) {
            onPesquisar('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handlePesquisar();
        }
    };

    return (
        <Box
            sx={{
                background: '#3392ffff',
                py: 8,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>

                {/* Barra de pesquisa */}
                <Box sx={{ mb: 11, mt: -5 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 10,
                            overflow: 'hidden',
                            height: 47,
                            maxWidth: 800,
                            mx: 'auto',
                            backgroundColor: 'white',
                            border: '2px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                 backgroundColor: '#f5f5f5',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                transform: 'translateY(-2px)',
                                boxShadow: 4,
                            },
                            '&:focus-within': {
                                backgroundColor: 'white',
                                borderColor: 'primary.main',
                                boxShadow: 4,
                            }
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Busque por produtos ou categorias..."
                            value={termoPesquisa}
                            onChange={(e) => setTermoPesquisa(e.target.value)}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: termoPesquisa && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleLimpar}
                                            edge="end"
                                            size="small"
                                            sx={{ mr: 1 }}
                                        >
                                            <ClearIcon sx={{ fontSize: '1rem' }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    height: '100%',
                                    bgcolor: 'transparent',
                                    color: 'black',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'grey.600',
                                        opacity: 1,
                                    },
                                }
                            }}
                        />
                        <IconButton
                            onClick={handlePesquisar}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                px: 4,
                                py: 5,
                                minWidth: 70,
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: '1.5rem'
                                }
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>

                </Box>

                {/* Logo */}
                <Box
                    component="img"
                    src="/images/logos/logoT.png"
                    alt="TecnoFácil Logo"
                    sx={{
                        height: { xs: '80px', md: '250px' },
                        width: '700px',
                        maxWidth: '700px',
                        margin: '0 auto 2rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                />

                {/* Título */}
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
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: { xs: '1rem', md: '1.5rem' },
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                >
                </Typography>
            </Container>
        </Box>
    );
}