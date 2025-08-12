package com.trabalhobd.lojaeletronicos.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemPedido implements Serializable {

    private Long pedidoId;
    private Long produtoId;
    private Integer quantidade;
    private Double preco;
}
