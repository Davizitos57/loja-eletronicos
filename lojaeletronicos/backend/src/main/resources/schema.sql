DROP TABLE IF EXISTS pagamentos;
DROP TABLE IF EXISTS itens_pedidos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS enderecos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone TEXT,
    senha VARCHAR(20),
    tipo_usuario VARCHAR(5) DEFAULT 'BASIC',
    excluido integer DEFAULT 0
);

CREATE TABLE categorias (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL 
);

CREATE TABLE produtos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_unico NUMERIC(10, 2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL, 
    ativo BOOLEAN DEFAULT TRUE,
    id_categoria INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

CREATE TABLE enderecos (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rua VARCHAR(100) NOT NULL,
    numero INTEGER,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    complemento VARCHAR(20) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    id_usuario integer,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE pedidos (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    valor_total DECIMAL NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'rascunho',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE itens_pedidos (
    pedido_id INTEGER,
    produto_id INTEGER,
    preco DECIMAL NOT NULL,
    quantidade INTEGER NOT NULL,

    CONSTRAINT itens_pedidos_pk PRIMARY KEY (pedido_id, produto_id)
);

CREATE TABLE pagamentos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    valor NUMERIC(10,2) NOT NULL,
    data_pagamento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    metodo_pagamento VARCHAR(50),
    quantidade_parcelas INTEGER NOT NULL DEFAULT 1,
    id_pedido INTEGER,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
);

INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Maria', 'maria@gmail.com', '111111', '319959125', '1234', 'ADMIN', 0);
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Joao', 'joao@gmail.com', '222222', '319959125', '1234', 'BASIC', 0);
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('José', 'jose@gmail.com', '333333', '319959125','1234', 'BASIC', 0);
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Bob', 'bob@gmail.com', '444444', '319959125', '1234', 'BASIC', 0) ;
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Alex', 'alex@gmail.com', '555555', '319959125', '1234', 'BASIC', 0);

INSERT INTO enderecos (rua, numero, bairro, cidade, estado, complemento, cep, id_usuario) VALUES ('Av. Getulio Vargas', 100, 'Bela Onda', 'Betim', 'Minas Gerais', 'Casa', '3500000', 1);
INSERT INTO enderecos (rua, numero, bairro, cidade, estado, complemento, cep, id_usuario) VALUES ('Av. Brasil', 1, 'Lago Azul', 'Rio de Janeiro', 'Rio de Janeiro', 'Casa', '6200065', 1);
INSERT INTO enderecos (rua, numero, bairro, cidade, estado, complemento, cep, id_usuario) VALUES ('Rua Nova York', 25, 'Cruzeiro Celeste', 'Joao Monlevade', 'Minas Gerais', 'Apartamento', '5693254', 2);
INSERT INTO enderecos (rua, numero, bairro, cidade, estado, complemento, cep, id_usuario) VALUES ('Av. Wilson Alvarega', 1, 'Vila Tanque', 'Joao Monlevade', 'Minas Gerais', 'Casa', '9658723', 3);
INSERT INTO enderecos (rua, numero, bairro, cidade, estado, complemento, cep, id_usuario) VALUES ('Rua Presidente Prudente', 1, 'Pingo Dourado', 'Governador Valadares', 'Minas Gerais', 'Apartamento', '7894561', 4);

INSERT INTO categorias (nome) VALUES ('Sem Categoria');
INSERT INTO categorias (nome) VALUES ('Computadores e Notebooks');
INSERT INTO categorias (nome) VALUES ('Celulares e Smartphones');
INSERT INTO categorias (nome) VALUES ('Tablets');
INSERT INTO categorias (nome) VALUES ('E-Readers');
INSERT INTO categorias (nome) VALUES ('Televisões');
INSERT INTO categorias (nome) VALUES ('Games e Consoles');
INSERT INTO categorias (nome) VALUES ('Componentes de Hardware');
INSERT INTO categorias (nome) VALUES ('Acessórios');
INSERT INTO categorias (nome) VALUES ('Periféricos');
INSERT INTO categorias (nome) VALUES ('Wearables');

INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Notebook Lenovo IdeaPad 3', 'Processador Intel Core i5, 8GB RAM, SSD 256GB, Tela 15.6"', 2899.00, 20, 2);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Console PlayStation 5', 'Console com SSD de altíssima velocidade e controle DualSense', 4599.99, 10, 3);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Teclado Mecânico Redragon Kumara', 'Switches Outemu Blue, LED Vermelho, ABNT2', 199.90, 80, 4);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Fone de Ouvido Bluetooth JBL Tune 510BT', 'Fone sem fio com até 40h de bateria, som JBL Pure Bass', 249.99, 100, 5);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Roteador TP-Link Archer AX10', 'Wi-Fi 6, Dual Band, 1201 Mbps, 4 antenas, MU-MIMO', 349.00, 40);

INSERT INTO pedidos (id_usuario, valor_total, status) VALUES (1, 2899.00, 'concluido');
INSERT INTO pedidos (id_usuario, valor_total, status) VALUES (2, 9000.80, 'concluido');
INSERT INTO pedidos (id_usuario, valor_total, status) VALUES (3, 5800.80, 'concluido');
INSERT INTO pedidos (id_usuario, valor_total, status) VALUES (4, 249.99, 'concluido');
INSERT INTO pedidos (id_usuario, valor_total, status) VALUES (5, 349.00, 'concluido');

INSERT INTO pagamentos (valor, metodo_pagamento, quantidade_parcelas, id_pedido) VALUES (499.80, 'Cartão de Crédito', 3, 1);
INSERT INTO pagamentos (valor, metodo_pagamento, quantidade_parcelas, id_pedido) VALUES (100.00, 'Dinheiro', 1, 2);
INSERT INTO pagamentos (valor, data_pagamento, metodo_pagamento, quantidade_parcelas, id_pedido) VALUES (500.50, '2025-08-09 14:30:00', 'Pix', 2, 3);
INSERT INTO pagamentos (valor, metodo_pagamento, quantidade_parcelas, id_pedido) VALUES (1111.22, 'Cartão de Débito', 1, 4);
INSERT INTO pagamentos (valor, data_pagamento, metodo_pagamento, quantidade_parcelas, id_pedido) VALUES (1200.00, '2025-08-10 09:00:00', 'Transferência Bancária', 1, 5);

INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco) VALUES (1, 1, 1, 2899.00);
INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco) VALUES (2, 2, 2, 9000.80);
INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco) VALUES (3, 3, 2, 5800.80);
INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco) VALUES (4, 4, 1, 249.99);
INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco) VALUES (5, 5, 1, 349.00);