export const mockDataRelatorios = {
    metricas: {
        receitaTotal: 125450.75,
        valorMedioPedido: 387.50,
        totalPedidos: 324,
        produtosBaixoEstoque: 15,
        produtosEsgotados: 8,
        clientesAtivos: 89
    },

    produtosBaixoEstoque: [
        { id: 1, nome: 'iPhone 14 Pro Max', categoria: 'Smartphones', estoque: 3, minimo: 10 },
        { id: 2, nome: 'MacBook Air M2', categoria: 'Notebooks', estoque: 2, minimo: 5 },
        { id: 3, nome: 'AirPods Pro', categoria: 'Acessórios', estoque: 5, minimo: 15 },
        { id: 4, nome: 'Samsung Galaxy S23', categoria: 'Smartphones', estoque: 4, minimo: 8 },
        { id: 5, nome: 'Dell XPS 13', categoria: 'Notebooks', estoque: 1, minimo: 5 }
    ],

    produtosEsgotados: [
        { id: 6, nome: 'iPad Pro 12.9"', categoria: 'Tablets', ultimaVenda: '2025-08-14' },
        { id: 7, nome: 'Sony WH-1000XM5', categoria: 'Acessórios', ultimaVenda: '2025-08-13' },
        { id: 8, nome: 'Nintendo Switch OLED', categoria: 'Games', ultimaVenda: '2025-08-15' },
        { id: 9, nome: 'Apple Watch Series 9', categoria: 'Wearables', ultimaVenda: '2025-08-12' }
    ],

    vendasPorProduto: [
        { nome: 'iPhone 14', vendas: 45, receita: 67500.00, categoria: 'Smartphones' },
        { nome: 'MacBook Pro', vendas: 23, receita: 48300.00, categoria: 'Notebooks' },
        { nome: 'AirPods', vendas: 67, receita: 20100.00, categoria: 'Acessórios' },
        { nome: 'Samsung Galaxy', vendas: 34, receita: 27200.00, categoria: 'Smartphones' },
        { nome: 'iPad Air', vendas: 28, receita: 19600.00, categoria: 'Tablets' }
    ],

    clientesMaisAtivos: [
        { id: 1, nome: 'João Silva', email: 'joao@email.com', totalPedidos: 8, ultimoPedido: '2025-08-15' },
        { id: 2, nome: 'Maria Santos', email: 'maria@email.com', totalPedidos: 6, ultimoPedido: '2025-08-14' },
        { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', totalPedidos: 5, ultimoPedido: '2025-08-13' },
        { id: 4, nome: 'Ana Oliveira', email: 'ana@email.com', totalPedidos: 5, ultimoPedido: '2025-08-16' },
        { id: 5, nome: 'Carlos Lima', email: 'carlos@email.com', totalPedidos: 4, ultimoPedido: '2025-08-12' }
    ],

    clientesQueMaisGastam: [
        { id: 1, nome: 'Roberto Almeida', email: 'roberto@email.com', totalGasto: 12450.00, pedidos: 3 },
        { id: 2, nome: 'Fernanda Castro', email: 'fernanda@email.com', totalGasto: 9850.00, pedidos: 4 },
        { id: 3, nome: 'Lucas Barbosa', email: 'lucas@email.com', totalGasto: 8900.00, pedidos: 2 },
        { id: 4, nome: 'Patricia Rocha', email: 'patricia@email.com', totalGasto: 7600.00, pedidos: 5 },
        { id: 5, nome: 'Thiago Mendes', email: 'thiago@email.com', totalGasto: 6750.00, pedidos: 3 }
    ]
};