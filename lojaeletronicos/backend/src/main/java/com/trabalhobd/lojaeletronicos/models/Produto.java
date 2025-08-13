package com.trabalhobd.lojaeletronicos.models;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Produto implements Serializable {

    private Long idProduto;
    private String nome;
    private String descricao;
    private float precoUnico;
    private int quantidadeEstoque;
    private boolean aVenda = true;
    private int idCategoria;

    public Produto(String nome, String descricao, float precoUnico, int quantidadeEstoque){
        this.nome = nome;
        this.descricao = descricao;
        this.precoUnico = precoUnico;
        this.quantidadeEstoque = quantidadeEstoque;
    }
}
