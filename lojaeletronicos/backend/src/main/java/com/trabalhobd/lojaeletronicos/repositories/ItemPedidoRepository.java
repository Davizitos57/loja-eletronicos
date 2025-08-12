package com.trabalhobd.lojaeletronicos.repositories;

import com.trabalhobd.lojaeletronicos.models.DTOs.ItensCarrinhosDTO;
import com.trabalhobd.lojaeletronicos.models.ItemPedido;
import org.springframework.beans.factory.annotation.Autowired;
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
        String sql2 = "SELECT pedido_id, nome, descricao, quantidade, preco FROM itens_pedidos " +
                "inner join produtos on itens_pedidos.produto_id = produtos.id " +
                "WHERE pedido_id = ?";
        String sql = "SELECT * FROM itens_pedidos WHERE pedido_id = ? ";
        return jdbcTemplate.query(sql2, itensCarrinhoDTO, new Object[]{pedidoId});
    }

    public ItemPedido buscarItemPedido(Long pedidoId, Long produtoId) {
        String sql = "SELECT * FROM itens_pedidos WHERE pedido_id = ? AND produto_id = ?";
        return jdbcTemplate.queryForObject(sql, itemRowMapper, new Object[]{pedidoId, produtoId});
    }

    public void atualizarItemPedido(Long pedidoId, Long produtoId, Integer quantidade, Double preco) {
        String sql = "UPDATE itens_pedidos set preco = ?, quantidade = ?  WHERE pedido_id = ? AND produto_id = ?";
        jdbcTemplate.update(sql, preco, quantidade, pedidoId, produtoId);
    }

    public void removerItem(Long pedidoId, Long produtoId) {
        String sql =  "DELETE from itens_pedidos WHERE pedido_id = ? AND produto_id = ?";
        jdbcTemplate.update(sql, pedidoId, produtoId);
    }

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
        item.setPedidoId(rs.getLong("pedido_id"));
        item.setNome(rs.getString("nome"));      // precisa existir em ItemPedido
        item.setDescricao(rs.getString("descricao"));
        item.setQuantidade(rs.getInt("quantidade"));
        item.setPreco(rs.getDouble("preco"));

        return item;
    };
}
