import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import useNotifications from '../../hooks/cadastro/useNotifications/useNotifications';
import {
  getUm as getAdmin,
  atualizarUm as updateAdmin,
  validar as validateAdmin,
} from './administradores';
import AdminForm from './AdminForm';
import PageContainer from '../../pages/cadastro/PageContainer';

function AdminEditForm({ initialValues, onSubmit }) {
  const { adminId } = useParams();
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
        const { issues } = validateAdmin(values);
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
    const { issues } = validateAdmin(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(
        Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
      );
      return;
    }
    setFormErrors({});

    try {
      await onSubmit(formValues);
      notifications.show('Administrador editado com sucesso.', {
        severity: 'success',
        autoHideDuration: 3000,
      });
      navigate('/administrador');
    } catch (editError) {
      notifications.show(`Falha ao editar administrador. Razão: ${editError.message}`, {
        severity: 'error',
        autoHideDuration: 3000,
      });
      throw editError;
    }
  }, [formValues, navigate, notifications, onSubmit, setFormErrors]);

  return (
    <AdminForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
      submitButtonLabel="Salvar"
      backButtonPath={`/administrador/${adminId}`}
    />
  );
}

AdminEditForm.propTypes = {
  initialValues: PropTypes.shape({
    nome: PropTypes.string,
    email: PropTypes.string,
    cpf: PropTypes.string,
    telefone: PropTypes.string,
    endereco: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function AdminEdit() {
  const { adminId } = useParams();
  const [admin, setAdmin] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const showData = await getAdmin(Number(adminId));
      setAdmin(showData);
    } catch (showDataError) {
      setError(showDataError);
    }
    setIsLoading(false);
  }, [adminId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = React.useCallback(
    async (formValues) => {
      const updatedData = await updateAdmin(Number(adminId), formValues);
      setAdmin(updatedData);
    },
    [adminId],
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
    return admin ? (
      <AdminEditForm initialValues={admin} onSubmit={handleSubmit} />
    ) : null;
  }, [isLoading, error, admin, handleSubmit]);

  return (
    <PageContainer
      title={`Editar Administrador ${adminId}`}
      breadcrumbs={[
        { title: 'Administradores', path: '/administrador' },
        { title: `Administrador ${adminId}`, path: `/administrador/${adminId}` },
        { title: 'Editar' },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
    </PageContainer>
  );
}