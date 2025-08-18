import * as React from 'react';
import { useNavigate } from 'react-router';
import useNotifications from '../../hooks/cadastro/useNotifications/useNotifications';
import {
  criarUm as createProduto,
  validar as validateProduto,
} from './produtos';
import ProdutoForm from './ProdutoForm';
import PageContainer from '../../pages/cadastro/PageContainer';

const INITIAL_FORM_VALUES = {
  nome: '',
  descricao: '',
  preco: 0,
  quantidade: 0,
  categoria: '',
};

export default function ProdutoCreate() {
  const navigate = useNavigate();
  const notifications = useNotifications();

  const [formState, setFormState] = React.useState(() => ({
    values: INITIAL_FORM_VALUES,
    errors: {},
  }));
  
  // 1. ADICIONAR ESTE ESTADO PARA GUARDAR O ARQUIVO DA IMAGEM
  const [imagemFile, setImagemFile] = React.useState(null); 

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
        const { issues } = validateProduto(values);
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
    setImagemFile(null); // Limpar a imagem também
  }, [setFormValues]);

  // 2. ATUALIZAR A FUNÇÃO DE SUBMISSÃO
  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateProduto(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(
        Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
      );
      return;
    }
    setFormErrors({});

    try {
      // Agora passamos os valores do formulário E o arquivo da imagem
      await createProduto(formValues, imagemFile); 
      
      notifications.show('Produto criado com sucesso', {
        severity: 'success',
        autoHideDuration: 3000,
      });

      navigate('/produto');
    } catch (createError) {
      notifications.show(
        `Falha ao criar produto. Razão: ${createError.message}`,
        {
          severity: 'error',
          autoHideDuration: 3000,
        },
      );
      throw createError;
    }
  }, [formValues, imagemFile, navigate, notifications, setFormErrors]); // Adicionar imagemFile aqui

  return (
    <PageContainer
      title="Novo produto"
      breadcrumbs={[{ title: 'Produtos', path: '/produto' }, { title: 'Novo' }]}
    >
      <ProdutoForm
        formState={formState}
        onFieldChange={handleFormFieldChange}
        onSubmit={handleFormSubmit}
        onReset={handleFormReset}
        submitButtonLabel="Criar"
        // 3. PASSAR A FUNÇÃO PARA ATUALIZAR O ARQUIVO DE IMAGEM
        onImagemChange={setImagemFile} 
      />
    </PageContainer>
  );
}