import { Card, CardContent, Typography, Box } from '@mui/material';

export default function MetricCard({ 
    titulo, 
    valor, 
    icone, 
    cor, 
    subtitulo, 
    onClick,
    formato = 'text' 
}) {
    const formatarValor = (val) => {
        switch (formato) {
            case 'currency':
                return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            case 'number':
                return val.toLocaleString('pt-BR');
            default:
                return val;
        }
    };

    return (
        <Card 
            sx={{ 
                height: '100%',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': onClick ? {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                } : {}
            }}
            onClick={onClick}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: cor, mr: 2 }}>
                        {icone}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                        {titulo}
                    </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: cor, mb: 1 }}>
                    {formatarValor(valor)}
                </Typography>
                {subtitulo && (
                    <Typography variant="body2" color="text.secondary">
                        {subtitulo}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}