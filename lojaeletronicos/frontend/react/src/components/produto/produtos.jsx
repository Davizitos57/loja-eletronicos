const INITIAL_PRODUTOS_STORE = [
  {
    id: 1,
    nome: 'Smartphone Modelo X',
    descricao: 'Um smartphone com câmera de alta resolução e bateria de longa duração.',
    preco: 1500.00,
    quantidade: 50,
  },
  {
    id: 2,
    nome: 'Notebook Ultra Fino',
    descricao: 'Notebook leve e potente, ideal para trabalho e estudos.',
    preco: 4500.00,
    quantidade: 20,
  },
  {
    id: 3,
    nome: 'Fone de Ouvido Sem Fio',
    descricao: 'Fone de ouvido com cancelamento de ruído e alta qualidade de som.',
    preco: 350.00,
    quantidade: 100,
  },
];

export function getProdutosStore() {
  const stringifiedProdutos = localStorage.getItem('produtos-store');
  return stringifiedProdutos
    ? JSON.parse(stringifiedProdutos)
    : INITIAL_PRODUTOS_STORE;
}

export function setProdutosStore(produtos) {
  return localStorage.setItem('produtos-store', JSON.stringify(produtos));
}

export async function getMuitos({ paginationModel, filterModel, sortModel }) {
  const produtosStore = getProdutosStore();

  let filteredProdutos = [...produtosStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredProdutos = filteredProdutos.filter((produto) => {
        const produtoValue = produto[field];

        switch (operator) {
          case 'contains':
            return String(produtoValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case 'equals':
            return produtoValue === value;
          case 'startsWith':
            return String(produtoValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case 'endsWith':
            return String(produtoValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
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

  // Apply sorting
  if (sortModel?.length) {
    filteredProdutos.sort((a, b) => {
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
  const paginatedProdutos = filteredProdutos.slice(start, end);

  return {
    items: paginatedProdutos,
    itemCount: filteredProdutos.length,
  };
}

export async function getUm(produtoId) {
  const produtosStore = getProdutosStore();

  const produtoToShow = produtosStore.find(
    (produto) => produto.id === produtoId,
  );

  if (!produtoToShow) {
    throw new Error('Produto não encontrado');
  }
  return produtoToShow;
}

export async function criarUm(data) {
  const produtosStore = getProdutosStore();

  const newproduto = {
    id: produtosStore.reduce((max, produto) => Math.max(max, produto.id), 0) + 1,
    ...data,
  };

  setProdutosStore([...produtosStore, newproduto]);

  return newproduto;
}

export async function atualizarUm(produtoId, data) {
  const produtosStore = getProdutosStore();

  let updatedproduto = null;

  setProdutosStore(
    produtosStore.map((produto) => {
      if (produto.id === produtoId) {
        updatedproduto = { ...produto, ...data };
        return updatedproduto;
      }
      return produto;
    }),
  );

  if (!updatedproduto) {
    throw new Error('Produto não encontrado');
  }
  return updatedproduto;
}

export async function deletarUm(produtoId) {
  const produtosStore = getProdutosStore();

  setProdutosStore(produtosStore.filter((produto) => produto.id !== produtoId));
}

export function validar(produto) {
  let issues = [];

  if (!produto.nome) {
    issues = [...issues, { message: 'Nome é obrigatório', path: ['nome'] }];
  }

  if (!produto.descricao) {
    issues = [...issues, { message: 'Descrição é obrigatória', path: ['descricao'] }];
  }

  if (!produto.preco) {
    issues = [...issues, { message: 'Preço é obrigatório', path: ['preco'] }];
  } else if (produto.preco <= 0) {
    issues = [...issues, { message: 'Preço deve ser maior que zero', path: ['preco'] }];
  }

  if (produto.quantidade == null) {
    issues = [...issues, { message: 'Quantidade é obrigatória', path: ['quantidade'] }];
  } else if (produto.quantidade < 0) {
    issues = [...issues, { message: 'Quantidade não pode ser negativa', path: ['quantidade'] }];
  }

  return { issues };
}