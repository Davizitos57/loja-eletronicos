package com.trabalhobd.lojaeletronicos.repositories;

import com.trabalhobd.lojaeletronicos.models.Usuario;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class UsuarioRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Usuario> userRowMapper = (rs, rowNum) -> {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getLong("id"));
        usuario.setNome(rs.getString("nome"));
        usuario.setEmail(rs.getString("email"));
        usuario.setCpf(rs.getString("cpf"));
        usuario.setTelefone(rs.getString("telefone"));
        usuario.setEndereco(rs.getString("endereco"));
        return usuario;
    };

    public void create(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, usuario.getNome(), usuario.getEmail(), usuario.getCpf(), usuario.getTelefone(), usuario.getEndereco());
    }

    public Usuario findById(Long id) {
        String sql = "SELECT * FROM usuarios WHERE id = ?";
        Usuario usuario;
        try {
            usuario = jdbcTemplate.queryForObject(sql, new Object[]{id}, userRowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
        return usuario;
    }

    public List<Usuario> findByNome(String nome) {
        String sql = "SELECT * FROM usuarios WHERE nome = ?";
        List<Usuario> usuarios = jdbcTemplate.query(sql, new Object[]{nome}, userRowMapper);
        return usuarios;
    }

    public List<Usuario> findAllUsers() {
        String sql = "SELECT * FROM usuarios";
        List<Usuario> usuarios = jdbcTemplate.query(sql, userRowMapper);
        return usuarios;
    }

    public void updateUserData(Long id, Usuario usuario) {
        String sql = "UPDATE usuarios SET nome = ?, email = ?, cpf = ?, telefone = ?, endereco = ? WHERE id = ?";
        jdbcTemplate.update(
                sql,
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getTelefone(),
                usuario.getEndereco(),
                id
        );
    }

    public void deleteById(Long id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
