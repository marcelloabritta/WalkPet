import React from 'react'
import "../HomeCards/style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faStar,
    faStarHalf,
    faStar as faEmptyStar
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HomeCards = ({ walkers }) => {

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
        <div className='card'>
            <div className="card-left">
                <img src={walkers.foto} alt={walkers.nome} className="walker-photo" />
                <div className="card-info">
                    <h2>{walkers.nome}</h2>
                    <span className="distancia">
                        {walkers.distancia && `(${walkers.distancia})`}
                    </span>
                    <div className="location">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>
                            {walkers.cidade && walkers.estado
                                ? `${walkers.cidade}, ${walkers.estado}`
                                : 'Local não informado'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="card-right">
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
                <div className="preco">R$ {parseFloat(walkers.preco).toFixed(2)} / hora</div>
                <Link to={`/passeadores/${walkers.username}`}>
                        <button className="btn-walker">Ver Perfil</button>
                      </Link>
            </div>
        </div>
    )
}

export default HomeCards
