package com.trabalhobd.lojaeletronicos.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PedidoEnum {
    EM_ANDAMENTO("em_andamento"),
    CONCLUIDO("concluido"),
    CANCELADO("cancelado"),
    AGUARDANDO_PAGAMENTO("aguardando_pagamento"),
    RASCUNHO("rascunho");

    private String status;
}
