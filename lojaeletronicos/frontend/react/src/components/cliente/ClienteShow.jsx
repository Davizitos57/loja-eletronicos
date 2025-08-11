import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import { useDialogs } from '../../hooks/cadastro/useDialogs/useDialogs';
import useNotifications from '../../hooks/cadastro/useNotifications/useNotifications';
import {
  deletarUm as deleteCliente,
  getUm as getCliente,
} from './clientes';
import PageContainer from '../../pages/cadastro/PageContainer';

export default function ClienteShow() {
  const { clienteId } = useParams();
  const navigate = useNavigate();

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [cliente, setCliente] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const showData = await getCliente(Number(clienteId));
      setCliente(showData);
    } catch (showDataError) {
      setError(showDataError);
    }
    setIsLoading(false);
  }, [clienteId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleClienteEdit = React.useCallback(() => {
    navigate(`/cliente/${clienteId}/edit`);
  }, [navigate, clienteId]);

  const handleClienteDelete = React.useCallback(async () => {
    if (!cliente) {
      return;
    }

    const confirmed = await dialogs.confirm(
      `Deseja excluir o cliente ${cliente.nome}?`,
      {
        title: `Excluir cliente?`,
        severity: 'error',
        okText: 'Excluir',
        cancelText: 'Cancelar',
      },
    );

    if (confirmed) {
      setIsLoading(true);
      try {
        await deleteCliente(Number(clienteId));
        navigate('/cliente');
        notifications.show('Cliente excluído com sucesso.', {
          severity: 'success',
          autoHideDuration: 3000,
        });
      } catch (deleteError) {
        notifications.show(
          `Falha ao excluir o cliente. Motivo:' ${deleteError.message}`,
          {
            severity: 'error',
            autoHideDuration: 3000,
          },
        );
      }
      setIsLoading(false);
    }
  }, [cliente, dialogs, clienteId, navigate, notifications]);

  const handleBack = React.useCallback(() => {
    navigate('/cliente');
  }, [navigate]);

  const renderShow = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }

    return cliente ? (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Nome</Typography>
              <Typography variant="body1">{cliente.nome}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Email</Typography>
              <Typography variant="body1">{cliente.email}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">CPF</Typography>
              <Typography variant="body1">{cliente.cpf}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Telefone</Typography>
              <Typography variant="body1">{cliente.telefone}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Endereço</Typography>
              <Typography variant="body1">{`${cliente.rua}, ${cliente.numero} - ${cliente.cidade}, ${cliente.estado} - CEP: ${cliente.cep}`}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Voltar
          </Button>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<EditIcon />} onClick={handleClienteEdit}>
              Editar
            </Button>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleClienteDelete}>
              Excluir
            </Button>
          </Stack>
        </Stack>
      </Box>
    ) : null;
  }, [isLoading, error, cliente, handleBack, handleClienteEdit, handleClienteDelete]);

  const pageTitle = `Cliente ${clienteId}`;

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: 'Clientes', path: '/cliente' }, { title: pageTitle }]}
    >
      <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>{renderShow}</Box>
    </PageContainer>
  );
}