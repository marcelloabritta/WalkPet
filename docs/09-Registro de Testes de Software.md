# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Para cada caso de teste definido no Plano de Testes de Software, realizamos o registro das evidências dos testes feitos na aplicação pela equipe, comprovando se os critérios de êxito foram alcançados ou não. Para isso, utilizamos uma ferramenta de captura de tela para gravar screencasts de cada teste realizado.

| **Caso de Teste** 	| **CT-01 – Cadastrar perfil** 	|
|:---:	|:---:	|
| **Requisito Associado** 	| RF-001 - A aplicação deve apresentar, na página principal, a funcionalidade de cadastro de usuários para que esses consigam criar e gerenciar seu perfil. |
| **Registro de evidência** | [Ver vídeo](https://drive.google.com/file/d/1raKJtnnibWOjUPevP-0kMQErXLMlNExB/view?usp=drive_link) |

| **Caso de Teste** 	| **CT-02 – Realizar login** 	|
|:---:	|:---:	|
| **Requisito Associado** 	| RF-001 - A aplicação deve permitir que um usuário previamente cadastrado faça login. |
| **Registro de evidência** | [Ver vídeo](https://drive.google.com/file/d/1TDNliCXBujU1Q9HB5qDeguOzzYLo0eJ8/view?usp=drive_link) |

| **Caso de Teste** 	| **CT-03 – Edição de Perfil** 	|
|:---:	|:---:	|
| **Requisito Associado** 	| RF-003 - A aplicação deve ser permitir a edição do perfil de passeador. |
| **Registro de evidência** | [Ver vídeo](https://drive.google.com/file/d/1suERNLt9h7TwGs2XGoLo9kwy-fliFRJw/view?usp=drive_link) |

| **Caso de Teste** 	| **CT-04 – Pesquisa de passeadores** 	|
|:---:	|:---:	|
| **Requisito Associado** 	| RF-005 - A aplicação deve possibilitar o registro de novos passeadores e exibir seus perfis de forma clara e visualmente agradável. |
| **Registro de evidência** | [Ver vídeo](https://drive.google.com/file/d/1xC6pRPXKpbfTXUag5tZQNxJwMSfCctom/view?usp=drive_link) |

| **Caso de Teste** 	| **CT-05 – Avaliação de passeadores** 	|
|:---:	|:---:	|
| **Requisito Associado** 	| RF-006 - A aplicação deve exibir todas as avaliações de um passeador com suas respectivas notas e comentários. |
| **Registro de evidência** | [Ver vídeo](https://drive.google.com/file/d/156IU_1V0GNoLpg0kF_A37kFeQkpcg8JI/view?usp=drive_link) |

---

## Avaliação

Os resultados dos testes de software foram amplamente positivos, atingindo os critérios de êxito na maioria dos casos. A seguir, destacamos os principais pontos fortes e fracos identificados durante os testes:

### **Pontos Fortes**
1. **Interface Responsiva:** O design da aplicação demonstrou excelente adaptabilidade a diferentes dispositivos e resoluções.
2. **Navegação Intuitiva:** Os usuários relataram facilidade em localizar as funcionalidades principais, como busca por passeadores e avaliações.
3. **Processos Bem Estruturados:** O cadastro e o login funcionaram de maneira fluida, sem erros técnicos.

### **Pontos Fracos**
1. **Confirmação ao Enviar Avaliações:** A ausência de uma mensagem de confirmação ao enviar avaliações foi relatada como uma melhoria necessária para maior clareza.

---

### **Ações para as Próximas Iterações**
1. **Adição de Filtros na Busca:**
   - Implementaremos filtros como localização, preço e disponibilidade para melhorar a experiência do usuário.
2. **Mensagem de Confirmação:**
   - Adicionaremos mensagens de sucesso ao final do envio de avaliações para melhorar o feedback visual.
3. **Melhoria na Acessibilidade:**
   - Planejamos ajustar o tamanho de ícones e botões para torná-los mais acessíveis, especialmente em dispositivos móveis.

---

### **Falhas Detectadas e Melhorias**
1. **Falha:** Um bug menor foi identificado ao digitar caracteres especiais no campo de busca.
   - **Melhoria Planejada:** Implementar validação para entrada de dados no campo de busca.
2. **Falha:** O botão "Ajuda" no menu lateral gerou confusão em alguns participantes.
   - **Melhoria Planejada:** Renomear o botão para "Suporte Técnico" e incluir um ícone mais claro.

Com base nos feedbacks e nos resultados dos testes, estamos confiantes de que as próximas melhorias irão otimizar ainda mais a experiência do usuário na aplicação *WalkPet*.
