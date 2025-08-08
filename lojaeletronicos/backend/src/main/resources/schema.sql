DROP TABLE IF EXISTS enderecos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS itens_pedidos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone TEXT,
    senha VARCHAR(20),
    tipo_usuario VARCHAR(5),
    excluido integer
);

CREATE TABLE produtos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_unico NUMERIC(10, 2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL, 
    avenda BOOLEAN DEFAULT TRUE
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

CREATE TABLE itens_pedidos (
    pedido_id INTEGER,
    produto_id INTEGER,
    preco DECIMAL NOT NULL,
    quantidade INTEGER NOT NULL,

    CONSTRAINT itens_pedidos_pk PRIMARY KEY (pedido_id, produto_id)
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