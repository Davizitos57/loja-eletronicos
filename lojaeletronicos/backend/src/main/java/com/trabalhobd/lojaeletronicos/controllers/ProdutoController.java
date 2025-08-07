package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.Produto;
import com.trabalhobd.lojaeletronicos.services.ProdutoService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("@/loja/produtos")
public class ProdutoController {

    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<Void> criarNovoProduto(@RequestBody Produto produto){
        produtoService.criarNovoProduto(produto);
        return ResponseEntity.ok().build();
    }
    

    @GetMapping
    public ResponseEntity<List<Produto>> todosProdutos(){
        List<Produto> allProdutos = produtoService.listarTodosProdutos();
        return ResponseEntity.ok(allProdutos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> procurarProdutoPorID(@PathVariable Long id){
        Produto achado = produtoService.procurarProdutoporId(id);
        if(achado == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(achado);
    }

    @GetMapping("/buscarPorNome")
    public ResponseEntity<List<Produto>> procurarProdutoporNome(@RequestParam String nome){
        var produtos = produtoService.procuraProdutoporNome(nome);
        return ResponseEntity.ok(produtos);
    }
    
    /* 
    @GetMapping("/buscarPorCategoria")
    public ResponseEntity<List<Produto>> procurarProdutoporCategoria(@RequestParam String nomeCategoria){
        var produtos = produtoService.procurarProdutoporCategoria(nomeCategoria);
        return ResponseEntity.ok(produtos);
    }
    */

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarDadosProduto (@PathVariable Long id, @RequestBody Produto produto){
        produtoService.atualizarDadosProdutos(id, produto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProdutoPorID (@PathVariable Long id){
        produtoService.deletarProdutoporId(id);
        return ResponseEntity.ok().build();
    }

}
