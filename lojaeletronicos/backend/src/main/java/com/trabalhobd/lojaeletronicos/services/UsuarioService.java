package com.trabalhobd.lojaeletronicos.services;

import com.trabalhobd.lojaeletronicos.models.Usuario;
import com.trabalhobd.lojaeletronicos.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void criarNovoUsuario(Usuario usuario) {
        usuarioRepository.create(usuario);
    }

    public List<Usuario> todosUsuarios(){
        return usuarioRepository.findAllUsers();
    }

    public Usuario procurarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public List<Usuario> procurarUsuarioPorNome(String nome) {
        return usuarioRepository.findByNome(nome);
    }

    public void atualizarDadosUsuario(Long id, Usuario usuario) {
        usuarioRepository.updateUserData(id, usuario);
    }

    public void deletarUsuarioPorId(Long id) {
        usuarioRepository.deleteById(id);
    }
}
