package com.trabalhobd.lojaeletronicos.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pedido implements Serializable {

    private Long id;
    private Double valorTotal;
    private Long idUsuario;
    private String status;

    public Pedido(Double valorTotal, Long idUsuario, String status) {
        this.valorTotal = valorTotal;
        this.idUsuario = idUsuario;
        this.status = status;
    }
}
