package com.trabalhobd.lojaeletronicos.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemPedidoProduto {

    private Long produtoId;
    private String nome;
    private Integer quantidadeDesejada;
    private Integer quantidadeEstoque;

}
