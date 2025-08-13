package com.trabalhobd.lojaeletronicos.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trabalhobd.lojaeletronicos.models.Pagamento;
import com.trabalhobd.lojaeletronicos.services.PagamentoService;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/pagamentos")
public class PagamentoController{

    private PagamentoService pagamentoService;

    public PagamentoController(PagamentoService pagamentoService){
        this.pagamentoService = pagamentoService;
    }

    @PostMapping
    public ResponseEntity<Void> criarNovoPagamento(@RequestBody Pagamento pagamento){
        pagamentoService.criarNovoPagamento(pagamento);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity <List<Pagamento>> todosPagamentos(){
        List<Pagamento> pagamentos = pagamentoService.listarTodosPagamentos();
        return ResponseEntity.ok(pagamentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> procurarPagamentoPorID(@PathVariable Long id){
        Pagamento achado = pagamentoService.procurarPagamentoPorID(id);
        if(achado == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(achado);
    }

    @GetMapping("/data")
    public ResponseEntity <List<Pagamento>> procurarPagamentosPorData(@RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate data){
        var pagamentos = pagamentoService.procurarPagamentoPeloDia(data);
        return ResponseEntity.ok(pagamentos);
    }

    @GetMapping("/pedido")
    public ResponseEntity<Pagamento> procurarPagamentoPorIdPedido(@RequestParam Long idPedido) {
        Pagamento pagamento = pagamentoService.procurarPagamentoPorIdPedido(idPedido);
        if(pagamento == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pagamento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarDadosPagamento (@PathVariable Long id, @RequestBody Pagamento pagamento){
        pagamentoService.atualizarDadosPagamento(id, pagamento);
        return ResponseEntity.ok().build();
    }
    
}