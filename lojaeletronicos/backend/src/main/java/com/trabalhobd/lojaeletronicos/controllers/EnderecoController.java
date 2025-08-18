package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.Endereco;
import com.trabalhobd.lojaeletronicos.services.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enderecos")
@CrossOrigin(origins = "http://localhost:5173")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    // ... (outros endpoints como POST, PUT, DELETE sem alteração) ...
    @PostMapping
    public ResponseEntity<Void> criarEndereco(@RequestBody Endereco endereco) {
        enderecoService.criarEndereco(endereco);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> buscarEnderecoPorId(@PathVariable Long id) {
        var endereco = enderecoService.buscarEndereco(id);
        if (endereco == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(endereco);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarEnderecoInfo(@PathVariable Long id,
                                                      @RequestBody Endereco endereco) {
        enderecoService.atualizarEndereco(id, endereco);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEndereco(@PathVariable Long id) { // Retorno corrigido para Void
        enderecoService.deletarEndereco(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping
    public ResponseEntity<List<Endereco>> buscarEnderecoPorUsuarioId(@RequestParam Long usuarioId) {
        List<Endereco> enderecos = enderecoService.buscarEnderecoPorUsuarioId(usuarioId);
        return ResponseEntity.ok(enderecos);
    }
}