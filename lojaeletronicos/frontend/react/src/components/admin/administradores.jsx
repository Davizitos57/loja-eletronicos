import api from '../../services/api';

export async function getMuitos({ paginationModel }) {
  const response = await api.get('/usuarios');
  const administradores = response.data.filter(user => user.tipoUsuario === 'ADMIN');
  const items = administradores.map(user => ({...user, id: user.id}));
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedItems = items.slice(start, end);
  return { items: paginatedItems, itemCount: items.length };
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
        rua: 'N/A', numero: 0, cidade: 'N/A', estado: 'N/A', cep: '00000-000',
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