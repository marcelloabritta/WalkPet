
import { Avaliacao } from "../models/avaliacao";

const GetAvaliacoes = (nomeUsuario) => {

  const passeadores = JSON.parse(localStorage.getItem("passeadores")) || [];


  const passeador = passeadores.find((p) => p.username === nomeUsuario);

 
  if (passeador && passeador.avaliacoes) {

    return passeador.avaliacoes.map(
      (av) =>
        new Avaliacao(
          av.id,
          av.nomeAvaliador,
          av.comentario,
          av.estrelas,
          new Date(av.data).toLocaleDateString("pt-BR")
        )
    );
  }


  return [];
};

export default GetAvaliacoes;
