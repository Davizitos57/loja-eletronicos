import api from '../../services/api';

export async function getMuitos({ paginationModel }) {
  const response = await api.get('/usuarios');
  const clientes = response.data.filter(user => user.tipoUsuario === 'BASIC');
  const items = clientes.map(user => ({...user, id: user.id}));
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedItems = items.slice(start, end);
  return { items: paginatedItems, itemCount: items.length };
}

export async function getUm(clienteId) {
  const response = await api.get(`/usuarios/${clienteId}`);
  return response.data;
}

export async function criarUm(data) {
  const clienteParaBackend = {
    nome: data.nome,
    email: data.email,
    cpf: data.cpf.replace(/[^\d]/g, ''),
    telefone: data.telefone,
    senha: data.senha,
    tipoUsuario: 'BASIC',
    enderecos: [{
      rua: data.rua,
      numero: data.numero,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
    }]
  };
  const response = await api.post('/usuarios', clienteParaBackend);
  return response.data;
}

export async function atualizarUm(clienteId, data) {
  const clienteParaBackend = {
    nome: data.nome,
    email: data.email,
    cpf: data.cpf.replace(/[^\d]/g, ''),
    telefone: data.telefone,
    tipoUsuario: 'BASIC',
  };
  if (data.senha && data.senha !== '') {
    clienteParaBackend.senha = data.senha;
  }
  const response = await api.put(`/usuarios/${clienteId}`, clienteParaBackend);
  return response.data;
}

export async function deletarUm(clienteId) {
  const response = await api.delete(`/usuarios/${clienteId}`);
  return response.data;
}

export function validar(cliente, isEditing = false) {
    let issues = [];
    if (!cliente.nome) issues.push({ message: 'Nome é obrigatório', path: ['nome'] });
    if (!cliente.email) issues.push({ message: 'Email é obrigatório', path: ['email'] });
    if (!cliente.cpf) issues.push({ message: 'CPF é obrigatório', path: ['cpf'] });
    if (!cliente.telefone) issues.push({ message: 'Telefone é obrigatório', path: ['telefone'] });
    if (!isEditing && (!cliente.senha || cliente.senha.length < 1)) {
        issues.push({ message: 'A senha é obrigatória.', path: ['senha'] });
    }
    if (!cliente.rua) issues.push({ message: 'Rua é obrigatória', path: ['rua'] });
    if (!cliente.numero) issues.push({ message: 'Número é obrigatório', path: ['numero'] });
    if (!cliente.cidade) issues.push({ message: 'Cidade é obrigatória', path: ['cidade'] });
    if (!cliente.estado) issues.push({ message: 'Estado é obrigatório', path: ['estado'] });
    if (!cliente.cep) issues.push({ message: 'CEP é obrigatório', path: ['cep'] });
    return { issues };
}