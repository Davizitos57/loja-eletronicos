import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormGroup, Grid, Stack, TextField, MenuItem, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router';
import { getCategorias } from './produtos';

function ProdutoForm(props) {
  const {
    formState,
    onFieldChange,
    onSubmit,
    onReset,
    submitButtonLabel,
    backButtonPath,
    onImagemChange, 
  } = props;

  const [categorias, setCategorias] = React.useState([]);
  const [preview, setPreview] = React.useState(null);
  const formValues = formState.values;
  const formErrors = formState.errors;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    async function carregarCategorias() {
      try {
        const listaCategorias = await getCategorias();
        setCategorias(listaCategorias);
      } catch (error) {
        console.error("Falha ao carregar categorias", error);
      }
    }
    carregarCategorias();
  }, []);

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImagemChange(file); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      onImagemChange(null);
      setPreview(null);
    }
  };

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

  const handleTextFieldChange = React.useCallback((event) => {
    onFieldChange(event.target.name, event.target.value);
  }, [onFieldChange]);

  const handleNumberFieldChange = React.useCallback((event) => {
    onFieldChange(event.target.name, Number(event.target.value));
  }, [onFieldChange]);

  const handleReset = React.useCallback(() => {
    if (onReset) onReset(formValues);
  }, [formValues, onReset]);

  const handleBack = React.useCallback(() => {
    navigate(backButtonPath ?? '/produto');
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
          <Grid item xs={12} sm={6}>
            <TextField value={formValues.nome ?? ''} onChange={handleTextFieldChange} name="nome" label="Nome" error={!!formErrors.nome} helperText={formErrors.nome ?? ' '} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select value={formValues.categoria ?? ''} onChange={handleTextFieldChange} name="categoria" label="Categoria" error={!!formErrors.categoria} helperText={formErrors.categoria ?? ' '} fullWidth>
              {categorias.map((option) => (
                <MenuItem key={option.idCategoria} value={option.idCategoria}>
                  {option.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField value={formValues.descricao ?? ''} onChange={handleTextFieldChange} name="descricao" label="Descrição" error={!!formErrors.descricao} helperText={formErrors.descricao ?? ' '} fullWidth multiline />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="number" value={formValues.preco ?? ''} onChange={handleNumberFieldChange} name="preco" label="Preço" error={!!formErrors.preco} helperText={formErrors.preco ?? ' '} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="number" value={formValues.quantidade ?? ''} onChange={handleNumberFieldChange} name="quantidade" label="Quantidade" error={!!formErrors.quantidade} helperText={formErrors.quantidade ?? ' '} fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="overline">Imagem do Produto</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Carregar Imagem
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImagemChange}
              />
            </Button>
            {preview && (
              <Box
                component="img"
                sx={{
                  height: 200,
                  width: 'auto',
                  maxHeight: { xs: 200, md: 180 },
                  maxWidth: { xs: 300, md: 250 },
                  mt: 2,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
                alt="Preview da imagem do produto."
                src={preview}
              />
            )}
          </Grid>
          
        </Grid>
      </FormGroup>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Voltar
        </Button>
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          {submitButtonLabel}
        </Button>
      </Stack>
    </Box>
  );
}

ProdutoForm.propTypes = {
  backButtonPath: PropTypes.string,
  formState: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  onImagemChange: PropTypes.func, 
};

export default ProdutoForm;