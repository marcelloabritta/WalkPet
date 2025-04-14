# Plano de Testes de Software

### Pré-requisitos: [Especificação do Projeto](2-Especificação%20do%20Projeto.md), [Projeto de Interface](3-Projeto%20de%20Interface.md)

Este plano de testes apresenta os cenários utilizados na validação das funcionalidades da aplicação *WalkPet*. Cada cenário foi criado para garantir que os requisitos especificados estão sendo corretamente implementados e atendem aos critérios de qualidade definidos.

---

## Cenários de Teste

| **Caso de Teste**   | **CT-01 – Cadastrar perfil de usuário**                                  |
|----------------------|-------------------------------------------------------------------------|
| **Requisito Associado** | RF-001 - A aplicação deve permitir que o usuário faça login e registre uma conta para acessar funcionalidades exclusivas. |
| **Objetivo do Teste** | Verificar se o usuário consegue registrar uma conta com sucesso.       |
| **Passos**           | - Acessar o navegador<br> - Informar o endereço da aplicação<br> - Clicar em "Registrar conta"<br> - Preencher os campos obrigatórios (nome, e-mail, senha, etc.)<br> - Confirmar o registro clicando em "Cadastrar" |
| **Critério de Êxito** | - A conta foi registrada com sucesso e o usuário é redirecionado para a página inicial. |

---

| **Caso de Teste**   | **CT-02 – Efetuar login**                                               |
|----------------------|-------------------------------------------------------------------------|
| **Requisito Associado** | RF-001 - A aplicação deve permitir que o usuário faça login e registre uma conta para acessar funcionalidades exclusivas. |
| **Objetivo do Teste** | Verificar se o usuário consegue realizar login com as credenciais cadastradas. |
| **Passos**           | - Acessar o navegador<br> - Informar o endereço da aplicação<br> - Clicar no botão "Entrar"<br> - Preencher os campos de e-mail e senha<br> - Clicar em "Login" |
| **Critério de Êxito** | - O login foi realizado com sucesso e o usuário é redirecionado para a página inicial. |

---

| **Caso de Teste**   | **CT-03 – Editar perfil do usuário**                                    |
|----------------------|-------------------------------------------------------------------------|
| **Requisito Associado** | RF-002 - A aplicação deve permitir que o usuário edite seu perfil e seus dados de contato. |
| **Objetivo do Teste** | Verificar se o usuário consegue editar suas informações de perfil.     |
| **Passos**           | - Fazer login na aplicação<br> - Acessar a página "Perfil"<br> - Editar informações como nome, foto e descrição<br> - Salvar as alterações clicando no botão "Salvar" |
| **Critério de Êxito** | - As alterações realizadas são salvas e exibidas corretamente na página de perfil. |

---

| **Caso de Teste**   | **CT-04 – Consultar passeadores cadastrados**                           |
|----------------------|-------------------------------------------------------------------------|
| **Requisito Associado** | RF-005 - A aplicação deve possibilitar o registro de novos passeadores e exibir seus perfis de forma clara e visualmente agradável. |
| **Objetivo do Teste** | Verificar se o usuário consegue visualizar a listagem de passeadores disponíveis. |
| **Passos**           | - Fazer login na aplicação<br> - Acessar a página "Passeadores"<br> - Visualizar a listagem com nomes, fotos e descrições dos passeadores |
| **Critério de Êxito** | - A listagem de passeadores é exibida corretamente e permite visualização detalhada de cada perfil. |

---

| **Caso de Teste**   | **CT-05 – Avaliar um passeador**                                        |
|----------------------|-------------------------------------------------------------------------|
| **Requisito Associado** | RF-006 - A aplicação deve exibir todas as avaliações de um passeador com suas respectivas notas e comentários. |
| **Objetivo do Teste** | Verificar se o usuário consegue criar e visualizar avaliações de passeadores. |
| **Passos**           | - Fazer login na aplicação<br> - Acessar o perfil de um passeador<br> - Clicar em "Avaliar"<br> - Preencher os campos de nota e comentário<br> - Confirmar a avaliação clicando em "Enviar" |
| **Critério de Êxito** | - A avaliação é registrada com sucesso e aparece na listagem de avaliações do passeador. |

---

## Observações

- Todos os cenários de teste devem ser realizados em dispositivos móveis e desktops para validar a responsividade da aplicação.
- Certifique-se de que os dados usados nos testes (como e-mails e senhas) estão devidamente documentados para referência futura.
- Para quaisquer bugs encontrados durante os testes, registre um relatório detalhado na ferramenta de gerenciamento de projetos utilizada pela equipe.

