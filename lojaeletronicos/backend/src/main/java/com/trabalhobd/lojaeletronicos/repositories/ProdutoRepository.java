package com.trabalhobd.lojaeletronicos.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.trabalhobd.lojaeletronicos.models.Produto;
import java.util.List;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class ProdutoRepository {

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Produto> prodRowMapper = (rs, rowNum) -> {
        
        Produto produto = new Produto();
        produto.setIdProduto(rs.getLong("id"));
        produto.setNome(rs.getString("nome"));
        produto.setDescricao(rs.getString("descricao"));
        produto.setPrecoUnico(rs.getFloat("preco_unico"));
        produto.setQuantidadeEstoque(rs.getInt("quantidade_estoque"));
        produto.setAVenda(rs.getBoolean("ativo"));
        produto.setIdCategoria(rs.getInt("id_categoria"));
        return produto;
    };

    public void create(Produto produto){
        String sql = "INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, produto.getNome(), produto.getDescricao(), produto.getPrecoUnico(), produto.getQuantidadeEstoque(), produto.getIdCategoria()); 
    } 

    public Produto findById(Long idProduto){
        String sql = "SELECT * FROM produtos WHERE id = ?";
        Produto produto;
        try{
            produto = jdbcTemplate.queryForObject(sql, prodRowMapper, idProduto);
        }
        catch (EmptyResultDataAccessException e){
            return null;
        }

        return produto;
    }

    public List<Produto> findByNome(String nome){
        String sql = "SELECT * FROM produtos WHERE nome ILIKE ? AND ativo = TRUE";   
        List<Produto> produtos;  
        try{
            produtos = jdbcTemplate.query(sql, prodRowMapper, nome + "%");
        }
        catch (EmptyResultDataAccessException e) {
            return null;
        }
        return produtos;
    }

    public List<Produto> findAllProdutos(){
        String sql = "SELECT * FROM produtos WHERE ativo = TRUE";
        List<Produto> produtos = jdbcTemplate.query(sql, prodRowMapper);
        return produtos;
    }

    public List<Produto> findByCategoria(Long idCategoria){
        String sql = "SELECT * FROM produtos WHERE id_categoria = ? AND ativo = TRUE";
        List<Produto> produtos = jdbcTemplate.query(sql, prodRowMapper, idCategoria);
        return produtos;
    }

    public void updateProdutosData(Long idProduto, Produto produto){
        String sql = "UPDATE produtos SET nome = ?, descricao = ?, preco_unico = ?, quantidade_estoque = ?, id_categoria = ? WHERE id = ?";
        jdbcTemplate.update(sql, produto.getNome(), produto.getDescricao(), produto.getPrecoUnico(), produto.getQuantidadeEstoque(), produto.getIdCategoria(), idProduto);
    }

    public void deleteById(Long idProduto){
        String sql = "DELETE FROM produtos WHERE id = ?";
        jdbcTemplate.update(sql, idProduto); 
    }

    public void softDeleteById(Long idProduto){
        String sql = "UPDATE produtos SET ativo = FALSE WHERE id = ?";
        jdbcTemplate.update(sql, idProduto);
    }

}
