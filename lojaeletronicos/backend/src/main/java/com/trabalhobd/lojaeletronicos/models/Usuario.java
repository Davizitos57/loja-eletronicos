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
public class Usuario implements Serializable {

    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private String endereco;

    public Usuario(String nome, String email, String cpf, String telefone, String endereco) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
    }
}
