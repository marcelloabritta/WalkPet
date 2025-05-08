import axios from 'axios';


const GetWalkers = async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/passeadores");
    return response.data; // Retorna os dados dos passeadores
  } catch (error) {
    console.error("Erro ao buscar dados", error);
    return []; // Retorna um array vazio em caso de erro
  }
};

export default GetWalkers;
