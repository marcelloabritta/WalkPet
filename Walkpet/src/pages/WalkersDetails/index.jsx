import React from "react";
import { useParams, Link } from "react-router-dom";
import GetWalkers from "../../Hook/GetWalkers";
import "../WalkersDetails/style.css";

const WalkerDetails = () => {
  const { nomeUsuario } = useParams();
  const allWalkers = GetWalkers();
  const walker = allWalkers.find((w) => w.username === nomeUsuario);

  if (!walker) {
    return <h2>Passeador não encontrado</h2>;
  }

  const mailtoLink = `mailto:${walker.email}?subject=Contato via WalkPet&body=Olá ${walker.nome},`;

  return (
    <div className="walkersDetails">
      <div className="breadcrumb">
        <Link to="/passeadores">
          <h3>&lt; Voltar</h3>
        </Link>
      </div>
      <div className="walker-profile">
        <img src={walker.foto} alt={walker.nome} />
        <h3>{walker.nome}</h3>
        <p>
          <strong>Email:</strong> {walker.email}
        </p>
        <h4>Descrição</h4>
        <p>{walker.descricao}</p>
        <h4>Curiosidades</h4>
        <p>{walker.curiosidades}</p>
        <a href={mailtoLink} title="Clique para enviar um e-mail">
          <button>Enviar E-mail</button>
        </a>
        <Link to={`/avaliacoes/${nomeUsuario}`}>
          <button>Ver Avaliações</button>
        </Link>
      </div>
    </div>
  );
};

export default WalkerDetails;
