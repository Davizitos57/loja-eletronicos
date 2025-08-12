package com.trabalhobd.lojaeletronicos.repositories;

import com.trabalhobd.lojaeletronicos.models.Pedido;
import com.trabalhobd.lojaeletronicos.models.enums.PedidoEnum;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class PedidoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Pedido> pedidoRowMapper = (rs, rowNum) -> {
        Pedido pedido = new Pedido();
        pedido.setId(rs.getLong("id"));
        pedido.setIdUsuario(rs.getLong("id_usuario"));
        pedido.setStatus(rs.getString("status"));
        pedido.setValorTotal(rs.getBigDecimal("valor_total").doubleValue());
        return pedido;
    };

    public List<Pedido> encontrarTodosPedidos() {
        String sql = "SELECT * FROM pedidos where NOT (status = 'rascunho')";
        List<Pedido> pedidos = jdbcTemplate.query(sql, pedidoRowMapper);
        return pedidos;
    }

    public Pedido encontrarPedidoPorId(Long id) {
        String sql = "SELECT * FROM pedidos WHERE id = ?";
        Pedido pedido;
        try {
            pedido = jdbcTemplate.queryForObject(sql, pedidoRowMapper, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
        return pedido;
    }

    public Long criarCarrinho(Long clienteId) {
        String sql = "INSERT INTO pedidos (id_usuario, status, valor_total) VALUES (?, 'rascunho', 0.0) RETURNING id";
        return jdbcTemplate.queryForObject(sql, Long.class, clienteId);
    }

    public Long criarPedidoDireto(Integer clienteId, Double valorTotal) {
        String sql = "INSERT INTO pedidos (id_usuario, status, valor_total) VALUES (?, 'AGUARDANDO_PAGAMENTO', ?) RETURNING id";
        return jdbcTemplate.queryForObject(sql, Long.class, clienteId, valorTotal);
    }

    public Pedido buscarCarrinhoPorCliente(Long clienteId) {
        String sql = "SELECT * FROM pedidos WHERE id_usuario = ? AND status = 'rascunho'";
        Pedido pedido;
        try {
            pedido = jdbcTemplate.queryForObject(sql, new Object[]{clienteId}, pedidoRowMapper);
        } catch (EmptyResultDataAccessException e) {
            throw new EmptyResultDataAccessException(1);
        }
        return pedido;
    }

    public List<Pedido> buscarPedidosPorCliente(Long clienteId) {
        String sql = "SELECT * FROM pedidos WHERE id_usuario = ? AND NOT (status = 'rascunho')";
        return jdbcTemplate.query(sql, new Object[]{clienteId}, pedidoRowMapper);
    }

    public void atualizarValorTotal(Long pedidoId, Double novoTotal) {
        String sql = "UPDATE pedidos SET valor_total = ? WHERE id = ?";
        jdbcTemplate.update(sql, novoTotal, pedidoId);
    }

    public void cancelarPedido(Long pedidoId) {
        String sql = "UPDATE pedidos SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, PedidoEnum.CANCELADO.getStatus(), pedidoId);
    }

    public void atualizarPedido(Long pedidoId, String status) {
        String sql = "UPDATE pedidos SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, pedidoId);
    }

}
