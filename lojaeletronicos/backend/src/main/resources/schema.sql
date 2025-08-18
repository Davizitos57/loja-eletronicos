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
INSERT INTO categorias (nome) VALUES ('Consoles');
INSERT INTO categorias (nome) VALUES ('Componentes de Hardware');
INSERT INTO categorias (nome) VALUES ('Acessórios');
INSERT INTO categorias (nome) VALUES ('Periféricos');
INSERT INTO categorias (nome) VALUES ('Wearables');

INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Notebook Dell Inspiron', 'Notebook Dell 15,6" Intel i5, 8GB RAM, 256GB SSD', 3500.00, 8, 2);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Notebook Acer Aspire 5', 'Notebook Acer 14" i7, 16GB RAM, 512GB SSD', 4800.00, 6, 2);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Notebook Gamer Lenovo Legion', 'Notebook gamer Lenovo com RTX 3060 e i7', 7200.00, 4, 2);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('MacBook Air M2', 'Apple MacBook Air 13" Chip M2, 256GB SSD', 9500.00, 4, 2);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('MacBook Pro 14"', 'Apple MacBook Pro 14" M1 Pro, 512GB SSD', 12500.00, 2, 2);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('iPhone 14', 'Smartphone Apple iPhone 14, 128GB', 5800.00, 12, 3);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('iPhone 14 Pro Max', 'Apple iPhone 14 Pro Max 256GB', 7200.00, 6, 3);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Samsung Galaxy S23', 'Celular Samsung Galaxy S23, 256GB', 4600.00, 10, 3);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Samsung Galaxy A54', 'Smartphone Samsung intermediário 128GB', 2200.00, 14, 3);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Motorola Edge 40', 'Smartphone Motorola Edge 40, 256GB', 3200.00, 8, 3);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Xiaomi Redmi Note 12', 'Smartphone Xiaomi 128GB, 8GB RAM', 1600.00, 20, 3);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('iPad 10ª Geração', 'Apple iPad 10,2" 64GB Wi-Fi', 3300.00, 7, 4);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Samsung Galaxy Tab A8', 'Tablet Samsung 10,5" 64GB', 1500.00, 9, 4);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('iPad Pro 11"', 'Tablet Apple iPad Pro 11" M1, 128GB', 7200.00, 4, 4);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Lenovo Tab M10', 'Tablet Lenovo M10 10" 64GB', 1100.00, 12, 4);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Microsoft Surface Go 3', 'Tablet 10,5" com Windows 11', 3500.00, 5, 4);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Kindle 11ª Geração', 'Leitor de eBooks com iluminação embutida', 499.00, 25, 5);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Kobo Clara HD', 'Leitor digital com tela e-ink 6"', 699.00, 18, 5);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Kindle Oasis', 'Leitor de eBooks premium com ajuste de luz', 1499.00, 10, 5);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Smart TV LG 50"', 'Smart TV LED 4K UHD 50 polegadas', 2300.00, 6, 6);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Smart TV Samsung 65"', 'TV 4K UHD Crystal 65 polegadas', 3800.00, 4, 6);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Smart TV TCL 43"', 'Smart TV Full HD Android 43 polegadas', 1600.00, 9, 6);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Projetor Portátil', 'Projetor Full HD 3000 lumens', 1500.00, 10, 6);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('PlayStation 5', 'Console Sony PlayStation 5, 825GB SSD', 4200.00, 5, 7);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Xbox Series X', 'Console Microsoft Xbox Series X, 1TB SSD', 3900.00, 7, 7);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Xbox Series S', 'Console Microsoft Xbox Series S, 512 SSD', 3900.00, 7, 7);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Nintendo Switch OLED', 'Console híbrido Nintendo Switch OLED', 2500.00, 9, 7);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Placa de Vídeo RTX 4070', 'NVIDIA GeForce RTX 4070 12GB', 4300.00, 3, 8);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Placa de Vídeo RTX 3050', 'NVIDIA GeForce RTX 3050 8GB', 1800.00, 6, 8);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Processador Ryzen 7 5800X', 'CPU AMD Ryzen 7 5800X 8 núcleos', 1600.00, 6, 8);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Processador Intel i5 12400F', 'CPU Intel Core i5 de 12ª geração', 1200.00, 8, 8);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('SSD NVMe 1TB', 'SSD M.2 NVMe 1TB velocidade 3500MB/s', 480.00, 20, 8);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Memória RAM 16GB DDR4', 'Módulo de memória RAM 16GB DDR4 3200MHz', 320.00, 25, 8);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Cabo HDMI 2.1', 'Cabo HDMI de alta velocidade 2 metros', 59.90, 60, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Carregador Veicular', 'Carregador USB duplo para carro', 75.00, 40, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Hub USB-C', 'Adaptador com 4 portas USB 3.0', 110.00, 25, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Controle PS5 DualSense', 'Controle sem fio branco original Sony', 380.00, 30, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Controle Xbox Wireless', 'Controle sem fio Xbox Series', 350.00, 25, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Carregador Turbo USB-C', 'Carregador rápido 25W compatível com vários modelos', 120.00, 40, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Fone Bluetooth JBL', 'Fone de ouvido Bluetooth com case', 220.00, 30, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Projetor Portátil', 'Projetor Full HD 3000 lumens', 1500.00, 10, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Soundbar JBL 2.1', 'Caixa de som com subwoofer sem fio', 1100.00, 12, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Caixa de Som LG XBOOM', 'Caixa de som potente com Bluetooth', 950.00, 15, 9);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Mouse Gamer Redragon', 'Mouse óptico gamer RGB 7200 DPI', 150.00, 30, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Headset HyperX Cloud II', 'Headset gamer com som 7.1', 450.00, 18, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Webcam Logitech C920', 'Webcam Full HD 1080p com microfone', 330.00, 12, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Impressora HP Deskjet', 'Impressora multifuncional jato de tinta', 480.00, 9, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Teclado sem Fio Logitech', 'Teclado slim com conexão Bluetooth', 260.00, 14, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Monitor LG 24"', 'Monitor LED Full HD 24 polegadas', 850.00, 15, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Monitor Samsung 27"', 'Monitor Curvo 27" QHD', 1600.00, 10, 10);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Apple Watch Series 9', 'Relógio inteligente Apple com GPS', 3800.00, 6, 11);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Samsung Galaxy Watch 6', 'Relógio inteligente Samsung com monitoramento de saúde', 2200.00, 8, 11);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Xiaomi Mi Band 8', 'Pulseira inteligente com monitor de atividades', 250.00, 35, 11);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Oculus Quest 2', 'Óculos de realidade virtual 128GB', 2400.00, 4, 11);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Huawei Watch Fit 2', 'Smartwatch com monitor cardíaco', 900.00, 10, 11);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Garmin Forerunner 245', 'Relógio esportivo com GPS', 1500.00, 6, 11);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Samsung Galaxy Buds 2', 'Fones de ouvido Bluetooth', 650.00, 18, 11);
INSERT INTO produtos (nome, descricao, preco_unico, quantidade_estoque, id_categoria) VALUES ('Apple AirPods Pro 2', 'Fones de ouvido sem fio com cancelamento de ruído', 1600.00, 12, 11);

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