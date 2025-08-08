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
    values: initialValues,
    errors: {},
  }));
  const formValues = formState.values;
  const formErrors = formState.errors;

  const setFormValues = React.useCallback((newFormValues) => {
    setFormState((previousState) => ({
      ...previousState,
      values: newFormValues,
    }));
  }, []);

  const setFormErrors = React.useCallback((newFormErrors) => {
    setFormState((previousState) => ({
      ...previousState,
      errors: newFormErrors,
    }));
  }, []);

  const handleFormFieldChange = React.useCallback(
    (name, value) => {
      const validateField = async (values) => {
        const { issues } = validateCliente(values);
        setFormErrors({
          ...formErrors,
          [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
        });
      };

      const newFormValues = { ...formValues, [name]: value };
      setFormValues(newFormValues);
      validateField(newFormValues);
    },
    [formValues, formErrors, setFormErrors, setFormValues],
  );

  const handleFormReset = React.useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues, setFormValues]);

  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateCliente(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(
        Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
      );
      return;
    }
    setFormErrors({});

    try {
      await onSubmit(formValues);
      notifications.show('Cliente editado com sucesso.', {
        severity: 'success',
        autoHideDuration: 3000,
      });
      navigate('/cliente');
    } catch (editError) {
      notifications.show(`Falha ao editar cliente. Razão: ${editError.message}`, {
        severity: 'error',
        autoHideDuration: 3000,
      });
      throw editError;
    }
  }, [formValues, navigate, notifications, onSubmit, setFormErrors]);

  return (
    <ClienteForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
      submitButtonLabel="Salvar"
      backButtonPath={`/cliente/${clienteId}`}
    />
  );
}

ClienteEditForm.propTypes = {
  initialValues: PropTypes.shape({
    nome: PropTypes.string,
    email: PropTypes.string,
    cpf: PropTypes.string,
    telefone: PropTypes.string,
    endereco: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function ClienteEdit() {
  const { clienteId } = useParams();
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

  const handleSubmit = React.useCallback(
    async (formValues) => {
      const updatedData = await updateCliente(Number(clienteId), formValues);
      setCliente(updatedData);
    },
    [clienteId],
  );

  const renderEdit = React.useMemo(() => {
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
      <ClienteEditForm initialValues={cliente} onSubmit={handleSubmit} />
    ) : null;
  }, [isLoading, error, cliente, handleSubmit]);

  return (
    <PageContainer
      title={`Editar Cliente ${clienteId}`}
      breadcrumbs={[
        { title: 'Clientes', path: '/cliente' },
        { title: `Cliente ${clienteId}`, path: `/cliente/${clienteId}` },
        { title: 'Editar' },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
    </PageContainer>
  );
}