package com.trabalhobd.lojaeletronicos.services;

import com.trabalhobd.lojaeletronicos.models.DTOs.UsuarioDTO;
import com.trabalhobd.lojaeletronicos.models.Usuario;
import com.trabalhobd.lojaeletronicos.repositories.RelatorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class RelatorioService {

    @Autowired
    private RelatorioRepository relatorioRepository;

    public List<Map<String, Object>> getProdutosBaixoEstoque(int limite) {
        return relatorioRepository.produtosBaixoEstoque(limite);
    }

    public List<Map<String, Object>> getProdutosEsgotados() {
        return relatorioRepository.produtosEsgotados();
    }

    public Double getReceitaTotal(LocalDate inicio, LocalDate fim) {
        return relatorioRepository.receitaTotal(inicio, fim);
    }

    public List<Map<String, Object>> getVendasPorProduto() {
        return relatorioRepository.vendasPorProduto();
    }

    public List<UsuarioDTO> clientesMaisAtivos() {
        return relatorioRepository.clientesMaisAtivos();
    }

    public List<UsuarioDTO> clientesQueMaisGastam() {
        return relatorioRepository.clientesQueMaisGastam();
    }

    public double valorMedioPorPedido() {
        return relatorioRepository.valorMedioPorPedido();
    }
}
