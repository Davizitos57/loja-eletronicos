export function agruparProdutosPorCategoria(produtos, categorias) {
  // Criar um mapa de categorias para facilitar o acesso
  const categoriasMap = new Map(categorias.map(cat => [cat.idCategoria, cat]));
  
  // Agrupar produtos por categoria
  const produtosPorCategoria = produtos.reduce((acc, produto) => {
    const categoriaId = produto.idCategoria;
    
    if (!acc[categoriaId]) {
      acc[categoriaId] = [];
    }
    
    acc[categoriaId].push(produto);
    return acc;
  }, {});
  
  // Transformar em estrutura esperada pela Home
  return categorias
    .filter(categoria => produtosPorCategoria[categoria.idCategoria]?.length > 0)
    .map(categoria => ({
      id: categoria.idCategoria,
      nome: categoria.nome,
      produtos: produtosPorCategoria[categoria.idCategoria] || []
    }));
}

export function formatarProdutoParaHome(produto) {
  return {
    ...produto,
    // Garantir que todos os campos necessários existam
    marca: produto.marca || 'Marca não informada',
    imagem: produto.imagem || null,
    estoque: produto.quantidade > 0,
    categoria: produto.categoria || 'Sem Categoria'
  };
}