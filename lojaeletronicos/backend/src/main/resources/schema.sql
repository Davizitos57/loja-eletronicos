DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS produtos;

CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    telefone TEXT,
    endereco TEXT NOT NULL
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

CREATE TABLE produtos_categorias(
    produto_id INTEGER,
    categoria_id INTEGER,
    FOREIGN KEY(produto_id) REFERENCES produtos(id),
    FOREIGN KEY(categoria_id) REFERENCES categorias(id),
    PRIMARY KEY(produto_id, categoria_id)
);

INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Maria', 'maria@gmail.com', '111111', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Joao', 'joao@gmail.com', '222222', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('José', 'jose@gmail.com', '333333', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Bob', 'bob@gmail.com', '444444', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Alex', 'alex@gmail.com', '555555', '319959125', 'Rua sem nome');

INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Notebook Lenovo IdeaPad 3', 'Processador Intel Core i5, 8GB RAM, SSD 256GB, Tela 15.6"', 2899.00, 20);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Console PlayStation 5', 'Console com SSD de altíssima velocidade e controle DualSense', 4599.99, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Teclado Mecânico Redragon Kumara', 'Switches Outemu Blue, LED Vermelho, ABNT2', 199.90, 80);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Fone de Ouvido Bluetooth JBL Tune 510BT', 'Fone sem fio com até 40h de bateria, som JBL Pure Bass', 249.99, 100);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque) VALUES ('Roteador TP-Link Archer AX10', 'Wi-Fi 6, Dual Band, 1201 Mbps, 4 antenas, MU-MIMO', 349.00, 40);