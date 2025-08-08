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
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  endereco: '',
};

export default function ClienteCreate() {
  const navigate = useNavigate();
  const notifications = useNotifications();

  const [formState, setFormState] = React.useState(() => ({
    values: INITIAL_FORM_VALUES,
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
    setFormValues(INITIAL_FORM_VALUES);
  }, [setFormValues]);

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
      await createCliente(formValues);
      notifications.show('Cliente criado com sucesso', {
        severity: 'success',
        autoHideDuration: 3000,
      });
      navigate('/cliente');
    } catch (createError) {
      notifications.show(
        `Falha ao criar cliente. Razão: ${createError.message}`,
        {
          severity: 'error',
          autoHideDuration: 3000,
        },
      );
      throw createError;
    }
  }, [formValues, navigate, notifications, setFormErrors]);

  return (
    <PageContainer
      title="Novo Cliente"
      breadcrumbs={[{ title: 'Clientes', path: '/cliente' }, { title: 'Novo' }]}
    >
      <ClienteForm
        formState={formState}
        onFieldChange={handleFormFieldChange}
        onSubmit={handleFormSubmit}
        onReset={handleFormReset}
        submitButtonLabel="Criar"
      />
    </PageContainer>
  );
}