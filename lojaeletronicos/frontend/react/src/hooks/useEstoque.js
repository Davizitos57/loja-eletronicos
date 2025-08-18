import { useState, useCallback } from 'react';

export function useEstoque() {
    const [reservas, setReservas] = useState(new Map()); // Map<produtoId, quantidade>
    const [timeouts, setTimeouts] = useState(new Map()); // Map<produtoId, timeoutId>

    // Função para reservar quantidade temporariamente
    const reservarQuantidade = useCallback((produtoId, quantidade) => {
        // Limpar timeout anterior se existir
        const timeoutAnterior = timeouts.get(produtoId);
        if (timeoutAnterior) {
            clearTimeout(timeoutAnterior);
        }

        // Adicionar nova reserva
        setReservas(prev => new Map(prev).set(produtoId, quantidade));

        // Criar timeout para liberar reserva em 10 minutos
        const novoTimeout = setTimeout(() => {
            liberarReserva(produtoId);
        }, 10 * 60 * 1000); // 10 minutos

        setTimeouts(prev => new Map(prev).set(produtoId, novoTimeout));

        console.log(`Reservado ${quantidade} unidades do produto ${produtoId} por 10 minutos`);
    }, [timeouts]);

    // Função para liberar reserva
    const liberarReserva = useCallback((produtoId) => {
        setReservas(prev => {
            const novaReservas = new Map(prev);
            novaReservas.delete(produtoId);
            return novaReservas;
        });

        const timeout = timeouts.get(produtoId);
        if (timeout) {
            clearTimeout(timeout);
            setTimeouts(prev => {
                const novosTimeouts = new Map(prev);
                novosTimeouts.delete(produtoId);
                return novosTimeouts;
            });
        }

        console.log(`Reserva do produto ${produtoId} liberada`);
    }, [timeouts]);

    // Função para confirmar compra (finalizar reserva)
    const confirmarCompra = useCallback((produtoId) => {
        const quantidade = reservas.get(produtoId);
        if (quantidade) {
            liberarReserva(produtoId);
            console.log(`Compra confirmada: ${quantidade} unidades do produto ${produtoId}`);
            return quantidade;
        }
        return 0;
    }, [reservas, liberarReserva]);

    // Função para obter estoque disponível
    const obterEstoqueDisponivel = useCallback((produto) => {
        const reservado = reservas.get(produto.id) || 0;
        return Math.max(0, produto.quantidadeEstoque - reservado);
    }, [reservas]);

    // Função para obter quantidade reservada
    const obterQuantidadeReservada = useCallback((produtoId) => {
        return reservas.get(produtoId) || 0;
    }, [reservas]);

    return {
        reservarQuantidade,
        liberarReserva,
        confirmarCompra,
        obterEstoqueDisponivel,
        obterQuantidadeReservada,
        reservas: Array.from(reservas.entries())
    };
}