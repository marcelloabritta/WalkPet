import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetAvaliacoes from "../../Hook/GetAvaliacoes";
import "./Avaliacoes.css";
import avaliacoesImg from "../../assets/avaliacoesIMG.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

function Avaliacoes() {
  const { nomeUsuario } = useParams();
  const [passeador, setPasseador] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [nomeAvaliador, setNomeAvaliador] = useState("");
  const [comentario, setComentario] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  useEffect(() => {
    carregarDados();
  }, [nomeUsuario]);

  const carregarDados = async () => {
  try {
    const { data: passeadorData } = await axios.get(
      `http://localhost:8081/api/passeadores/${nomeUsuario}`
    );
    setPasseador(passeadorData);
    console.log("Passeador carregado:", passeadorData);

    const { data: avaliacoesData } = await axios.get(
      `http://localhost:8081/api/avaliacoes/${nomeUsuario}`
    );
    console.log("Avaliações recebidas:", avaliacoesData);
    
    const avaliacoesArray = Array.isArray(avaliacoesData) 
      ? avaliacoesData 
      : (avaliacoesData.$values || []);
    
    console.log("Avaliações após processamento:", avaliacoesArray);
    setAvaliacoes(avaliacoesArray);
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    setAvaliacoes([]);
  }
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!passeador) {
      console.error("Passeador não encontrado!");
      return;
    }

    console.log("Passeador:", passeador);

    // Garantir que estrelas esteja entre 1-5
    const estrelasValidas = Math.min(Math.max(estrelas || 1, 1), 5);

    const payload = {
      NomeAvaliador: nomeAvaliador,
      Comentario: comentario,
      Estrelas: estrelasValidas,
      // Remova o campo Data para deixar o backend definir (como está no controller)
      PasseadorId: passeador.id,
    };

    console.log("Enviando payload:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/avaliacoes",
        payload
      );
      console.log("Resposta:", response.data);

      setMensagemSucesso(true);
      setNomeAvaliador("");
      setComentario("");
      setEstrelas(0);
      carregarDados();
      setTimeout(() => setMensagemSucesso(false), 3000);
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err.response?.data || err);
    }
  };

  // Calcular média das avaliações
  const mediaEstrelas = React.useMemo(() => {
    if (!avaliacoes || avaliacoes.length === 0) return 0;
    const total = avaliacoes.reduce((acc, av) => acc + av.estrelas, 0);
    return avaliacoes.length > 0 ? total / avaliacoes.length : 0;
  }, [avaliacoes]);

  return (
    <div className="avaliacoes">
      <h1>Avaliações de {nomeUsuario}</h1>

      {/* Resumo das avaliações */}
      {avaliacoes.length > 0 && (
        <div className="avaliacoes-resumo">
          <div className="media-estrelas">
            <span className="valor-media">{mediaEstrelas.toFixed(1)}</span>
            <span className="estrelas-display">
              {"★".repeat(Math.round(mediaEstrelas))}
              {"☆".repeat(5 - Math.round(mediaEstrelas))}
            </span>
          </div>
          <p>
            {avaliacoes.length}{" "}
            {avaliacoes.length === 1 ? "avaliação" : "avaliações"}
          </p>
        </div>
      )}

      <div className="avaliacoes-container">
        <div className="avaliacoes-left">
          <div className="review-carousel">
            {avaliacoes.length === 0 ? (
              <div className="sem-avaliacoes">
                <p>Ainda não há avaliações para este passeador.</p>
                <p>Seja o primeiro a avaliar!</p>
              </div>
            ) : (
              <Slider
                dots={false}
                infinite={avaliacoes.length > 1}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                adaptiveHeight={true}
                arrows={avaliacoes.length > 1}
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
                      <p className="date">
                        {new Date(avaliacao.data).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
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
                      color: star <= estrelas ? "var(--primary-blue)" : "#ccc",
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
