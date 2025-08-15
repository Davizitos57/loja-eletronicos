package com.trabalhobd.lojaeletronicos.services;

import com.trabalhobd.lojaeletronicos.models.DTOs.LoginDTO;
import com.trabalhobd.lojaeletronicos.models.Endereco;
import com.trabalhobd.lojaeletronicos.models.Usuario;
import com.trabalhobd.lojaeletronicos.repositories.EnderecoRepository;
import com.trabalhobd.lojaeletronicos.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Usuario verificarLoginInfo(LoginDTO login) {
        Usuario usuario = usuarioRepository.verificarLoginInfo(login);
        if (usuario == null) {
            throw new RuntimeException("Email e/ou senha estão incorretos!");
        }
        return usuario;
    }

    @Transactional
    public void criarNovoUsuario(Usuario usuario) {
        if (!isCpfNumerico(usuario.getCpf())) {
            throw new RuntimeException("O cpf deve conter apenas números!");
        }
        
        if (usuario.getTipoUsuario() == null || usuario.getTipoUsuario().isEmpty()){
            usuario.setTipoUsuario("BASIC");
        }

        Long usuarioId = usuarioRepository.criarNovoUsuario(usuario);
        usuario.setId(usuarioId);

        if (usuario.getEnderecos() != null && !usuario.getEnderecos().isEmpty()) {
            for (Endereco endereco : usuario.getEnderecos()) {
                endereco.setIdUsuario(usuarioId);
                enderecoRepository.create(endereco);
            }
        }
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

    @Transactional
    public void deletarUsuarioPorId(Long id) {
        enderecoRepository.deleteByUsuarioId(id);
        usuarioRepository.deletarUsuarioPorId(id);
    }

    public static boolean isCpfNumerico(String cpf) {
        return cpf != null && cpf.matches("\\d+");
    }
}