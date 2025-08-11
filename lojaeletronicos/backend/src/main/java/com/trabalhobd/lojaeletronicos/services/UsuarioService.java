package com.trabalhobd.lojaeletronicos.services;

import com.trabalhobd.lojaeletronicos.models.DTOs.LoginDTO;
import com.trabalhobd.lojaeletronicos.models.Usuario;
import com.trabalhobd.lojaeletronicos.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario verificarLoginInfo(LoginDTO login) {
        Usuario usuario = usuarioRepository.verificarLoginInfo(login);
        if (usuario == null) {
            throw new RuntimeException("Email e/ou senha estão incorretos!");
        }
        return usuario;
    }

    public void criarNovoUsuario(Usuario usuario) {
        if (!isCpfNumerico(usuario.getCpf())) {
            throw new RuntimeException("O cpf deve conter apenas números!");
        }
        usuarioRepository.criarNovoUsuario(usuario);
    }

    public List<Usuario> todosUsuarios() {
        return usuarioRepository.encontrarTodosUsuario();
    }

    public Usuario procurarUsuarioPorId(Long id) {
        return usuarioRepository.encontrarUsuarioPorId(id);
    }

    public Usuario procurarUsuarioPorCpf(String cpf) {
        return usuarioRepository.encontrarUsuarioPorCpf(cpf);
    }

    public Usuario procurarUsuarioPorEmail(String email) {
        return usuarioRepository.encontrarUsuarioPorEmail(email);
    }

    public void atualizarDadosUsuario(Long id, Usuario usuario) {
        usuarioRepository.atualizarDadosUsuario(id, usuario);
    }

    public void deletarUsuarioPorId(Long id) {
        usuarioRepository.deletarUsuarioPorId(id);
    }

    public static boolean isCpfNumerico(String cpf) {
        return cpf != null && cpf.matches("\\d+");
    }
}
