import api from '../../services/api';

export async function getCategorias() {
  const response = await api.get('/categorias');
  return response.data;
}

export async function getTodosProdutos() {
    const [produtosResponse, categoriasResponse] = await Promise.all([
        api.get('/loja/produtos'),
        api.get('/categorias')
    ]);

    const categoriasMap = new Map(categoriasResponse.data.map(cat => [cat.idCategoria, cat.nome]));

    return produtosResponse.data.map(produto => ({
        id: produto.idProduto,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.precoUnico,
        quantidadeEstoque: produto.quantidadeEstoque, 
        categoria: categoriasMap.get(produto.idCategoria) || 'Sem Categoria',
        idCategoria: produto.idCategoria,
        imagem: produto.imagem || null,
        estoque: produto.quantidadeEstoque > 0
    }));
}

export async function getProdutosPorCategoria(idCategoria) {
  const response = await api.get(`/loja/produtos/categoria/${idCategoria}`);
  return response.data.map(produto => ({
    id: produto.idProduto,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.precoUnico,
    quantidade: produto.quantidadeEstoque,
    categoria: produto.categoria || 'Sem Categoria',
    idCategoria: produto.idCategoria,
    imagem: produto.imagem || null,
    estoque: produto.quantidadeEstoque > 0
  }));
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

  if (filterModel?.quickFilterValues?.length) {
    const searchTerms = filterModel.quickFilterValues.map(term => String(term).toLowerCase());
    filteredProdutos = filteredProdutos.filter(produto => {
      return searchTerms.some(term =>
        Object.values(produto).some(value =>
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
      filteredProdutos = filteredProdutos.filter((produto) => {
        const produtoValue = produto[field];
        switch (operator) {
          case 'contains':
            return String(produtoValue).toLowerCase().includes(String(value).toLowerCase());
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

export async function buscarPorNome(nome) {
  if (!nome) {
    return getTodosProdutos();
  }
  const response = await api.get(`/loja/produtos/nome?nome=${nome}`);
  
  const categoriasResponse = await api.get('/categorias');
  const categoriasMap = new Map(categoriasResponse.data.map(cat => [cat.idCategoria, cat.nome]));

  return response.data.map(produto => ({
    id: produto.idProduto,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.precoUnico,
    quantidade: produto.quantidadeEstoque,
    categoria: categoriasMap.get(produto.idCategoria) || 'Sem Categoria',
    idCategoria: produto.idCategoria,
    imagem: produto.imagem || null,
    estoque: produto.quantidadeEstoque > 0
  }));
}

export async function criarUm(data, imagemFile) {
  let imagemUrl = null;

  if (imagemFile) {
    const formData = new FormData();
    formData.append('imagemFile', imagemFile);
    formData.append('idCategoria', data.categoria); 
    formData.append('nomeProduto', data.nome);     

    try {
      const response = await api.post('/loja/produtos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      imagemUrl = response.data;
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      throw new Error('Falha ao fazer upload da imagem.');
    }
  }

  const produtoParaBackend = {
    nome: data.nome,
    descricao: data.descricao,
    precoUnico: data.preco,
    quantidadeEstoque: data.quantidade,
    idCategoria: data.categoria,
    imagem: imagemUrl, 
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