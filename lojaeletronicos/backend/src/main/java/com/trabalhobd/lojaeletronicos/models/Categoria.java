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

public class Categoria implements Serializable {
    private Long idCategoria;
    private String nome;

    public Categoria(String nome){
        this.nome = nome;
    }
}
