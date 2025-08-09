package com.trabalhobd.lojaeletronicos.repositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.trabalhobd.lojaeletronicos.models.Pagamento;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class PagamentoRepository{

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Pagamento> pagamRowMapper = (rs, rowNum) -> {
        Pagamento pagamento = new Pagamento();
        pagamento.setIdPagamento(rs.getLong("id"));
        pagamento.setValor(rs.getFloat("valor"));
        pagamento.setData_pagamento(rs.getTimestamp("data_pagamento").toLocalDateTime());
        pagamento.setMetodo_pagamento(rs.getString("metodo_pagamento"));
        pagamento.setQuantidade_parcelas(rs.getInt("quantidade_parcelas"));
        
        return pagamento;
    };

    public void create(Pagamento pagamento){
        String sql = "INSERT INTO pagamentos (valor, metodo_pagamento, quantidade_parcelas) VALUES (?,?,?)";
        jdbcTemplate.update(sql, pagamento.getValor(), pagamento.getMetodo_pagamento(), pagamento.getQuantidade_parcelas());
    }

    public List<Pagamento> findAllPagamento (){
        String sql = "SELECT * FROM pagamentos";
        List<Pagamento> pagamento = jdbcTemplate.query(sql, pagamRowMapper);
        return pagamento;
    }

    public Pagamento findById(Long idPagamento){
        String sql = "SELECT * FROM pagamentos WHERE id = ?";
        Pagamento pagamento; 

        try{
            pagamento = jdbcTemplate.queryForObject(sql, pagamRowMapper, idPagamento);
        }
        catch(EmptyResultDataAccessException e){
            return null;
        }
        return pagamento;
    }

    public List<Pagamento> findPagamentosByDay(LocalDate dia){
        LocalDateTime inicio = dia.atStartOfDay();
        LocalDateTime fim = inicio.plusDays(1);
        
        String sql = "SELECT * FROM pagamentos WHERE data_pagamento >= ? AND data_pagamento < ?";
        return jdbcTemplate.query(sql, pagamRowMapper, inicio, fim);
    }

    public void updatePagamentoData(Long idPagamento, Pagamento pagamento){
        String sql = "UPDATE pagamentos SET valor = ?, data_pagamento = ?, metodo_pagamento = ?, quantidade_parcelas = ? WHERE id = ?";
        jdbcTemplate.update(sql, pagamento.getValor(), pagamento.getData_pagamento(), pagamento.getMetodo_pagamento(), pagamento.getQuantidade_parcelas(), idPagamento);
    }

}