package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.Usuario;
import com.trabalhobd.lojaeletronicos.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loja/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> todosUsuarios() {
        List<Usuario> data = usuarioService.todosUsuarios();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> procurarUsuarioPorId(@PathVariable Long id) {
        Usuario data = usuarioService.procurarUsuarioPorId(id);
        if (data == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(data);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Usuario>> procurarUsuarioPorEmai(@RequestParam String nome) {
        var usuarios = usuarioService.procurarUsuarioPorNome(nome);
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    public ResponseEntity<Void> criarNovoUsuario(@RequestBody Usuario usuario) {
        usuarioService.criarNovoUsuario(usuario);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarDadosUsuario(@PathVariable Long id,
                                                      @RequestBody Usuario usuario) {
        usuarioService.atualizarDadosUsuario(id, usuario);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuarioPorId(@PathVariable Long id) {
        usuarioService.deletarUsuarioPorId(id);
        return ResponseEntity.noContent().build();
    }

}
