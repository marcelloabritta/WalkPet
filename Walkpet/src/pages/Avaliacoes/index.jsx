import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetAvaliacoes from "../../Hook/GetAvaliacoes";
import "./Avaliacoes.css";
import avaliacoesImg from '../../assets/avaliacoesIMG.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


function Avaliacoes() {
  const { nomeUsuario } = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [nomeAvaliador, setNomeAvaliador] = useState("");
  const [comentario, setComentario] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  useEffect(() => {
    carregarAvaliacoes();
  }, [nomeUsuario]);

  const carregarAvaliacoes = () => {
    const avaliacoesAtualizadas = GetAvaliacoes(nomeUsuario);
    setAvaliacoes(avaliacoesAtualizadas);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const novaAvaliacao = {
      id: avaliacoes.length + 1,
      nomeAvaliador,
      comentario,
      estrelas,
      data: new Date(),
    };

    const passeadores = JSON.parse(localStorage.getItem("passeadores")) || [];
    const passeador = passeadores.find((p) => p.username === nomeUsuario);

    if (passeador) {
      passeador.avaliacoes.push(novaAvaliacao);
      localStorage.setItem("passeadores", JSON.stringify(passeadores));

      carregarAvaliacoes();
      setMensagemSucesso(true);
      setTimeout(() => setMensagemSucesso(false), 5000);
    }

    setNomeAvaliador("");
    setComentario("");
    setEstrelas(5);
    
  };
  return (
    <div className="avaliacoes">
      <h1>Avaliações de {nomeUsuario}</h1>
      <div className="avaliacoes-container">

        <div className="avaliacoes-left">

          <div className="review-carousel">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              adaptiveHeight={true}
              arrows={true}
            >
              {avaliacoes.map((avaliacao, index) => (
                <div key={index} className="review-card">
                  <p className="review-text">"{avaliacao.comentario}"</p>
                  <div className="profile-section">
                    <h3 className="name">{avaliacao.nomeAvaliador}</h3>
                    <p className="rating">
                      {"★".repeat(avaliacao.estrelas)}
                      {"☆".repeat(5 - avaliacao.estrelas)}
                    </p>
                    <p className="date">{avaliacao.data}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <form onSubmit={handleFormSubmit} className="review-form">
            <input
              type="text"
              value={nomeAvaliador}
              onChange={(e) => setNomeAvaliador(e.target.value)}
              placeholder="Seu nome"
              required
            />
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Deixe seu comentário aqui"
              required
            />
            <div className="rating-section">
              <label htmlFor="estrelas">Avalie o passeador:</label>
              <div className="star-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="star"
                    onClick={() => setEstrelas(star)}
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      color: star <= estrelas ? "var(--primary-blue)" : "#ccc"
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button type="submit">Enviar Avaliação</button>
          </form>
        </div>
        <div className="avaliacoes-right">
          <img src={avaliacoesImg} alt="" />
          {mensagemSucesso && (
            <div className="mensagem-sucesso">

              <FontAwesomeIcon icon={faCircleCheck} />
              <p>Avaliação enviada com sucesso!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Avaliacoes;
