package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.Pedido;
import com.trabalhobd.lojaeletronicos.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/finalizar")
    public ResponseEntity<Void> finalizar(@RequestParam Long pedidoId) {
        pedidoService.finalizarCarrinho(pedidoId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/concluir")
    public ResponseEntity<Void> concluirPedido(@RequestParam Long pedidoId,
                                               @RequestParam String forma_pagamento,
                                               @RequestParam(required = false) Integer quantidade_parcelas) {
        if (quantidade_parcelas == null) {
            quantidade_parcelas = 1;
        }
        pedidoService.concluirPagamento(pedidoId, forma_pagamento, quantidade_parcelas);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/comprar-direto")
    public ResponseEntity<Long> comprarDireto(
            @RequestParam Integer clienteId,
            @RequestParam Long produtoId,
            @RequestParam Integer quantidade) {

        Long pedidoId = pedidoService.comprarProdutoDireto(clienteId, produtoId, quantidade);
        return ResponseEntity.ok(pedidoId);
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<Pedido>> buscarPedidosPorUsuarioId(@PathVariable Long usuarioId) {
        var pedidos = pedidoService.buscarPedidosPorUsuarioId(usuarioId);
        if (pedidos == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pedidos);
    }

    @PutMapping("/{pedidoId}")
    public ResponseEntity<List<Pedido>> cancelarPedido(@PathVariable Long pedidoId) {
        pedidoService.cancelarPedido(pedidoId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> buscarTodosPedidos() {
        var pedidos = pedidoService.buscarTodosPedidos();
        if (pedidos == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pedidos);
    }
}

