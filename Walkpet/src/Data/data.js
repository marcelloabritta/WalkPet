import { Passeador } from "../models/passeador";
import { Avaliacao } from "../models/avaliacao";

export const inicializarPasseadores = () => {
  const passeadores = [
    new Passeador(
      1,
      "Maria Silva",
      "123.456.789-01",
      "maria.silva",
      "maria.silva@example.com",
      "senha123",
      "Passeadora experiente com amor por animais.",
      "Curiosidades sobre Maria que a tornam única na sua profissão.",
      "/Maria.png",
      [
        new Avaliacao(
          1,
          "Cliente 1",
          "Muito atenciosa e cuidadosa com meu pet.",
          5,
          new Date("2023-01-10")
        ),
        new Avaliacao(
          2,
          "Cliente 2",
          "Excelente serviço!",
          4,
          new Date("2023-02-15")
        ),
      ]
    ),
    new Passeador(
      2,
      "João Oliveira",
      "987.654.321-09",
      "joao.oliveira",
      "joao.oliveira@example.com",
      "senha456",
      "Amo cães e caminhadas ao ar livre.",
      "João adora explorar novos parques e trilhas em suas caminhadas.",
      "/Joao.png",
      [
        new Avaliacao(
          1,
          "Cliente 3",
          "Super recomendo!",
          5,
          new Date("2023-03-20")
        ),
      ]
    ),
    new Passeador(
      3,
      "Ana Costa",
      "159.753.846-22",
      "ana.costa",
      "ana.costa@example.com",
      "senha789",
      "Profissional dedicada e confiável.",
      "Ana tem um interesse especial por cuidar de pets com necessidades especiais.",
      "/Ana.png",
      [
        new Avaliacao(
          1,
          "Cliente 4",
          "Atenciosa e pontual.",
          4,
          new Date("2023-04-25")
        ),
      ]
    ),
    new Passeador(
      4,
      "Paulo Silva",
      "258.456.357-11",
      "paulo.silva",
      "paulo.silva@example.com",
      "senha2024",
      "Amo pets e passear com eles é minha paixão",
      "Paulo também é voluntário em um abrigo de animais durante seus finais de semana.",
      "/Paulo.png",
      [
        new Avaliacao(
          1,
          "Cliente 5",
          "Fez um ótimo trabalho com meus dois labradores.",
          4,
          new Date("2023-05-30")
        ),
        new Avaliacao(
          2,
          "Cliente 6",
          "Esqueceu de alimentar meu pet, porém ele voltou bem feliz",
          3,
          new Date("2023-05-30")
        ),
      ]
    ),
  ];

  localStorage.setItem("passeadores", JSON.stringify(passeadores));
};

export const carregarPasseadores = () => {
  const dados = localStorage.getItem("passeadores");
  if (!dados) return [];

  const passeadoresData = JSON.parse(dados);
  return passeadoresData.map(
    (pd) =>
      new Passeador(
        pd.id,
        pd.nome,
        pd.cpf,
        pd.username,
        pd.email,
        pd.senha,
        pd.descricao,
        pd.curiosidades,
        pd.foto,
        pd.avaliacoes.map(
          (av) =>
            new Avaliacao(
              av.id,
              av.nomeAvaliador,
              av.comentario,
              av.estrelas,
              new Date(av.data)
            )
        )
      )
  );
};
