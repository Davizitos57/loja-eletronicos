import { 
    Card, 
    CardContent, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Box,
    Chip
} from '@mui/material';

export default function TableCard({ titulo, dados, colunas, icone, cor }) {
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

                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {colunas.map((coluna, index) => (
                                    <TableCell 
                                        key={index}
                                        sx={{ 
                                            fontWeight: 'bold',
                                            bgcolor: 'grey.50'
                                        }}
                                    >
                                        {coluna.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dados.map((linha, index) => (
                                <TableRow key={index} hover>
                                    {colunas.map((coluna, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {coluna.render 
                                                ? coluna.render(linha[coluna.field], linha)
                                                : linha[coluna.field]
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}