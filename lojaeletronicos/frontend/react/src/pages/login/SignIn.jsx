import * as React from 'react';
import ColorModeSelect from '../../shared-theme/ColorModeSelect.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../../components/login/ForgotPassword.jsx';
import AppTheme from '../../shared-theme/AppTheme.jsx';
import { Link as RouterLink } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '400px',
  padding: theme.spacing(5),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '500px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      setError('Email e senha são obrigatórios.');
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error || 'Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
        <Link 
        component={RouterLink} 
        to="/home" 
        variant="body2" 
        sx={{ fontSize: '40px', 
        mr: 4 }}>
          Home
        </Link>
        <Link 
        component={RouterLink} 
        to="/produto" 
        variant="body2" 
        sx={{ fontSize: '40px' }}>
          Cadastro de Produtos
        </Link>
      </Box>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography 
          component="h1" 
          variant="h4" 
          sx={{ width: '100%', 
          fontSize: 'clamp(2rem, 10vw, 2.15rem)', 
          display: 'flex', 
          justifyContent: 'center' }}>
            Entre
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', ap: 2 }}>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField 
              id="email" 
              type="email" 
              name="email" 
              placeholder="seu@email.com" 
              autoComplete="email" 
              autoFocus required fullWidth />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <TextField 
              name="password"
              placeholder="••••••" 
              type="password"
              id="password" 
              autoComplete="current-password" 
              required fullWidth />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lembre-se" />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button 
            type="submit" 
            fullWidth 
            variant="contained">
              Entrar
            </Button>
            <Link 
            component="button" 
            type="button" 
            onClick={handleClickOpen} 
            variant="body2" 
            sx={{ alignSelf: 'center' }}>
              Esqueceu sua senha?
            </Link>
          </Box>
          <Divider>ou</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Não tem uma conta?{' '}
              <Link 
              component={RouterLink} 
              to="/signup" 
              variant="body2" 
              sx={{ alignSelf: 'center' }}>
                Inscreva-se
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}