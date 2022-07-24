# Pedvel

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="100"> <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width="40"> </a></p>

<p align="center">Sistema de cadastro de pedidos, escrito em <a href="https://laravel.com/docs" target="_blank">Laravel</a>, Mysql e <a href="https://reactjs.org/" target="_blank">ReactJS</a> 🚀 </p>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Laravel](https://laravel.com)
- [React](https://pt-br.reactjs.org/)
- [ViteJS](https://vitejs.dev/) ⚡

### 💻 Demo

- https://pedvel.herokuapp.com/

## Como rodar

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Laravel](https://laravel.com/docs).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/Luizdidier/request_system.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd request_system

# Instale as dependencias do PHP
$ composer install

# Lembre-se de configurar o banco de dados na .env, após configurar o banco execute as migrations com o seed
$ php artisan migrate --seed

# Instale as dependências do React
$ npm install

# Execute o Hot loader do vite
$ npm run dev

# Em outro terminal execute o servidor do Laravel
$ php artisan serve
```

## Funcionalidades

- [x] Login e autenticação
- [x] CRUD de cliente
- [x] CRUD de produtos
- [x] CRUD de forma de pagamento
- [x] Cadastro de Pedidos
- [x] Consulta de Pedidos
- [x] Dashboard Simples
