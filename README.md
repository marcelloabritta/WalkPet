# WalkPet

`SISTEMAS PARA INTERNET`

`Eixo 3 - Projeto: Desenvolvimento Web Back-End - Turma 01 - 2025/1`

`3º SEMESTRE`

O projeto é uma plataforma digital que facilite o agendamento de passeios para pet, por meio de um sistema interativo de cards, os donos de pets podem criar e visualizar perfis de seus animais e encontrar passeadores de confiança usando filtros personalizados, como localidade, disponibilidade e preferências dos pets. Essa solução simplifica o processo de seleção e agendamento, oferecendo uma experiência segura e amigável para proprietários e passeadores.

## Integrantes

* Marcello Abritta Nogueira Rezende
* Olivier Lopes Rubinger
* Ligia de Castro Martins


## Orientador

* Will Ricardo dos Santos Machado


# Documentação

<ol>
<li><a href="docs/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Projeto de Interface.md"> Projeto de Interface</a></li>
<li><a href="docs/05-Arquitetura da Solução.md"> Arquitetura da Solução</a></li>
<li><a href="docs/06-Template Padrão da Aplicação.md"> Template Padrão da Aplicação</a></li>
<li><a href="docs/07-Programação de Funcionalidades.md"> Programação de Funcionalidades</a></li>
<li><a href="docs/08-Plano de Testes de Software.md"> Plano de Testes de Software</a></li>
<li><a href="docs/09-Registro de Testes de Software.md"> Registro de Testes de Software</a></li>
<li><a href="docs/10-Plano de Testes de Usabilidade.md"> Plano de Testes de Usabilidade</a></li>
<li><a href="docs/11-Registro de Testes de Usabilidade.md"> Registro de Testes de Usabilidade</a></li>
<li><a href="docs/12-Apresentação do Projeto.md"> Apresentação do Projeto</a></li>
<li><a href="docs/13-Referências.md"> Referências</a></li>
</ol>

# 🚀 Como Executar o Frontend React

Este guia mostra como instalar e rodar localmente o frontend React do projeto **app-walkpet**.

---

## 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18+)
- npm (vem junto com o Node.js)
- (Opcional) yarn – se preferir usar Yarn em vez de npm

---

## 2. Instalar dependências

Abra o terminal integrado no diretório `app-walkpet` e execute:

```bash
npm install
# ou, se usar yarn:
# yarn install
```

Isso vai baixar todos os pacotes listados em `package.json`.

---

## 3. Executar em modo de desenvolvimento

```bash
npm start
# ou
# yarn start
```

- O servidor de desenvolvimento será iniciado em  
  http://localhost:5173
- Toda vez que editar um arquivo `.js`/`.jsx`/`.css`, o navegador irá recarregar automaticamente.

---

## 4. Criar build de produção

Quando quiser gerar os arquivos otimizados para deploy:

```bash
npm run build
# ou
# yarn build
```

Isso vai produzir uma pasta `build/` com HTML/CSS/JS minificados prontos para subir em qualquer servidor estático (Netlify, Vercel, GitHub Pages etc.).

---

Pronto! Agora você já sabe como instalar, rodar e gerar build do frontend React do **app-walkpet**


# 🚀 Como Hospedar o Backend

Este guia explica como configurar e rodar localmente o backend do projeto **api-walkpet** (.NET 9 + EF Core + MySQL).

---

## 1. Pré-requisitos

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)  
- MySQL (ou MariaDB) rodando localmente ou em servidor acessível  
- (Opcional) CLI do Entity Framework Core instalada globalmente  

---

## 2. Criar o arquivo `.env`

Na raiz da pasta `api-walkpet`, crie um arquivo chamado `.env` com suas credenciais:

```text
// filepath: api-walkpet/.env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=walkpetdb
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha_aqui
```

> **Importante:** não commite este arquivo em repositórios públicos.

---

## 3. (Opcional) Instalar a CLI do EF Core

Caso ainda não tenha o `dotnet-ef` instalado:

```bash
dotnet tool install --global dotnet-ef
```

---

## 4. Criar a Migração Inicial

Abra o terminal integrado no diretório `api-walkpet` e execute:

```bash
dotnet ef migrations add InitialCreate \
  --project .\api.csproj \
  --startup-project .\api.csproj
```

Isso irá gerar a pasta `Migrations/` com o script para criar as tabelas.

---

## 5. Aplicar Migrações (Criar Tabelas)

Ainda dentro de `api-walkpet`, rode:

```bash
dotnet ef database update \
  --project .\api.csproj \
  --startup-project .\api.csproj
```

As tabelas `Passeadores` e `Avaliacoes` serão criadas no banco `walkpetdb`.

---

## 6. Executar o Backend

No terminal, ainda em `api-walkpet`:

```bash
dotnet run
```

Por padrão a API ficará disponível em:  
**http://localhost:8081/swagger**

Use o Swagger UI para explorar os endpoints.

---

Pronto! Seu backend está hospedado e pronto para desenvolvimento ou testes locais.

