package com.trabalhobd.lojaeletronicos.services;

import org.springframework.stereotype.Service;

import com.trabalhobd.lojaeletronicos.models.Pagamento;
import com.trabalhobd.lojaeletronicos.repositories.PagamentoRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class PagamentoService {
    private PagamentoRepository pagamentoRepository;

    public PagamentoService(PagamentoRepository pagamentoRepository){
        this.pagamentoRepository = pagamentoRepository;
    }

    public void criarNovoPagamento(Pagamento pagamento){
        if (pagamento.getQuantidade_parcelas() <= 0) {
            pagamento.setQuantidade_parcelas(1);
        }
        pagamentoRepository.create(pagamento);
    }

    public Pagamento procurarPagamentoPorID(Long idPagamento){
        return pagamentoRepository.findById(idPagamento);
    }

    public List<Pagamento> listarTodosPagamentos(){
        return pagamentoRepository.findAllPagamento();
    }

    public List<Pagamento> procurarPagamentoPeloDia(LocalDate dataPagamento){
        return pagamentoRepository.findPagamentosByDay(dataPagamento);
    }

    public Pagamento procurarPagamentoPorIdPedido(Long idPedido) {
        return pagamentoRepository.findPagamentoByIdPedido(idPedido);
    }

    public void atualizarDadosPagamento(Long idPagamento, Pagamento pagamento){
        pagamentoRepository.updatePagamentoData(idPagamento, pagamento);
    }
}

