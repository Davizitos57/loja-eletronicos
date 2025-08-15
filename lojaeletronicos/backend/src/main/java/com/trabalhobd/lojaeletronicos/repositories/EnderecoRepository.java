package com.trabalhobd.lojaeletronicos.repositories;

import com.trabalhobd.lojaeletronicos.models.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EnderecoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Endereco> enderecoRowMapper = (rs, rowNum) -> {
        Endereco endereco = new Endereco();

        endereco.setId(rs.getLong("id"));
        endereco.setIdUsuario(rs.getLong("id_usuario"));
        endereco.setRua(rs.getString("rua"));
        endereco.setNumero(rs.getInt("numero"));
        endereco.setBairro(rs.getString("bairro"));
        endereco.setCidade(rs.getString("cidade"));
        endereco.setEstado(rs.getString("estado"));
        endereco.setCep(rs.getString("cep"));

        return endereco;
    };

    public void create(Endereco endereco) {
        String sql = "INSERT INTO enderecos (id_usuario, rua, numero, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, endereco.getIdUsuario(), endereco.getRua(), endereco.getNumero(), endereco.getBairro(), endereco.getCidade(), endereco.getEstado(), endereco.getCep());
    }

    public Endereco findById(Long idEndereco) {
        String sql = "SELECT * FROM enderecos WHERE id = ?";
        Endereco endereco;
        try {
            endereco = jdbcTemplate.queryForObject(sql, enderecoRowMapper, idEndereco);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

        return endereco;
    }

    public List<Endereco> findByUserId(Long usuarioID) {
        String sql = "SELECT * FROM enderecos WHERE id_usuario = ?";
        List<Endereco> endereco;
        try {
            endereco = jdbcTemplate.query(sql, enderecoRowMapper, usuarioID);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

        return endereco;
    }

    public void updateEnderecoData(Long idEndereco, Endereco endereco) {
        String sql = "UPDATE enderecos SET id_usuario = ?, rua = ?, numero = ?, bairro = ? cidade =?, estado=?, cep =?  WHERE id = ?";
        jdbcTemplate.update(sql, endereco.getIdUsuario(), endereco.getRua(), endereco.getNumero(), endereco.getBairro(), endereco.getCidade(), endereco.getEstado(), endereco.getCep(), idEndereco);
    }

    public void deleteById(Long id) {
        String sql = "DELETE from enderecos where id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void deleteByUsuarioId(Long idUsuario) {
        String sql = "DELETE FROM enderecos WHERE id_usuario = ?";
        jdbcTemplate.update(sql, idUsuario);
    }
}
