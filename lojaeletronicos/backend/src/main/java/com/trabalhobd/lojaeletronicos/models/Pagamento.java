package com.trabalhobd.lojaeletronicos.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Pagamento implements Serializable {
    private Long idPagamento;
    private float valor;
    private LocalDateTime data_pagamento;
    private String metodo_pagamento;
    private int quantidade_parcelas;

    public Pagamento(float valor, LocalDateTime data_pagamento, String metodo_pagamento, int quantidade_parcelas){
        this.valor = valor;
        this.data_pagamento = data_pagamento;
        this.metodo_pagamento = metodo_pagamento;
        this.quantidade_parcelas = quantidade_parcelas;
    }

}