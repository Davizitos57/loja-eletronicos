import { 
    Drawer, 
    Box, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    Checkbox,
    Button,
    Divider,
    IconButton,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

export default function FiltroDrawer({ 
    aberto, 
    onFechar, 
    categorias, 
    categoriasSelecionadas, 
    onToggleCategoria,
    onAplicarFiltro,
    onLimparFiltros
}) {
    const handleToggleCategoria = (categoriaId) => {
        const novaSelecao = categoriasSelecionadas.includes(categoriaId)
            ? categoriasSelecionadas.filter(id => id !== categoriaId)
            : [...categoriasSelecionadas, categoriaId];
        
        onToggleCategoria(novaSelecao);
    };

    const handleAplicarFiltro = () => {
        onAplicarFiltro(categoriasSelecionadas);
        onFechar();
    };

    const handleLimparFiltros = () => {
        onLimparFiltros();
        onFechar();
    };

    return (
        <Drawer
            anchor="left"
            open={aberto}
            onClose={onFechar}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 320,
                    boxSizing: 'border-box',
                }
            }}
        >
            <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon color="primary" />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Filtrar Categorias
                        </Typography>
                    </Box>
                    <IconButton onClick={onFechar} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Chips de categorias selecionadas */}
                {categoriasSelecionadas.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.primary" gutterBottom>
                            Categorias selecionadas:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {categoriasSelecionadas.map(categoriaId => {
                                const categoria = categorias.find(cat => cat.id === categoriaId);
                                return (
                                    <Chip
                                        key={categoriaId}
                                        label={categoria?.nome}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        onDelete={() => handleToggleCategoria(categoriaId)}
                                    />
                                );
                            })}
                        </Box>
                    </Box>
                )}

                <Divider sx={{ mb: 2 }} />

                {/* Lista de categorias */}
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Selecione as categorias que deseja visualizar:
                    </Typography>
                    
                    <List sx={{ py: 0 }}>
                        {categorias.map((categoria) => (
                            <ListItem 
                                key={categoria.id} 
                                sx={{ 
                                    px: 0,
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                        borderRadius: 1
                                    }
                                }}
                            >
                                <Checkbox
                                    checked={categoriasSelecionadas.includes(categoria.id)}
                                    onChange={() => handleToggleCategoria(categoria.id)}
                                    color="secondary"
                                />
                                <ListItemText 
                                    primary={categoria.nome}
                                    secondary={`${categoria.produtos.length} produtos`}
                                    sx={{ ml: 1 }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Botões de ação */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAplicarFiltro}
                        disabled={categoriasSelecionadas.length === 0}
                        sx={{ py: 1.5 }}
                    >
                        Aplicar Filtro ({categoriasSelecionadas.length})
                    </Button>
                    
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleLimparFiltros}
                        startIcon={<ClearIcon />}
                        sx={{ py: 1.5 }}
                    >
                        Limpar Filtros
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}