# Labook Back-End

Uma API desenvolvida para gerenciar uma rede social, com o objetivo de seguir o paradigma da POO, onde podemos cadastrar usuários ver os posts de outros usuário, criar, editar e deletar nossos posts e podemos dar likes ou deslikes.

[Link para Documentação da API no Postman](https://documenter.getpostman.com/view/27670051/2s9Xy3ts7w) 

 ![Imagem](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdtERg7Rn_fqNYZhUFbMO7P69poX-tDO2BWg&usqp=CAU)

## Lista de requisitos

- [x]  Get user - Login
- [x]  Get all post
- [x]  Create user - Sign Up
- [x]  Create post
- [x]  Edit post by idPost
- [x]  Delete post by idPost
- [x]  Edit Like or Deslike
<br/>
<br/>

## Essa API de E-commerce contém as seguintes funcionalidades:

- User:
    - Login
    - Sign Up
    
- Post:
    - Consultar a listagem total (obrigatório o token)
    - Criar (obrigatório o token)
    - Editar (obrigatório o token)
    - Deletar (obrigatório o token)

- Like or deslike:
    - Adicionar o like ou deslike e remover-los (obrigatório o token)
<br/>
<br/>


## Instalação

Você irá precisar ter instalado:
   - Vscode
   - Git
   - Extensão MySql no Vscode
   - Postman

```bash
1. Baixe ou clone o repositório em seu computador.

2. Abra a pasta do repositório no terminal do Git e execute o seguinte comando para instalar as dependências do projeto:
$ npm install 

3. Ainda no terminal do git abra o Visual Studio Code (Vscode) com o seguinte comando, e por favor não feche esse terminal:
$ code .

4. Abre a extensão Mysql, coloque a opção SQLlite e conecte com o arquivo labook.db

5. Refatore o nome do arquivo, tire o final .example do arquivo .env.example

6. No terminal git que está aberto, digite o seguinte comando para iniciar o servidor em modo de desenvolvimento:
$ npm run dev

4. Em seguida, abra o aplicativo Postman e insira o link da API no topo da interface.

5. Com o servidor sendo executado na porta 3003, você poderá utilizar a API livremente para interagir com o projeto.

```
<br/>
<br/>

## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


