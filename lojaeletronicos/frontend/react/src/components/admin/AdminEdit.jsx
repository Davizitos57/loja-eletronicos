import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import useNotifications from '../../hooks/cadastro/useNotifications/useNotifications';
import { getUm as getAdmin, atualizarUm as updateAdmin, validar as validateAdmin } from './administradores';
import AdminForm from './AdminForm';
import PageContainer from '../../pages/cadastro/PageContainer';

function AdminEditForm({ initialValues, onSubmit }) {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [formState, setFormState] = React.useState(() => ({
    values: { ...initialValues, senha: '' },
    errors: {},
  }));

  const handleFormFieldChange = React.useCallback((name, value) => {
    setFormState(prev => ({ ...prev, values: { ...prev.values, [name]: value } }));
  }, []);

  const handleFormSubmit = React.useCallback(async (formValues) => {
    const { issues } = validateAdmin(formValues, true);
    if (issues.length > 0) {
      const newErrors = issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
      setFormState(prev => ({ ...prev, errors: newErrors }));
      return;
    }

    try {
      await onSubmit(formValues);
      notifications.show('Administrador editado com sucesso.', { severity: 'success' });
      navigate('/administrador');
    } catch (editError) {
      notifications.show(`Falha ao editar administrador: ${editError.response?.data?.message || editError.message}`, { severity: 'error' });
    }
  }, [navigate, notifications, onSubmit]);

  return (
    <AdminForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={() => handleFormSubmit(formState.values)}
      submitButtonLabel="Salvar"
      backButtonPath={`/administrador/${adminId}`}
      isEditing={true}
    />
  );
}
AdminEditForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default function AdminEdit() {
  const { adminId } = useParams();
  const [admin, setAdmin] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const showData = await getAdmin(Number(adminId));
        setAdmin(showData);
      } catch (showDataError) {
        setError(showDataError);
      }
      setIsLoading(false);
    }
    loadData();
  }, [adminId]);

  const handleSubmit = React.useCallback(async (formValues) => {
    await updateAdmin(Number(adminId), formValues);
  }, [adminId]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <PageContainer
      title={`Editar Administrador ${adminId}`}
      breadcrumbs={[{ title: 'Administradores', path: '/administrador' }, { title: `Administrador ${adminId}`, path: `/administrador/${adminId}` }, { title: 'Editar' }]}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>
        {admin ? <AdminEditForm initialValues={admin} onSubmit={handleSubmit} /> : null}
      </Box>
    </PageContainer>
  );
}