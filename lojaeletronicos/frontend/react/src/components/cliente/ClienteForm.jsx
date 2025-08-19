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

function ClienteForm(props) {
  const {
    formState,
    onFieldChange,
    onSubmit,
    onReset,
    submitButtonLabel,
    backButtonPath,
    isEditing = false,
  } = props;

  const formValues = formState.values;
  const formErrors = formState.errors;

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
    },
    [formValues, onSubmit],
  );

  const handleTextFieldChange = React.useCallback(
    (event) => {
      onFieldChange(event.target.name, event.target.value);
    },
    [onFieldChange],
  );
  
  const handleNumberFieldChange = React.useCallback(
    (event) => {
      onFieldChange(event.target.name, Number(event.target.value));
    },
    [onFieldChange],
  );

  const handleReset = React.useCallback(() => {
    if (onReset) {
      onReset(formValues);
    }
  }, [formValues, onReset]);

  const handleBack = React.useCallback(() => {
    navigate(backButtonPath ?? '/cliente');
  }, [navigate, backButtonPath]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      onReset={handleReset}
      sx={{ width: '100%' }}
    >
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid item xs={12}>
            <TextField
              value={formValues.nome ?? ''}
              onChange={handleTextFieldChange}
              name="nome"
              label="Nome"
              error={!!formErrors.nome}
              helperText={formErrors.nome ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.email ?? ''}
              onChange={handleTextFieldChange}
              name="email"
              label="Email"
              error={!!formErrors.email}
              helperText={formErrors.email ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.cpf ?? ''}
              onChange={handleTextFieldChange}
              name="cpf"
              label="CPF"
              error={!!formErrors.cpf}
              helperText={formErrors.cpf ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.telefone ?? ''}
              onChange={handleTextFieldChange}
              name="telefone"
              label="Telefone"
              error={!!formErrors.telefone}
              helperText={formErrors.telefone ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.senha ?? ''}
              onChange={handleTextFieldChange}
              name="senha"
              label="Senha"
              type="password"
              error={!!formErrors.senha}
              helperText={formErrors.senha ?? ' '}
              fullWidth
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.cep ?? ''}
              onChange={handleTextFieldChange}
              name="cep"
              label="CEP"
              error={!!formErrors.cep}
              helperText={formErrors.cep ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.rua ?? ''}
              onChange={handleTextFieldChange}
              name="rua"
              label="Rua"
              error={!!formErrors.rua}
              helperText={formErrors.rua ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.bairro ?? ''}
              onChange={handleTextFieldChange}
              name="bairro"
              label="Bairro"
              error={!!formErrors.bairro}
              helperText={formErrors.bairro ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formValues.complemento ?? ''}
              onChange={handleTextFieldChange}
              name="complemento"
              label="Complemento"
              error={!!formErrors.complemento}
              helperText={formErrors.complemento ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              type="number"
              value={formValues.numero ?? ''}
              onChange={handleNumberFieldChange}
              name="numero"
              label="Número"
              error={!!formErrors.numero}
              helperText={formErrors.numero ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={formValues.cidade ?? ''}
              onChange={handleTextFieldChange}
              name="cidade"
              label="Cidade"
              error={!!formErrors.cidade}
              helperText={formErrors.cidade ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={formValues.estado ?? ''}
              onChange={handleTextFieldChange}
              name="estado"
              label="Estado"
              error={!!formErrors.estado}
              helperText={formErrors.estado ?? ' '}
              fullWidth
            />
          </Grid>
        </Grid>
      </FormGroup>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {submitButtonLabel}
        </Button>
      </Stack>
    </Box>
  );
}

ClienteForm.propTypes = {
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

export default ClienteForm;