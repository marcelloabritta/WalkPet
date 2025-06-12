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
    const passeadores = JSON.parse(localStorage.getItem("passeadores")) || [];
    const passeadorAtualizado = passeadores.find(p => p.username === user.nomeUsuario);

    if (passeadorAtualizado) {
      setFormData(prev => ({ ...prev, avaliacoes: passeadorAtualizado.avaliacoes || [] }));
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
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/passeadores/${user.nomeUsuario}`
        );
        if (response.ok) {
          const userData = await response.json();
          const avaliacoes = userData.avaliacoes?.$values || [];

          setFormData((prev) => ({
            ...prev,
            avaliacoes: avaliacoes,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleSave = async () => {
    try {
      const updatedData = {
        nome: formData.nome,
        cpf: user.cpf, 
        username: user.nomeUsuario, 
        email: formData.contato, 
        senha: user.senha, 
        descricao: formData.descricao || "Sem descrição",
        curiosidades: formData.curiosidades || "Sem curiosidades",
        cidade: formData.cidade,
        estado: formData.estado,
        distancia: user.distancia || "0 km",
        preco: parseFloat(formData.preco) || 0,
        foto: formData.foto || user.foto,
      };

      console.log("Dados sendo enviados:", updatedData); 

      const response = await fetch(
        `http://localhost:8081/api/passeadores/${user.nomeUsuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedUser = {
          ...user,
          nome: formData.nome,
          email: formData.contato, 
          descricao: formData.descricao,
          curiosidades: formData.curiosidades,
          cidade: formData.cidade,
          estado: formData.estado,
          preco: formData.preco,
          foto: formData.foto,
        };

        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        login(updatedUser);
        setIsEditing(false);

        alert("Perfil atualizado com sucesso!");
      } else {
        const errorText = await response.text();
        console.error("Erro detalhado:", errorText);
        alert("Erro ao atualizar perfil!");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro de conexão!");
    }
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

  const totalAvaliacoes = Array.isArray(formData.avaliacoes) ? formData.avaliacoes.length : 0;
  const totalEstrelas = Array.isArray(formData.avaliacoes)
    ? formData.avaliacoes.reduce((acc, curr) => acc + (curr.estrelas || 0), 0)
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

