package com.trabalhobd.lojaeletronicos.services;

import com.trabalhobd.lojaeletronicos.models.DTOs.ItemPedidoProduto;
import com.trabalhobd.lojaeletronicos.models.DTOs.ItensCarrinhosDTO;
import com.trabalhobd.lojaeletronicos.models.ItemPedido;
import com.trabalhobd.lojaeletronicos.models.Pagamento;
import com.trabalhobd.lojaeletronicos.models.Pedido;
import com.trabalhobd.lojaeletronicos.models.Produto;
import com.trabalhobd.lojaeletronicos.models.enums.PedidoEnum;
import com.trabalhobd.lojaeletronicos.repositories.ItemPedidoRepository;
import com.trabalhobd.lojaeletronicos.repositories.PagamentoRepository;
import com.trabalhobd.lojaeletronicos.repositories.PedidoRepository;
import com.trabalhobd.lojaeletronicos.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private PagamentoRepository pagamentoRepository;


    public void adicionarAoCarrinho(Long clienteId, Long produtoId, Integer quantidade) {
        Pedido carrinho;
        Long novoPedidoId = 0L;
        try {
            carrinho = pedidoRepository.buscarCarrinhoPorCliente(clienteId);
            novoPedidoId = carrinho.getId();

        } catch (EmptyResultDataAccessException e) {
            novoPedidoId = pedidoRepository.criarCarrinho(clienteId);
            carrinho = new Pedido();
            carrinho.setId(novoPedidoId);
            carrinho.setIdUsuario(clienteId);
            carrinho.setStatus(PedidoEnum.RASCUNHO.getStatus());
            carrinho.setValorTotal(0.0);
        }

        Produto produto = produtoRepository.findById(produtoId);
        double novoValor = produto.getPrecoUnico() * quantidade;

        try {
            itemPedidoRepository.adicionarItem(novoPedidoId, produtoId, quantidade, novoValor);
        } catch (Exception e) {
            atualizarItemPedido(novoPedidoId, produtoId, quantidade, true);
            return;
        }

        Double novoTotal = carrinho.getValorTotal() + novoValor;
        pedidoRepository.atualizarValorTotal(carrinho.getId(), novoTotal);
    }

    public void removerItem(Long idUsuario, Long idProduto) {
        //itemPedidoRepository.removerItem(idUsuario, idProduto);
        var carrinho = pedidoRepository.buscarCarrinhoPorCliente(idUsuario);
        if (carrinho == null) {
            return;
        }
        atualizarItemPedido(carrinho.getId(), idProduto, 1, false);

    }

    public void atualizarItemPedido(Long pedidoId, Long produtoId, Integer quantidade, boolean aumentar) {
        Produto produto = produtoRepository.findById(produtoId);
        double novoValor = produto.getPrecoUnico() * quantidade;

        ItemPedido item = itemPedidoRepository.buscarItemPedido(pedidoId, produtoId);

        if (aumentar) {
            itemPedidoRepository.atualizarItemPedido(pedidoId,
                    produtoId,
                    item.getQuantidade() + quantidade,
                    item.getPreco() + novoValor);
        } else {
            int novaQtd = item.getQuantidade() - quantidade;
            if (novaQtd <= 0) {
                itemPedidoRepository.removerItem(pedidoId, produtoId);
                return;
            }
            itemPedidoRepository.atualizarItemPedido(pedidoId,
                    produtoId,
                    novaQtd,
                    item.getPreco() - novoValor);
        }
        Pedido pedido = pedidoRepository.encontrarPedidoPorId(pedidoId);
        pedidoRepository.atualizarValorTotal(pedido.getId(), novoValor);

    }

    public Long comprarProdutoDireto(Integer clienteId, Long produtoId, Integer quantidade) throws Exception {
        // Buscar dados do produto

        var produto = produtoRepository.findById(produtoId);
        if (produto == null) {
            throw new RuntimeException("Produto não encontrado");
        }
        if (produto.getQuantidadeEstoque() < quantidade) {
            throw new Exception(
                    "Estoque insuficiente para o produto: " + produto.getNome()+
                            ". Escolha outro produto ou diminua a quantidade a ser comprada!"
            );
        }

        Double valorTotal = ((double) produto.getPrecoUnico()) * quantidade;

        // Criar o pedido aguardando pagamento
        Long pedidoId = pedidoRepository.criarPedidoDireto(clienteId, valorTotal);

        // Adicionar o produto ao pedido
        itemPedidoRepository.adicionarItem(pedidoId, produtoId, quantidade, valorTotal);

        return pedidoId;
    }

    public List<ItensCarrinhosDTO> listarItensDoCarrinho(Long clienteId) {
        Pedido carrinho = pedidoRepository.buscarCarrinhoPorCliente(clienteId);
        return itemPedidoRepository.listarItensPorPedido(carrinho.getId());
    }

    public void finalizarCarrinho(Long pedidoId) throws Exception{
        veridicarDisponibilidade(pedidoId);
        pedidoRepository.atualizarPedido(pedidoId, PedidoEnum.AGUARDANDO_PAGAMENTO.getStatus());
    }

    private void veridicarDisponibilidade(Long pedidoId) throws Exception {
        var itens = itemPedidoRepository.listarItensPedido(pedidoId);

        for (ItemPedidoProduto i : itens) {
            if (i.getQuantidadeEstoque() < i.getQuantidadeDesejada()) {
                throw new Exception(
                        "Estoque insuficiente para o produto: " + i.getNome()+
                                ". Escolha outro produto ou diminua a quantidade a ser comprada!"
                );
            }

        }
    }

    public void concluirPagamento(Long pedidoId, String formaPagamento, Integer qtd_parcelas) {
        Pedido pedido = pedidoRepository.encontrarPedidoPorId(pedidoId);
        float valorTotal = (float) (1.0F * pedido.getValorTotal());

        Pagamento pagamento = new Pagamento();
        pagamento.setMetodo_pagamento(formaPagamento);
        pagamento.setQuantidade_parcelas(qtd_parcelas);
        pagamento.setValor(valorTotal);
        pagamento.setIdPedido(pedidoId);

        pagamentoRepository.create(pagamento);

        pedidoRepository.atualizarPedido(pedidoId, PedidoEnum.CONCLUIDO.getStatus());

        var itens = itemPedidoRepository.listarItensPedido(pedidoId);

        itens.forEach( item -> {
            produtoRepository.updateProdutoQuantidade(item.getProdutoId(),  -item.getQuantidadeDesejada());
        });

    }

    public List<Pedido> buscarPedidosPorUsuarioId(Long usuarioId) {
        return pedidoRepository.buscarPedidosPorCliente(usuarioId);
    }

    public void cancelarPedido(Long pedidoId) {
        pedidoRepository.cancelarPedido(pedidoId);
    }

    public List<Pedido> buscarTodosPedidos() {
        return pedidoRepository.encontrarTodosPedidos();
    }
}
