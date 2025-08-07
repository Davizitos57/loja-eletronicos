import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import {validarCPF} from '../login/functionLogin';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('md')]: {
    width: '500px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [cpfError, setCpfError] = React.useState(false);
  const [cpfErrorMessage, setCpfErrorMessage] = React.useState('');
  const [enderecoError, setEnderecoError] = React.useState(false);
  const [enderecoErrorMessage, setEnderecoErrorMessage] = React.useState('');
  const [telefoneError, setTelefoneError] = React.useState(false);
  const [telefoneErrorMessage, setTelefoneErrorMessage] = React.useState('');
  const [numeroError, setNumeroError] = React.useState(true);
  const [numeroErrorMessage, setNumeroErrorMessage] = React.useState('');

  const validateInputs = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const password = document.getElementById('password').value;
    const cep = document.getElementById('cep').value;
    const estado = document.getElementById('estado').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;

    let isValid = true;

    if (!name) {
      setNameError(true);
      setNameErrorMessage('Nome é requerido.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Digite um endereço de email válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!validarCPF(cpf)) {
      setCpfError(true);
      setCpfErrorMessage('CPF inválido.');
      isValid = false;
    } else {
      setCpfError(false);
      setCpfErrorMessage('');
    }
    
    if (!telefone) {
      setTelefoneError(true);
      setTelefoneErrorMessage('Digite um telefone válido.');
      isValid = false;
    } else {
      setTelefoneError(false);
      setTelefoneErrorMessage('');
    }
    
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('A senha deve ter ao menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!cep || !estado || !cidade || !bairro || !rua || !numero) {
        setEnderecoError(true);
        setEnderecoErrorMessage('Todos os campos de endereço são obrigatórios.');
        isValid = false;
    } else {
        setEnderecoError(false);
        setEnderecoErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      console.log("Validação falhou. Formulário não enviado.");
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      cpf: data.get('cpf'),
    });
    
    alert('Formulário enviado com sucesso!');
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Inscreva-se
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="name">Nome completo</FormLabel>
                  <TextField id="name" name="name" required fullWidth placeholder="Seu nome" error={nameError} helperText={nameErrorMessage} />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField id="email" name="email" required fullWidth placeholder="seu@email.com" autoComplete="email" error={emailError} helperText={emailErrorMessage} />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <TextField id="cpf" name="cpf" required fullWidth placeholder="000.000.000-00" error={cpfError} helperText={cpfErrorMessage} />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="telefone">Telefone</FormLabel>
                  <TextField id="telefone" name="telefone" required fullWidth placeholder="(00) 00000-0000" type="tel" error={telefoneError} helperText={telefoneErrorMessage} />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <TextField id="password" name="password" required fullWidth placeholder="••••••" type="password" autoComplete="new-password" error={passwordError} helperText={passwordErrorMessage} />
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <FormLabel>Endereço</FormLabel>
                <TextField id="cep" name="cep" required fullWidth placeholder="Seu CEP" error={enderecoError} helperText={enderecoErrorMessage} />
                <TextField id="estado" name="estado" required fullWidth placeholder="Seu estado" error={enderecoError} />
                <TextField id="cidade" name="cidade" required fullWidth placeholder="Sua cidade" error={enderecoError} />
                <TextField id="bairro" name="bairro" required fullWidth placeholder="Seu bairro" error={enderecoError} />
                <TextField id="rua" name="rua" required fullWidth placeholder="Sua rua" error={enderecoError} />
                <TextField id="numero" name="numero" required fullWidth placeholder="Número" type="text" error={numeroError} helperText={numeroErrorMessage} />
                <TextField id="complemento" name="complemento" fullWidth placeholder="Complemento (opcional)" />
              </Stack>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Inscrever
          </Button>
        </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Já tem uma conta?{' '}
              <Link
                component={RouterLink}
                to="/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Entre
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}