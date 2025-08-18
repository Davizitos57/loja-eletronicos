package com.trabalhobd.lojaeletronicos.controllers;

import com.trabalhobd.lojaeletronicos.models.DTOs.ItensCarrinhosDTO;
import com.trabalhobd.lojaeletronicos.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens")
@CrossOrigin(origins = "http://localhost:5173", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS
}, allowedHeaders = "*")
public class ItensPedidosController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Void> adicionarProduto(@RequestParam Long clienteId,
                                                 @RequestParam Long produtoId,
                                                 @RequestParam Integer quantidade) {
        pedidoService.adicionarAoCarrinho(clienteId, produtoId, quantidade);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> removerProduto(
        @RequestParam Long clienteId,
        @RequestParam Long produtoId
    ) {
        try {
            pedidoService.removerItem(clienteId, produtoId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ItensCarrinhosDTO>> listarCarrinho(@RequestParam Long clienteId) {
        List<ItensCarrinhosDTO> itens = pedidoService.listarItensDoCarrinho(clienteId);
        if (itens == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(itens);
    }
}
