package com.trabalhobd.lojaeletronicos.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;

import com.trabalhobd.lojaeletronicos.models.Categoria;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class CategoriaRepository{

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Categoria> catRowMapper = (rs, rowNum) -> {
        Categoria categoria = new Categoria();

        categoria.setIdCateogia(rs.getLong("id"));
        categoria.setNome(rs.getString("nome"));

        return categoria;
    };

    public void create (Categoria categoria){
        String sql = "INSERT INTO categorias (nome) VALUES (?)";
        jdbcTemplate.update(sql, categoria.getNome());
    }

    public Categoria findById(Long idCategoria){
        String sql = "SELECT * FROM categorias WHERE id = ?";
        Categoria categoria;
        try{
            categoria = jdbcTemplate.queryForObject(sql, catRowMapper, idCategoria);
        }
        catch (EmptyResultDataAccessException e){
            return null;
        }

        return categoria;
    }

    public Categoria findByNome(String nome){
        String sql = "SELECT * FROM categorias WHERE nome = ?";
        Categoria categoria = jdbcTemplate.queryForObject(sql, catRowMapper, nome);
        return categoria;
    }

    public void updateCategoriaData (Long idCategoria, Categoria categoria){
        String sql = "UPDATE categorias SET nome = ? WHERE id = ?";
        jdbcTemplate.update(sql, categoria.getNome(), idCategoria);
    }


}

