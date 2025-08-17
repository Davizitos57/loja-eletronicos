package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.DTOs.UsuarioDTO;
import com.trabalhobd.lojaeletronicos.services.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relatorios")
@CrossOrigin(origins = "http://localhost:5173")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/produtos/baixo-estoque")
    public ResponseEntity<List<Map<String, Object>>> produtosBaixoEstoque(
            @RequestParam(defaultValue = "5") int limite) {
        return ResponseEntity.ok(relatorioService.getProdutosBaixoEstoque(limite));
    }

    @GetMapping("/produtos/esgotados")
    public ResponseEntity<List<Map<String, Object>>> produtosEsgotados() {
        return ResponseEntity.ok(relatorioService.getProdutosEsgotados());
    }

    @GetMapping("/receita-total")
    public ResponseEntity<Double> receitaTotal(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate inicio,
                                               @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fim) {
        return ResponseEntity.ok(relatorioService.getReceitaTotal(inicio, fim));
    }

    @GetMapping("/vendas/produto")
    public ResponseEntity<List<Map<String, Object>>> vendasPorProduto() {
        return ResponseEntity.ok(relatorioService.getVendasPorProduto());
    }

    @GetMapping("/mais-ativos")
    public ResponseEntity<List<UsuarioDTO>> getClientesMaisAtivos() {
        return ResponseEntity.ok(relatorioService.clientesMaisAtivos());
    }

    @GetMapping("/mais-gastam")
    public ResponseEntity<List<UsuarioDTO>> getClientesQueMaisGastam() {
        return ResponseEntity.ok(relatorioService.clientesQueMaisGastam());
    }

    @GetMapping("/valor-medio-pedido")
    public ResponseEntity<Double> getValorMedioPorPedido() {
        return ResponseEntity.ok(relatorioService.valorMedioPorPedido());
    }
}
