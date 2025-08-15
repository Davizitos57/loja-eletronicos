package com.trabalhobd.lojaeletronicos.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.trabalhobd.lojaeletronicos.models.Categoria;
import com.trabalhobd.lojaeletronicos.services.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "http://localhost:5173") 
public class CategoriaController {

    private CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService){
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<Void> criarNovaCategoria(@RequestBody Categoria categoria){
        categoriaService.criarNovaCategoria(categoria);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping
    public ResponseEntity<List<Categoria>> todasCategorias() {
        List<Categoria> categorias = categoriaService.listarTodasCategorias();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> procurarCategoriaPorID(@PathVariable Long id){
        Categoria achada = categoriaService.procurarCategoriaPorID(id);
        if(achada == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(achada);
    }

    @GetMapping("/nome")
    public ResponseEntity<Categoria> procurarCategoriaPorNome (@RequestParam String nome){
        var categorias = categoriaService.procurarCategoriaPorNome(nome);
        return ResponseEntity.ok(categorias);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarDadosCategoria (@PathVariable Long id, @RequestBody Categoria categoria){
        categoriaService.atualizarDadosCategoria(id, categoria);
        return ResponseEntity.ok().build();
    }
}