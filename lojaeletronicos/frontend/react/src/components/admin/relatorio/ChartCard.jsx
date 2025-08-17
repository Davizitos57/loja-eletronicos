import { Card, CardContent, Typography, Box } from '@mui/material';

export default function ChartCard({ titulo, icone, cor, children }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ color: cor, mr: 2 }}>
                        {icone}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {titulo}
                    </Typography>
                </Box>
                {children}
            </CardContent>
        </Card>
    );
}