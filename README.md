# 🛒 Loja de Eletrônicos - TecnoFácil

Este projeto foi desenvolvido como parte da disciplina **CSI602 - Banco de Dados I** da **Universidade Federal de Ouro Preto (UFOP)**.  
A documentação completa referente a este projeto pode ser encontrada em:  
`lojaeletronicos/docs`

---

## 📌 Descrição do Projeto

O sistema **Loja de Eletrônicos - TecnoFácil** é uma aplicação de e-commerce que permite:

- Cadastro e gerenciamento de usuários.
- Consulta e compra de produtos eletrônicos.
- Controle de estoque automatizado.
- Registro e acompanhamento de pedidos e pagamentos.
- Geração de relatórios para suporte à tomada de decisão.

---

## 🚀 Tecnologias Utilizadas

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

---

## 🛠️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone git@github.com:Davizitos57/loja-eletronicos.git
cd lojaeletronicos
```

---

### 2. Subir o banco de dados com Docker

```bash
docker run --name lojaeletronicosdb     -e POSTGRES_USER=postgres     -e POSTGRES_PASSWORD=postgres     -e POSTGRES_DB=lojaeletronicosdb     -p 5435:5432     -d postgres:16.3
```

O banco estará disponível em: **localhost:5435**

---

### 3. Executar o Backend

Acesse a pasta:

```bash
cd lojaeletronicos/backend/src/main/java/com/trabalhobd/lojaeletronicos
```

Coloque o arquivo **`LojaeletronicosApplication.java`** para executar.

O backend ficará disponível em: **http://localhost:8081**

---

### 4. Executar o Frontend

Acesse a pasta:

```bash
cd lojaeletronicos/frontend/react
```

Instale as dependências:

```bash
npm install
```

Execute o frontend:

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

---

## 📊 Funcionalidades Principais

- 👤 **Usuário**
    - Cadastro e login.
    - Consulta e compra de produtos.
    - Acompanhamento de pedidos e pagamentos.

- 🛠️ **Administrador**
    - Cadastro e gerenciamento de produtos.
    - Controle de estoque.
    - Geração de relatórios:
        - Produtos com baixo estoque.
        - Produtos esgotados.
        - Receita total por período.
        - Vendas por produto (mais vendidos).
        - Clientes mais ativos e que mais gastam.

---

## 📽️Explicação do projeto

O vídeo da explicação do projeto está disponível em:

---

## 👨‍🏫 Créditos

Projeto desenvolvido para a disciplina **CSI602 - Banco de Dados I**  
**Professor:** Rafael Frederico Alexandre

**Alunos:**
- [Davi Abner Almeida Santiago](https://github.com/Davizitos57)
- [Hálisson Silveira Piovezana ](https://github.com/HalissonPiov)
- [Maria Clara Barbosa Fernandes](https://github.com/mclara831)
- [Túlio Vilela Lopes ](https://github.com/Tulio8998)

