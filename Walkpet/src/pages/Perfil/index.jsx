import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEnvelope,
  faPaperclip,
  faStar,
  faStarHalf,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import "../Perfil/style.css";

const Perfil = () => {
  const { user, login } = useUser();
  const [originalData, setOriginalData] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    descricao: user?.descricao || "",
    curiosidades: user?.curiosidades || "",
    foto: user?.foto || "",
    contato: user?.contato || user?.email || "",
    preco: user?.preco || "",
    cidade: user?.cidade || "",
    estado: user?.estado || "",
  });

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [buscaCidade, setBuscaCidade] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          foto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const estadosOrdenados = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setEstados(estadosOrdenados);
      });
  }, []);

  useEffect(() => {
    if (formData.estado) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.estado}/municipios`
        )
        .then((response) => {
          const cidadesOrdenadas = response.data.sort((a, b) =>
            a.nome.localeCompare(b.nome)
          );
          setCidades(cidadesOrdenadas);
        });
    } else {
      setCidades([]);
    }
  }, [formData.estado]);

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const passeadores = JSON.parse(localStorage.getItem("passeadores")) || [];

    const updatedUsers = users.map((u) =>
      u.nomeUsuario === updatedUser.nomeUsuario ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedPasseadores = passeadores.map((p) =>
      p.username === updatedUser.nomeUsuario
        ? {
          ...p,
          nome: updatedUser.nome,
          email: updatedUser.email,
          descricao: updatedUser.descricao,
          foto: updatedUser.foto,
          curiosidades: updatedUser.curiosidades,
          preco: updatedUser.preco,
          cidade: updatedUser.cidade,
          estado: updatedUser.estado,
        }
        : p
    );
    localStorage.setItem("passeadores", JSON.stringify(updatedPasseadores));

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    login(updatedUser);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (!isEditing) {
      setOriginalData(formData);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false); 
  };

  const totalAvaliacoes = Array.isArray(user.avaliacoes) ? user.avaliacoes.length : 0;
const totalEstrelas = Array.isArray(user.avaliacoes)
  ? user.avaliacoes.reduce((acc, curr) => acc + (curr.estrelas || 0), 0)
  : 0;


  const averageStars =
    totalAvaliacoes > 0 ? totalEstrelas / totalAvaliacoes : 0;


  const fullStars = Math.floor(averageStars);
  const halfStar = averageStars % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStar);


  return (
    <div className="perfil">
      <h3>Perfil</h3>
      <div className="perfil-container">
        <div className="perfil-left">
          <img
            src={formData.foto || user.foto}
            alt={user.nome}
            className="profile-photo"
          />
          {isEditing && (
            <>
              <input
                id="edit-foto"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="edit-foto" className="edit-foto-label">
                <FontAwesomeIcon icon={faPaperclip} /> Alterar Foto
              </label>
            </>
          )}
          <p>
            <span>Nome: </span>
            {isEditing ? (
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="profile-name-input"
              />
            ) : (
              formData.nome
            )}
          </p>
          <p>
            <span><FontAwesomeIcon icon={faEnvelope} /> </span>
            {isEditing ? (
              <input
                type="text"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                className="profile-contact-input"
              />
            ) : (
              formData.contato
            )}
          </p>
        </div>

        <div className="perfil-right">
          {!isEditing && (
            <button onClick={toggleEdit} className="edit-btn">
              Editar perfil
            </button>
          )}
          {isEditing && (
            <div className="botoes-edicao">
            <button onClick={handleCancel} className="cancel-btn">
              Cancelar
            </button>
            <button onClick={handleSave} className="save-edit">
            Salvar
          </button>
          </div>
          )}

          <p>
            <span>Preço: </span>
            {isEditing ? (
              <input
                type="text"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
              />
            ) : (
              `R$ ${parseFloat(formData.preco).toFixed(2)} / hora`
            )}
          </p>

          <p>
            <span>Estado: </span>
            {isEditing ? (
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="">Selecione um estado</option>
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla}
                  </option>
                ))}
              </select>
            ) : (
              formData.estado
            )}
          </p>

          <p>
            <span>Cidade: </span>
            {isEditing ? (
              <>
                <div className="autocomplete-container">
                  <input
                    type="text"
                    name="cidade"
                    placeholder="Digite sua cidade..."
                    value={formData.cidade}
                    onChange={(e) => {
                      handleChange(e);
                      setBuscaCidade(e.target.value);
                    }}
                    autoComplete="off"
                    disabled={!formData.estado}
                  />
                  {buscaCidade && formData.cidade.length > 0 && (
                    <ul className="sugestoes-cidade">
                      {cidades
                        .filter((c) =>
                          c.nome
                            .toLowerCase()
                            .includes(buscaCidade.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((c) => (
                          <li
                            key={c.id}
                            onClick={() => {
                              handleChange({
                                target: { name: "cidade", value: c.nome },
                              });
                              setBuscaCidade("");
                            }}
                          >
                            {c.nome}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </>
            ) : (
              formData.cidade
            )}
          </p>

          <p>
            <span>Descrição: </span>
            {isEditing ? (
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            ) : (
              formData.descricao
            )}
          </p>

          <p>
            <span>Curiosidades: </span>
            {isEditing ? (
              <textarea
                name="curiosidades"
                value={formData.curiosidades}
                onChange={handleChange}
              />
            ) : (
              formData.curiosidades
            )}
          </p>

        
        </div>
      </div>
      <div className="perfil-bottom">

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
        <Link to={`/avaliacoes/${user.nomeUsuario}`} className="avaliacoes">
         Ver Avaliações
        </Link>
      </div>
    </div>
  );
}

export default Perfil;

