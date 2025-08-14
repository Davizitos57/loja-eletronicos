package com.trabalhobd.lojaeletronicos.services;

import org.springframework.stereotype.Service;

import com.trabalhobd.lojaeletronicos.models.Produto;
import com.trabalhobd.lojaeletronicos.repositories.CategoriaRepository;
import com.trabalhobd.lojaeletronicos.repositories.ProdutoRepository;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public void criarNovoProduto(Produto produto) {
        if (categoriaRepository.findById((long) produto.getIdCategoria()) == null) {
            throw new IllegalArgumentException("Categoria informada não existe.");
        }
        produtoRepository.create(produto);
    }

    public Produto procurarProdutoporId(Long id){
        return produtoRepository.findById(id);
    }

    public List<Produto> procuraProdutoporNome(String nome){
        return produtoRepository.findByNome(nome);
    }

    public List<Produto> listarTodosProdutos(){
        return produtoRepository.findAllProdutos();
    }

    public List<Produto> procurarProdutoporCategoria(Long id){
        return produtoRepository.findByCategoria(id);
    }

    public void atualizarDadosProdutos(Long idProduto, Produto produto){
        produtoRepository.updateProdutosData(idProduto, produto);
    }

    public void atualizarQuantidadeProdutos(Long idProduto, int quantidade){
        produtoRepository.updateProdutoQuantidade(idProduto, quantidade);
    }

    public void deletarProdutoporId(Long idProduto){
        produtoRepository.deleteById(idProduto);
    }

    public void deletarLogicamenteProdutoporId(Long idProduto){
        produtoRepository.softDeleteById(idProduto);
    }

}
