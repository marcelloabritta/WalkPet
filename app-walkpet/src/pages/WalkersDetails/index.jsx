import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GetWalkers from "../../Hook/GetWalkers";
import "../WalkersDetails/style.css"
import defaultProfile from '../../assets/profilePic.png'
import {
  faStar,
  faStarHalf,
  faStar as faEmptyStar,
  faLocationDot,
  faDollarSign,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gato from "../../assets/gatoPerfil.png"

const WalkerDetails = () => {
  const { nomeUsuario } = useParams();
  const [walker, setWalker] = useState(null); // Estado para armazenar o passeador
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchWalkers = async () => {
      const fetchedWalkers = await GetWalkers(); // Função que busca os passeadores
      const walkersArray = fetchedWalkers.$values || [];
      const foundWalker = walkersArray.find((w) => w.username === nomeUsuario); // Encontra o passeador pelo nome de usuário
      setWalker(foundWalker); // Atualiza o estado com o passeador encontrado
      setLoading(false); // Define o loading como falso quando os dados forem carregados
    };

    fetchWalkers();
  }, [nomeUsuario]);

  if (loading) {
    return <h2>Carregando...</h2>; // Exibe uma mensagem de carregamento enquanto busca os dados
  }

  if (!walker) {
    return <h2>Passeador não encontrado</h2>; // Caso não encontre o passeador
  }

  const mailtoLink = `mailto:${walker.email}?subject=Contato via WalkPet&body=Olá ${walker.nome},`;

  const avaliacoes = walker.avaliacoes?.$values || [];

  const totalAvaliacoes = avaliacoes.length;
  const totalEstrelas = avaliacoes.reduce(
    (acc, curr) => acc + (curr.estrelas || 0),
    0
  );


  const averageStars =
    totalAvaliacoes > 0 ? totalEstrelas / totalAvaliacoes : 0;


  const fullStars = Math.floor(averageStars);
  const halfStar = averageStars % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStar);


  const getFoto = (foto) => {
    if (typeof foto === 'string' && foto.trim() !== "") {
      return foto;
    }
    return defaultProfile;
  };


  return (
    <div className="walkersDetails">
      <div className="walker-left">
        <h3>{walker.nome}</h3>
        <div className="stars">

          {[...Array(fullStars)].map((_, index) => (
            <FontAwesomeIcon
              key={`full-${index}`}
              icon={faStar}
              className="full-star"
            />
          ))}
          {halfStar > 0 && (
            <FontAwesomeIcon
              key="half-1"
              icon={faStarHalf}
              className="half-star"
            />
          )}

          {[...Array(emptyStars)].map((_, index) => (
            <FontAwesomeIcon
              key={`empty-${index}`}
              icon={faEmptyStar}
              className="empty-star"
            />
          ))}
        </div>
        <p>{walker.descricao}</p>
        <p>{walker.curiosidades}</p>
        <a href={mailtoLink} title="Clique para enviar um e-mail">
          <button className="email-btn">Enviar E-mail</button>
        </a>
        <Link to={`/avaliacoes/${nomeUsuario}`}>
          <button className="avaliacoes-btn">Ver Avaliações</button>
        </Link>

      </div>
      <div className="walker-right">
        <img src={getFoto(walker.foto)} alt={walker.nome} className="walker-img"/>
        <div className="walker-location">

        <FontAwesomeIcon icon={faLocationDot} />
        <p>{walker.cidade}, {walker.estado}</p>
        </div>
        <div className="walker-mail">
        <FontAwesomeIcon icon={faEnvelope} /> 
        <p>{walker.email}</p>
        </div>
        
        <div className="walker-price">
        <FontAwesomeIcon icon={faDollarSign} />
          <p>R${walker.preco}/h</p>
        </div>
        <img src={gato} alt="" className="gato-img"/>
      </div>
    </div>
  );
};

export default WalkerDetails;
