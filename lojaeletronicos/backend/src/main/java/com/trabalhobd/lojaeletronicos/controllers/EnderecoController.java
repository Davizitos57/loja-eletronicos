package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.Endereco;
import com.trabalhobd.lojaeletronicos.services.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

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
    public ResponseEntity<Endereco> deletarEndereco(@PathVariable Long id) {
        enderecoService.deletarEndereco(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Endereco>> buscarEnderecoPorUsuarioId(@RequestParam Long usuarioId) {
        var enderecos = enderecoService.buscarEnderecoPorUsuarioId(usuarioId);
        if (enderecos == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enderecos);
    }
}
