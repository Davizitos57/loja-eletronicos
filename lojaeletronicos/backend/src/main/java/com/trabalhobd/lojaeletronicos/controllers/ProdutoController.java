package com.trabalhobd.lojaeletronicos.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import com.trabalhobd.lojaeletronicos.models.Produto;
import com.trabalhobd.lojaeletronicos.services.ProdutoService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin; // Para a conexão do front
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/loja/produtos")
@CrossOrigin(origins = "http://localhost:5173") // Para a conexão do frontend
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

    @GetMapping("/nome")
    public ResponseEntity<List<Produto>> procurarProdutoporNome(@RequestParam String nome){
        var produtos = produtoService.procuraProdutoporNome(nome);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/categoria/{id}")  
    public ResponseEntity<List<Produto>> buscarProdutosPorIdCategoria(@PathVariable("id") Long idCategoria) {
        List<Produto> produtos = produtoService.procurarProdutoporCategoria(idCategoria);
        return ResponseEntity.ok(produtos);
    }

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

    @DeleteMapping("/soft/{id}")
    public ResponseEntity<Void> deletarLogicamenteProdutoPorID(@PathVariable Long id){
        produtoService.deletarLogicamenteProdutoporId(id);
        return ResponseEntity.ok().build();
    }

}
