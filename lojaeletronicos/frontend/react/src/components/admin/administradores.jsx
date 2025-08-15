import api from '../../services/api';

export async function getMuitos({ paginationModel, filterModel, sortModel }) {
  const response = await api.get('/usuarios');
  const adminsDoBackend = response.data.filter(user => user.tipoUsuario === 'ADMIN');
  let filteredAdmins = adminsDoBackend.map(user => ({...user, id: user.id}));

  if (filterModel?.quickFilterValues?.length) {
    const searchTerms = filterModel.quickFilterValues.map(term => String(term).toLowerCase());
    filteredAdmins = filteredAdmins.filter(admin => {
      return searchTerms.some(term =>
        Object.values(admin).some(value =>
          String(value).toLowerCase().includes(term)
        )
      );
    });
  }
  
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null || String(value).trim() === '') {
        return;
      }
      filteredAdmins = filteredAdmins.filter((admin) => {
        const adminValue = admin[field];
        switch (operator) {
          case 'contains':
            return String(adminValue).toLowerCase().includes(String(value).toLowerCase());
          default:
            return true;
        }
      });
    });
  }

  if (sortModel?.length) {
    filteredAdmins.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if (a[field] < b[field]) return sort === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return sort === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedItems = filteredAdmins.slice(start, end);

  return { items: paginatedItems, itemCount: filteredAdmins.length };
}

export async function getUm(adminId) {
  const response = await api.get(`/usuarios/${adminId}`);
  return response.data;
}

export async function criarUm(data) {
  const adminParaBackend = {
    nome: data.nome,
    email: data.email,
    cpf: data.cpf.replace(/[^\d]/g, ''),
    telefone: data.telefone,
    senha: data.senha,
    tipoUsuario: 'ADMIN',
    enderecos: [{
        rua: 'N/A', numero: 0, cidade: 'N/A', estado: 'N/A', bairro: 'N/A', complemento: 'N/A', cep: '00000-000',
    }]
  };
  const response = await api.post('/usuarios', adminParaBackend);
  return response.data;
}

export async function atualizarUm(adminId, data) {
  const adminParaBackend = {
    nome: data.nome,
    email: data.email,
    cpf: data.cpf.replace(/[^\d]/g, ''),
    telefone: data.telefone,
    tipoUsuario: 'ADMIN',
  };
  if (data.senha && data.senha !== '') {
    adminParaBackend.senha = data.senha;
  }
  const response = await api.put(`/usuarios/${adminId}`, adminParaBackend);
  return response.data;
}

export async function deletarUm(adminId) {
  const response = await api.delete(`/usuarios/${adminId}`);
  return response.data;
}

export function validar(administrador, isEditing = false) {
    let issues = [];
    if (!administrador.nome) issues.push({ message: 'Nome é obrigatório', path: ['nome'] });
    if (!administrador.email) issues.push({ message: 'Email é obrigatório', path: ['email'] });
    if (!administrador.cpf) issues.push({ message: 'CPF é obrigatório', path: ['cpf'] });
    if (!administrador.telefone) issues.push({ message: 'Telefone é obrigatório', path: ['telefone'] });
    if (!isEditing && (!administrador.senha || administrador.senha.length < 1)) {
        issues.push({ message: 'A senha é obrigatória.', path: ['senha'] });
    }
    return { issues };
}