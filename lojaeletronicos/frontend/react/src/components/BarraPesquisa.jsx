import { useState } from 'react';
import { 
    Box, 
    TextField, 
    InputAdornment, 
    IconButton,
    Paper,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function BarraPesquisa({ onPesquisar, placeholder = "Busque por produtos ou categorias..." }) {
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const handlePesquisar = () => {
        if (termoPesquisa.trim()) {
            onPesquisar(termoPesquisa.trim());
        }
    };

    const handleLimpar = () => {
        setTermoPesquisa('');
        onPesquisar('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handlePesquisar();
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 3 }}>
            <Paper
                elevation={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                        borderColor: 'primary.main',
                    },
                    '&:focus-within': {
                        borderColor: 'primary.main',
                        boxShadow: 2,
                    }
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={placeholder}
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.secondary' }} />
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
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiInputBase-input': {
                                py: 1.5,
                                fontSize: '1rem',
                            }
                        }
                    }}
                />
                <IconButton
                    onClick={handlePesquisar}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 0,
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        }
                    }}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                    opacity: 0.7,
                    mt: 1,
                    fontSize: '0.75rem'
                }}
            >
            </Typography>
        </Box>
    );
}