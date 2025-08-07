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
    avenda BOOLEAN DEFAULT TRUE
);

INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Maria', 'maria@gmail.com', '111111', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Joao', 'joao@gmail.com', '222222', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('José', 'jose@gmail.com', '333333', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Bob', 'bob@gmail.com', '444444', '319959125', 'Rua sem nome');
INSERT INTO usuarios (nome, email, cpf, telefone, endereco) VALUES ('Alex', 'alex@gmail.com', '555555', '319959125', 'Rua sem nome');
