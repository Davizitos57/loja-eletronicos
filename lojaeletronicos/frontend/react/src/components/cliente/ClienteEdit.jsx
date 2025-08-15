import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import useNotifications from '../../hooks/cadastro/useNotifications/useNotifications';
import {
  getUm as getCliente,
  atualizarUm as updateCliente,
  validar as validateCliente,
} from './clientes';
import ClienteForm from './ClienteForm';
import PageContainer from '../../pages/cadastro/PageContainer';

function ClienteEditForm({ initialValues, onSubmit }) {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  const notifications = useNotifications();

  const [formState, setFormState] = React.useState(() => ({
    values: { ...initialValues, senha: '' },
    errors: {},
  }));

  const handleFormFieldChange = React.useCallback(
    (name, value) => {
      setFormState((previousState) => ({
        ...previousState,
        values: { ...previousState.values, [name]: value },
      }));
    },
    [],
  );

  const handleFormSubmit = React.useCallback(async (formValues) => {
    const { issues } = validateCliente(formValues, true); // isEditing = true
    if (issues.length > 0) {
        const newErrors = issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {});
        setFormState(prevState => ({ ...prevState, errors: newErrors }));
        return;
    }

    try {
      await onSubmit(formValues);
      notifications.show('Cliente editado com sucesso.', {
        severity: 'success',
        autoHideDuration: 3000,
      });
      navigate('/cliente');
    } catch (editError) {
      notifications.show(`Falha ao editar cliente. Razão: ${editError.response?.data?.message || editError.message}`, {
        severity: 'error',
        autoHideDuration: 3000,
      });
    }
  }, [navigate, notifications, onSubmit]);

  return (
    <ClienteForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={() => handleFormSubmit(formState.values)}
      submitButtonLabel="Salvar"
      backButtonPath={`/cliente/${clienteId}`}
      isEditing={true}
    />
  );
}

ClienteEditForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function ClienteEdit() {
  const { clienteId } = useParams();
  const [cliente, setCliente] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const showData = await getCliente(Number(clienteId));
        setCliente(showData);
      } catch (showDataError) {
        setError(showDataError);
      }
      setIsLoading(false);
    }
    loadData();
  }, [clienteId]);

  const handleSubmit = React.useCallback(
    async (formValues) => {
      await updateCliente(Number(clienteId), formValues);
    },
    [clienteId],
  );

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

  return (
    <PageContainer
      title={`Editar Cliente ${clienteId}`}
      breadcrumbs={[
        { title: 'Clientes', path: '/cliente' },
        { title: `Cliente ${clienteId}`, path: `/cliente/${clienteId}` },
        { title: 'Editar' },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>
        {cliente ? <ClienteEditForm initialValues={cliente} onSubmit={handleSubmit} /> : null}
      </Box>
    </PageContainer>
  );
}