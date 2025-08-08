import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../context/AuthContext.jsx';
import { CarrinhoProvider } from '../context/CarrinhoContext.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CarrinhoProvider>
          {children}
        </CarrinhoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}