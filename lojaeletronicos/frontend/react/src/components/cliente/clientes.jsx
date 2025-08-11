const INITIAL_CLIENTES_STORE = [
  {
    id: 1,
    nome: 'João da Silva',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    telefone: '(31) 99999-9999',
    rua: 'Rua das Flores',
    numero: 123,
    cidade: 'Belo Horizonte',
    estado: 'MG',
    cep: '30130-140'
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    cpf: '987.654.321-00',
    telefone: '(11) 98888-8888',
    rua: 'Avenida Paulista',
    numero: 1500,
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-200'
  },
];

export function getClientesStore() {
  const stringifiedClientes = localStorage.getItem('clientes-store');
  return stringifiedClientes
    ? JSON.parse(stringifiedClientes)
    : INITIAL_CLIENTES_STORE;
}

export function setClientesStore(clientes) {
  return localStorage.setItem('clientes-store', JSON.stringify(clientes));
}

export async function getMuitos({ paginationModel, filterModel, sortModel }) {
    const clientesStore = getClientesStore();

    let filteredClientes = [...clientesStore];

    // Apply filters (example only)
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        filteredClientes = filteredClientes.filter((cliente) => {
          const clienteValue = cliente[field];

          switch (operator) {
            case 'contains':
              return String(clienteValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
              return clienteValue === value;
            case 'startsWith':
              return String(clienteValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
              return String(clienteValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
              return clienteValue > value;
            case '<':
              return clienteValue < value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      filteredClientes.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field] < b[field]) {
            return sort === 'asc' ? -1 : 1;
          }
          if (a[field] > b[field]) {
            return sort === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedClientes = filteredClientes.slice(start, end);

    return {
      items: paginatedClientes,
      itemCount: filteredClientes.length,
    };
  }

  export async function getUm(clienteId) {
    const clientesStore = getClientesStore();

    const clienteToShow = clientesStore.find(
      (cliente) => cliente.id === clienteId,
    );

    if (!clienteToShow) {
      throw new Error('Cliente não encontrado');
    }
    return clienteToShow;
  }

  export async function criarUm(data) {
    const clientesStore = getClientesStore();

    const newcliente = {
      id: clientesStore.reduce((max, cliente) => Math.max(max, cliente.id), 0) + 1,
      ...data,
    };

    setClientesStore([...clientesStore, newcliente]);

    return newcliente;
  }

  export async function atualizarUm(clienteId, data) {
    const clientesStore = getClientesStore();

    let updatedcliente = null;

    setClientesStore(
      clientesStore.map((cliente) => {
        if (cliente.id === clienteId) {
            updatedcliente = { ...cliente, ...data };
          return updatedcliente;
        }
        return cliente;
      }),
    );

    if (!updatedcliente) {
      throw new Error('Cliente não encontrado');
    }
    return updatedcliente;
  }

  export async function deletarUm(clienteId) {
    const clientesStore = getClientesStore();

    setClientesStore(clientesStore.filter((cliente) => cliente.id !== clienteId));
  }

  export function validar(cliente) {
    let issues = [];

    if (!cliente.nome) {
      issues = [...issues, { message: 'Nome é obrigatório', path: ['nome'] }];
    }

    if (!cliente.email) {
        issues = [...issues, { message: 'Email é obrigatório', path: ['email'] }];
    } else if (!/\S+@\S+\.\S+/.test(cliente.email)) {
        issues = [...issues, { message: 'Email inválido', path: ['email'] }];
    }

    if (!cliente.cpf) {
        issues = [...issues, { message: 'CPF é obrigatório', path: ['cpf'] }];
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cliente.cpf)) {
        issues = [...issues, { message: 'CPF inválido', path: ['cpf'] }];
    }

    if (!cliente.telefone) {
        issues = [...issues, { message: 'Telefone é obrigatório', path: ['telefone'] }];
    }

    if (!cliente.rua) issues.push({ message: 'Rua é obrigatório', path: ['rua'] });
    if (!cliente.numero) issues.push({ message: 'Número é obrigatório', path: ['numero'] });
    if (!cliente.cidade) issues.push({ message: 'Cidade é obrigatório', path: ['cidade'] });
    if (!cliente.estado) issues.push({ message: 'Estado é obrigatório', path: ['estado'] });
    if (!cliente.cep) issues.push({ message: 'CEP é obrigatório', path: ['cep'] });

    return { issues };
  }