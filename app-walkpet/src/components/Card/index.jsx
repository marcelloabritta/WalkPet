import React, { useEffect, useState } from "react";
import {
  faStar,
  faStarHalf,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Card/style.css";
import { Link } from "react-router-dom";
import defaultProfile from "../../assets/profilePic.png"
import axios from "axios";

const Card = ({ walkers }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    carregarAvaliacoes();
  }, [walkers.username]);

  const carregarAvaliacoes = async () => {
    try {
      // Substitua pelo URL correto da sua API
      const response = await axios.get(`http://localhost:8081/api/passeadores/${walkers.username}`);
      const passeador = response.data;

      // Verifique se há avaliações
      const avaliacaoData = passeador.avaliacoes?.$values || [];
      console.log("Avaliações no Card:", avaliacaoData);

      setAvaliacoes(avaliacaoData); // Carrega as avaliações na state

    } catch (error) {
      console.error("Erro ao carregar as avaliações:", error);
    }
  };

  const totalAvaliacoes = avaliacoes.length;
  const totalEstrelas = avaliacoes.reduce(
    (acc, curr) => acc + (curr.estrelas || 0),
    0
  );


  const averageStars =
    totalAvaliacoes > 0 ? totalEstrelas / totalAvaliacoes : 0;
    console.log("Média de estrelas:", averageStars);


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
    <div className="card-walkers">
      <div className="card-top">

      <div className="card-left">
        <img src={getFoto(walkers.foto)} alt={walkers.nome} />
        <h4>R$ {parseFloat(walkers.preco).toFixed(2)} / hora</h4>
      </div>
      <div className="card-right">

        <h3>{walkers.nome}</h3>

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
        <p>{walkers.descricao} </p>
        <p>{walkers.curiosidades} </p>
      </div>
    </div>
      <Link to={`/passeadores/${walkers.username}`}>
        <button className="btn-walker">Saiba mais</button>
      </Link>
      </div>
  );
};

export default Card;  