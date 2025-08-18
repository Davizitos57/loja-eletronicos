import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

export default function EnderecoForm({ initialValues, onFormChange }) {
    const [formValues, setFormValues] = useState(initialValues);

    useEffect(() => {
        onFormChange(formValues);
    }, [formValues, onFormChange]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <TextField name="rua" label="Rua" value={formValues.rua || ''} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField name="numero" label="Número" type="number" value={formValues.numero || ''} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField name="bairro" label="Bairro" value={formValues.bairro || ''} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField name="complemento" label="Complemento" value={formValues.complemento || ''} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField name="cidade" label="Cidade" value={formValues.cidade || ''} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField name="estado" label="Estado" value={formValues.estado || ''} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField name="cep" label="CEP" value={formValues.cep || ''} onChange={handleChange} fullWidth />
            </Grid>
        </Grid>
    );
}