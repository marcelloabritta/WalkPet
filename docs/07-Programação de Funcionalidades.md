# Programação de Funcionalidades

### Pré-requisitos: [Especificação do Projeto](2-Especificação%20do%20Projeto.md), [Projeto de Interface](3-Projeto%20de%20Interface.md), [Metodologia](4-Metodologia.md), [Projeto de Interface](3-Projeto%20de%20Interface.md), [Arquitetura da Solução](5-Arquitetura%20da%20Solução.md)

## Requisitos Funcionais

| ID    | Descrição do Requisito  | Artefatos produzidos | Aluno(a) responsável |
|-------|-----------------------------------------|-----------------------|---------------------|
| RF-001 | A aplicação deve permitir que o usuário faça login e registre uma conta para acessar funcionalidades exclusivas. | Sistema de Autenticação | Marcello |
| RF-002 | A aplicação deve permitir que o usuário edite seu perfil e seus dados de contato. | Página de Perfil do Usuário | Olivier |
| RF-003 | A aplicação deve ser responsiva, adaptando-se bem a diferentes dispositivos e resoluções de tela. | Implementação de CSS responsivo | Marcello, Ligia |
| RF-004 | A aplicação deve armazenar localmente informações de login e sessão do usuário. | Implementação de LocalStorage | Olivier |
| RF-005 | A aplicação deve possibilitar o registro de novos passeadores e exibir seus perfis de forma clara e visualmente agradável. | Módulo de Cadastro e Perfil | Marcello, Ligia, Olivier |
| RF-006 | A aplicação deve exibir todas as avaliações de um passeador com suas respectivas notas e comentários. | Página de Avaliações | Olivier |

## Requisitos Não Funcionais

| ID    | Descrição do Requisito  | Artefatos produzidos | Aluno(a) responsável |
|-------|-----------------------------------------|-----------------------|---------------------|
| RNF-001 | A aplicação deve ser responsiva, suportando uma ampla gama de dispositivos (computadores, tablets, smartphones) | Implementação de CSS responsivo | Marcello, Ligia |
| RNF-002 | O sistema deve carregar todas as páginas com um tempo de resposta inferior a 2 segundos para uma melhor experiência do usuário | Otimização do código e testes de performance | Marcello, Olivier |
| RNF-003 | Os dados do usuário devem ser armazenados com segurança, utilizando armazenamento local adequado e boas práticas de segurança | Implementação de LocalStorage e medidas de segurança | Olivier |
| RNF-004 | O design e a navegação devem ser consistentes em todas as páginas da aplicação | Implementação de CSS e templates reutilizáveis | Marcello, Ligia |

## Instruções de acesso

O sistema pode ser acessado através do seguinte link de hospedagem: https://grupo-03-projeto.replit.app/

## Funcionalidades do Sistema

A aplicação *WalkPet* possui as seguintes funcionalidades:

1. **Login e Registro:**
   - O usuário pode criar uma conta ou se autenticar com uma existente para acessar funcionalidades personalizadas.
  
2. **Edição de Dados do Perfil:**
   - O usuário pode editar seu nome, foto, descrição, e outras informações pessoais diretamente na página de perfil.
  
3. **Cadastro de Passeadores:**
   - Novos passeadores podem ser registrados no sistema com suas informações e perfis exibidos em uma listagem pública.

4. **Consulta de Passeadores:**
   - O sistema permite que os usuários pesquisem passeadores e vejam seus perfis e avaliações.

5. **Avaliações:**
   - Usuários podem criar e visualizar avaliações dos passeadores, atribuindo notas de 1 a 5, com a opção de escrever comentários.
