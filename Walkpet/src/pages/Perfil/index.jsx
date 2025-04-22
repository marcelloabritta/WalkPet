import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPaperclip,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import "../Perfil/style.css";

const Perfil = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    descricao: user?.descricao || "",
    curiosidades: user?.curiosidades || "",
    foto: user?.foto || "",
    contato: user?.contato || user?.email || "",
  });

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
           curiosidades: updatedUser.curiosidades, // Adicionando o campo curiosidades
         }
       : p
   );
   localStorage.setItem("passeadores", JSON.stringify(updatedPasseadores));

   localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
   login(updatedUser);
   setIsEditing(false);
 };


  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="perfil">
      <div className="breadcrumb-perfil">
        <Link to="/" className="breadcrumb-txt">
          &lt;
        </Link>
        <h3>Perfil</h3>
      </div>
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
          {isEditing ? (
            <input
              type="text"
              value={formData.nome}
              onChange={handleChange}
              name="nome"
              className="profile-name-input"
            />
          ) : (
            <h2 onClick={toggleEdit}>
              {formData.nome} <FontAwesomeIcon icon={faPencil} />
            </h2>
          )}
          {isEditing ? (
            <input
              type="text"
              value={formData.contato}
              onChange={handleChange}
              name="contato"
              className="profile-contact-input"
            />
          ) : (
            <span onClick={toggleEdit}>
              {formData.contato} <FontAwesomeIcon icon={faPencil} />
            </span>
          )}
        </div>

        <div className="perfil-right">
          <h3>Descrição</h3>
          {isEditing ? (
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            />
          ) : (
            <p onClick={toggleEdit}>
              {formData.descricao} <FontAwesomeIcon icon={faPencil} />
            </p>
          )}
          <h3>Curiosidades</h3>
          {isEditing ? (
            <textarea
              name="curiosidades"
              value={formData.curiosidades}
              onChange={handleChange}
            />
          ) : (
            <p onClick={toggleEdit}>
              {formData.curiosidades} <FontAwesomeIcon icon={faPencil} />
            </p>
          )}
          {isEditing && (
            <button onClick={handleSave} className="save-edit">
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
