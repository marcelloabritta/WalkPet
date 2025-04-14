import { inicializarPasseadores, carregarPasseadores } from "../Data/data.js";

const GetWalkers = () => {
  if (!localStorage.getItem("passeadores")) {
    inicializarPasseadores();
  }
  return carregarPasseadores();
};

export default GetWalkers;
