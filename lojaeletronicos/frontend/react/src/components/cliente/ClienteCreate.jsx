import * as React from 'react';
import { useNavigate } from 'react-router';
import useNotifications from '../../hooks/cadastro/useNotifications/useNotifications';
import {
  criarUm as createCliente,
  validar as validateCliente,
} from './clientes';
import ClienteForm from './ClienteForm';
import PageContainer from '../../pages/cadastro/PageContainer';

const INITIAL_FORM_VALUES = {
  nome: '', email: '', cpf: '', telefone: '', senha: '',
  rua: '', numero: '', cidade: '', estado: '', bairro: '', complemento: '', cep: '',
};

export default function ClienteCreate() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [formState, setFormState] = React.useState(() => ({
    values: INITIAL_FORM_VALUES,
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
    const { issues } = validateCliente(formValues, false);
    if (issues.length > 0) {
      const newErrors = issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
      setFormState(prevState => ({ ...prevState, errors: newErrors }));
      return;
    }

    try {
      await createCliente(formValues);
      notifications.show('Cliente criado com sucesso', {
        severity: 'success',
        autoHideDuration: 3000,
      });
      navigate('/cliente');
    } catch (createError) {
      notifications.show(
        `Falha ao criar cliente. Razão: ${createError.response?.data?.message || createError.message}`,
        { severity: 'error', autoHideDuration: 3000 },
      );
    }
  }, [navigate, notifications]);

  return (
    <PageContainer
      title="Novo Cliente"
      breadcrumbs={[{ title: 'Clientes', path: '/cliente' }, { title: 'Novo' }]}
    >
      <ClienteForm
        formState={formState}
        onFieldChange={handleFormFieldChange}
        onSubmit={() => handleFormSubmit(formState.values)}
        submitButtonLabel="Criar"
      />
    </PageContainer>
  );
}