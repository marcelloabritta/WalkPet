import axios from 'axios';
import { Avaliacao } from "../models/avaliacao";

const GetAvaliacoes = async (username) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/avaliacoes/${username}`);
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(
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
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
};

export default GetAvaliacoes;
