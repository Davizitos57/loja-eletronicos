DROP TABLE IF EXISTS enderecos;
DROP TABLE IF EXISTS produtos_categorias;
DROP TABLE IF EXISTS itens_pedidos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS pagamentos;

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

CREATE TABLE produtos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_unico NUMERIC(10, 2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL, 
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE categorias (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL 
);

CREATE TABLE enderecos (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rua VARCHAR(100) NOT NULL,
    numero INTEGER,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    id_usuario integer,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE produtos_categorias(
    produto_id INTEGER,
    categoria_id INTEGER,
    FOREIGN KEY(produto_id) REFERENCES produtos(id),
    FOREIGN KEY(categoria_id) REFERENCES categorias(id),
    PRIMARY KEY(produto_id, categoria_id)
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
    quantidade_parcelas INTEGER NOT NULL DEFAULT 1
);

INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Maria', 'maria@gmail.com', '111111', '319959125', '1234', 'ADMIN', 0);
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Joao', 'joao@gmail.com', '222222', '319959125', '1234', 'BASIC', 0);
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('José', 'jose@gmail.com', '333333', '319959125','1234', 'BASIC', 0);
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Bob', 'bob@gmail.com', '444444', '319959125', '1234', 'BASIC', 0) ;
INSERT INTO usuarios (nome, email, cpf, telefone, senha, tipo_usuario, excluido) VALUES ('Alex', 'alex@gmail.com', '555555', '319959125', '1234', 'BASIC', 0);

INSERT INTO enderecos (rua, numero, cidade, estado, cep, id_usuario) VALUES ('Av. Getulio Vargas', 100, 'Betim', 'Minas Gerais', '3500000', 1);
INSERT INTO enderecos (rua, numero, cidade, estado, cep, id_usuario) VALUES ('Av. Brasil', 1, 'Rio de Janeiro', 'Rio de Janeiro', '6200065', 1);
INSERT INTO enderecos (rua, numero, cidade, estado, cep, id_usuario) VALUES ('Rua Nova York', 25, 'Joao Monlevade', 'Minas Gerais', '5693254', 2);
INSERT INTO enderecos (rua, numero, cidade, estado, cep, id_usuario) VALUES ('Av. Wilson Alvarega', 1, 'Joao Monlevade', 'Minas Gerais', '9658723', 3);
INSERT INTO enderecos (rua, numero, cidade, estado, cep, id_usuario) VALUES ('Rua Presidente Prudente', 1, 'Governador Valadares', 'Minas Gerais', '7894561', 4);

INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Notebook Lenovo IdeaPad 3', 'Processador Intel Core i5, 8GB RAM, SSD 256GB, Tela 15.6"', 2899.00, 20);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Console PlayStation 5', 'Console com SSD de altíssima velocidade e controle DualSense', 4599.99, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Teclado Mecânico Redragon Kumara', 'Switches Outemu Blue, LED Vermelho, ABNT2', 199.90, 80);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Fone de Ouvido Bluetooth JBL Tune 510BT', 'Fone sem fio com até 40h de bateria, som JBL Pure Bass', 249.99, 100);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Roteador TP-Link Archer AX10', 'Wi-Fi 6, Dual Band, 1201 Mbps, 4 antenas, MU-MIMO', 349.00, 40);

INSERT INTO categorias (nome) VALUES ('Computadores e Notebooks');
INSERT INTO categorias (nome) VALUES ('Consoles');
INSERT INTO categorias (nome) VALUES ('Periféricos e Acessórios');
INSERT INTO categorias (nome) VALUES ('Wearables');
INSERT INTO categorias (nome) VALUES ('Eletrodomésticos');

INSERT INTO pagamentos (valor, metodo_pagamento, quantidade_parcelas) VALUES (1111.22, 'Cartão de Crédito', 3);
INSERT INTO pagamentos (valor, metodo_pagamento, quantidade_parcelas) VALUES (100.00, 'Dinheiro', 1);
INSERT INTO pagamentos (valor, data_pagamento, metodo_pagamento, quantidade_parcelas) VALUES (500.50, '2025-08-09 14:30:00', 'Pix', 2);
INSERT INTO pagamentos (valor, metodo_pagamento, quantidade_parcelas) VALUES (1111.22, 'Cartão de Débito', 1);
INSERT INTO pagamentos (valor, data_pagamento, metodo_pagamento, quantidade_parcelas) VALUES (1200.00, '2025-08-10 09:00:00', 'Transferência Bancária', 1);

INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco) VALUES (1, 3, 2, 299.80);

INSERT INTO pedidos (id_usuario, valor_total) VALUES (1, 299.80)