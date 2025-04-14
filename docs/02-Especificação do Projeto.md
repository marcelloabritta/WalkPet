# Especificações do Projeto
## Personas

A definição dos problemas e dos pontos relevantes foram estabelecidos com a participação de usuários por meio de personas. 
### Contratantes
![Black White Simple Minimalist Fresh Graduate Resume A4 Document (1)](https://github.com/user-attachments/assets/5c4bb2db-d187-4e21-9d93-b3b5c50feed0)
![Black White Simple Minimalist Fresh Graduate Resume A4 Document (3)](https://github.com/user-attachments/assets/0fbb8f6d-3ca5-4557-a53a-2dc43b2be812)
### Paseadores
![Black White Simple Minimalist Fresh Graduate Resume A4 Document (2)](https://github.com/user-attachments/assets/20ff9637-edd0-40b3-a18e-8b65f5a1b9c9)
![Black White Simple Minimalist Fresh Graduate Resume A4 Document (5)](https://github.com/user-attachments/assets/85fa2541-05fa-4e8a-ac54-6e30df293bb7)


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|leandro Valadares  | Preciso de alguem pra passear com meus cachorros           | Trabalho o dia todo e não tenho tempo de passear com eles e acabm ficando presos dentro de casa              |
|Gabriela Santos       |  Preciso de alguem confiável pra passear com meus cachorros         | Tenho dificuldades de encontrar passeadores para meus PETS |

## Requisitos

Os limites operacionais do projeto são delineados pelos requisitos funcionais, os quais detalham as formas de interação dos usuários, e os requisitos não funcionais, que descrevem os atributos gerais que o sistema deve apresentar. Abaixo, apresentamos esses requisitos.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O site deve possibilitar que os usuários avaliem e deixem feedback sobre os serviços de passeio.| MEDIA | 
|RF-002| O site deve permitir uma busca rápida com base em diferentes critérios, como localização, tipo de animal de estimação e horário disponível.    | ALTA |
|RF-003| O site deve oferecer um cadastro fácil e rápido com possibilidade de personalização e acréscimo de informações | ALTA |
|RF-004| O site deve permitir criar e visualizar cards de animais disponíveis para passeios. | ALTA |
|RF-005| O site deve permitir agendar passeios e contratar serviços com facilidade e segurança. | ALTA |
|RF-006| O site deve facilitar a comunicação entre os usuários e os passeadores de animais de estimação. | ALTA |
|RF-007| O site deve conter notificações por e-mail ou mensagem de texto para lembrar os usuários sobre seus passeios agendados e atualizações importantes. | ALTA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O site deve ter um design responsivo e intuitivo que se adequa a diferentes dispositivos.| ALTA | 
|RNF-002|O site deve ser compatível com os principais navegadores do mercado. |  ALTA | 
|RNF-003| O site deve ter backup regular de dados para evitar perda de informações críticas, como horários de passeio agendados e preferências dos animais.|  ALTA | 
|RNF-004| O site deve conter proteção dos dados pessoais dos clientes e informações dos animais de estimação.|  ALTA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

## Diagrama de Casos de Uso

#### 1. Fazer Login
##### Descrição
O processo de login permite que usuários registrados acessem sua conta e utilizem as funcionalidades disponíveis na plataforma.
##### Pré-condições
- O usuário deve estar previamente cadastrado no sistema.
- O usuário deve ter as credenciais de login (nome de usuário e senha).
##### Etapas
1. Acessar a Página de Login
- Navegar até a URL do sistema e clicar no link de login.

2. Preencher as Credenciais de Login
- No formulário de login, inserir o nome de usuário e a senha nos campos correspondentes.
3. Submeter o Formulário
- Clicar no botão "Entrar" para submeter as credenciais.
4. Validação das Credenciais
- O sistema verifica as credenciais fornecidas com os dados armazenados no local storage.
- Se as credenciais estiverem corretas, o usuário é redirecionado para a página inicial.
- Se as credenciais estiverem incorretas, o sistema exibe uma mensagem de erro.

#### Pós-condições
- O usuário estará logado no sistema se as credenciais estiverem corretas.
#### 2. Cadastrar um Novo Usuário
##### Descrição
O cadastro permite que novos usuários se registrem no sistema, fornecendo informações pessoais e criando credenciais de login.
##### Pré-condições
O usuário deve ter acesso à página de cadastro.
##### Etapas
1. Acessar a Página de Cadastro
- Navegar até a URL do sistema e clicar no link de cadastro.
2. Preencher o Formulário de Cadastro
- Inserir as informações necessárias nos campos do formulário, incluindo nome, nome de usuário, email, senha, confirmação de senha, descrição e upload de foto.
3. Submeter o Formulário
- Clicar no botão "Cadastrar" para submeter as informações.
4. Validação dos Dados
- O sistema verifica se todos os campos obrigatórios foram preenchidos e se a senha e a confirmação de senha coincidem.
- Se os dados estiverem corretos, o sistema salva as informações no local storage.
- Se houver algum erro, o sistema exibe uma mensagem indicando o problema.
5. Confirmação de Cadastro
- Após a validação bem-sucedida, o sistema redireciona o usuário para a página de login.
#### Pós-condições
- O usuário está registrado no sistema e pode fazer login com as credenciais criadas.



