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
  deletarUm as deleteProduto,
  getUm as getProduto,
} from './produtos';
import PageContainer from '../../pages/cadastro/PageContainer';

export default function ProdutoShow() {
  const { produtoId } = useParams();
  const navigate = useNavigate();

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [produto, setProduto] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const showData = await getProduto(Number(produtoId));

      setProduto(showData);
    } catch (showDataError) {
      setError(showDataError);
    }
    setIsLoading(false);
  }, [produtoId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleProdutoEdit = React.useCallback(() => {
    navigate(`/produto/${produtoId}/edit`);
  }, [navigate, produtoId]);

  const handleProdutoDelete = React.useCallback(async () => {
    if (!produto) {
      return;
    }

    const confirmed = await dialogs.confirm(
      `Deseja excluir ${produto.nome}?`,
      {
        title: `Excluir produto?`,
        severity: 'error',
        okText: 'Excluir',
        cancelText: 'Cancelar',
      },
    );

    if (confirmed) {
      setIsLoading(true);
      try {
        await deleteProduto(Number(produtoId));

        navigate('/produto');

        notifications.show('Produto excluído com sucesso.', {
          severity: 'success',
          autoHideDuration: 3000,
        });
      } catch (deleteError) {
        notifications.show(
          `Falha ao excluir o produto. Motivo:' ${deleteError.message}`,
          {
            severity: 'error',
            autoHideDuration: 3000,
          },
        );
      }
      setIsLoading(false);
    }
  }, [produto, dialogs, produtoId, navigate, notifications]);

  const handleBack = React.useCallback(() => {
    navigate('/produto');
  }, [navigate]);

  const renderShow = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            m: 1,
          }}
        >
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

    return produto ? (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Nome</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {produto.nome}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Descrição</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {produto.descricao}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Preço</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {`R$ ${produto.preco.toFixed(2)}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Quantidade</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {produto.quantidade}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Voltar
          </Button>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleProdutoEdit}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleProdutoDelete}
            >
              Excluir
            </Button>
          </Stack>
        </Stack>
      </Box>
    ) : null;
  }, [
    isLoading,
    error,
    produto,
    handleBack,
    handleProdutoEdit,
    handleProdutoDelete,
  ]);

  const pageTitle = `Produto ${produtoId}`;

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[
        { title: 'Produtos', path: '/produto' },
        { title: pageTitle },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>{renderShow}</Box>
    </PageContainer>
  );
}