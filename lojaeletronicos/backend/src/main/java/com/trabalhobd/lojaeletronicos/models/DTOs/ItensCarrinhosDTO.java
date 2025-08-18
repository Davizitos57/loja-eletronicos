package com.trabalhobd.lojaeletronicos.models.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ItensCarrinhosDTO implements Serializable {

    private Long produtoId;
    private String nome;
    private String descricao;
    private Integer quantidade;
    private Double preco;
}
