package com.trabalhobd.lojaeletronicos.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

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
    private String senha;
    private String tipoUsuario;
    private List<Endereco> enderecos;
    private int excluido;

    public Usuario(String nome, String email, String cpf, String telefone, String senha, String tipoUsuario, int excluido) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
        this.excluido = excluido;
    }
}
