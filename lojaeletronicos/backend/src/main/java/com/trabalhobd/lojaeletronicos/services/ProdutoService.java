package com.trabalhobd.lojaeletronicos.services;

import org.springframework.stereotype.Service;

import com.trabalhobd.lojaeletronicos.models.Produto;
import com.trabalhobd.lojaeletronicos.repositories.ProdutoRepository;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public void criarNovoProduto(Produto produto){
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

    /*
    public List<Produto> procurarProdutoporCategoria(String nomeCategoria){
        return produtoRepository.findByCategoria(nomeCategoria);
    }
    */

    public void atualizarDadosProdutos(Long idProduto, Produto produto){
        produtoRepository.updateProdutosData(idProduto, produto);
    }

    public void deletarProdutoporId(Long idProduto){
        produtoRepository.deleteById(idProduto);
    }

}
