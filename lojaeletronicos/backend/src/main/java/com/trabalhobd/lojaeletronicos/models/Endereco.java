package com.trabalhobd.lojaeletronicos.models;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class Endereco implements Serializable {

    private Long id;
    private Long idUsuario;
    private String rua;
    private Integer numero;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;

}
