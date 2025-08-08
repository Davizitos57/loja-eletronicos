package com.trabalhobd.lojaeletronicos.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Categoria {
    private Long idCateogia;
    private String nome;

    public Categoria(String nome){
        this.nome = nome;
    }
}
