package com.trabalhobd.lojaeletronicos.repositories;

import com.trabalhobd.lojaeletronicos.models.DTOs.ItemPedidoProduto;
import com.trabalhobd.lojaeletronicos.models.DTOs.ItensCarrinhosDTO;
import com.trabalhobd.lojaeletronicos.models.ItemPedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemPedidoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void adicionarItem(Long pedidoId, Long produtoId, Integer quantidade, Double preco) {
        String sql = "INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, pedidoId, produtoId, quantidade, preco);
    }

    public List<ItensCarrinhosDTO> listarItensPorPedido(Long pedidoId) {
        String sql = "SELECT produto_id, nome, descricao, quantidade, preco FROM itens_pedidos " +
                "inner join produtos on itens_pedidos.produto_id = produtos.id " +
                "WHERE pedido_id = ?";
        return jdbcTemplate.query(sql, itensCarrinhoDTO, pedidoId);
    }

    public ItemPedido buscarItemPedido(Long pedidoId, Long produtoId) {
        String sql = "SELECT * FROM itens_pedidos WHERE pedido_id = ? AND produto_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, itemRowMapper, pedidoId, produtoId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void atualizarItemPedido(Long pedidoId, Long produtoId, Integer quantidade, Double preco) {
        String sql = "UPDATE itens_pedidos set preco = ?, quantidade = ?  WHERE pedido_id = ? AND produto_id = ?";
        jdbcTemplate.update(sql, preco, quantidade, pedidoId, produtoId);
    }

    public void removerItem(Long pedidoId, Long produtoId) {
        String sql = "DELETE FROM itens_pedidos WHERE pedido_id = ? AND produto_id = ?";
        jdbcTemplate.update(sql, pedidoId, produtoId);

        // Atualiza o valor total do pedido após remover o item
        double novoTotal = calcularValorTotalPedido(pedidoId);
        String updatePedidoSql = "UPDATE pedidos SET valor_total = ? WHERE id = ?";
        jdbcTemplate.update(updatePedidoSql, novoTotal, pedidoId);
    }

    public List<ItemPedidoProduto> listarItensPedido(Long pedidoId) {
        String sql = "SELECT produto_id, nome, quantidade, quantidade_estoque from itens_pedidos inner join produtos on produtos.id = itens_pedidos.produto_id WHERE pedido_id = ?";
        return jdbcTemplate.query(sql, itemPediProdRowMapper, pedidoId);
    }

    private final RowMapper<ItemPedidoProduto> itemPediProdRowMapper = (rs, rowNum) -> {
        ItemPedidoProduto item = new ItemPedidoProduto();
        item.setProdutoId(rs.getLong("produto_id"));
        item.setNome(rs.getString("nome"));
        item.setQuantidadeDesejada(rs.getInt("quantidade"));
        item.setQuantidadeEstoque(rs.getInt("quantidade_estoque"));

        return item;
    };

    private final RowMapper<ItemPedido> itemRowMapper = (rs, rowNum) -> {
        ItemPedido item = new ItemPedido();
        item.setPedidoId(rs.getLong("pedido_id"));
        item.setProdutoId(rs.getLong("produto_id"));
        item.setQuantidade(rs.getInt("quantidade"));
        item.setPreco(rs.getDouble("preco"));

        return item;
    };

    private final RowMapper<ItensCarrinhosDTO> itensCarrinhoDTO = (rs, rowNum) -> {
        ItensCarrinhosDTO item = new ItensCarrinhosDTO();
        item.setProdutoId(rs.getLong("produto_id"));
        item.setNome(rs.getString("nome"));
        item.setDescricao(rs.getString("descricao"));
        item.setQuantidade(rs.getInt("quantidade"));
        item.setPreco(rs.getDouble("preco"));

        return item;
    };

    public Double getPrecoDoItem(Long pedidoId, Long produtoId) {
        String sql = "SELECT preco FROM itens_pedidos WHERE pedido_id = ? AND produto_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, Double.class, pedidoId, produtoId);
        } catch (EmptyResultDataAccessException e) {
            return 0.0;
    }
}

    public double calcularValorTotalPedido(Long pedidoId) {
        String sql = "SELECT COALESCE(SUM(preco), 0) FROM itens_pedidos WHERE pedido_id = ?";
        return jdbcTemplate.queryForObject(sql, Double.class, pedidoId);
    }

}
