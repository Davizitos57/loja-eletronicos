const INITIAL_ADMINISTRADORES_STORE = [
  {
    id: 1,
    nome: 'Admin',
    email: 'admin@admin.com',
    cpf: '000.000.000-00',
    telefone: '(00) 00000-0000',
    endereco: 'Rua dos Administradores, 1, Admin, AD, 00000-000'
  },
];

export function getAdministradoresStore() {
  const stringifiedAdministradores = localStorage.getItem('administradores-store');
  return stringifiedAdministradores
    ? JSON.parse(stringifiedAdministradores)
    : INITIAL_ADMINISTRADORES_STORE;
}

export function setAdministradoresStore(administradores) {
  return localStorage.setItem('administradores-store', JSON.stringify(administradores));
}

export async function getMuitos({ paginationModel, filterModel, sortModel }) {
    const administradoresStore = getAdministradoresStore();
  
    let filteredAdministradores = [...administradoresStore];
  
    // Apply filters (example only)
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }
  
        filteredAdministradores = filteredAdministradores.filter((administrador) => {
          const administradorValue = administrador[field];
  
          switch (operator) {
            case 'contains':
              return String(administradorValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
              return administradorValue === value;
            case 'startsWith':
              return String(administradorValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
              return String(administradorValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
              return administradorValue > value;
            case '<':
              return administradorValue < value;
            default:
              return true;
          }
        });
      });
    }
  
    // Apply sorting
    if (sortModel?.length) {
      filteredAdministradores.sort((a, b) => {
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
    const paginatedAdministradores = filteredAdministradores.slice(start, end);
  
    return {
      items: paginatedAdministradores,
      itemCount: filteredAdministradores.length,
    };
  }
  
  export async function getUm(administradorId) {
    const administradoresStore = getAdministradoresStore();
  
    const administradorToShow = administradoresStore.find(
      (administrador) => administrador.id === administradorId,
    );
  
    if (!administradorToShow) {
      throw new Error('Administrador não encontrado');
    }
    return administradorToShow;
  }
  
  export async function criarUm(data) {
    const administradoresStore = getAdministradoresStore();
  
    const newadministrador = {
      id: administradoresStore.reduce((max, administrador) => Math.max(max, administrador.id), 0) + 1,
      ...data,
    };
  
    setAdministradoresStore([...administradoresStore, newadministrador]);
  
    return newadministrador;
  }
  
  export async function atualizarUm(administradorId, data) {
    const administradoresStore = getAdministradoresStore();
  
    let updatedadministrador = null;
  
    setAdministradoresStore(
      administradoresStore.map((administrador) => {
        if (administrador.id === administradorId) {
            updatedadministrador = { ...administrador, ...data };
          return updatedadministrador;
        }
        return administrador;
      }),
    );
  
    if (!updatedadministrador) {
      throw new Error('Administrador não encontrado');
    }
    return updatedadministrador;
  }
  
  export async function deletarUm(administradorId) {
    const administradoresStore = getAdministradoresStore();
  
    setAdministradoresStore(administradoresStore.filter((administrador) => administrador.id !== administradorId));
  }
  
  export function validar(administrador) {
    let issues = [];
  
    if (!administrador.nome) {
      issues = [...issues, { message: 'Nome é obrigatório', path: ['nome'] }];
    }
  
    if (!administrador.email) {
        issues = [...issues, { message: 'Email é obrigatório', path: ['email'] }];
    } else if (!/\S+@\S+\.\S+/.test(administrador.email)) {
        issues = [...issues, { message: 'Email inválido', path: ['email'] }];
    }
  
    if (!administrador.cpf) {
        issues = [...issues, { message: 'CPF é obrigatório', path: ['cpf'] }];
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(administrador.cpf)) {
        issues = [...issues, { message: 'CPF inválido', path: ['cpf'] }];
    }
  
    if (!administrador.telefone) {
        issues = [...issues, { message: 'Telefone é obrigatório', path: ['telefone'] }];
    }
  
    if (!administrador.endereco) {
        issues = [...issues, { message: 'Endereço é obrigatório', path: ['endereco'] }];
    }
  
    return { issues };
  }