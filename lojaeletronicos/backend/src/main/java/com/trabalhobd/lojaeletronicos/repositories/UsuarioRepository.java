package com.trabalhobd.lojaeletronicos.repositories;

import com.trabalhobd.lojaeletronicos.models.DTOs.LoginDTO;
import com.trabalhobd.lojaeletronicos.models.Endereco;
import com.trabalhobd.lojaeletronicos.models.Usuario;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Objects;

@Repository
@AllArgsConstructor
public class UsuarioRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private EnderecoRepository enderecoRepository;

    private final RowMapper<Usuario> userRowMapper = (rs, rowNum) -> {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getLong("id"));
        usuario.setNome(rs.getString("nome"));
        usuario.setEmail(rs.getString("email"));
        usuario.setCpf(rs.getString("cpf"));
        usuario.setTelefone(rs.getString("telefone"));
        usuario.setSenha(rs.getString("senha"));
        usuario.setTipoUsuario(rs.getString("tipo_usuario"));
        usuario.setExcluido(rs.getInt("excluido"));
        return usuario;
    };

    public Usuario verificarLoginInfo(LoginDTO login) {
        String sql = "SELECT * FROM usuarios WHERE email = ? and senha = ?";
        Usuario usuario;
        try {
            usuario = jdbcTemplate.queryForObject(sql, userRowMapper, login.email(), login.senha());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
        System.out.println(usuario);
        return usuario;
    }

    public Long criarNovoUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setString(1, usuario.getNome());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getCpf());
            ps.setString(4, usuario.getTelefone());
            ps.setString(5, usuario.getSenha());
            ps.setString(6, usuario.getTipoUsuario());
            return ps;
        }, keyHolder);

        return Objects.requireNonNull(keyHolder.getKey()).longValue();
    }
    
    public Usuario encontrarUsuarioPorId(Long id) {
        String sql = "SELECT * FROM usuarios WHERE id = ?";
        Usuario usuario;
        try {
            usuario = jdbcTemplate.queryForObject(sql, userRowMapper, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

        List<Endereco> enderecos;
        try {
            enderecos = enderecoRepository.findByUserId(id);
            usuario.setEnderecos(enderecos);
        } catch (NullPointerException e) {
            usuario.setEnderecos(null);
        }

        return usuario;
    }

    public Usuario encontrarUsuarioPorCpf(String cpf) {
        String sql = "SELECT * FROM usuarios WHERE cpf = ?";
        Usuario usuario;
        try {
            usuario = jdbcTemplate.queryForObject(sql, userRowMapper, cpf);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

        List<Endereco> enderecos;
        try {
            enderecos = enderecoRepository.findByUserId(usuario.getId());
            usuario.setEnderecos(enderecos);
        } catch (NullPointerException e) {
            usuario.setEnderecos(null);
        }
        return usuario;
    }

    public Usuario encontrarUsuarioPorEmail(String email) {
        String sql = "SELECT * FROM usuarios WHERE email ILIKE ?";
        Usuario usuario;
        try {
            usuario = jdbcTemplate.queryForObject(sql, userRowMapper, email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

        List<Endereco> enderecos;
        try {
            enderecos = enderecoRepository.findByUserId(usuario.getId());
            usuario.setEnderecos(enderecos);
        } catch (NullPointerException e) {
            usuario.setEnderecos(null);
        }

        return usuario;
    }

    public List<Usuario> encontrarTodosUsuario() {
        String sql = "SELECT * FROM usuarios where excluido = 0";
        List<Usuario> usuarios = jdbcTemplate.query(sql, userRowMapper);

        usuarios.forEach(usuario -> {
            try {
                List<Endereco> enderecos = enderecoRepository.findByUserId(usuario.getId());
                usuario.setEnderecos(enderecos);
            } catch (NullPointerException e) {
                usuario.setEnderecos(null);
            }
        });
        return usuarios;
    }

    public void atualizarDadosUsuario(Long id, Usuario usuario) {
        String sql = "UPDATE usuarios SET nome = ?, email = ?, cpf = ?, telefone = ?, senha = ? WHERE id = ?";
        jdbcTemplate.update(
                sql,
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getTelefone(),
                usuario.getSenha(),
                id
        );
    }

    public void deletarUsuarioPorId(Long id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}