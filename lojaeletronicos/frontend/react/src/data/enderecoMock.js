export const enderecoEntregaMock = {
  id: 1,
  tipo: 'residencial',
  cep: '30112-000',
  estado: 'Minas Gerais',
  cidade: 'Belo Horizonte',
  bairro: 'Centro',
  rua: 'Rua da Bahia',
  numero: '1234',
  complemento: 'Apto 501',
  pontoReferencia: 'Próximo ao Shopping Center',
  destinatario: 'João Silva Santos',
  telefone: '(31) 99999-8888',
  principal: true
};

// Array com múltiplos endereços (para futuro uso)
export const enderecosUsuarioMock = [
  {
    id: 1,
    tipo: 'residencial',
    cep: '30112-000',
    estado: 'Minas Gerais',
    cidade: 'Belo Horizonte',
    bairro: 'Centro',
    rua: 'Rua da Bahia',
    numero: '1234',
    complemento: 'Apto 501',
    pontoReferencia: 'Próximo ao Shopping Center',
    destinatario: 'João Silva Santos',
    telefone: '(31) 99999-8888',
    principal: true
  },
  {
    id: 2,
    tipo: 'comercial',
    cep: '01310-100',
    estado: 'São Paulo',
    cidade: 'São Paulo',
    bairro: 'Bela Vista',
    rua: 'Avenida Paulista',
    numero: '2000',
    complemento: 'Sala 1015',
    pontoReferencia: 'Em frente ao MASP',
    destinatario: 'João Silva Santos',
    telefone: '(11) 98888-7777',
    principal: false
  },
  {
    id: 3,
    tipo: 'residencial',
    cep: '22071-900',
    estado: 'Rio de Janeiro',
    cidade: 'Rio de Janeiro',
    bairro: 'Copacabana',
    rua: 'Avenida Atlântica',
    numero: '500',
    complemento: '',
    pontoReferencia: 'Posto 4',
    destinatario: 'Maria Silva Santos',
    telefone: '(21) 97777-6666',
    principal: false
  }
];