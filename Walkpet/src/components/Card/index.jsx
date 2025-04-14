import React from "react";
import {
  faStar,
  faStarHalf,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Card/style.css";
import { Link } from "react-router-dom";

const Card = ({ walkers }) => {

  const totalAvaliacoes = walkers.avaliacoes.length;
  const totalEstrelas = walkers.avaliacoes.reduce(
    (acc, curr) => acc + (curr.estrelas || 0), 
    0
  );


  const averageStars =
    totalAvaliacoes > 0 ? totalEstrelas / totalAvaliacoes : 0;


  const fullStars = Math.floor(averageStars);
  const halfStar = averageStars % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStar);

  return (
    <div className="card-walkers">
      <img src={walkers.foto} alt={walkers.nome} />
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
      <Link to={`/passeadores/${walkers.username}`}>
        <button className="btn-walker">Saiba mais</button>
      </Link>
    </div>
  );
};

export default Card;
