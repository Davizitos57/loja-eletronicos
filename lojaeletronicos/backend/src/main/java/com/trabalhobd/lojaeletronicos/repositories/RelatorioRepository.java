package com.trabalhobd.lojaeletronicos.repositories;

import com.trabalhobd.lojaeletronicos.models.DTOs.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class RelatorioRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UsuarioDTO> clientesMaisAtivos() {
        String sql = "SELECT u.id, u.nome, COUNT(p.id) AS total_pedidos FROM usuarios u "
                + "INNER JOIN pedidos p ON p.id_usuario = u.id "
                + "GROUP BY u.id, u.nome "
                + "ORDER BY total_pedidos DESC "
                + "LIMIT 10";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            UsuarioDTO c = new UsuarioDTO();
            c.setIdUsuario(rs.getLong("id"));
            c.setNome(rs.getString("nome"));
            c.setTotalPedidos(rs.getInt("total_pedidos"));
            return c;
        });
    }

    public List<UsuarioDTO> clientesQueMaisGastam() {
        String sql = "SELECT u.id, u.nome, SUM(p.valor_total) AS total_gasto FROM usuarios u "
            + "INNER JOIN pedidos p ON p.id_usuario = u.id "
            + "WHERE p.status = 'concluido' "
            + "GROUP BY u.id, u.nome "
            + "ORDER BY total_gasto DESC ";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            UsuarioDTO c = new UsuarioDTO();
            c.setIdUsuario(rs.getLong("id"));
            c.setNome(rs.getString("nome"));
            c.setTotalGasto(rs.getDouble("total_gasto"));
            return c;
        });
    }

    public double valorMedioPorPedido() {
        String sql = "SELECT AVG(valor) FROM pagamentos";
        var result = jdbcTemplate.queryForObject(sql, Double.class);
        if (result == null) {
            return 0.00;
        }
        return result;
    }

    public List<Map<String, Object>> produtosBaixoEstoque(int limite) {
        String sql = "SELECT id, nome, quantidade_estoque FROM produtos WHERE quantidade_estoque <= ?";
        return jdbcTemplate.queryForList(sql, limite);
    }

    public List<Map<String, Object>> produtosEsgotados() {
        String sql = "SELECT id, nome FROM produtos WHERE quantidade_estoque = 0";
        return jdbcTemplate.queryForList(sql);
    }

    public Double receitaTotal(LocalDate inicio, LocalDate fim) {
        String sql = "SELECT SUM(valor) FROM pagamentos WHERE DATE(data_pagamento) BETWEEN ? AND ?";
        return jdbcTemplate.queryForObject(sql, Double.class, inicio, fim);
    }

    public List<Map<String, Object>> vendasPorProduto() {
        String sql = "SELECT p.id, p.nome, SUM(ip.quantidade) AS total_vendido FROM itens_pedidos ip "
            + "INNER JOIN produtos p ON ip.produto_id = p.id "
            + "INNER JOIN pedidos ped ON ip.pedido_id = ped.id "
            + "WHERE ped.status = 'concluido' "
            + "GROUP BY p.id, p.nome "
            + "ORDER BY total_vendido DESC";
        return jdbcTemplate.queryForList(sql);
    }
}
