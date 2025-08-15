import api from '../../services/api';

export async function getCategorias() {
  const response = await api.get('/categorias');
  return response.data;
}

export async function getMuitos({ paginationModel, filterModel, sortModel }) {
  const [produtosResponse, categoriasResponse] = await Promise.all([
    api.get('/loja/produtos'),
    api.get('/categorias')
  ]);
  
  const categoriasMap = new Map(categoriasResponse.data.map(cat => [cat.idCategoria, cat.nome]));

  const produtosDoBackend = produtosResponse.data.map(produto => ({
    id: produto.idProduto,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.precoUnico,
    quantidade: produto.quantidadeEstoque,
    categoria: categoriasMap.get(produto.idCategoria) || 'Sem Categoria',
  }));

  let filteredProdutos = [...produtosDoBackend];

  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }
      filteredProdutos = filteredProdutos.filter((produto) => {
        const produtoValue = produto[field];
        switch (operator) {
          case 'contains':
            return String(produtoValue).toLowerCase().includes(String(value).toLowerCase());
          case 'equals':
            return produtoValue === value;
          case 'startsWith':
            return String(produtoValue).toLowerCase().startsWith(String(value).toLowerCase());
          case 'endsWith':
            return String(produtoValue).toLowerCase().endsWith(String(value).toLowerCase());
          case '>':
            return produtoValue > value;
          case '<':
            return produtoValue < value;
          default:
            return true;
        }
      });
    });
  }

  if (sortModel?.length) {
    filteredProdutos.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if (a[field] < b[field]) return sort === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return sort === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedProdutos = filteredProdutos.slice(start, end);

  return {
    items: paginatedProdutos,
    itemCount: filteredProdutos.length,
  };
}

export async function getUm(produtoId) {
    const response = await api.get(`/loja/produtos/${produtoId}`);
    const produto = response.data;
    return {
        id: produto.idProduto,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.precoUnico,
        quantidade: produto.quantidadeEstoque,
        categoria: produto.idCategoria,
    };
}

export async function criarUm(data) {
  const produtoParaBackend = {
    nome: data.nome,
    descricao: data.descricao,
    precoUnico: data.preco,
    quantidadeEstoque: data.quantidade,
    idCategoria: data.categoria,
  };
  const response = await api.post('/loja/produtos', produtoParaBackend);
  return response.data;
}

export async function atualizarUm(produtoId, data) {
  const produtoParaBackend = {
    nome: data.nome,
    descricao: data.descricao,
    precoUnico: data.preco,
    quantidadeEstoque: data.quantidade,
    idCategoria: data.categoria,
  };
  const response = await api.put(`/loja/produtos/${produtoId}`, produtoParaBackend);
  return response.data;
}

export async function deletarUm(produtoId) {
  const response = await api.delete(`/loja/produtos/${produtoId}`);
  return response.data;
}

export function validar(produto) {
  let issues = [];
  if (!produto.nome) {
    issues.push({ message: 'Nome é obrigatório', path: ['nome'] });
  }
  if (!produto.descricao) {
    issues.push({ message: 'Descrição é obrigatória', path: ['descricao'] });
  }
  if (!produto.preco || produto.preco <= 0) {
    issues.push({ message: 'Preço deve ser maior que zero', path: ['preco'] });
  }
  if (produto.quantidade == null || produto.quantidade < 0) {
    issues.push({ message: 'Quantidade não pode ser negativa', path: ['quantidade'] });
  }
  if (!produto.categoria) {
    issues.push({ message: 'Categoria é obrigatória', path: ['categoria'] });
  }
  return { issues };
}