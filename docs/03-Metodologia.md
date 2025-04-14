
# Metodologia

O projeto WalkPet é desenvolvido localmente por todos os participantes da equipe. Para o controle de versão, utilizamos o Git, com repositórios hospedados no GitHub. Nossa abordagem de desenvolvimento segue uma versão simplificada da metodologia ágil Scrum.

## Metodologia Scrum Simplificada

No Scrum, o desenvolvimento do projeto é dividido em ciclos curtos e iterativos chamados **sprints**, que normalmente têm duração de uma a quatro semanas. A equipe define um conjunto de tarefas a serem concluídas em cada sprint, com base na prioridade e nas metas do projeto.

### Como aplicamos o Scrum no WalkPet:
- **Sprints:** Cada ciclo de desenvolvimento é definido em sprints semanais, onde as principais tarefas são priorizadas e distribuídas entre os membros da equipe.
- **Reuniões:** Realizamos reuniões rápidas no início de cada sprint para definir as tarefas da semana e revisar o que foi feito no sprint anterior.
- **Feedback Contínuo:** Ao final de cada sprint, discutimos o progresso e realizamos ajustes necessários para as próximas etapas, mantendo o projeto sempre alinhado com as expectativas e metas definidas.

## Controle de Versão

Para o versionamento do projeto, adotamos a ferramenta [Git](https://git-scm.com/) com repositórios hospedados no [GitHub](https://github.com). O projeto segue uma estrutura de branches bem definida, facilitando o desenvolvimento em paralelo e o controle de versões.

### Estrutura de Branches
- `main`: A branch principal, contendo a versão estável e testada do software.
- `dev`: Utilizada para desenvolvimento ativo, onde novas funcionalidades são implementadas.

## Convenção de Commits e Gerenciamento de Issues

- Cada commit é marcado com um breve resumo da modificação seguido de uma referência ao número de commits, por exemplo: `"navbarFix - #1"`. Essa prática ajuda a manter um histórico claro e rastreável das mudanças realizadas no projeto.

## Processo de Gerenciamento de Branches e Merges

- Cada nova funcionalidade ou correção é desenvolvida em uma branch separada, derivada da `dev`. Ao finalizar a implementação, a branch é submetida a revisões e testes locais.
- Após passar pelos testes necessários, a branch é mesclada (`merge`) de volta à `dev` ou, quando estável e aprovada, diretamente na `main`.
- Não utilizamos tags específicas para marcar versões no momento, mas a convenção de commits (`"navbarFix #1"`) nos permite rastrear mudanças importantes e associá-las às issues correspondentes.

## Gerenciamento de Projeto

### Divisão de Papéis

No projeto WalkPet, dividimos igualmente as responsabilidades e tarefas entre todos os participantes da equipe. Cada membro contribui em diferentes aspectos do projeto, seja no desenvolvimento, design, testes ou organização, garantindo que todos tenham participação ativa em todas as etapas do processo. 

### Processo

Para a gestão do projeto, seguimos a metodologia Scrum, com algumas adaptações para a dinâmica do grupo:

- **Sprints Semanais:** Cada ciclo de desenvolvimento (sprint) tem a duração de uma semana. No início de cada sprint, a equipe realiza uma reunião de planejamento para definir as tarefas e metas a serem alcançadas.
- **Daily Stand-ups:** As reuniões diárias ("daily stand-ups") são realizadas no início ou final de cada dia para discutir o progresso do projeto, identificar obstáculos e ajustar o trabalho conforme necessário.
- **Reunião de Revisão:** Ao final de cada sprint, realizamos uma reunião de revisão onde são apresentados os progressos alcançados e discutimos melhorias para o próximo ciclo.
- **Quadro de Tarefas:** Utilizamos o Trello como ferramenta de acompanhamento das atividades, organizando as tarefas em colunas: **Backlog**, **Em Progresso**, **Em Teste**, e **Concluído**. Cada tarefa é detalhada com descrição, responsável, prazo e status.
- **Ferramentas de Comunicação:** O WhatsApp é utilizado para comunicação rápida e para alinhar informações entre os membros do time.

### Ferramentas

As ferramentas empregadas no desenvolvimento do projeto WalkPet foram escolhidas para facilitar a comunicação, o desenvolvimento e o design da solução. Abaixo estão as ferramentas utilizadas e a justificativa para a escolha de cada uma:

- **VSCode:** Escolhemos o Visual Studio Code como editor de código devido à sua facilidade de uso, personalização e integração com o GitHub para controle de versão. Essa integração permite que os desenvolvedores realizem commits e gerenciem branches diretamente pelo editor.
- **Figma:** Utilizado para a prototipação e criação dos wireframes do projeto. Escolhemos o Figma por sua capacidade de colaboração em tempo real, permitindo que designers e desenvolvedores trabalhem juntos na concepção das telas.
- **Trello:** Empregado para organização das tarefas do projeto. A escolha do Trello se deve à sua interface intuitiva e à facilidade de acompanhar o progresso das atividades por meio de quadros e cartões.
- **WhatsApp:** Ferramenta de comunicação rápida e prática, utilizada para alinhamento de informações, troca de ideias e decisões rápidas durante o desenvolvimento.
