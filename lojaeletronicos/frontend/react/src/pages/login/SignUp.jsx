import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { criarUm as createCliente } from '../../components/cliente/clientes';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: '800px',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('md')]: {
    width: '500px',
  },
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100dvh',
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
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
    const navigate = useNavigate();
    const [formValues, setFormValues] = React.useState({
        nome: '', email: '', cpf: '', telefone: '', senha: '',
        cep: '', estado: '', cidade: '', /*bairro: '',*/ rua: '', numero: '', /*complemento: ''*/
    });
    const [errors, setErrors] = React.useState({});
    const [apiError, setApiError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!formValues.nome) newErrors.nome = 'Nome é obrigatório.';
        if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = 'Digite um e-mail válido.';
        //if (!validarCPF(formValues.cpf)) newErrors.cpf = 'CPF inválido.';
        if (!formValues.cpf) newErrors.cpf = 'CPF é obrigatório.';
        if (!formValues.telefone) newErrors.telefone = 'Telefone é obrigatório.';
        if (!formValues.senha || formValues.senha.length < 4) newErrors.senha = 'A senha deve ter ao menos 4 caracteres.';
        if (!formValues.cep) newErrors.cep = 'CEP é obrigatório.';
        if (!formValues.estado) newErrors.estado = 'Estado é obrigatório.';
        if (!formValues.cidade) newErrors.cidade = 'Cidade é obrigatória.';
        //if (!formValues.bairro) newErrors.bairro = 'Bairro é obrigatório.';
        if (!formValues.rua) newErrors.rua = 'Rua é obrigatória.';
        if (!formValues.numero) newErrors.numero = 'Número é obrigatório.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setApiError('');
        if (!validateInputs()) {
            console.log("Validação falhou.");
            return;
        }

        setIsSubmitting(true);
        try {
            await createCliente(formValues);
            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
            navigate('/');
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            const errorMessage = error.response?.data?.message || 'Falha ao realizar o cadastro. Tente novamente.';
            setApiError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="center">
            <Card variant="outlined">
                <Typography component="h1" variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
                    Inscreva-se
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
                    <Grid container spacing={3}>
    {/* Coluna da Esquerda: Dados Pessoais e Contato */}
    <Grid item xs={12} md={6}>
        <Stack spacing={2.5}>
            {/* --- Dados Pessoais e Contato --- */}
            <Box>
                <Typography variant="h6" gutterBottom>Dados Pessoais e Contato</Typography>
                <FormControl fullWidth>
                    <FormLabel htmlFor="nome">Nome completo</FormLabel>
                    <TextField id="nome" name="nome" value={formValues.nome} onChange={handleInputChange} required fullWidth placeholder="Seu nome completo" error={!!errors.nome} helperText={errors.nome} />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <FormLabel htmlFor="cpf">CPF</FormLabel>
                    <TextField id="cpf" name="cpf" value={formValues.cpf} onChange={handleInputChange} required fullWidth placeholder="000.000.000-00" error={!!errors.cpf} helperText={errors.cpf} />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField id="email" name="email" value={formValues.email} onChange={handleInputChange} required fullWidth placeholder="seu@email.com" autoComplete="email" error={!!errors.email} helperText={errors.email} />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <FormLabel htmlFor="telefone">Telefone</FormLabel>
                    <TextField id="telefone" name="telefone" value={formValues.telefone} onChange={handleInputChange} required fullWidth placeholder="(00) 00000-0000" type="tel" error={!!errors.telefone} helperText={errors.telefone} />
                </FormControl>
            </Box>
        </Stack>
    </Grid>

    {/* Coluna da Direita: Endereço */}
    <Grid item xs={12} md={6}>
        <Stack spacing={2}>
             {/* --- Endereço --- */}
             <Box>
                <Typography variant="h6" gutterBottom>Endereço</Typography>
                <TextField id="cep" name="cep" value={formValues.cep} onChange={handleInputChange} required fullWidth placeholder="Seu CEP" error={!!errors.cep} helperText={errors.cep} sx={{ mb: 2 }} />
                <TextField id="estado" name="estado" value={formValues.estado} onChange={handleInputChange} required fullWidth placeholder="Seu estado" error={!!errors.estado} helperText={errors.estado} sx={{ mb: 2 }} />
                <TextField id="cidade" name="cidade" value={formValues.cidade} onChange={handleInputChange} required fullWidth placeholder="Sua cidade" error={!!errors.cidade} helperText={errors.cidade} sx={{ mb: 2 }} />
                {/*<TextField id="bairro" name="bairro" value={formValues.bairro} onChange={handleInputChange} required fullWidth placeholder="Seu bairro" error={!!errors.bairro} helperText={errors.bairro} />*/}
                <TextField id="rua" name="rua" value={formValues.rua} onChange={handleInputChange} required fullWidth placeholder="Sua rua" error={!!errors.rua} helperText={errors.rua} sx={{ mb: 2 }} />
                <TextField id="numero" name="numero" value={formValues.numero} onChange={handleInputChange} required fullWidth placeholder="Número" type="text" error={!!errors.numero} helperText={errors.numero} />
                {/*<TextField id="complemento" name="complemento" value={formValues.complemento} onChange={handleInputChange} fullWidth placeholder="Complemento (opcional)" />*/}
             </Box>
        </Stack>
    </Grid>
    
    {/* Linha Completa: Segurança */}
    <Grid item xs={12}>
        <Divider sx={{ my: 1 }}><Typography variant="overline">Segurança</Typography></Divider>
        <FormControl fullWidth>
            <FormLabel htmlFor="senha">Crie sua Senha</FormLabel>
            <TextField id="senha" name="senha" value={formValues.senha} onChange={handleInputChange} required fullWidth placeholder="••••••" type="password" autoComplete="new-password" error={!!errors.senha} helperText={errors.senha} />
        </FormControl>
    </Grid>
</Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
                    </Button>
                </Box>
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
                </Divider>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Typography>
                        Já tem uma conta?{' '}
                        <Link component={RouterLink} to="/" variant="body2">
                            Entre
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer>
      </AppTheme>
    );
}