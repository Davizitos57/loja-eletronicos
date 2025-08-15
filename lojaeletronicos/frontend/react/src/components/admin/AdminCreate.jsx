import * as React from 'react';
import { useNavigate } from 'react-router';
import useNotifications from '../../hooks/cadastro/useNotifications/useNotifications';
import { criarUm as createAdmin, validar as validateAdmin } from './administradores';
import AdminForm from './AdminForm';
import PageContainer from '../../pages/cadastro/PageContainer';

const INITIAL_FORM_VALUES = {
  nome: '', email: '', cpf: '', telefone: '', senha: '',
};

export default function AdminCreate() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [formState, setFormState] = React.useState(() => ({
    values: INITIAL_FORM_VALUES,
    errors: {},
  }));

  const handleFormFieldChange = React.useCallback((name, value) => {
    setFormState(prev => ({ ...prev, values: { ...prev.values, [name]: value } }));
  }, []);

  const handleFormSubmit = React.useCallback(async (formValues) => {
    const { issues } = validateAdmin(formValues, false);
    if (issues.length > 0) {
      const newErrors = issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
      setFormState(prev => ({ ...prev, errors: newErrors }));
      return;
    }

    try {
      await createAdmin(formValues);
      notifications.show('Administrador criado com sucesso', { severity: 'success' });
      navigate('/administrador');
    } catch (createError) {
      notifications.show(`Falha ao criar administrador: ${createError.response?.data?.message || createError.message}`, { severity: 'error' });
    }
  }, [navigate, notifications]);

  return (
    <PageContainer
      title="Novo Administrador"
      breadcrumbs={[{ title: 'Administradores', path: '/administrador' }, { title: 'Novo' }]}
    >
      <AdminForm
        formState={formState}
        onFieldChange={handleFormFieldChange}
        onSubmit={() => handleFormSubmit(formState.values)}
        submitButtonLabel="Criar"
      />
    </PageContainer>
  );
}