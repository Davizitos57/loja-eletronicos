package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.DTOs.LoginDTO;
import com.trabalhobd.lojaeletronicos.models.Endereco;
import com.trabalhobd.lojaeletronicos.models.Usuario;
import com.trabalhobd.lojaeletronicos.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginDTO loginDTO) {
        Usuario data = usuarioService.verificarLoginInfo(loginDTO);
        return ResponseEntity.ok(data);
    }

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

    @GetMapping("/search/cpf")
    public ResponseEntity<Usuario> procurarUsuarioPorCpf(@RequestParam String cpf) {
        var usuario = usuarioService.procurarUsuarioPorCpf(cpf);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/search/email")
    public ResponseEntity<Usuario> procurarUsuarioPorEmail(@RequestParam String email) {
        var usuario = usuarioService.procurarUsuarioPorEmail(email);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
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
