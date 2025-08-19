import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

function AdminForm(props) {
  const { formState, onFieldChange, onSubmit, onReset, submitButtonLabel, backButtonPath, isEditing = false } = props;
  const { values: formValues, errors: formErrors } = formState;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(formValues);
      } finally {
        setIsSubmitting(false);
      }
    }, [formValues, onSubmit],
  );

  const handleTextFieldChange = React.useCallback((event) => { onFieldChange(event.target.name, event.target.value); }, [onFieldChange]);
  const handleReset = React.useCallback(() => { if (onReset) { onReset(formValues); } }, [formValues, onReset]);
  const handleBack = React.useCallback(() => { navigate(backButtonPath ?? '/administrador'); }, [navigate, backButtonPath]);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" onReset={handleReset} sx={{ width: '100%' }}>
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid item xs={12}>
            <TextField value={formValues.nome ?? ''} onChange={handleTextFieldChange} name="nome" label="Nome" error={!!formErrors.nome} helperText={formErrors.nome ?? ' '} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={formValues.email ?? ''} onChange={handleTextFieldChange} name="email" label="Email" error={!!formErrors.email} helperText={formErrors.email ?? ' '} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={formValues.cpf ?? ''} onChange={handleTextFieldChange} name="cpf" label="CPF" error={!!formErrors.cpf} helperText={formErrors.cpf ?? ' '} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={formValues.telefone ?? ''} onChange={handleTextFieldChange} name="telefone" label="Telefone" error={!!formErrors.telefone} helperText={formErrors.telefone ?? ' '} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              value={formValues.senha ?? ''} onChange={handleTextFieldChange} name="senha" label="Senha" type="password" error={!!formErrors.senha} helperText={formErrors.senha ?? ' '} fullWidth autoComplete="new-password"
            />
          </Grid>
        </Grid>
      </FormGroup>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>Voltar</Button>
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>{submitButtonLabel}</Button>
      </Stack>
    </Box>
  );
}

AdminForm.propTypes = {
  backButtonPath: PropTypes.string,
  formState: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
};

export default AdminForm;