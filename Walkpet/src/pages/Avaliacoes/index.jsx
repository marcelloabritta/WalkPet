import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetAvaliacoes from "../../Hook/GetAvaliacoes";
import "./Avaliacoes.css";

function Avaliacoes() {
  const { nomeUsuario } = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [nomeAvaliador, setNomeAvaliador] = useState("");
  const [comentario, setComentario] = useState("");
  const [estrelas, setEstrelas] = useState(5);

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
    }

    setNomeAvaliador("");
    setComentario("");
    setEstrelas(5);
  };
  return (
    <div className="avaliacoes-container">
      <h1>Avaliações de {nomeUsuario}</h1>
      <div className="review-list">
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
          <label htmlFor="estrelas">Nota (1-5):</label>
          <input
            type="number"
            id="estrelas"
            value={estrelas}
            onChange={(e) => setEstrelas(Number(e.target.value))}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Enviar Avaliação</button>
      </form>
    </div>
  );
}

export default Avaliacoes;
