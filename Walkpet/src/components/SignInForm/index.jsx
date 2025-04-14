import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./style.css";

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.nomeUsuario === nomeUsuario && user.senha === senha
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      login(user); 
      navigate("/"); 
    } else {
      setError("Nome de usuário ou senha incorretos.");
    }
  };

  return (
    <div>
      <form className="signIn-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="signin-btn">
          Sign in
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
